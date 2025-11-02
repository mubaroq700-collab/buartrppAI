import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

interface RPPData {
  namaGuru: string
  namaSekolah: string
  mataPelajaran: string
  kelas: string
  materiAjar: string
  alokasiWaktu: string
  templateRPP: string
}

export async function POST(request: NextRequest) {
  try {
    const data: RPPData = await request.json()

    // Validasi input
    if (!data.namaGuru || !data.namaSekolah || !data.mataPelajaran || !data.kelas || !data.materiAjar) {
      return NextResponse.json(
        { error: 'Data nama guru, nama sekolah, mata pelajaran, kelas, dan materi ajar wajib diisi' },
        { status: 400 }
      )
    }

    // Buat prompt untuk AI
    const prompt = createRPPPrompt(data)
    
    // Generate RPP menggunakan ZAI
    const zai = await ZAI.create()
    
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Anda adalah ahli pendidikan dan kurikulum di Indonesia yang sangat berpengalaman dalam membuat Rencana Pelaksanaan Pembelajaran (RPP) yang sesuai dengan Kurikulum Merdeka. Buatlah RPP yang lengkap, terstruktur, dan profesional dengan format yang jelas.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    })

    const rppContent = completion.choices[0]?.message?.content

    if (!rppContent) {
      throw new Error('Failed to generate RPP content')
    }

    return NextResponse.json({ rpp: rppContent })
  } catch (error) {
    console.error('Error generating RPP:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat membuat RPP' },
      { status: 500 }
    )
  }
}

function createRPPPrompt(data: RPPData): string {
  const jenjang = getJenjang(data.kelas)
  const templateInfo = getTemplateInfo(data.templateRPP)
  
  let prompt = `Buatlah Rencana Pelaksanaan Pembelajaran (RPP) yang lengkap dan profesional secara otomatis dengan informasi dasar sebagai berikut:

**INFORMASI DASAR:**
- Nama Guru: ${data.namaGuru}
- Nama Sekolah: ${data.namaSekolah}
- Mata Pelajaran: ${data.mataPelajaran}
- Kelas: ${data.kelas} (${jenjang})
- Materi Ajar: ${data.materiAjar}
${data.alokasiWaktu ? `- Alokasi Waktu: ${data.alokasiWaktu}` : ''}
- Template: ${templateInfo.name}

**INSTRUKSI KHUSUS:**
Buatlah RPP LENGKAP secara otomatis dengan struktur ${templateInfo.name} tanpa perlu input tambahan dari guru. Generate semua komponen RPP secara otomatis:

1. **Identitas Sekolah dan RPP** - Gunakan nama sekolah "${data.namaSekolah}" dan nama guru "${data.namaGuru}"
2. **Kompetensi Awal** - Buat kompetensi awal yang sesuai dengan materi dan kelas
3. **Profil Pelajar Pancasila** - Pilih profil yang relevan dengan materi
4. **Fase dan Elemen** - Tentukan fase dan elemen yang sesuai
5. **Capaian Pembelajaran** - Buat capaian pembelajaran yang spesifik dan terukur
6. **Alur Tujuan Pembelajaran (ATP)** - Rinci langkah-langkah pembelajaran
7. **Model Pembelajaran** - Pilih model yang sesuai dengan materi
8. **Materi Pembelajaran** - Jelaskan materi "${data.materiAjar}" secara lengkap
9. **Media dan Alat Pembelajaran** - Pilih media yang relevan dan modern
10. **Langkah-langkah Kegiatan Pembelajaran** - Buat kegiatan dari awal hingga akhir dengan alokasi waktu yang jelas
11. **Penilaian Pembelajaran** - Rinci penilaian sikap, pengetahuan, dan keterampilan
12. **Refleksi Pembelajaran** - Buat refleksi untuk guru

**FORMAT RPP YANG DIHARAPKAN:**
${templateInfo.format}

**PETUNJUK TAMBAHAN:**
- Gunakan bahasa yang jelas, profesional, dan mudah dipahami
- Pastikan konten sesuai dengan jenjang ${jenjang} kelas ${data.kelas}
- Fokus pada materi ajar "${data.materiAjar}" sebagai topik utama
- Generate semua konten secara otomatis tanpa memerlukan input tambahan
- Format dengan heading yang jelas menggunakan tanda ** untuk judul bagian
- Gunakan numbering dan bullet points untuk daftar
- Pastikan RPP praktis, lengkap, dan siap diimplementasikan oleh guru
- Sesuaikan dengan format ${templateInfo.name}
- Untuk Kurikulum Merdeka, fokus pada mata pelajaran bukan tema
- Gunakan identitas guru "${data.namaGuru}" dan sekolah "${data.namaSekolah}" secara konsisten

**CONTOH STRUKTUR YANG DIHARAPKAN (sesuai file referensi):**
- Gunakan format seperti MODUL AJAR DEEP LEARNING STRATEGI CONTEXTUAL TEACHING AND LEARNING (CTL)
- Sertakan IDENTIFIKASI PESERTA DIDIK, MATERI PELAJARAN, DIMENSI PROFIL LULUSAN
- Buat DESAIN PEMBELAJARAN dengan CAPAIAN PEMBELAJARAN, LINTAS DISIPLIN, TUJUAN PEMBELAJARAN
- Rinci PENGALAMAN BELAJAR dengan Awal, Inti, dan Penutup
- Sertakan ASESMEN PEMBELAJARAN yang lengkap

Mohon buat RPP yang LENGKAP, TERSTRUKTUR, dan SIAP DIGUNAKAN untuk pembelajaran di kelas tanpa perlu edit tambahan.`

  return prompt
}

