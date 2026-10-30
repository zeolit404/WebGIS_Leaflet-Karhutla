/* ========================================================
   WEBGIS LEAFLET - INISIALISASI PETA DASAR & KONTROL
   Materi Rujukan: Slide Kuliah Pengenalan WebGIS Leaflet
   Dosen: Andang Suryana Soma, S.Hut., MP., Ph.D
   ======================================================== */

// 1. Inisialisasi Peta (Map Initialization - Slide 7 & 8)
// Titik pusat Pulau Kalimantan: [-0.5, 114.5], Zoom Level: 6
var map = L.map('map', {
    center: [-0.5, 114.5],
    zoom: 6,
    zoomControl: false, // Kita pindahkan posisi zoom control agar lebih rapi
    minZoom: 4,
    maxZoom: 18
});

// Pindahkan Zoom Control ke Kanan Atas
L.control.zoom({ position: 'topright' }).addTo(map);

// 2. Definisi Peta Dasar (Basemaps - Slide 9 & 10)
// Menggunakan OpenStreetMap dan Esri (Stabil, Tanpa Watermark, Tanpa Batasan API Key)
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var esriSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var esriTopo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, METI'
});

// Peta Dasar Aktif Bawaan (Default Basemap)
osm.addTo(map);

// 3. Menambahkan Skala Peta (Scale Bar Control)
L.control.scale({
    position: 'bottomleft',
    metric: true,
    imperial: false,
    maxWidth: 150
}).addTo(map);

// 3b. Definisi Layer Cuaca & Pergerakan Angin (Real-time Live Layer)
var weatherRadarLayer = L.tileLayer('', {
    opacity: 0.65,
    zIndex: 600,
    attribution: 'Radar Cuaca &copy; <a href="https://www.rainviewer.com/" target="_blank">RainViewer</a>'
});

var windLayer = L.layerGroup();

// 4. Pengelompokan Layer untuk Layer Control (Slide 13 - Bersih Tanpa Emotikon Berlebih)
var baseMaps = {
    "OpenStreetMap (Standar)": osm,
    "Esri Citra Satelit": esriSatellite,
    "Esri Topografi & Relief": esriTopo
};

var overlayMaps = {
    "<span style='font-weight:600; color:#1d3557;'><i class='fas fa-landmark'></i> Batas Administrasi</span>": adminLayer,
    "<span style='font-weight:600; color:#2a9d8f;'><i class='fas fa-tree'></i> Tutupan Lahan (KHG Gambut)</span>": tutupanLahanLayer,
    "<span style='font-weight:600; color:#d90429;'><i class='fas fa-road'></i> Jaringan Jalan Trans-Kalimantan</span>": jalanLayer,
    "<span style='font-weight:600; color:#0077b6;'><i class='fas fa-water'></i> Jaringan Sungai Utama</span>": sungaiLayer,
    "<span style='font-weight:600; color:#e63946;'><i class='fas fa-map-marker-alt'></i> Toponim & Posko Pantau</span>": toponimLayer,
    "<span style='font-weight:600; color:#0284c7;'><i class='fas fa-cloud-showers-heavy'></i> Radar Cuaca (RainViewer)</span>": weatherRadarLayer,
    "<span style='font-weight:600; color:#0d9488;'><i class='fas fa-wind'></i> Pergerakan & Arah Angin</span>": windLayer,
    "<span style='font-weight:600; color:#6c757d;'><i class='fas fa-globe'></i> Layanan WMS GeoServer (Opsional)</span>": wmsGeoServerAdmin
};

// 5. Menambahkan Kendali Lapisan Peta (L.control.layers - Slide 13)
var layerControl = L.control.layers(baseMaps, overlayMaps, {
    position: 'topright',
    collapsed: false
}).addTo(map);

// 6. Penataan Urutan Lapisan (Z-Index - Slide 16)
map.createPane('tutupanLahanPane');
map.getPane('tutupanLahanPane').style.zIndex = 390;

map.createPane('adminPane');
map.getPane('adminPane').style.zIndex = 400;

map.createPane('sungaiPane');
map.getPane('sungaiPane').style.zIndex = 450;

map.createPane('jalanPane');
map.getPane('jalanPane').style.zIndex = 500;

// 7. Tracker Koordinat Kursor Mouse (Latitude, Longitude)
map.on('mousemove', function(e) {
    var lat = e.latlng.lat.toFixed(5);
    var lng = e.latlng.lng.toFixed(5);
    document.getElementById('coord-display').innerHTML = 
        `<i class="fas fa-crosshairs"></i> Lat: <b>${lat}</b> | Lng: <b>${lng}</b>`;
});

// 8. Tombol Reset / Home View
function resetMapView() {
    map.flyTo([-0.5, 114.5], 6, {
        duration: 1.2
    });
}

// 9. Fungsi Toggle / Minimalkan Panel Statistik Sisi Kiri
function toggleStatsSidebar() {
    var sidebar = document.getElementById('statsSidebar');
    var icon = document.getElementById('toggleSidebarIcon');
    if (!sidebar) return;

    sidebar.classList.toggle('collapsed');
    if (sidebar.classList.contains('collapsed')) {
        icon.className = 'fas fa-chart-pie';
    } else {
        icon.className = 'fas fa-chevron-left';
    }
}

