'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { ArrowRight, Save, Eye, Globe } from 'lucide-react'

interface Page {
  id: string
  title: string
  slug: string
  content: any
  webhookUrl: string | null
  published: boolean
  leads: Lead[]
}

interface Lead {
  id: string
  name: string
  phone: string
  email: string | null
  message: string | null
  createdAt: string
}

export default function EditPagePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [page, setPage] = useState<Page | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // State for editor
  const [content, setContent] = useState<any>(null)

  // State for settings
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [published, setPublished] = useState(false)

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
      setTitle(data.page.title)
      setSlug(data.page.slug)
      setWebhookUrl(data.page.webhookUrl || '')
      setPublished(data.page.published)
    } catch (error) {
      toast.error('שגיאה בטעינת הדף')
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
          title,
          slug,
          content,
          webhookUrl: webhookUrl || '',
          published,
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

  const handlePublishToggle = async () => {
    const newPublishedState = !published
    setPublished(newPublishedState)

    try {
      const response = await fetch(`/api/pages/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: newPublishedState }),
      })

      if (!response.ok) {
        toast.error('שגיאה בשינוי מצב פרסום')
        setPublished(!newPublishedState)
        return
      }

      toast.success(newPublishedState ? 'הדף פורסם!' : 'הדף הוסר מפרסום')
    } catch (error) {
      toast.error('שגיאה')
      setPublished(!newPublishedState)
    }
  }

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">טוען...</div>
        </main>
      </>
    )
  }

  if (!page) {
    return null
  }

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowRight className="ml-2 h-4 w-4" />
              חזרה לדשבורד
            </Button>
          </Link>
          <div className="flex gap-2 items-center">
            <Badge variant={published ? 'default' : 'secondary'}>
              {published ? 'פורסם' : 'טיוטה'}
            </Badge>
            {published && (
              <Link href={`/p/${page.slug}`} target="_blank">
                <Button variant="outline" size="sm">
                  <Eye className="ml-2 h-4 w-4" />
                  צפה בדף
                </Button>
              </Link>
            )}
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="ml-2 h-4 w-4" />
              {isSaving ? 'שומר...' : 'שמור שינויים'}
            </Button>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-6">{page.title}</h1>

        <Tabs defaultValue="content" dir="rtl">
          <TabsList>
            <TabsTrigger value="content">תוכן</TabsTrigger>
            <TabsTrigger value="settings">הגדרות</TabsTrigger>
            <TabsTrigger value="leads">
              לידים ({page.leads.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>עריכה ויזואלית</CardTitle>
                <CardDescription>
                  השתמש בעורך הויזואלי לבניית הדף בצורה חזותית עם Drag & Drop
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/dashboard/pages/${params.id}/builder`}>
                  <Button size="lg" className="w-full">
                    <Eye className="ml-2 h-5 w-5" />
                    פתח עורך ויזואלי
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground mt-3 text-center">
                  העורך ייפתח במסך מלא עם כלי עיצוב מתקדמים
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            <div className="space-y-6 max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle>פרטי הדף</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">כותרת</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">כתובת URL (slug)</Label>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      dir="ltr"
                    />
                    <p className="text-xs text-muted-foreground">
                      הדף יהיה זמין ב: /p/{slug}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Webhook</CardTitle>
                  <CardDescription>
                    קבל התראות אוטומטיות כשמתקבל ליד חדש
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="webhook">כתובת Webhook (אופציונלי)</Label>
                    <Input
                      id="webhook"
                      type="url"
                      placeholder="https://your-webhook-url.com"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      dir="ltr"
                    />
                    <p className="text-xs text-muted-foreground">
                      נשלח POST request עם פרטי הליד בכל הגשת טופס
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>פרסום</CardTitle>
                  <CardDescription>
                    שנה את מצב הפרסום של הדף
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handlePublishToggle}
                    variant={published ? 'outline' : 'default'}
                  >
                    <Globe className="ml-2 h-4 w-4" />
                    {published ? 'הסר פרסום' : 'פרסם דף'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leads" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>לידים ({page.leads.length})</CardTitle>
                <CardDescription>
                  כל הפניות שהתקבלו דרך הדף
                </CardDescription>
              </CardHeader>
              <CardContent>
                {page.leads.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    עדיין לא התקבלו לידים
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-right p-2">שם</th>
                          <th className="text-right p-2">טלפון</th>
                          <th className="text-right p-2">אימייל</th>
                          <th className="text-right p-2">הודעה</th>
                          <th className="text-right p-2">תאריך</th>
                        </tr>
                      </thead>
                      <tbody>
                        {page.leads.map((lead) => (
                          <tr key={lead.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{lead.name}</td>
                            <td className="p-2" dir="ltr">{lead.phone}</td>
                            <td className="p-2 text-sm">{lead.email || '-'}</td>
                            <td className="p-2 text-sm max-w-xs truncate">
                              {lead.message || '-'}
                            </td>
                            <td className="p-2 text-sm text-muted-foreground">
                              {new Date(lead.createdAt).toLocaleString('he-IL')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  )
}

