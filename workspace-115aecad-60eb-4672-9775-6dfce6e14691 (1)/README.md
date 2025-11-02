# RPP AI Pagurukiki 🎓

Aplikasi web berbasis AI untuk membuat Rencana Pelaksanaan Pembelajaran (RPP) secara otomatis dan lengkap sesuai Kurikulum Merdeka.

## ✨ Fitur Utama

- 🤖 **AI-Powered Generation** - Buat RPP lengkap hanya dengan mengisi identitas dasar
- 📚 **Multi Template** - Support Kurikulum Merdeka, K-13, STEM, Project-Based Learning
- 🎯 **Super Simple** - Hanya 6 field yang perlu diisi, AI generate semua komponen RPP
- 📱 **Responsive Design** - Optimal di desktop dan mobile
- 💾 **Multiple Export** - Download sebagai TXT dan PDF
- ✏️ **Edit & Preview** - Edit hasil RPP sebelum download
- 📋 **Copy to Clipboard** - Salin RPP dengan mudah

## 🚀 Cara Penggunaan

1. **Isi 6 Field Dasar:**
   - Nama Guru
   - Nama Sekolah
   - Mata Pelajaran
   - Kelas
   - Materi Ajar
   - Alokasi Waktu

2. **Pilih Template RPP**

3. **Klik "Buat RPP Otomatis"**

4. **RPP Lengkap** langsung jadi! Siap digunakan di kelas.

## 📋 Komponen RPP yang Di-generate

- ✅ Identitas Sekolah dan RPP
- ✅ Kompetensi Awal
- ✅ Profil Pelajar Pancasila
- ✅ Fase dan Elemen
- ✅ Capaian Pembelajaran
- ✅ Alur Tujuan Pembelajaran (ATP)
- ✅ Model Pembelajaran
- ✅ Materi Pembelajaran
- ✅ Media dan Alat Pembelajaran
- ✅ Langkah-langkah Kegiatan Pembelajaran
- ✅ Penilaian Pembelajaran
- ✅ Refleksi Pembelajaran

## 🛠 Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS
- **UI Components:** shadcn/ui
- **AI Integration:** ZAI Web Dev SDK
- **PDF Generation:** jsPDF
- **Notifications:** Sonner
- **Icons:** Lucide React

## 📦 Instalasi

### Prerequisites

- Node.js 18+ 
- npm atau yarn

### Langkah-langkah

1. **Clone repository**
```bash
git clone https://github.com/username/rpp-ai-pagurukiki.git
cd rpp-ai-pagurukiki
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` dan tambahkan:
```env
ZAI_API_KEY=your_zai_api_key_here
```

4. **Jalankan development server**
```bash
npm run dev
```

5. **Buka browser**
```
http://localhost:3000
```

## 🌐 Deployment

### Vercel (Recommended)

1. **Push ke GitHub**
2. **Import ke Vercel**
3. **Setup environment variables**
4. **Deploy**

### Netlify

1. **Build command:** `npm run build`
2. **Publish directory:** `.next`
3. **Setup environment variables**

### Docker

```bash
# Build image
docker build -t rpp-ai-pagurukiki .

# Run container
docker run -p 3000:3000 rpp-ai-pagurukiki
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ZAI_API_KEY` | API key untuk ZAI SDK | ✅ |
| `NEXT_PUBLIC_APP_URL` | URL aplikasi (opsional) | ❌ |

## 📁 Struktur Proyek

```
rpp-ai-pagurukiki/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate-rpp/
│   │   │       └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/
│   └── lib/
├── public/
├── docs/
├── .gitignore
├── README.md
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## 🎯 Template RPP Tersedia

1. **Kurikulum Merdeka** - Format resmi Kemdikbud
2. **Kurikulum 2013** - Format K-13 standar
3. **K13 Revisi** - Format K-13 revisi terbaru
4. **Template Sederhana** - Format minimalis
5. **STEM/STEAM** - Pendekatan Science, Technology, Engineering, Art, Math
6. **Project Based Learning** - Pembelajaran berbasis proyek

## 🤝 Kontribusi

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

### Cara Kontribusi

1. **Fork** proyek
2. **Buat branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** perubahan (`git commit -m 'Add some AmazingFeature'`)
4. **Push** ke branch (`git push origin feature/AmazingFeature`)
5. **Buka Pull Request**

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Kontak

- **Project Link:** [https://github.com/username/rpp-ai-pagurukiki](https://github.com/username/rpp-ai-pagurukiki)
- **Author:** Your Name
- **Email:** your.email@example.com

## 🙏 Acknowledgments

- [ZAI](https://z.ai/) - AI SDK untuk generation RPP
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

## 📸 Screenshots

### Desktop View
![Desktop View](docs/screenshots/desktop.png)

### Mobile View
![Mobile View](docs/screenshots/mobile.png)

### RPP Generation Process
![RPP Generation](docs/screenshots/generation.png)

---

⭐ **Jika bermanfaat, jangan lupa kasih star!** ⭐