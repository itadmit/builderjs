import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Eye, Users } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    redirect('/login')
  }

  const pages = await prisma.page.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: 'desc' },
    include: {
      _count: {
        select: { leads: true },
      },
    },
  })

  return (
    <>
      <Header userName={session.user.name} />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">הדפים שלי</h2>
            <p className="text-muted-foreground mt-1">
              נהל את דפי הנחיתה שלך ועקוב אחר לידים
            </p>
          </div>
          <Link href="/dashboard/pages/new">
            <Button size="lg">
              <Plus className="ml-2 h-5 w-5" />
              דף חדש
            </Button>
          </Link>
        </div>

        {pages.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-2">אין לך דפים עדיין</h3>
                <p className="text-muted-foreground mb-6">
                  צור את דף הנחיתה הראשון שלך תוך דקות עם התבניות המוכנות שלנו
                </p>
                <Link href="/dashboard/pages/new">
                  <Button>
                    <Plus className="ml-2 h-4 w-4" />
                    צור דף ראשון
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <Card key={page.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{page.title}</CardTitle>
                    <Badge variant={page.published ? 'default' : 'secondary'}>
                      {page.published ? 'פורסם' : 'טיוטה'}
                    </Badge>
                  </div>
                  <CardDescription className="font-mono text-xs">
                    /{page.slug}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{page._count.leads} לידים</span>
                    </div>
                    <div>
                      עודכן:{' '}
                      {new Date(page.updatedAt).toLocaleDateString('he-IL', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Link href={`/dashboard/pages/${page.id}/edit`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Edit className="ml-2 h-4 w-4" />
                      עריכה
                    </Button>
                  </Link>
                  {page.published && (
                    <Link href={`/p/${page.slug}`} target="_blank">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  )
}

