#!/bin/bash

echo "🚀 QuickLanding - הקמת פרויקט"
echo "================================"
echo ""

# בדיקה אם Node.js מותקן
if ! command -v node &> /dev/null; then
    echo "❌ Node.js לא מותקן. אנא התקן Node.js 18+ והרץ שוב."
    exit 1
fi

echo "✅ Node.js גרסה: $(node -v)"

# בדיקה אם npm מותקן
if ! command -v npm &> /dev/null; then
    echo "❌ npm לא מותקן."
    exit 1
fi

echo "✅ npm גרסה: $(npm -v)"
echo ""

# בדיקה אם קובץ .env קיים
if [ ! -f .env ]; then
    echo "📝 יוצר קובץ .env..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ קובץ .env נוצר מ-.env.example"
        echo "⚠️  אנא ערוך את קובץ .env עם פרטי ההתחברות שלך!"
        echo ""
    else
        echo "⚠️  קובץ .env.example לא נמצא. יוצר .env בסיסי..."
        cat > .env << EOL
DATABASE_URL="postgresql://postgres:password@localhost:5432/quicklanding?schema=public"
NEXTAUTH_SECRET="$(openssl rand -base64 32 2>/dev/null || echo 'change-me-to-a-random-secret')"
NEXTAUTH_URL="http://localhost:3000"
EOL
        echo "✅ קובץ .env נוצר"
        echo ""
    fi
else
    echo "✅ קובץ .env כבר קיים"
    echo ""
fi

# התקנת תלויות
echo "📦 מתקין תלויות..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ שגיאה בהתקנת תלויות"
    exit 1
fi
echo "✅ תלויות הותקנו בהצלחה"
echo ""

# יצירת Prisma Client
echo "🔧 יוצר Prisma Client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "❌ שגיאה ביצירת Prisma Client"
    exit 1
fi
echo "✅ Prisma Client נוצר"
echo ""

# בדיקה אם PostgreSQL זמין
echo "🔍 בודק חיבור ל-PostgreSQL..."
if npx prisma db execute --stdin < /dev/null 2>/dev/null; then
    echo "✅ PostgreSQL זמין"
    
    # הרצת migrations
    echo "📊 מריץ migrations..."
    npx prisma migrate dev --name init
    if [ $? -ne 0 ]; then
        echo "⚠️  שגיאה במיגרציה - וודא שפרטי ההתחברות ב-.env נכונים"
    else
        echo "✅ Migrations הושלמו"
        
        # הרצת seed
        echo "🌱 מריץ seed..."
        npx prisma db seed
        if [ $? -ne 0 ]; then
            echo "⚠️  שגיאה ב-seed"
        else
            echo "✅ Seed הושלם בהצלחה"
        fi
    fi
else
    echo "⚠️  לא ניתן להתחבר ל-PostgreSQL"
    echo "    אנא וודא ש-PostgreSQL רץ ושהפרטים ב-.env נכונים"
fi

echo ""
echo "================================"
echo "✨ ההקמה הושלמה!"
echo ""
echo "📚 שלבים הבאים:"
echo "   1. ערוך את קובץ .env אם נדרש"
echo "   2. הרץ: npm run dev"
echo "   3. פתח: http://localhost:3000"
echo ""
echo "👤 פרטי משתמש דמו:"
echo "   Email: demo@quicklanding.co"
echo "   Password: demo123"
echo ""
echo "🎉 בהצלחה!"

