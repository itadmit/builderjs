import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { generateUniqueSlug } from '@/lib/utils'

const createPageSchema = z.object({
  title: z.string().min(1, 'כותרת חובה'),
  slug: z.string().optional(),
  templateId: z.string().optional(),
})

// GET - קבלת כל הדפים של המשתמש
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'לא מחובר' }, { status: 401 })
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

    return NextResponse.json({ pages })
  } catch (error) {
    console.error('Pages fetch error:', error)
    return NextResponse.json(
      { error: 'שגיאה בטעינת דפים' },
      { status: 500 }
    )
  }
}

// POST - יצירת דף חדש
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'לא מחובר' }, { status: 401 })
    }

    const body = await req.json()
    const { title, slug, templateId } = createPageSchema.parse(body)

    // קבלת תוכן מתבנית אם צוין
    let content = { id: 'root', version: 1, rows: [] }
    if (templateId) {
      const template = await prisma.template.findUnique({
        where: { id: templateId },
      })
      if (template) {
        content = template.content as any
      }
    }

    // יצירת slug ייחודי
    const existingSlugs = await prisma.page.findMany({
      select: { slug: true },
    })
    const finalSlug =
      slug || generateUniqueSlug(title, existingSlugs.map((p) => p.slug))

    // יצירת הדף
    const page = await prisma.page.create({
      data: {
        title,
        slug: finalSlug,
        content,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ page }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    console.error('Page creation error:', error)
    return NextResponse.json(
      { error: 'שגיאה ביצירת דף' },
      { status: 500 }
    )
  }
}

