'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { ArrowRight } from 'lucide-react'

interface Template {
  id: string
  title: string
  slug: string
  category: string | null
}

export default function NewPagePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true)

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates')
      const data = await response.json()
      setTemplates(data.templates || [])
    } catch (error) {
      toast.error('שגיאה בטעינת תבניות')
    } finally {
      setIsLoadingTemplates(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim()) {
      toast.error('נא להזין כותרת לדף')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          templateId: selectedTemplate || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error('שגיאה', { description: data.error })
        return
      }

      toast.success('הדף נוצר בהצלחה!')
      router.push(`/dashboard/pages/${data.page.id}/edit`)
    } catch (error) {
      toast.error('שגיאה ביצירת הדף')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowRight className="ml-2 h-4 w-4" />
              חזרה לדשבורד
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">דף חדש</h1>
          <p className="text-muted-foreground">
            צור דף נחיתה חדש מתבנית או התחל מאפס
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>פרטי הדף</CardTitle>
              <CardDescription>הזן כותרת לדף החדש שלך</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="title">כותרת הדף *</Label>
                <Input
                  id="title"
                  placeholder="לדוגמה: קליניקה של ד״ר כהן"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  כתובת הדף תיווצר אוטומטית מהכותרת
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>בחר תבנית</CardTitle>
              <CardDescription>
                בחר תבנית מוכנה או התחל עם דף ריק
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingTemplates ? (
                <div className="text-center py-8 text-muted-foreground">
                  טוען תבניות...
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  <div
                    onClick={() => setSelectedTemplate('')}
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:border-primary ${
                      selectedTemplate === '' ? 'border-primary bg-primary/5' : 'border-gray-200'
                    }`}
                  >
                    <h3 className="font-semibold mb-2">דף ריק</h3>
                    <p className="text-sm text-muted-foreground">
                      התחל מאפס ובנה את הדף בצורה חופשית
                    </p>
                  </div>
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-6 border-2 rounded-lg cursor-pointer transition-all hover:border-primary ${
                        selectedTemplate === template.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">{template.title}</h3>
                        {template.category && (
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {template.category}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        תבנית מוכנה ל{template.title}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Link href="/dashboard">
              <Button type="button" variant="outline" disabled={isLoading}>
                ביטול
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'יוצר...' : 'צור דף'}
            </Button>
          </div>
        </form>
      </main>
    </>
  )
}

