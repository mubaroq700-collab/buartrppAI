'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Loader2, FileText, Download, Sparkles, BookOpen, Target, Clock, Users, Edit, Save, X, Copy, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

interface RPPData {
  namaGuru: string
  namaSekolah: string
  mataPelajaran: string
  kelas: string
  materiAjar: string
  alokasiWaktu: string
  templateRPP: string
}

export default function RPPGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedRPP, setGeneratedRPP] = useState<string>('')
  const [isEditing, setIsEditing] = useState(false)
  const [editedRPP, setEditedRPP] = useState<string>('')
  const [activeTab, setActiveTab] = useState('input')
  
  const [formData, setFormData] = useState<RPPData>({
    namaGuru: '',
    namaSekolah: '',
    mataPelajaran: '',
    kelas: '',
    materiAjar: '',
    alokasiWaktu: '',
    templateRPP: 'kurikulum_merdeka'
  })

  const handleInputChange = (field: keyof RPPData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateRPP = async () => {
    if (!formData.namaGuru || !formData.namaSekolah || !formData.mataPelajaran || !formData.kelas || !formData.materiAjar) {
      toast.error('Mohon lengkapi data nama guru, nama sekolah, mata pelajaran, kelas, dan materi ajar')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-rpp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Gagal membuat RPP')
      }

      const data = await response.json()
      setGeneratedRPP(data.rpp)
      setEditedRPP(data.rpp)
      setActiveTab('preview')
      toast.success('RPP berhasil dibuat!')
    } catch (error) {
      toast.error('Terjadi kesalahan saat membuat RPP')
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadRPP = (format: 'txt' | 'pdf') => {
    const contentToDownload = isEditing ? editedRPP : generatedRPP
    if (!contentToDownload) return
    
    if (format === 'txt') {
      const blob = new Blob([contentToDownload], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `RPP_${formData.mataPelajaran}_${formData.kelas}_${formData.tema}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success('RPP berhasil diunduh!')
    } else if (format === 'pdf') {
      downloadPDF(contentToDownload)
    }
  }

  const downloadPDF = async (content: string) => {
    try {
      const jsPDF = (await import('jspdf')).jsPDF
      const doc = new jsPDF()
      
      // Add title
      doc.setFontSize(20)
      doc.text('Rencana Pelaksanaan Pembelajaran (RPP)', 20, 20)
      
      // Add basic info
      doc.setFontSize(12)
      doc.text(`Mata Pelajaran: ${formData.mataPelajaran}`, 20, 40)
      doc.text(`Kelas: ${formData.kelas}`, 20, 50)
      doc.text(`Tema: ${formData.tema}`, 20, 60)
      if (formData.subTema) {
        doc.text(`Sub Tema: ${formData.subTema}`, 20, 70)
      }
      
      // Add content
      doc.setFontSize(10)
      const lines = doc.splitTextToSize(content, 170)
      let yPosition = formData.subTema ? 85 : 75
      
      lines.forEach((line: string) => {
        if (yPosition > 280) {
          doc.addPage()
          yPosition = 20
        }
        doc.text(line, 20, yPosition)
        yPosition += 5
      })
      
      // Save the PDF
      doc.save(`RPP_${formData.mataPelajaran}_${formData.kelas}_${formData.tema}.pdf`)
      toast.success('RPP berhasil diunduh sebagai PDF!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      toast.error('Gagal membuat PDF, coba download sebagai text')
    }
  }

  const startEditing = () => {
    setIsEditing(true)
    setEditedRPP(generatedRPP)
  }

  const saveEdit = () => {
    setGeneratedRPP(editedRPP)
    setIsEditing(false)
    toast.success('RPP berhasil disimpan!')
  }

  const cancelEdit = () => {
    setEditedRPP(generatedRPP)
    setIsEditing(false)
  }

  const copyToClipboard = () => {
    const contentToCopy = isEditing ? editedRPP : generatedRPP
    if (!contentToCopy) return
    
    navigator.clipboard.writeText(contentToCopy).then(() => {
      toast.success('RPP berhasil disalin ke clipboard!')
    }).catch(() => {
      toast.error('Gagal menyalin ke clipboard')
    })
  }

  const resetForm = () => {
    setFormData({
      namaGuru: '',
      namaSekolah: '',
      mataPelajaran: '',
      kelas: '',
      materiAjar: '',
      alokasiWaktu: '',
      templateRPP: 'kurikulum_merdeka'
    })
    setGeneratedRPP('')
    setEditedRPP('')
    setIsEditing(false)
    setActiveTab('input')
    toast.success('Form berhasil direset!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">RPP AI Pagurukiki</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Buat Rencana Pelaksanaan Pembelajaran (RPP) lengkap secara otomatis hanya dengan mengisi identitas dasar
          </p>
          <Badge className="mt-2 bg-green-100 text-green-800">
            <Sparkles className="h-3 w-3 mr-1" />
    Otomatis & Lengkap
          </Badge>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="input" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Input Data
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Preview RPP
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Informasi Dasar RPP
                </CardTitle>
                <CardDescription>
                  Isi identitas dasar pembelajaran, RPP lengkap akan dibuat otomatis oleh AI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Cara Kerja RPP AI Pagurukiki
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Guru hanya perlu mengisi 6 informasi dasar</li>
                    <li>• AI akan otomatis membuat RPP lengkap dengan semua komponen</li>
                    <li>• Mengikuti struktur resmi seperti file referensi yang ada</li>
                    <li>• Siap digunakan untuk pembelajaran di kelas</li>
                  </ul>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="namaGuru">Nama Guru *</Label>
                    <Input
                      id="namaGuru"
                      placeholder="Contoh: Kiki Rizki Mubaroq, S.Pd."
                      value={formData.namaGuru}
                      onChange={(e) => handleInputChange('namaGuru', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="namaSekolah">Nama Sekolah *</Label>
                    <Input
                      id="namaSekolah"
                      placeholder="Contoh: SDN 2 Kutanagara"
                      value={formData.namaSekolah}
                      onChange={(e) => handleInputChange('namaSekolah', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mataPelajaran">Mata Pelajaran *</Label>
                    <Input
                      id="mataPelajaran"
                      placeholder="Contoh: Matematika, Bahasa Indonesia, IPA"
                      value={formData.mataPelajaran}
                      onChange={(e) => handleInputChange('mataPelajaran', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kelas">Kelas *</Label>
                    <Select value={formData.kelas} onValueChange={(value) => handleInputChange('kelas', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Kelas 1 SD</SelectItem>
                        <SelectItem value="2">Kelas 2 SD</SelectItem>
                        <SelectItem value="3">Kelas 3 SD</SelectItem>
                        <SelectItem value="4">Kelas 4 SD</SelectItem>
                        <SelectItem value="5">Kelas 5 SD</SelectItem>
                        <SelectItem value="6">Kelas 6 SD</SelectItem>
                        <SelectItem value="7">Kelas 7 SMP</SelectItem>
                        <SelectItem value="8">Kelas 8 SMP</SelectItem>
                        <SelectItem value="9">Kelas 9 SMP</SelectItem>
                        <SelectItem value="10">Kelas 10 SMA</SelectItem>
                        <SelectItem value="11">Kelas 11 SMA</SelectItem>
                        <SelectItem value="12">Kelas 12 SMA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="materiAjar">Materi Ajar *</Label>
                  <Input
                    id="materiAjar"
                    placeholder="Contoh: Rantai Makanan, Bilangan Bulat, Sistem Ekskresi"
                    value={formData.materiAjar}
                    onChange={(e) => handleInputChange('materiAjar', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alokasiWaktu" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Alokasi Waktu
                  </Label>
                  <Input
                    id="alokasiWaktu"
                    placeholder="Contoh: 2 x 45 menit"
                    value={formData.alokasiWaktu}
                    onChange={(e) => handleInputChange('alokasiWaktu', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="templateRPP">Template RPP</Label>
                  <Select value={formData.templateRPP} onValueChange={(value) => handleInputChange('templateRPP', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih template RPP" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kurikulum_merdeka">Kurikulum Merdeka</SelectItem>
                      <SelectItem value="kurikulum_2013">Kurikulum 2013</SelectItem>
                      <SelectItem value="k13_revisi">K13 Revisi</SelectItem>
                      <SelectItem value="simple">Template Sederhana</SelectItem>
                      <SelectItem value="stem">STEM/STEAM</SelectItem>
                      <SelectItem value="project_based">Project Based Learning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button 
                onClick={generateRPP} 
                disabled={isGenerating}
                size="lg"
                className="px-8 py-3 text-lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sedang Membuat RPP Lengkap...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Buat RPP Otomatis
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Preview RPP
                    </CardTitle>
                    <CardDescription>
                      Hasil RPP yang telah dibuat oleh AI
                    </CardDescription>
                  </div>
                  {generatedRPP && (
                    <div className="flex gap-2">
                      {!isEditing ? (
                        <Button onClick={startEditing} variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                      ) : (
                        <>
                          <Button onClick={saveEdit} variant="outline" size="sm">
                            <Save className="h-4 w-4 mr-2" />
                            Simpan
                          </Button>
                          <Button onClick={cancelEdit} variant="outline" size="sm">
                            <X className="h-4 w-4 mr-2" />
                            Batal
                          </Button>
                        </>
                      )}
                      <Button onClick={() => downloadRPP('txt')} variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download TXT
                      </Button>
                      <Button onClick={() => downloadRPP('pdf')} variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button onClick={copyToClipboard} variant="outline" size="sm">
                        <Copy className="h-4 w-4 mr-2" />
                        Salin
                      </Button>
                      <Button onClick={resetForm} variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {generatedRPP ? (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    {isEditing ? (
                      <Textarea
                        value={editedRPP}
                        onChange={(e) => setEditedRPP(e.target.value)}
                        className="min-h-[500px] text-sm leading-relaxed font-mono"
                        placeholder="Edit RPP di sini..."
                      />
                    ) : (
                      <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                        {generatedRPP}
                      </pre>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Belum ada RPP yang dibuat</p>
                    <p className="text-sm mt-2">Silakan lengkapi form dan klik "Buat RPP dengan AI"</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Otomatis & Lengkap</h3>
              <p className="text-sm text-gray-600">Cukup isi identitas dasar, AI akan membuat RPP lengkap siap pakai</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Struktur Standar</h3>
              <p className="text-sm text-gray-600">Mengikuti format resmi Kurikulum Merdeka dan standar pendidikan</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Guru Friendly</h3>
              <p className="text-sm text-gray-600">Mudah digunakan, hemat waktu, dan hasil berkualitas tinggi</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}