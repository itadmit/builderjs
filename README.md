# QuickLanding 🚀

**פלטפורמה לבניית דפי נחיתה מקצועיים בעברית עם תמיכה RTL מלאה**

מערכת SaaS מלאה לבניית דפי נחיתה עם עורך בלוקים ויזואלי, תבניות מוכנות, ניהול לידים, וובהוקים, ודשבורד מלא.

## ✨ תכונות

- 📝 **עורך ויזואלי** - בניית דפים עם drag & drop באמצעות React-Page
- 🎨 **תבניות מוכנות** - קליניקה, נדל"ן, קורסים, איקומרס ועוד
- 🔄 **תמיכה RTL מלאה** - עיצוב וממשק בעברית מושלמת
- 📊 **ניהול לידים** - מעקב אחר כל הפניות שהתקבלו
- 🔗 **Webhooks** - התראות אוטומטיות על לידים חדשים
- 🔐 **אימות מאובטח** - NextAuth עם Credentials
- 📱 **Responsive** - מותאם לכל המסכים
- 🎯 **Rate Limiting** - הגנה מפני ספאם

## 🛠 טכנולוגיות

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: TailwindCSS + Shadcn UI + RTL Support
- **Editor**: React-Page עם plugins
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js
- **Validation**: Zod
- **Fonts**: Noto Sans Hebrew

## 📋 דרישות מקדימות

- Node.js 18+ 
- PostgreSQL 14+
- npm או yarn

## 🚀 התקנה והפעלה

### 1. שכפול הפרויקט

```bash
git clone <repository-url>
cd minibuilder
```

### 2. התקנת תלויות

```bash
npm install
```

### 3. הגדרת משתני סביבה

צור קובץ `.env` בשורש הפרויקט:

```bash
cp .env.example .env
```

ערוך את הקובץ `.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/quicklanding?schema=public"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. הגדרת בסיס נתונים

```bash
# יצירת migration
npx prisma migrate dev --name init

# הרצת seed (יוצר תבניות ומשתמש דמו)
npx prisma db seed
```

### 5. הפעלת השרת

```bash
npm run dev
```

המערכת תהיה זמינה ב: http://localhost:3000

## 👤 משתמש דמו

לאחר הרצת ה-seed, ניתן להתחבר עם:

```
אימייל: demo@quicklanding.co
סיסמה: demo123
```

## 📁 מבנה הפרויקט

```
minibuilder/
├── app/
│   ├── (auth)/
│   │   └── login/                # עמוד התחברות והרשמה
│   ├── (dashboard)/
│   │   └── dashboard/            # דשבורד ועריכת דפים
│   ├── (public)/
│   │   └── p/[slug]/            # דפים ציבוריים
│   ├── api/
│   │   ├── auth/                # NextAuth
│   │   ├── pages/               # CRUD דפים
│   │   ├── forms/               # קבלת לידים
│   │   ├── templates/           # רשימת תבניות
│   │   └── register/            # רישום משתמש
│   ├── globals.css              # סטיילים גלובליים + RTL
│   └── layout.tsx               # Layout ראשי
├── components/
│   ├── ui/                      # Shadcn UI components
│   ├── Editor/                  # עורך React-Page
│   ├── forms/                   # טופס לידים
│   └── Header.tsx               # Header
├── lib/
│   ├── prisma.ts               # Prisma client
│   ├── auth.ts                 # NextAuth config
│   ├── utils.ts                # פונקציות עזר
│   └── rateLimit.ts            # Rate limiting
├── prisma/
│   ├── schema.prisma           # סכמת DB
│   └── seed.ts                 # נתוני seed
├── types/
│   └── next-auth.d.ts          # TypeScript types
├── tailwind.config.ts          # הגדרות Tailwind + RTL
└── package.json
```

## 🎯 זרימת עבודה

1. **הרשמה/התחברות** → `/login`
2. **דשבורד** → `/dashboard` - רשימת דפים
3. **יצירת דף חדש** → `/dashboard/pages/new` - בחירת תבנית
4. **עריכת דף** → `/dashboard/pages/[id]/edit`
   - תוכן (עורך ויזואלי)
   - הגדרות (כותרת, slug, webhook)
   - לידים (טבלת פניות)
5. **פרסום** → הדף זמין ב-`/p/[slug]`
6. **קבלת לידים** → טופס בדף הציבורי + webhook אוטומטי

## 🔐 API Routes

### Authentication
- `POST /api/register` - רישום משתמש חדש
- `POST /api/auth/signin` - התחברות (NextAuth)

### Pages
- `GET /api/pages` - רשימת דפים של המשתמש
- `POST /api/pages` - יצירת דף חדש
- `GET /api/pages/[id]` - קבלת דף בודד
- `PATCH /api/pages/[id]` - עדכון דף
- `DELETE /api/pages/[id]` - מחיקת דף

### Templates
- `GET /api/templates` - רשימת תבניות

### Forms
- `POST /api/forms` - שליחת ליד חדש

## 🎨 תבניות זמינות

1. **קליניקה** - דף לקליניקה רפואית
2. **נדל"ן** - דף למכירת נכס
3. **קורס דיגיטלי** - דף רישום לקורס
4. **חנות אונליין** - דף מוצר/מבצע

כל התבניות כוללות:
- Hero section עם כותרת וטקסט
- רשימת יתרונות
- קריאה לפעולה (CTA)
- תוכן מלא בעברית RTL

## 🔧 פיתוח

### הוספת רכיב UI חדש

```bash
# דוגמה להוספת Select component
npx shadcn-ui@latest add select
```

### עבודה עם Prisma

```bash
# יצירת migration חדשה
npx prisma migrate dev --name <migration-name>

