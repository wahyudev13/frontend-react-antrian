# 🔐 Troubleshooting Error 401 (Unauthorized)

## ❌ **Masalah:**
Error 401 (Unauthorized) terjadi saat mencoba mengakses API farmasi.

## 🔍 **Penyebab:**
1. **API Key tidak terset** di environment variables
2. **API Key tidak valid** atau salah
3. **Header X-API-KEY tidak dikirim** dengan benar

## ✅ **Solusi:**

### 1. **Buat File .env**
Buat file `.env` di root project dengan isi:
```bash
REACT_APP_API=http://localhost:8000
REACT_APP_API_KEY=your_actual_api_key_here
```

### 2. **Dapatkan API Key yang Benar**
- Hubungi admin sistem untuk mendapatkan API Key yang valid
- Pastikan API Key memiliki permission untuk mengakses endpoint farmasi

### 3. **Restart Development Server**
Setelah membuat file `.env`, restart server:
```bash
npm start
# atau
yarn start
```

### 4. **Verifikasi di Console Browser**
Buka Developer Tools (F12) dan lihat console untuk:
- ✅ "API Key is set" - berarti API Key terset
- ❌ "REACT_APP_API_KEY is not set" - berarti perlu buat file .env

### 5. **Test API Key**
Coba test dengan Postman atau curl:
```bash
curl -H "X-API-KEY: your_api_key" \
     -H "Accept: application/json" \
     http://localhost:8000/api/farmasi/nomor/nomor-a/get
```

## 🚨 **Pesan Error yang Muncul:**
- `Error 401: API Key tidak valid. Silakan periksa konfigurasi.`
- `API Key tidak terset. Silakan set REACT_APP_API_KEY di file .env`

## 📁 **Struktur File:**
```
project-root/
├── .env                    ← Buat file ini
├── src/
│   └── component/
│       └── panggilan/
│           └── farmasi/
│               └── panggilan-farmasi.js
└── package.json
```

## 🔧 **Debug Mode:**
File sudah ditambahkan console.log untuk debugging:
- Environment variables check
- API Key validation
- Request headers logging

## 📞 **Bantuan Lebih Lanjut:**
Jika masih error, hubungi:
- IT Support
- Admin Sistem
- Developer Team
