# 🌏 WebGIS Interaktif Kalimantan - Pustaka Leaflet

Aplikasi Peta Interaktif WebGIS Berbasis Pustaka **Leaflet.js** untuk Pemantauan Wilayah Administrasi, Infrastruktur, Tata Ruang, dan Mitigasi Kerawanan Kebakaran Hutan & Lahan (Karhutla) di Pulau Kalimantan.

---

## 👨‍🎓 Identitas Pengembang
* **Nama**: M. ARIEF ABDILLAH
* **NIM**: V126241003
* **Program Studi**: D4 Penginderaan Jauh dan Sistem Informasi Geografis (PJ & SIG)
* **Fakultas**: Fakultas Vokasi, Universitas Hasanuddin
* **Mata Kuliah**: Praktek Pengelolaan Big Data dan WebGIS (Semester 5)
* **Dosen Pengampu**: Andang Suryana Soma, S.Hut., MP., Ph.D.

---

## 🚀 Fitur Utama WebGIS

1. **Multi-Basemap Selection (Layer Control)**:
   * OpenStreetMap Standard
   * Esri World Imagery (Citra Satelit Resolusi Tinggi)
   * Carto Light (Positron)
   * Carto Dark (Dark Matter)

2. **Lapisan Data Spasial Dasar (Layer Overlay Wajib)**:
   * 🏛️ **Batas Administrasi**: 5 Provinsi di Pulau Kalimantan dengan klasifikasi tematik *Choropleth Status Siaga Karhutla* (Siaga I, Siaga II, Waspada).
   * 🌲 **Tutupan Lahan & Gambut**: Kawasan Hidrologis Gambut (KHG) Prioritas Restorasi (582.400 Ha TN Sebangau, Eks-PLG Kapuas, dsb).
   * 🛣️ **Jaringan Jalan Trans-Kalimantan**: Koridor arteri primer dan kolektor nasional sepanjang 2.568 Km (Poros Selatan, Poros Timur, Poros Tengah, dan Poros Perbatasan Entikong).
   * 🌊 **Jaringan Sungai Utama**: Sungai-sungai besar Kalimantan (Kapuas, Barito, Mahakam, Kahayan, dsb).
   * 📍 **Toponim & Posko Pantau**: Ibu kota provinsi/kota otonom dan posko pengamatan satelit hotspot karhutla (FRP MW & Akurasi).
   * 🌐 **Integrasi WMS GeoServer**: Dukungan integrasi langsung layanan *Web Map Service* (WMS) OGC dari server GeoServer lokal (`http://localhost:8080/geoserver/wms`).

3. **Dashboard Statistik Spasial (Sidebar Kiri)**:
   * Metrik KPI cepat (Total Luas Wilayah 53,45 Juta Ha, Luas KHG Gambut 1,91 Juta Ha, Panjang Jalan 2.568 Km, 11 Titik Posko & Kota).
   * Distribusi persentase status mitigasi karhutla per provinsi.
   * Rincian luasan KHG prioritas restorasi Badan Restorasi Gambut dan Mangrove (BRGM).
   * Tombol *Quick Zoom* ke masing-masing provinsi (Kalteng, Kaltim/IKN, Kalbar, Kalsel, Kaltara, dan Gambut KHG).
   * Fitur minimize/expand panel untuk fleksibilitas eksplorasi peta.

4. **Interaktivitas Kartografis**:
   * *Dynamic Mouse Coordinate Tracker* (Lintang/Latitude & Bujur/Longitude).
   * *Hover Glow Effect* & *Responsive Popups* dengan tabel atribut lengkap.
   * *Cartographic Scale Bar* & *Home View Reset*.
   * Pengurutan lapisan bertingkat (*Z-Index Panes*) untuk mencegah tumpang-tindih visual.

---

## 📁 Struktur Berkas

```text
WebGIS_Leaflet/
├── index.html               # Halaman antarmuka utama WebGIS
├── README.md                # Dokumentasi proyek
├── .gitignore               # Pengabaian berkas sistem/log
├── server.js                # Server statis lokal Node.js
├── css/
│   └── style.css            # Styling responsif, glassmorphism UI & legenda
├── js/
│   ├── map.js               # Inisialisasi peta Leaflet, basemap, zoom & event listener
│   └── layers.js            # Definisi layer GeoJSON tematik & WMS service
├── data/                    # Dataset spasial (GeoJSON & JS Dual-loader)
│   ├── administrasi.geojson & administrasi.js
│   ├── jalan.geojson & jalan.js
│   ├── sungai.geojson & sungai.js
│   ├── tutupan_lahan.geojson & tutupan_lahan.js
│   └── toponim.geojson & toponim.js
└── presentasi/              # Berkas pendukung presentasi
```

---

## 🛠️ Cara Menjalankan Proyek

### 1. Langsung Tanpa Server (Offline):
Cukup buka berkas `index.html` dengan peramban web (Google Chrome, Microsoft Edge, Mozilla Firefox).

### 2. Melalui Local Web Server (Node.js):
```bash
node server.js
```
Lalu buka peramban di `http://localhost:3000`.

---
*Dikembangkan untuk pemenuhan Tugas Proyek WebGIS Modul 5 Leaflet - Universitas Hasanuddin.*
