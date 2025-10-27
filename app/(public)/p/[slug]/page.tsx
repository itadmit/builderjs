import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import LeadForm from '@/components/forms/LeadForm'
import PublicPageContent from '@/components/PublicPageContent'
import type { Metadata } from 'next'

interface PublicPageProps {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: PublicPageProps): Promise<Metadata> {
  const page = await prisma.page.findUnique({
    where: { slug: params.slug, published: true },
  })

  if (!page) {
    return {
      title: 'דף לא נמצא',
    }
  }

  return {
    title: page.title,
    description: `דף נחיתה: ${page.title}`,
  }
}

export default async function PublicPage({ params }: PublicPageProps) {
  const page = await prisma.page.findUnique({
    where: { slug: params.slug, published: true },
  })

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <span className="text-sm text-muted-foreground">
            נבנה עם QuickLanding
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Content */}
          <div className="mb-12 bg-white rounded-lg shadow-sm p-8">
            <PublicPageContent content={page.content} />
          </div>

          {/* Lead Form */}
          <div className="mb-8">
            <LeadForm
              pageId={page.id}
              title="נשמח לשמוע ממך"
              description="השאר/י פרטים ונחזור אליך בהקדם"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>
            נבנה עם ❤️ באמצעות{' '}
            <a
              href="https://quicklanding.co"
              className="text-primary hover:underline"
            >
              QuickLanding
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

