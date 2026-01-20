# Presentasi Proyek SmartAgri

## 1. Pendahuluan
**SmartAgri** adalah sebuah platform berbasis web yang dirancang untuk mendukung pertanian presisi (precision agriculture). Di era digital ini, pemanfaatan teknologi informasi dan data spasial menjadi kunci untuk meningkatkan produktivitas dan keberlanjutan sektor pertanian. SmartAgri hadir sebagai solusi integratif yang menggabungkan data satelit dan sensor IoT untuk memberikan wawasan real-time mengenai kondisi lahan pertanian.

## 2. Latar Belakang
Sektor pertanian menghadapi berbagai tantangan, mulai dari perubahan iklim yang tidak menentu, serangan hama yang tiba-tiba, hingga pengelolaan sumber daya air yang kurang efisien. Petani seringkali mengambil keputusan hanya berdasarkan intuisi atau kebiasaan lama tanpa didukung data yang akurat. Hal ini dapat menyebabkan:
- Penggunaan pupuk dan air yang berlebihan atau kurang.
- Keterlambatan dalam penanganan hama dan penyakit.
- Penurunan kualitas dan kuantitas hasil panen.

Oleh karena itu, dibutuhkan sebuah sistem yang dapat memantau kondisi lahan secara terus-menerus dan memberikan peringatan dini serta rekomendasi yang tepat sasaran.

## 3. Tujuan
Tujuan utama dari pengembangan SmartAgri adalah:
1.  **Menyediakan Data Real-time:** Memberikan informasi terkini mengenai kesehatan tanaman (NDVI), kelembaban tanah, dan suhu lahan.
2.  **Deteksi Dini Masalah:** Mengidentifikasi potensi serangan hama dan penyakit sebelum menyebar luas.
3.  **Efisiensi Sumber Daya:** Membantu petani menggunakan air dan pupuk secara lebih efisien berdasarkan kebutuhan riil tanaman.
4.  **Mendukung Pengambilan Keputusan:** Menyajikan data analitik yang mudah dipahami untuk perencanaan musim tanam yang lebih baik.

## 4. Manfaat
Penggunaan SmartAgri diharapkan memberikan manfaat sebagai berikut:
-   **Bagi Petani:** Meningkatkan hasil panen, mengurangi biaya operasional (pupuk/pestisida), dan meminimalkan risiko gagal panen.
-   **Bagi Lingkungan:** Mengurangi dampak negatif pertanian terhadap lingkungan melalui penggunaan input pertanian yang lebih terukur (ramah lingkungan).
-   **Bagi Ketahanan Pangan:** Mendukung stabilitas pasokan pangan melalui manajemen lahan yang lebih produktif dan berkelanjutan.

---

## 5. Penjelasan Halaman Web

Berikut adalah penjelasan mengenai fitur dan fungsi dari setiap halaman yang terdapat dalam aplikasi SmartAgri:

### A. Halaman Landing (Landing Page)
Halaman ini adalah wajah utama aplikasi bagi pengunjung yang belum masuk (login).
-   **Fungsi:** Menjelaskan nilai jual utama (value proposition) SmartAgri.
-   **Fitur:**
    -   **Hero Section:** Judul menarik dan tombol ajakan (CTA) untuk mendaftar.
    -   **Fitur Utama:** Penjelasan singkat mengenai monitoring real-time, deteksi hama, dan laporan analitik.
    -   **Navigasi:** Akses cepat ke halaman Masuk (Login) dan Daftar (Register).

### B. Halaman Autentikasi (Masuk & Daftar)
Halaman untuk keamanan akses pengguna.
-   **Halaman Masuk (Login):** Meminta email dan kata sandi untuk mengakses dashboard.
-   **Halaman Daftar (Register):** Formulir pendaftaran pengguna baru yang meminta nama, email, dan pembuatan kata sandi.

### C. Dashboard Utama (Overview)
Pusat kendali informasi bagi pengguna yang telah masuk.
-   **Fungsi:** Memberikan ringkasan cepat kondisi lahan saat ini.
-   **Fitur:**
    -   **Statistik Ringkas:** Menampilkan rata-rata NDVI, status kelembaban, dan suhu dalam bentuk kartu yang mudah dibaca.
    -   **Grafik Preview:** Visualisasi data kesehatan tanaman terkini.
    -   **Progress Bar:** Indikator visual untuk status kesehatan tanaman (Buruk/Baik).
    -   **Navigasi Sidebar:** Menu akses cepat ke halaman Peta, Laporan, dan Pengaturan.

### D. Peta Interaktif (Peta Lahan)
Fitur inti dari SmartAgri untuk pemantauan spasial.
-   **Fungsi:** Visualisasi kondisi lahan secara geografis dan detail.
-   **Fitur:**
    -   **Layer Kontrol:** Pengguna dapat mengaktifkan/menonaktifkan layer NDVI (Kesehatan), Kelembaban, Suhu, dan Hama.
    -   **Pencarian Lokasi:** Memungkinkan pengguna mencari area spesifik (misal: Bantul, Sleman).
    -   **Mode Tampilan:** Pilihan antara peta jalan (OSM) atau citra satelit.
    -   **Simulasi Playback:** Tombol Play/Pause untuk melihat perubahan kondisi lahan dari waktu ke waktu.
    -   **Legenda:** Panduan warna untuk memahami arti data pada peta.

### E. Halaman Laporan
Halaman untuk analisis historis dan dokumentasi.
-   **Fungsi:** Menyajikan rekapitulasi data dalam periode tertentu.
-   **Fitur:**
    -   **Tabel Riwayat:** Daftar catatan analisis mingguan yang mencakup tanggal, nilai NDVI, dan status hama.
    -   **Status Indikator:** Label visual (misal: "Aman", "Sedang") untuk memudahkan pembacaan status risiko.
    -   **Opsi Unduh:** Tombol untuk mengunduh laporan (misal: format PDF) untuk keperluan arsip offline.

### F. Halaman Pengaturan
Halaman untuk personalisasi pengalaman pengguna.
-   **Fungsi:** Mengelola profil dan preferensi aplikasi.
-   **Fitur:**
    -   **Profil Pengguna:** Mengubah nama lengkap dan melihat email terdaftar.
    -   **Lokasi Default:** Mengatur lokasi awal yang akan ditampilkan saat peta dimuat.
    -   **Notifikasi:** Mengaktifkan atau menonaktifkan peringatan via email (misal: peringatan serangan hama).
