# Backend API dengan Docker

Proyek ini adalah backend API dalam kontainer Docker yang mencakup Node.js, PostgreSQL, dan pgAdmin. Dokumentasi ini akan memandu Anda untuk menjalankan aplikasi ini di lingkungan lokal, baik di Windows maupun Linux.

## Prasyarat

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (untuk Windows/Mac)
- [Docker Engine](https://docs.docker.com/engine/install/) dan [Docker Compose](https://docs.docker.com/compose/install/) (untuk Linux)
- [Git](https://git-scm.com/downloads)

## Langkah-langkah Instalasi dan Penggunaan

### 1. Clone Repository


```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

### 2. Menjalankan Aplikasi

```bash
# Di Windows/Mac/Linux
docker compose up 
```

Perintah ini akan:
- Membangun image Docker untuk API
- Menjalankan kontainer PostgreSQL
- Menjalankan kontainer pgAdmin
- Menjalankan kontainer API

### 4. Mengakses Layanan

- **API**: http://localhost:3000
  - Endpoint Health Check: http://localhost:3000/health
  
- **pgAdmin**: http://localhost:5050
  - Login dengan kredensial yang diatur di file `.env`
  - Default: Email: `admin@example.com`, Password: `pgadmin_password`

### 5. Mengonfigurasi pgAdmin

Setelah masuk ke pgAdmin, tambahkan koneksi ke server PostgreSQL:

1. Klik kanan pada "Servers" di sidebar kiri
2. Pilih "Create" > "Server"
3. Di tab "General", masukkan nama server (misalnya "Local PostgreSQL")
4. Di tab "Connection":
   - Host name/address: `geos_postgres` 
   - Port: `5432`
   - Username: `admin` (atau sesuai nilai POSTGRES_USER di `.env`)
   - Password: `password` (atau sesuai nilai POSTGRES_PASSWORD di `.env`)
5. Klik "Save"

### 6. Menghentikan Aplikasi

```bash
# Hentikan kontainer tanpa menghapus volume
docker compose down

# Hentikan kontainer dan hapus volume (akan menghapus data database)
docker compose down -v
```

## Pengembangan

### Struktur Direktori

```
project-name/
│
├── .gitattributes         # Untuk menangani masalah LF/CRLF
├── .dockerignore          # File yang tidak perlu disertakan di image Docker
├── docker-compose.yml     # Konfigurasi untuk semua service
├── .env                   # Variabel lingkungan (tidak di-commit)
├── .env.example           # Contoh variabel lingkungan
│
├── api/                   # Direktori untuk kode Node.js
│   ├── Dockerfile         # Dockerfile untuk aplikasi Node.js      
│   ├── package.json       # Dependensi Node.js
│   ├── src/               # Kode sumber aplikasi
│   │   └── index.js       # Entry point aplikasi
│   └── ...
│
└── init-scripts/          # Script inisialisasi untuk PostgreSQL
    └── init.sql           # Script SQL awal
```

### Hot Reload

Kode sumber Node.js dimount sebagai volume, sehingga perubahan pada kode akan otomatis terdeteksi dan server akan di-restart oleh Nodemon.

### Menambahkan Dependensi Node.js

Jika Anda perlu menambahkan dependensi baru:

```bash
# Masuk ke kontainer
docker compose exec api sh

# Install dependensi
npm install --save nama-paket

# Keluar dari kontainer
exit
```

Atau di host:

```bash
# Di Windows/Mac/Linux
cd api
npm install --save nama-paket
```

Container akan otomatis me-restart dan melihat dependensi baru.

## Pemecahan Masalah

### Koneksi Database Gagal

Jika API tidak dapat terhubung ke database:

1. Pastikan semua kontainer berjalan:
   ```bash
   docker compose ps
   ```

2. Periksa log PostgreSQL:
   ```bash
   docker compose logs postgres
   ```

3. Periksa log API:
   ```bash
   docker compose logs api
   ```

4. Restart semua kontainer:
   ```bash
   docker compose restart
   ```

### Masalah Port

Jika ada konflik port (misalnya port 5432 sudah digunakan):

1. Edit file `.env` dan ubah port yang digunakan:
   ```
   POSTGRES_PORT=5433  # Ubah dari 5432
   ```

2. Restart kontainer:
   ```bash
   docker compose down
   docker compose up -d
   ```

### Masalah Izin File (Linux)

Jika mengalami masalah izin file di Linux:

1. Pastikan user memiliki izin untuk direktori proyek:
   ```bash
   sudo chown -R $USER:$USER .
   ```

2. Pastikan script entrypoint dapat dieksekusi:
   ```bash
   chmod +x api/entrypoint.sh
   ```

## Catatan Khusus untuk Pengguna Windows

1. **Docker Desktop WSL 2 Backend**
   - Pastikan WSL 2 Backend diaktifkan di Docker Desktop
   - Untuk performa terbaik, simpan proyek di filesystem WSL 2, bukan di drive Windows (C:)

2. **Line Endings**
   - Repositori ini menggunakan file `.gitattributes` untuk menstandarisasi line endings
   - Pastikan Git dikonfigurasi dengan `core.autocrlf=input` untuk menghindari masalah CRLF/LF:
     ```bash
     git config --global core.autocrlf input
     ```

3. **Terminal untuk Docker**
   - Gunakan PowerShell atau Git Bash untuk menjalankan perintah Docker
   - Command Prompt (CMD) mungkin mengalami masalah dengan beberapa perintah

4. **Pastikan Virtualisasi Diaktifkan**
   - Virtualisasi harus diaktifkan di BIOS/UEFI untuk menjalankan Docker Desktop dengan baik

## Alur Kerja Pengembangan Tim

1. Clone repositori
2. Salin dan sesuaikan file `.env`
3. Jalankan `docker compose up -d`
4. Buat branch baru untuk fitur/perbaikan
5. Commit dan push perubahan
6. Buat pull request untuk ditinjau

## Teknologi yang Digunakan

- **Node.js**: Runtime JavaScript untuk backend
- **Express**: Framework web untuk Node.js
- **PostgreSQL**: Database relasional
- **pgAdmin**: GUI untuk manajemen PostgreSQL
- **Docker**: Kontainerisasi untuk konsistensi lingkungan pengembangan
- **Docker Compose**: Orkestrasi multi-kontainer

## Lisensi

[Masukkan informasi lisensi di sini]

## Kontributor

[Daftar kontributor proyek]

