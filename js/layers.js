/* ========================================================
   WEBGIS LEAFLET - LOGIKA PENGELOLAAN LAYER & DATA SPASIAL
   Menangani: Administrasi, Jalan, Sungai, Toponim, Tutupan Lahan, & WMS GeoServer
   ======================================================== */

// 1. Pewarnaan Tematik Berdasarkan Status Kerawanan (Identik SLD Pertemuan 4)
function getAdminColor(status) {
    if (!status) return '#A8D08D';
    if (status.includes('Siaga I')) return '#E63946'; // Merah
    if (status.includes('Siaga II')) return '#F4A261'; // Oranye
    if (status.includes('Waspada')) return '#E9C46A'; // Kuning
    return '#CED4DA'; // Abu-abu (Luar Kajian)
}

// 2. Fungsi Styling untuk Layer Administrasi
function styleAdmin(feature) {
    return {
        fillColor: getAdminColor(feature.properties.status_kerawanan),
        weight: 1.8,
        opacity: 1,
        color: '#1D3557', // Garis batas navy
        dashArray: '',
        fillOpacity: 0.75
    };
}

// 3. Efek Interaktif Hover (Mouse Over & Out)
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 3.5,
        color: '#00F5D4', // Glow Cyan
        fillOpacity: 0.9
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlightAdmin(e) {
    adminLayer.resetStyle(e.target);
}

// 4. Bind Popup untuk Layer Administrasi
function onEachFeatureAdmin(feature, layer) {
    var props = feature.properties;
    var statusClass = 'info';
    if (props.status_kerawanan && props.status_kerawanan.includes('Siaga I')) statusClass = 'danger';
    else if (props.status_kerawanan && props.status_kerawanan.includes('Siaga II')) statusClass = 'warning';

    var popupContent = `
        <div class="popup-header">
            <h3>${props.provinsi || 'Wilayah Administrasi'}</h3>
            <span>Tingkat Yurisdiksi Provinsi / Regional</span>
        </div>
        <div class="popup-body">
            <table class="popup-table">
                <tr>
                    <td class="label">Status Mitigasi:</td>
                    <td class="value">
                        <span class="stat-chip ${statusClass}">${props.status_kerawanan || 'Terdata'}</span>
                    </td>
                </tr>
                <tr>
                    <td class="label">Estimasi Luasan:</td>
                    <td class="value">${props.luas_ha ? Number(props.luas_ha).toLocaleString('id-ID') + ' Ha' : 'Dalam Perhitungan'}</td>
                </tr>
                <tr>
                    <td class="label">ID Spasial:</td>
                    <td class="value">ADM-${props.id || '01'}</td>
                </tr>
            </table>
        </div>
    `;
    layer.bindPopup(popupContent);
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlightAdmin
    });
}

// 5. Inisialisasi Objek Layer Tematik
var adminLayer = L.geoJson(null, {
    style: styleAdmin,
    onEachFeature: onEachFeatureAdmin
});

// Layer Jaringan Jalan
var jalanLayer = L.geoJson(null, {
    style: function(feature) {
        return {
            color: '#D90429', // Merah Jalan Arteri
            weight: feature.properties.fungsi === 'Jalan Arteri Primer' ? 3.5 : 2.5,
            opacity: 0.9,
            dashArray: feature.properties.fungsi === 'Jalan Kolektor Primer' ? '6, 4' : ''
        };
    },
    onEachFeature: function(feature, layer) {
        var p = feature.properties;
        layer.bindPopup(`
            <div class="popup-header" style="background: linear-gradient(135deg, #d90429, #ef233c);">
                <h3>${p.nama_jalan}</h3>
                <span>${p.status} - ${p.fungsi}</span>
            </div>
            <div class="popup-body">
                <table class="popup-table">
                    <tr><td class="label">Rute Poros:</td><td class="value">${p.rute}</td></tr>
                    <tr><td class="label">Panjang Ruas:</td><td class="value">${p.panjang_km} Km</td></tr>
                    <tr><td class="label">Kondisi Fisik:</td><td class="value">${p.kondisi}</td></tr>
                </table>
            </div>
        `);
    }
});