function getTemplateInfo(template: string): { name: string; format: string } {
  const templates = {
    kurikulum_merdeka: {
      name: 'Kurikulum Merdeka',
      format: `Buatlah RPP dengan struktur lengkap sesuai Kurikulum Merdeka yang mencakup:
1. Identitas Sekolah dan RPP
2. Kompetensi Awal
3. Profil Pelajar Pancasila yang Dikembangkan
4. Fase dan Elemen
5. Capaian Pembelajaran
6. Alur Tujuan Pembelajaran (ATP)
7. Model Pembelajaran
8. Materi Pembelajaran
9. Media dan Alat Pembelajaran
10. Langkah-langkah Kegiatan Pembelajaran (Pendahuluan, Inti, Penutup)
11. Penilaian Pembelajaran (Aspek, Instrumen, Kriteria)
12. Refleksi Pembelajaran`
    },
    kurikulum_2013: {
      name: 'Kurikulum 2013',
      format: `Buatlah RPP dengan struktur lengkap sesuai Kurikulum 2013 yang mencakup:
1. Identitas Sekolah
2. Kompetensi Inti (KI) dan Kompetensi Dasar (KD)
3. Indikator Pencapaian Kompetensi
4. Tujuan Pembelajaran
5. Materi Pembelajaran
6. Metode Pembelajaran
7. Media dan Sumber Belajar
8. Langkah-langkah Kegiatan Pembelajaran (Kegiatan Pendahuluan, Inti, Penutup)
9. Penilaian Hasil Belajar (Teknik, Instrumen, Kriteria)
10. Refleksi`
    },
    k13_revisi: {
      name: 'K13 Revisi',
      format: `Buatlah RPP dengan struktur lengkap sesuai K13 Revisi yang mencakup:
1. Identitas Sekolah dan RPP
2. Kompetensi Inti (KI) dan Kompetensi Dasar (KD)
3. Indikator
4. Tujuan Pembelajaran
5. Materi Ajar
6. Metode Pembelajaran
7. Media, Alat, dan Sumber Belajar
8. Langkah-langkah Kegiatan Pembelajaran
9. Penilaian Pembelajaran (Sikap, Pengetahuan, Keterampilan)
10. Program Tindak Lanjut`
    },
    simple: {
      name: 'Template Sederhana',
      format: `Buatlah RPP dengan format sederhana yang mencakup:
1. Informasi Umum (Mata Pelajaran, Kelas, Tema, Waktu)
2. Tujuan Pembelajaran
3. Materi Pembelajaran
4. Kegiatan Pembelajaran (Awal, Inti, Akhir)
5. Media dan Alat
6. Penilaian
7. Refleksi`
    },
    stem: {
      name: 'STEM/STEAM',
      format: `Buatlah RPP dengan pendekatan STEM/STEAM yang mencakup:
1. Identitas RPP
2. Tema STEM/STEAM
3. Tujuan Pembelajaran (Sains, Teknologi, Engineering, Art, Matematika)
4. Pertanyaan Esensial
5. Materi Pembelajaran Terintegrasi
6. Kegiatan Pembelajaran (Engineering Design Process)
7. Media dan Sumber Belajar
8. Penilaian (Proyek, Presentasi, Portofolio)
9. Refleksi dan Evaluasi`
    },
    project_based: {
      name: 'Project Based Learning',
      format: `Buatlah RPP dengan pendekatan Project Based Learning yang mencakup:
1. Identitas RPP
2. Judul Proyek
3. Tujuan Pembelajaran
4. Pertanyaan Pendorong (Driving Question)
5. Tahapan Proyek (Planning, Development, Presentation)
6. Kegiatan Pembelajaran
7. Media dan Sumber Belajar
8. Penilaian (Proses, Hasil, Presentasi)
9. Refleksi dan Evaluasi`
    }
  }
  
  return templates[template as keyof typeof templates] || templates.kurikulum_merdeka
}

function getJenjang(kelas: string): string {
  const kelasNum = parseInt(kelas)
  if (kelasNum >= 1 && kelasNum <= 6) {
    return 'SD/MI'
  } else if (kelasNum >= 7 && kelasNum <= 9) {
    return 'SMP/MTs'
  } else if (kelasNum >= 10 && kelasNum <= 12) {
    return 'SMA/MA/SMK'
  }
  return 'Umum'
}