import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

const updatePageSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().optional(),
  content: z.any().optional(),
  webhookUrl: z.string().url().optional().or(z.literal('')),
  published: z.boolean().optional(),
})

// GET - קבלת דף בודד
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'לא מחובר' }, { status: 401 })
    }

    const page = await prisma.page.findUnique({
      where: { id: params.id },
      include: {
        leads: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!page) {
      return NextResponse.json({ error: 'דף לא נמצא' }, { status: 404 })
    }

    if (page.userId !== session.user.id) {
      return NextResponse.json({ error: 'אין הרשאה' }, { status: 403 })
    }

    return NextResponse.json({ page })
  } catch (error) {
    console.error('Page fetch error:', error)
    return NextResponse.json(
      { error: 'שגיאה בטעינת דף' },
      { status: 500 }
    )
  }
}

// PATCH - עדכון דף
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'לא מחובר' }, { status: 401 })
    }

    // בדיקת בעלות
    const existingPage = await prisma.page.findUnique({
      where: { id: params.id },
    })

    if (!existingPage) {
      return NextResponse.json({ error: 'דף לא נמצא' }, { status: 404 })
    }

    if (existingPage.userId !== session.user.id) {
      return NextResponse.json({ error: 'אין הרשאה' }, { status: 403 })
    }

    const body = await req.json()
    const data = updatePageSchema.parse(body)

    // וידוא slug ייחודי אם השתנה
    if (data.slug && data.slug !== existingPage.slug) {
      const slugExists = await prisma.page.findUnique({
        where: { slug: data.slug },
      })
      if (slugExists) {
        return NextResponse.json(
          { error: 'הכתובת כבר קיימת' },
          { status: 400 }
        )
      }
    }

    const page = await prisma.page.update({
      where: { id: params.id },
      data: {
        ...data,
        webhookUrl: data.webhookUrl === '' ? null : data.webhookUrl,
      },
    })

    return NextResponse.json({ page })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    console.error('Page update error:', error)
    return NextResponse.json(
      { error: 'שגיאה בעדכון דף' },
      { status: 500 }
    )
  }
}

// DELETE - מחיקת דף
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'לא מחובר' }, { status: 401 })
    }

    const page = await prisma.page.findUnique({
      where: { id: params.id },
    })

    if (!page) {
      return NextResponse.json({ error: 'דף לא נמצא' }, { status: 404 })
    }

    if (page.userId !== session.user.id) {
      return NextResponse.json({ error: 'אין הרשאה' }, { status: 403 })
    }

    await prisma.page.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Page deletion error:', error)
    return NextResponse.json(
      { error: 'שגיאה במחיקת דף' },
      { status: 500 }
    )
  }
}