// Layer Jaringan Sungai
var sungaiLayer = L.geoJson(null, {
    style: {
        color: '#0077B6', // Biru Sungai
        weight: 2,
        opacity: 0.85
    },
    onEachFeature: function(feature, layer) {
        var p = feature.properties;
        layer.bindPopup(`
            <div class="popup-header" style="background: linear-gradient(135deg, #0077b6, #0096c7);">
                <h3>${p.name || 'Jaringan Sungai Utama'}</h3>
                <span>Kategori: ${p.fclass || 'Badan Air Alami'}</span>
            </div>
            <div class="popup-body">
                <table class="popup-table">
                    <tr><td class="label">Fungsi:</td><td class="value">Sistem Drainase & Hidrologi Alami</td></tr>
                    <tr><td class="label">Lebar Indikatif:</td><td class="value">${p.width ? p.width + ' Meter' : 'Bervariasi'}</td></tr>
                </table>
            </div>
        `);
    }
});

// Layer Tutupan Lahan (Kesatuan Hidrologis Gambut / Hutan)
var tutupanLahanLayer = L.geoJson(null, {
    style: function(feature) {
        return {
            fillColor: feature.properties.color || '#2A9D8F', // Hijau toska
            weight: 1.2,
            opacity: 0.9,
            color: '#264653',
            fillOpacity: 0.55
        };
    },
    onEachFeature: function(feature, layer) {
        var p = feature.properties;
        layer.bindPopup(`
            <div class="popup-header" style="background: linear-gradient(135deg, #2a9d8f, #264653);">
                <h3>${p.nama_khg || 'Kawasan Ekosistem Gambut'}</h3>
                <span>Tutupan Lahan & Fungsi Lindung</span>
            </div>
            <div class="popup-body">
                <table class="popup-table">
                    <tr><td class="label">Provinsi:</td><td class="value">${p.provinsi || '-'}</td></tr>
                    <tr><td class="label">Kedalaman:</td><td class="value">${p.kedalaman_gambut || 'Kubah Gambut Dangkal'}</td></tr>
                    <tr><td class="label">Kerentanan:</td><td class="value">${p.tingkat_kerentanan || 'Tinggi'}</td></tr>
                    <tr><td class="label">Luas Kawasan:</td><td class="value">${p.luas_ha ? Number(p.luas_ha).toLocaleString('id-ID') + ' Ha' : '-'}</td></tr>
                </table>
            </div>
        `);
    }
});

// Layer Toponim & Titik Pantau (Custom Markers)
var toponimLayer = L.geoJson(null, {
    pointToLayer: function(feature, latlng) {
        var isCity = feature.properties.kategori && feature.properties.kategori.includes('Kota');
        
        // Ikon Khusus Kota vs Titik Pantau
        var markerHtml = isCity 
            ? `<div style="background:#1D3557; color:#fff; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow:0 3px 8px rgba(0,0,0,0.4);"><i class="fas fa-city" style="font-size:12px;"></i></div>`
            : `<div style="background:#E63946; color:#fff; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #fff; box-shadow:0 3px 8px rgba(0,0,0,0.4);"><i class="fas fa-fire" style="font-size:12px;"></i></div>`;

        var customIcon = L.divIcon({
            html: markerHtml,
            className: 'custom-leaflet-marker',
            iconSize: [28, 28],
            iconAnchor: [14, 14]
        });

        return L.marker(latlng, { icon: customIcon });
    },
    onEachFeature: function(feature, layer) {
        var p = feature.properties;
        var headerBg = p.kategori && p.kategori.includes('Kota') ? '#1D3557' : '#E63946';
        
        layer.bindPopup(`
            <div class="popup-header" style="background: ${headerBg};">
                <h3>${p.nama}</h3>
                <span>${p.kategori} - ${p.provinsi || ''}</span>
            </div>
            <div class="popup-body">
                <table class="popup-table">
                    ${p.kabupaten ? `<tr><td class="label">Kabupaten:</td><td class="value">${p.kabupaten}</td></tr>` : ''}
                    ${p.populasi ? `<tr><td class="label">Populasi:</td><td class="value">${p.populasi}</td></tr>` : ''}
                    ${p.frp_mw ? `<tr><td class="label">Daya Radiasi:</td><td class="value">${p.frp_mw} MW (Megawatt)</td></tr>` : ''}
                    ${p.confidence ? `<tr><td class="label">Tingkat Akurasi:</td><td class="value">${p.confidence}</td></tr>` : ''}
                    ${p.tipe_lahan ? `<tr><td class="label">Tutupan Lahan:</td><td class="value">${p.tipe_lahan}</td></tr>` : ''}
                    ${p.keterangan ? `<tr><td class="label">Deskripsi:</td><td class="value">${p.keterangan}</td></tr>` : ''}
                </table>
            </div>
        `);
    }
});

