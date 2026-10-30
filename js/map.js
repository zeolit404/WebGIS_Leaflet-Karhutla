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
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var esriSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 18,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var cartoPositron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
});

var cartoDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
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

// 4. Pengelompokan Layer untuk Layer Control (Slide 13)
var baseMaps = {
    "OpenStreetMap (Standar)": osm,
    "Esri Citra Satelit": esriSatellite,
    "Carto Light (Peta Terang)": cartoPositron,
    "Carto Dark (Peta Gelap)": cartoDark
};

var overlayMaps = {
    "<span style='font-weight:600; color:#1d3557;'>🏛️ Batas Administrasi</span>": adminLayer,
    "<span style='font-weight:600; color:#2a9d8f;'>🌲 Tutupan Lahan (Gambut/KHG)</span>": tutupanLahanLayer,
    "<span style='font-weight:600; color:#d90429;'>🛣️ Jaringan Jalan Trans-Kalimantan</span>": jalanLayer,
    "<span style='font-weight:600; color:#0077b6;'>🌊 Jaringan Sungai Utama</span>": sungaiLayer,
    "<span style='font-weight:600; color:#e63946;'>📍 Toponim & Posko Pantau</span>": toponimLayer,
    "<span style='font-weight:600; color:#6c757d;'>🌐 Layanan WMS GeoServer (Opsional)</span>": wmsGeoServerAdmin
};

// 5. Menambahkan Kendali Lapisan Peta (L.control.layers - Slide 13)
var layerControl = L.control.layers(baseMaps, overlayMaps, {
    position: 'topright',
    collapsed: false // Tampil terbuka agar pengguna langsung melihat opsi layer
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

// 11. Jalankan Pemuatan Seluruh Layer Data Spasial
loadGeoJSONData();
