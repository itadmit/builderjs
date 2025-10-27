import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rateLimit'

const leadSchema = z.object({
  pageId: z.string(),
  name: z.string().min(1, 'שם חובה'),
  phone: z.string().min(9, 'מספר טלפון לא תקין'),
  email: z.string().email('אימייל לא תקין').optional().or(z.literal('')),
  message: z.string().optional().or(z.literal('')),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = leadSchema.parse(body)

    // Rate limiting - IP + pageId
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const identifier = `${ip}-${data.pageId}`
    const rateLimitResult = rateLimit(identifier, 5, 60000) // 5 בקשות לדקה

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'יותר מדי בקשות, נסה שוב מאוחר יותר' },
        { status: 429 }
      )
    }

    // וידוא שהדף קיים
    const page = await prisma.page.findUnique({
      where: { id: data.pageId },
    })

    if (!page) {
      return NextResponse.json({ error: 'דף לא נמצא' }, { status: 404 })
    }

    // שמירת ליד
    const lead = await prisma.lead.create({
      data: {
        pageId: data.pageId,
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        message: data.message || null,
      },
    })

    // שליחת webhook אם קיים
    if (page.webhookUrl) {
      try {
        await fetch(page.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: lead.name,
            phone: lead.phone,
            email: lead.email,
            message: lead.message,
            page_id: page.id,
            page_slug: page.slug,
            page_title: page.title,
            submitted_at: lead.createdAt,
          }),
        })
      } catch (webhookError) {
        console.error('Webhook error:', webhookError)
        // ממשיכים גם אם ה-webhook נכשל
      }
    }

    return NextResponse.json({ success: true, lead }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { error: 'שגיאה בשליחת הטופס' },
      { status: 500 }
    )
  }
}