# פתיחת Prisma Studio
npx prisma studio

# איפוס DB (זהירות!)
npx prisma migrate reset
```

### Build לפרודקשן

```bash
npm run build
npm start
```

## 📝 Webhooks

כאשר מגדירים webhook URL בהגדרות הדף, המערכת שולחת POST request עם הנתונים הבאים:

```json
{
  "name": "שם הלקוח",
  "phone": "050-1234567",
  "email": "email@example.com",
  "message": "הודעה אופציונלית",
  "page_id": "clxxx...",
  "page_slug": "clinic-template",
  "page_title": "קליניקה",
  "submitted_at": "2024-01-01T12:00:00.000Z"
}
```

## 🛡 אבטחה

- סיסמאות מוצפנות עם bcrypt
- JWT tokens עבור sessions
- Rate limiting על טפסי לידים (5 בקשות/דקה)
- Validation עם Zod בכל ה-API routes
- בדיקת בעלות על דפים לפני עריכה/מחיקה

## 🌐 Deploy

### Vercel (מומלץ)

1. העלה את הקוד ל-GitHub
2. חבר ל-Vercel
3. הגדר את משתני הסביבה
4. Deploy!

### Variables נדרשות:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - secret key
- `NEXTAUTH_URL` - domain של האתר

## 📚 תיעוד נוסף

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [React-Page Docs](https://react-page.github.io)
- [Shadcn UI](https://ui.shadcn.com)

## 🐛 בעיות נפוצות

### שגיאת חיבור ל-DB
וודא ש-PostgreSQL רץ ושה-DATABASE_URL נכון.

### שגיאת NEXTAUTH_SECRET
הרץ: `openssl rand -base64 32` וקבע ב-.env

### בעיות עם RTL
וודא ש-`tailwindcss-rtl` מותקן ו-`dir="rtl"` בקובץ layout.tsx

## 📄 רישיון

MIT License - ראה קובץ LICENSE

## 🤝 תרומה

Pull Requests מתקבלים בברכה!

## 💬 תמיכה

לשאלות ובעיות, פתח issue ב-GitHub.

---

**נבנה עם ❤️ בישראל**

