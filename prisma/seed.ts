import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

// תוכן React-Page לתבניות (JSON מוכן)
const templates = [
  {
    title: 'קליניקה',
    slug: 'clinic-template',
    category: 'קליניקה',
    content: {
      id: 'clinic-root',
      version: 1,
      rows: [
        {
          id: 'hero-clinic',
          cells: [
            {
              id: 'hero-cell',
              size: 12,
              plugin: {
                id: 'slate',
                version: 1,
              },
              dataI18n: {
                default: {
                  slate: [
                    {
                      type: 'HEADINGS/HEADING-ONE',
                      children: [{ text: 'ברוכים הבאים לקליניקה של ד"ר כהן' }],
                    },
                    {
                      type: 'PARAGRAPH/PARAGRAPH',
                      children: [{ text: 'טיפול מקצועי ואישי עם ניסיון של למעלה מ-20 שנה. מתמחים ברפואה משפחתית ובריאות הילד.' }],
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          id: 'benefits-clinic',
          cells: [
            {
              id: 'benefits-cell',
              size: 12,
              plugin: {
                id: 'slate',
                version: 1,
              },
              dataI18n: {
                default: {
                  slate: [
                    {
                      type: 'HEADINGS/HEADING-TWO',
                      children: [{ text: 'למה לבחור בנו?' }],
                    },
                    {
                      type: 'LISTS/UNORDERED-LIST',
                      children: [
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'צוות מקצועי ומנוסה' }] },
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'טיפול אישי ומסור' }] },
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'ציוד מתקדם' }] },
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'זמינות גבוהה' }] },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          id: 'form-clinic',
          cells: [
            {
              id: 'form-cell',
              size: 12,
              plugin: {
                id: 'slate',
                version: 1,
              },
              dataI18n: {
                default: {
                  slate: [
                    {
                      type: 'HEADINGS/HEADING-THREE',
                      children: [{ text: 'קבעו תור עוד היום' }],
                    },
                    {
                      type: 'PARAGRAPH/PARAGRAPH',
                      children: [{ text: 'השאירו פרטים ונחזור אליכם בהקדם:' }],
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  },
  {
    title: 'נדל"ן',
    slug: 'realestate-template',
    category: 'נדל"ן',
    content: {
      id: 'realestate-root',
      version: 1,
      rows: [
        {
          id: 'hero-realestate',
          cells: [
            {
              id: 'hero-cell',
              size: 12,
              plugin: {
                id: 'slate',
                version: 1,
              },
              dataI18n: {
                default: {
                  slate: [
                    {
                      type: 'HEADINGS/HEADING-ONE',
                      children: [{ text: 'דירת חלומות במיקום מושלם' }],
                    },
                    {
                      type: 'PARAGRAPH/PARAGRAPH',
                      children: [{ text: '4 חדרים | 110 מ"ר | קומה 3 | מעלית | חניה' }],
                    },
                    {
                      type: 'PARAGRAPH/PARAGRAPH',
                      children: [{ text: 'דירה מרווחת ומוארת בלב העיר, קרובה לכל השירותים. משופצת לאחרונה עם חומרים איכוtiים.' }],
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          id: 'features-realestate',
          cells: [
            {
              id: 'features-cell',
              size: 12,
              plugin: {
                id: 'slate',
                version: 1,
              },
              dataI18n: {
                default: {
                  slate: [
                    {
                      type: 'HEADINGS/HEADING-TWO',
                      children: [{ text: 'מאפייני הנכס' }],
                    },
                    {
                      type: 'LISTS/UNORDERED-LIST',
                      children: [
                        { type: 'LISTS/LIST-ITEM', children: [{ text: '4 חדרי שינה מרווחים' }] },
                        { type: 'LISTS/LIST-ITEM', children: [{ text: '2 חדרי רחצה' }] },
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'מרפסת שמש גדולה' }] },
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'מיזוג מרכזי' }] },
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'מחסן וחניה' }] },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          id: 'cta-realestate',
          cells: [
            {
              id: 'cta-cell',
              size: 12,
              plugin: {
                id: 'slate',
                version: 1,
              },
              dataI18n: {
                default: {
                  slate: [
                    {
                      type: 'HEADINGS/HEADING-THREE',
                      children: [{ text: 'מעוניינים? קבלו פרטים נוספים' }],
                    },
                    {
                      type: 'PARAGRAPH/PARAGRAPH',
                      children: [{ text: 'השאירו פרטים ונחזור אליכם עם כל המידע:' }],
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  },
  {
    title: 'קורס דיגיטלי',
    slug: 'course-template',
    category: 'קורסים',
    content: {
      id: 'course-root',
      version: 1,
      rows: [
        {
          id: 'hero-course',
          cells: [
            {
              id: 'hero-cell',
              size: 12,
              plugin: {
                id: 'slate',
                version: 1,
              },
              dataI18n: {
                default: {
                  slate: [
                    {
                      type: 'HEADINGS/HEADING-ONE',
                      children: [{ text: 'קורס פיתוח אתרים מתקדם' }],
                    },
                    {
                      type: 'PARAGRAPH/PARAGRAPH',
                      children: [{ text: 'למדו לבנות אתרים מקצועיים תוך 8 שבועות | 100% אונליין | תעודה מוכרת' }],
                    },
                    {
                      type: 'PARAGRAPH/PARAGRAPH',
                      children: [{ text: 'הצטרפו ל-1000+ בוגרים מרוצים שכבר עובדים בתחום!' }],
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          id: 'benefits-course',
          cells: [
            {
              id: 'benefits-cell',
              size: 12,
              plugin: {
                id: 'slate',
                version: 1,
              },
              dataI18n: {
                default: {
                  slate: [
                    {
                      type: 'HEADINGS/HEADING-TWO',
                      children: [{ text: 'מה תלמדו בקורס?' }],
                    },
                    {
                      type: 'LISTS/UNORDERED-LIST',
                      children: [
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'HTML, CSS ו-JavaScript מתקדמים' }] },
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'React ו-Next.js' }] },
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'עיצוב רספונסיבי' }] },
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'בניית API ושרתים' }] },
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'פרויקט גמר אישי' }] },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          id: 'register-course',
          cells: [
            {
              id: 'register-cell',
              size: 12,
              plugin: {
                id: 'slate',
                version: 1,
              },
              dataI18n: {
                default: {
                  slate: [
                    {
                      type: 'HEADINGS/HEADING-THREE',
                      children: [{ text: 'הירשמו עכשיו - מקומות מוגבלים!' }],
                    },
                    {
                      type: 'PARAGRAPH/PARAGRAPH',
                      children: [{ text: 'השאירו פרטים ונחזור אליכם עם כל הפרטים והמחיר המיוחד:' }],
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  },
  {
    title: 'חנות אונליין',
    slug: 'ecommerce-template',
    category: 'איקומרס',
    content: {
      id: 'ecommerce-root',
      version: 1,
      rows: [
        {
          id: 'hero-ecommerce',
          cells: [
            {
              id: 'hero-cell',
              size: 12,
              plugin: {
                id: 'slate',
                version: 1,
              },
              dataI18n: {
                default: {
                  slate: [
                    {
                      type: 'HEADINGS/HEADING-ONE',
                      children: [{ text: 'מבצע מיוחד - נעלי ספורט premium' }],
                    },
                    {
                      type: 'PARAGRAPH/PARAGRAPH',
                      children: [{ text: '50% הנחה לזמן מוגבל | משלוח חינם | החזרה תוך 30 יום' }],
                    },
                    {
                      type: 'PARAGRAPH/PARAGRAPH',
                      children: [{ text: 'נעליים איכותיות מהמותגים המובילים בעולם במחיר שלא יאומן!' }],
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          id: 'product-ecommerce',
          cells: [
            {
              id: 'product-cell',
              size: 12,
              plugin: {
                id: 'slate',
                version: 1,
              },
              dataI18n: {
                default: {
                  slate: [
                    {
                      type: 'HEADINGS/HEADING-TWO',
                      children: [{ text: 'למה כדאי לקנות אצלנו?' }],
                    },
                    {
                      type: 'LISTS/UNORDERED-LIST',
                      children: [
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'אחריות יצרן מלאה' }] },
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'משלוח מהיר תוך 2-3 ימי עסקים' }] },
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'שירות לקוחות זמין 24/7' }] },
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'תשלום מאובטח' }] },
                        { type: 'LISTS/LIST-ITEM', children: [{ text: 'מבצעים והטבות לחברי מועדון' }] },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          id: 'offer-ecommerce',
          cells: [
            {
              id: 'offer-cell',
              size: 12,
              plugin: {
                id: 'slate',
                version: 1,
              },
              dataI18n: {
                default: {
                  slate: [
                    {
                      type: 'HEADINGS/HEADING-THREE',
                      children: [{ text: 'קבלו הצעת מחיר מיוחדת!' }],
                    },
                    {
                      type: 'PARAGRAPH/PARAGRAPH',
                      children: [{ text: 'השאירו פרטים וקבלו קופון הנחה נוסף של 10%:' }],
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  },
]

async function main() {
  console.log('🌱 מתחיל Seed...')

  // יצירת משתמש דמו
  const hashedPassword = await hash('demo123', 10)
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@quicklanding.co' },
    update: {},
    create: {
      email: 'demo@quicklanding.co',
      password: hashedPassword,
      name: 'משתמש דמו',
    },
  })

  console.log('✅ משתמש דמו נוצר:', demoUser.email)

  // יצירת תבניות
  for (const template of templates) {
    const created = await prisma.template.upsert({
      where: { slug: template.slug },
      update: {},
      create: template,
    })
    console.log(`✅ תבנית נוצרה: ${created.title}`)
  }

  console.log('✨ Seed הושלם בהצלחה!')
  console.log('\n📧 פרטי התחברות למשתמש הדמו:')
  console.log('   Email: demo@quicklanding.co')
  console.log('   Password: demo123')
}

main()
  .catch((e) => {
    console.error('❌ שגיאה ב-Seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

