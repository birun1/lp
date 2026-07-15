# Sistem Landing Page Biruni

Repository ini menggunakan HTML, CSS, dan JavaScript biasa sehingga dapat langsung dijalankan di VPS aaPanel tanpa proses build, framework, atau npm.

## Struktur folder

```text
/
├── shared/
│   ├── css/main.css
│   ├── js/main.js
│   └── assets/
├── tka-sma-2026/
│   ├── index.html
│   ├── thanks.html
│   ├── config.js
│   └── assets/poster-tka.png
└── README.md
```

Folder `shared` berisi tampilan dan perilaku umum yang dipakai semua campaign. Setiap folder campaign hanya menyimpan halaman, konfigurasi, dan aset khusus campaign tersebut.

## Menjalankan secara lokal

Buka `tka-sma-2026/index.html` langsung di browser. Agar perilakunya sama seperti di server, repository juga dapat dilayani dengan web server lokal sederhana dari folder root.

## Konfigurasi campaign

Ubah nilai di `tka-sma-2026/config.js`:

- `eventName`: nama event.
- `registrationDate`: teks periode pendaftaran.
- `registrationDateShort` dan `registrationCloseDate`: versi ringkas tanggal untuk bagian timeline dan penutupan.
- `registrationDeadline`: batas akhir countdown dalam format tanggal ISO dengan zona waktu.
- `executionDate`: tanggal pelaksanaan.
- `executionDateShort` dan `trustExecutionDate`: versi ringkas tanggal untuk area yang lebih sempit.
- `quota`: kuota peserta.
- `whatsappNumber`: nomor tujuan konfirmasi dalam format internasional tanpa tanda `+`.
- `webhookUrl`: disediakan untuk integrasi mendatang; biarkan kosong selama mode demo.
- `formMode`: tetap gunakan `demo` sampai integrasi backend diaktifkan.

Nomor WhatsApp dalam repository masih berupa contoh dan wajib diganti sebelum website dipublikasikan.

## Mode demo formulir

Form belum terhubung ke n8n atau layanan eksternal lain. Saat dikirim, data disimpan sementara di `localStorage` browser, kode registrasi dibuat otomatis, lalu peserta diarahkan ke `thanks.html`. Halaman tersebut menampilkan nama, kode registrasi, dan tombol konfirmasi WhatsApp.

## Membuat landing page campaign baru

1. Salin folder `tka-sma-2026` dan ubah namanya, misalnya menjadi `utbk-2027`.
2. Ubah seluruh nilai khusus event di `utbk-2027/config.js`.
3. Ganti konten campaign di `index.html` dan `thanks.html` bila diperlukan.
4. Simpan gambar khusus campaign di folder `utbk-2027/assets/`, lalu sesuaikan path gambar di HTML.
5. Pertahankan path shared sebagai `../shared/css/main.css` dan `../shared/js/main.js` selama folder campaign berada tepat satu tingkat di bawah root.
6. Uji halaman utama, submit form demo, halaman sukses, dan tombol WhatsApp sebelum dipublikasikan.

Perubahan pada `shared/css/main.css` atau `shared/js/main.js` akan memengaruhi semua campaign. Gunakan file di folder campaign untuk data dan aset yang memang khusus campaign.

## Upload ke aaPanel

Upload seluruh isi repository ke document root website. Jangan hanya mengunggah folder campaign karena halaman membutuhkan folder `shared` pada tingkat yang sama. Setelah upload, akses campaign melalui URL seperti `https://domainanda.com/tka-sma-2026/`.
