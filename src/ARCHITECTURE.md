# Struktur aplikasi

`App.jsx` hanya menyusun route. Setiap area menyimpan kode yang khusus untuk area itu sendiri.

| Folder | Tanggung jawab |
| --- | --- |
| `app-homepage/` | Komposisi landing page di `HomePage.jsx` dan modul per section. |
| `app-homepage/module-landing/` | Navbar, hero, dan footer. |
| `app-homepage/module-program/` | Tampilan program, navigasi, dan logika pergantian saat scroll. |
| `app-homepage/module-coaches/` | Section pelatih. |
| `app-homepage/module-facilities/` | Section fasilitas. |
| `app-homepage/module-pricing/` | Section paket membership. |
| `app-homepage/module-schedule/` | Ringkasan jadwal terdekat. |
| `app-user/module-dashboard/` | Halaman portal member. |
| `app-admin/module-admin/` | Halaman portal admin. |
| `module-auth/` | Halaman login, modal, context, dan service autentikasi. |
| `shared/` | UI, helper, dan layout yang dipakai lebih dari satu area. |
| `data/` | Seed JSON, penyimpanan lokal, dan selector untuk seluruh area. |

Di dalam modul, `components/` berisi bagian tampilan utama, `ui/` berisi bagian tampilan kecil yang khusus untuk modul itu, `hooks/` berisi logika React, dan `services/` berisi akses data atau autentikasi. Data yang dipakai lintas modul berada di `src/data/seed.json` dan dibaca melalui `DataContext`.

Modul boleh mengimpor dari `shared/`. Kode yang hanya dipakai satu modul tetap berada di modul tersebut agar batas antarfitur jelas.
