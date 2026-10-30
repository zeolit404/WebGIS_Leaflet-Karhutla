# WebGIS Interaktif Kalimantan - Pustaka Leaflet

Aplikasi Peta WebGIS Interaktif berbasis pustaka JavaScript **Leaflet.js** untuk visualisasi batas administrasi, infrastruktur jaringan jalan dan sungai, toponim, serta pemantauan kawasan hidrologis gambut dan mitigasi kebakaran hutan dan lahan (Karhutla) di Pulau Kalimantan.

---

### Link Akses WebGIS (Live Deployment)
Aplikasi WebGIS ini telah dipublikasikan dan dapat diakses secara langsung melalui tautan berikut:  
**https://zeolit404.github.io/WebGIS_Leaflet-Karhutla/**

---

## Informasi Akademik

* **Nama Mahasiswa**: M. ARIEF ABDILLAH
* **NIM**: V126241003
* **Program Studi**: D4 Penginderaan Jauh dan Sistem Informasi Geografis
* **Fakultas**: Fakultas Vokasi, Universitas Hasanuddin
* **Mata Kuliah**: Praktek Pengelolaan Big Data dan WebGIS (Semester 5)
* **Dosen Pengampu**: Andang Suryana Soma, S.Hut., MP., Ph.D.
* **Tugas**: Proyek Peta WebGIS Menggunakan Leaflet (Modul 5)

---

## Fitur dan Fungsionalitas Utama

### 1. Pilihan Peta Dasar (Basemaps)
Aplikasi menyediakan kendali lapisan (*Layer Control*) dengan empat pilihan basemap:
* **OpenStreetMap (Standard)**: Peta jalan umum bersumber terbuka.
* **Esri World Imagery**: Citra satelit resolusi tinggi untuk pengamatan tutupan visual riil.
* **Carto Light (Positron)**: Tampilan peta monokrom terang yang memudahkan pembacaan data tematik.
* **Carto Dark (Dark Matter)**: Tampilan peta tema gelap dengan kontras visual tinggi.

### 2. Lapisan Data Spasial Tematik (Layer Overlays)
Sesuai instruksi penugasan, seluruh layer dasar telah diunggah dan diintegrasikan:
* **Batas Administrasi**: Batas 5 provinsi di Pulau Kalimantan dengan klasifikasi tematik *choropleth* status siaga mitigasi karhutla (Siaga I, Siaga II, dan Waspada).
* **Tutupan Lahan & Gambut**: Kawasan Hidrologis Gambut (KHG) prioritas restorasi seluas 1,91 juta hektar (termasuk TN Sebangau, Eks-PLG Kapuas-Barito, Sungai Pawan, dan Danau Panggang).
* **Jaringan Jalan Trans-Kalimantan**: Koridor jalan arteri dan kolektor primer nasional sepanjang 2.568 km (Poros Selatan, Poros Timur, Poros Tengah, dan Poros Perbatasan Entikong).
* **Jaringan Sungai Utama**: Jalur sungai-sungai utama di Pulau Kalimantan (Kapuas, Barito, Mahakam, Kahayan, dan sekitarnya).
* **Toponim & Posko Pantau**: Titik toponim ibu kota provinsi, kota otonom, serta posko pengamatan satelit karhutla lengkap dengan nilai daya radiasi termal (*Fire Radiative Power* / FRP).
* **Integrasi WMS GeoServer**: Tersedia hook konfigurasi layer *Web Map Service* (WMS) OGC yang terhubung ke instance GeoServer lokal (`http://localhost:8080/geoserver/wms`).

### 3. Panel Statistik Geospasial (Sidebar Kiri)
* **Metrik Cepat (KPIs)**: Total wilayah kajian (53,45 juta ha), luasan gambut terpetakan (1,91 juta ha), panjang jalan (2.568 km), dan total titik pantau (11 titik).
* **Distribusi Kerawanan**: Visualisasi bar progres persentase luas wilayah berdasarkan status siaga karhutla per provinsi.
* **Rincian Kawasan Gambut**: Informasi luasan KHG prioritas restorasi BRGM.
* **Fokus Wilayah (Quick Zoom)**: Tombol navigasi interaktif untuk memperbesar tampilan peta ke provinsi tertentu (*flyTo* animasi).
* **Kontrol Panel**: Tombol *minimize* untuk menyembunyikan/menampilkan kembali sidebar secara dinamis.

### 4. Interaktivitas Kartografis
* **Pelacak Koordinat Dinamis**: Menampilkan koordinat kursor *Latitude* dan *Longitude* secara *real-time* di sudut kiri bawah.
* **Efek Interaktif & Popup**: Fitur *highlight* batas wilayah saat disentuh kursor (*hover*) dan jendela informasi (*popup*) detail atribut saat objek diklik.
* **Skala Peta & Tombol Home**: Skala kartografis metrik dan tombol pintas untuk mengembalikan peta ke titik fokus seluruh Kalimantan.
* **Manajemen Z-Index Panes**: Pengurutan layer bertingkat (*pane hierarchy*) untuk memastikan titik toponim dan garis jalan tetap berada di atas poligon wilayah.

---

## Struktur Berkas Proyek

```text
WebGIS_Leaflet/
├── index.html               # Halaman utama aplikasi WebGIS
├── README.md                # Dokumentasi proyek dan panduan teknis
├── .gitignore               # Konfigurasi pengabaian berkas lokal/log
├── server.js                # Server lokal berbasis Node.js
├── css/
│   └── style.css            # Berkas penataan tampilan responsif, popup, dan legenda
├── js/
│   ├── map.js               # Inisialisasi peta Leaflet, basemap, event listener, dan kontrol
│   └── layers.js            # Pengelolaan style tematik GeoJSON dan koneksi layanan WMS
├── data/                    # Berkas dataset spasial GeoJSON dan dual-loader JS
│   ├── administrasi.geojson & administrasi.js
│   ├── jalan.geojson & jalan.js
│   ├── sungai.geojson & sungai.js
│   ├── tutupan_lahan.geojson & tutupan_lahan.js
│   └── toponim.geojson & toponim.js
└── presentasi/              # Folder berkas pendukung laporan dan presentasi
```

---

## Panduan Menjalankan Aplikasi

### Opsi 1: Akses Langsung Melalui Browser (Online)
Buka tautan: [https://zeolit404.github.io/WebGIS_Leaflet-Karhutla/](https://zeolit404.github.io/WebGIS_Leaflet-Karhutla/)

### Opsi 2: Pengujian Mandiri Secara Lokal (Offline)
Buka berkas `index.html` secara langsung menggunakan peramban web (Google Chrome, Microsoft Edge, atau Mozilla Firefox). Pemuatan data spasial didukung penuh tanpa kendala CORS melalui mekanisme *dual-loading*.

### Opsi 3: Menjalankan Melalui Local Server (Node.js)
1. Buka terminal pada direktori proyek.
2. Jalankan perintah:
   ```bash
   node server.js
   ```
3. Akses aplikasi pada alamat `http://localhost:3000`.

---
*Proyek WebGIS ini disusun untuk memenuhi Tugas Modul 5 Praktikum Pengelolaan Big Data dan WebGIS, Program Studi D4 Penginderaan Jauh dan SIG, Fakultas Vokasi, Universitas Hasanuddin.*
