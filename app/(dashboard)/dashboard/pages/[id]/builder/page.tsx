'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { toast } from 'sonner'

const VisualEditor = dynamic(
  () => import('@/components/Editor/core/VisualEditor'),
  { ssr: false }
)

interface Page {
  id: string
  title: string
  slug: string
  content: any
}

export default function BuilderPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [page, setPage] = useState<Page | null>(null)
  const [content, setContent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchPage()
  }, [params.id])

  const fetchPage = async () => {
    try {
      const response = await fetch(`/api/pages/${params.id}`)
      const data = await response.json()

      if (!response.ok) {
        toast.error('שגיאה', { description: data.error })
        router.push('/dashboard')
        return
      }

      setPage(data.page)
      setContent(data.page.content)
    } catch (error) {
      toast.error('שגיאה בטעינת הדף')
      router.push('/dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      const response = await fetch(`/api/pages/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error('שגיאה', { description: data.error })
        return
      }

      toast.success('השינויים נשמרו!')
      setPage(data.page)
    } catch (error) {
      toast.error('שגיאה בשמירת הדף')
    } finally {
      setIsSaving(false)
    }
  }

  const handleClose = () => {
    router.push(`/dashboard/pages/${params.id}/edit`)
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">טוען עורך...</p>
        </div>
      </div>
    )
  }

  if (!page) {
    return null
  }

  return (
    <VisualEditor
      initialValue={content}
      onChange={setContent}
      onClose={handleClose}
      onSave={handleSave}
      title={page.title}
      isSaving={isSaving}
    />
  )
}

