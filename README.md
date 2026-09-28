# JNN Boxing Club

Frontend React/Vite untuk homepage, dashboard member, dan dashboard admin.

## Menjalankan

```bash
npm install
npm run dev
```

Akun demo: `admin@mail.com` / `admin123` dan `user@mail.com` / `user123`.

## Data

Seluruh data awal berada di [`src/data/seed.json`](src/data/seed.json): pelatih, program, paket, member, sesi latihan, dan pendaftaran. Admin dapat menambah, mengubah, serta menghapus data melalui dashboard. Homepage dan dashboard member langsung membaca data yang sama.

Perubahan dari UI disimpan sebagai JSON di `localStorage` browser dengan key `jnn_boxing_data_v1`. Data bertahan setelah refresh dan tersinkron di tab lain pada browser serta origin yang sama. Ini belum menggunakan server: data tidak tersinkron antarperangkat atau antarbrowser. Browser tidak dapat menulis balik ke `src/data/seed.json`; file itu menjadi data awal ketika belum ada data tersimpan di browser.

Mengubah `seed.json` tidak menimpa data yang sudah ada di `localStorage`. Untuk melihat seed baru pada browser pengembangan, hapus key `jnn_boxing_data_v1` lewat Developer Tools lalu refresh. Langkah itu akan menghapus perubahan admin dan pendaftaran lokal pada browser tersebut.

Login masih memakai dua akun demo tetap. Member yang baru ditambahkan admin belum otomatis mendapat akun login. Autentikasi dan penyimpanan lokal ini cocok untuk prototipe, belum untuk data produksi.

## Pemeriksaan

```bash
npm run lint
npm run build
```