// 10. Fungsi Navigasi Zoom Cepat ke Wilayah
function zoomToRegion(region) {
    if (region === 'kalteng') {
        map.flyTo([-1.5, 113.8], 7, { duration: 1.2 });
    } else if (region === 'kaltim') {
        map.flyTo([-0.4, 116.8], 7, { duration: 1.2 });
    } else if (region === 'kalbar') {
        map.flyTo([0.1, 110.8], 7, { duration: 1.2 });
    } else if (region === 'kalsel') {
        map.flyTo([-2.9, 115.3], 8, { duration: 1.2 });
    } else if (region === 'kaltara') {
        map.flyTo([3.0, 116.2], 7, { duration: 1.2 });
    } else if (region === 'gambut') {
        map.flyTo([-2.2, 113.9], 8, { duration: 1.2 });
    }
}

// 11. Inisialisasi Data Cuaca & Pergerakan Angin Real-Time (Slide 15 & 16)
function initWeatherAndWind() {
    // A. Muat Tile Radar Cuaca RainViewer
    fetch('https://api.rainviewer.com/public/weather-maps.json')
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data.radar && data.radar.past && data.radar.past.length > 0) {
                var latest = data.radar.past[data.radar.past.length - 1];
                weatherRadarLayer.setUrl('https://tilecache.rainviewer.com' + latest.path + '/256/{z}/{x}/{y}/2/1_1.png');
            }
        })
        .catch(function(err) {
            console.warn('Radar cuaca RainViewer tidak tersedia:', err);
        });

    // B. Stasiun Pemantauan Angin Kalimantan (Open-Meteo API)
    var stations = [
        { nama: 'Pontianak (Kalbar)', lat: -0.026, lng: 109.344 },
        { nama: 'Ketapang (Kalbar)', lat: -1.833, lng: 109.970 },
        { nama: 'Palangka Raya (Kalteng)', lat: -2.213, lng: 113.921 },
        { nama: 'Pulang Pisau (Kalteng)', lat: -2.750, lng: 114.250 },
        { nama: 'Banjarmasin (Kalsel)', lat: -3.319, lng: 114.590 },
        { nama: 'Samarinda (Kaltim)', lat: -0.502, lng: 117.145 },
        { nama: 'Balikpapan / IKN (Kaltim)', lat: -1.265, lng: 116.831 },
        { nama: 'Tanjung Selor (Kaltara)', lat: 2.840, lng: 117.365 }
    ];

    var lats = stations.map(function(s) { return s.lat; }).join(',');
    var lngs = stations.map(function(s) { return s.lng; }).join(',');
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lats + '&longitude=' + lngs + '&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m';

    fetch(url)
        .then(function(res) { return res.json(); })
        .then(function(dataList) {
            var items = Array.isArray(dataList) ? dataList : [dataList];
            items.forEach(function(item, idx) {
                var st = stations[idx];
                if (!st || !item.current) return;

                var speed = item.current.wind_speed_10m || 0;
                var deg = item.current.wind_direction_10m || 0;
                var temp = item.current.temperature_2m || 0;
                var hum = item.current.relative_humidity_2m || 0;

                var directions = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
                var cardIdx = Math.round(deg / 45) % 8;
                var cardinal = directions[cardIdx];
                var smokeIdx = (cardIdx + 4) % 8;
                var smokeDir = directions[smokeIdx];

                var windIcon = L.divIcon({
                    className: 'custom-wind-icon',
                    html: `
                        <div class="wind-marker-box" title="${st.nama}: ${speed} km/j ke ${cardinal}">
                            <div class="wind-arrow" style="transform: rotate(${deg}deg);">
                                <i class="fas fa-location-arrow"></i>
                            </div>
                            <div class="wind-badge">${speed} km/j</div>
                        </div>
                    `,
                    iconSize: [40, 40],
                    iconAnchor: [20, 20]
                });

                var marker = L.marker([st.lat, st.lng], { icon: windIcon });
                marker.bindPopup(`
                    <div class="popup-header" style="background: linear-gradient(135deg, #0d9488, #115e59);">
                        <h3>Stasiun Angin: ${st.nama}</h3>
                        <span>Parameter Meteorologi Real-Time</span>
                    </div>
                    <div class="popup-body">
                        <table class="popup-table">
                            <tr><td class="label">Arah Angin:</td><td class="value"><b>${deg}° (${cardinal})</b></td></tr>
                            <tr><td class="label">Kecepatan:</td><td class="value"><b>${speed} km/jam</b></td></tr>
                            <tr><td class="label">Suhu Udara:</td><td class="value">${temp} °C</td></tr>
                            <tr><td class="label">Kelembapan:</td><td class="value">${hum} %</td></tr>
                            <tr><td class="label">Dampak Karhutla:</td><td class="value" style="color:#d90429; font-weight:700;">Asap Berpotensi Bergerak ke ${smokeDir}</td></tr>
                        </table>
                    </div>
                `);

                windLayer.addLayer(marker);
            });
            windLayer.addTo(map);
        })
        .catch(function(err) {
            console.warn('Gagal memuat parameter angin Open-Meteo:', err);
        });
}

// 12. Jalankan Pemuatan Seluruh Layer Data Spasial & Cuaca
loadGeoJSONData();
initWeatherAndWind();
