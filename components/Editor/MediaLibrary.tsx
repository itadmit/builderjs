'use client'

import { useState, useRef } from 'react'
import { X, Upload, Image as ImageIcon, Copy, Check, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface MediaLibraryProps {
  onClose: () => void
}

interface MediaFile {
  id: string
  url: string
  name: string
  size: number
  type: string
  createdAt: Date
}

export default function MediaLibrary({ onClose }: MediaLibraryProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    try {
      for (const file of Array.from(files)) {
        await uploadFile(file)
      }
      toast.success(`הועלו ${files.length} קבצים בהצלחה!`)
    } catch (error) {
      toast.error('שגיאה בהעלאת הקבצים')
      console.error(error)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const uploadFile = async (file: File): Promise<void> => {
    // Convert to WebP
    const webpBlob = await convertToWebP(file)
    
    // Create FormData
    const formData = new FormData()
    formData.append('file', webpBlob, file.name.replace(/\.[^/.]+$/, '.webp'))

    // Upload to server
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const data = await response.json()
    
    // Add to media files
    const newFile: MediaFile = {
      id: Date.now().toString() + Math.random(),
      url: data.url,
      name: data.name || file.name,
      size: webpBlob.size,
      type: 'image/webp',
      createdAt: new Date(),
    }

    setMediaFiles((prev) => [newFile, ...prev])
  }

  const convertToWebP = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height
          
          const ctx = canvas.getContext('2d')
          if (!ctx) {
            reject(new Error('Canvas context not available'))
            return
          }
          
          ctx.drawImage(img, 0, 0)
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob)
              } else {
                reject(new Error('Blob conversion failed'))
              }
            },
            'image/webp',
            0.9
          )
        }
        img.onerror = reject
        img.src = e.target?.result as string
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const copyToClipboard = (url: string, id: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    toast.success('הקישור הועתק ללוח!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const deleteFile = (id: string) => {
    if (confirm('למחוק תמונה זו?')) {
      setMediaFiles((prev) => prev.filter((f) => f.id !== id))
      toast.success('התמונה נמחקה')
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">ספריית מדיה</h2>
            <p className="text-sm text-gray-500 mt-1">
              העלה תמונות - הן יומרו אוטומטית ל-WebP
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Upload Area */}
        <div className="p-6 border-b">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="media-upload"
          />
          <label
            htmlFor="media-upload"
            className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
              isUploading
                ? 'border-primary bg-primary/5'
                : 'border-gray-300 hover:border-primary hover:bg-gray-50'
            }`}
          >
            <Upload className={`w-12 h-12 ${isUploading ? 'text-primary animate-pulse' : 'text-gray-400'}`} />
            <div className="text-center">
              <p className="text-lg font-medium text-gray-700">
                {isUploading ? 'מעלה...' : 'לחץ או גרור קבצים לכאן'}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                תמיכה ב-JPG, PNG, GIF - המרה אוטומטית ל-WebP
              </p>
            </div>
          </label>
        </div>

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {mediaFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ImageIcon className="w-20 h-20 mb-4 opacity-20" />
              <p className="text-lg">אין עדיין תמונות</p>
              <p className="text-sm mt-2">העלה תמונות כדי להתחיל</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaFiles.map((file) => (
                <div
                  key={file.id}
                  className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-all"
                >
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <button
                      onClick={() => copyToClipboard(file.url, file.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {copiedId === file.id ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium">הועתק!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span className="text-sm font-medium">העתק URL</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => deleteFile(file.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm font-medium">מחק</span>
                    </button>
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-xs font-medium truncate">{file.name}</p>
                    <p className="text-white/70 text-xs mt-0.5">{formatFileSize(file.size)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