// 6. Layer WMS Integrasi Langsung dari GeoServer (Slide 12 & 14)
var wmsGeoServerAdmin = L.tileLayer.wms('http://localhost:8080/geoserver/karhutla_kalimantan/wms', {
    layers: 'karhutla_kalimantan:batas_provinsi_kalimantan',
    format: 'image/png',
    transparent: true,
    version: '1.1.1',
    styles: 'karhutla_provinsi_style',
    attribution: 'Layanan WMS GeoServer UNHAS'
});

// 7. Fungsi Memuat Data Spasial (Mendukung file:// lokal langsung & fetch http)
function loadGeoJSONData() {
    // 1. Administrasi
    if (typeof dataAdministrasi !== 'undefined') {
        adminLayer.addData(dataAdministrasi);
        adminLayer.addTo(map);
    } else {
        fetch('data/administrasi.geojson')
            .then(res => res.json())
            .then(data => { adminLayer.addData(data); adminLayer.addTo(map); })
            .catch(err => console.warn('Gagal memuat administrasi:', err));
    }

    // 2. Jaringan Jalan
    if (typeof dataJalan !== 'undefined') {
        jalanLayer.addData(dataJalan);
        jalanLayer.addTo(map);
    } else {
        fetch('data/jalan.geojson')
            .then(res => res.json())
            .then(data => { jalanLayer.addData(data); jalanLayer.addTo(map); })
            .catch(err => console.warn('Gagal memuat jalan:', err));
    }

    // 3. Jaringan Sungai
    if (typeof dataSungai !== 'undefined') {
        sungaiLayer.addData(dataSungai);
        sungaiLayer.addTo(map);
    } else {
        fetch('data/sungai.geojson')
            .then(res => res.json())
            .then(data => { sungaiLayer.addData(data); sungaiLayer.addTo(map); })
            .catch(err => console.warn('Gagal memuat sungai:', err));
    }

    // 4. Tutupan Lahan
    if (typeof dataTutupanLahan !== 'undefined') {
        tutupanLahanLayer.addData(dataTutupanLahan);
        tutupanLahanLayer.addTo(map);
    } else {
        fetch('data/tutupan_lahan.geojson')
            .then(res => res.json())
            .then(data => { tutupanLahanLayer.addData(data); tutupanLahanLayer.addTo(map); })
            .catch(err => console.warn('Gagal memuat tutupan lahan:', err));
    }

    // 5. Toponim
    if (typeof dataToponim !== 'undefined') {
        toponimLayer.addData(dataToponim);
        toponimLayer.addTo(map);
    } else {
        fetch('data/toponim.geojson')
            .then(res => res.json())
            .then(data => { toponimLayer.addData(data); toponimLayer.addTo(map); })
            .catch(err => console.warn('Gagal memuat toponim:', err));
    }
}
