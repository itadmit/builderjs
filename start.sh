#!/bin/bash

echo "🚀 QuickLanding - הפעלה מהירה"
echo "================================"
echo ""

# צבעים
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# בדיקה אם Docker רץ
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✅ Docker זמין${NC}"
    
    # הפעלת PostgreSQL
    echo ""
    echo "🐘 מפעיל PostgreSQL ב-Docker..."
    docker compose up -d postgres 2>/dev/null || docker-compose up -d postgres
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ PostgreSQL רץ${NC}"
        
        # המתנה לפוסטגרס
        echo "⏳ ממתין ל-PostgreSQL..."
        sleep 5
    else
        echo -e "${RED}❌ שגיאה בהפעלת PostgreSQL${NC}"
        echo "נסה להריץ ידנית: docker-compose up -d"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  Docker לא מותקן - מניח ש-PostgreSQL רץ לוקאלית${NC}"
fi

echo ""
echo "⚙️  מגדיר .env לשימוש עם Docker..."
if [ -f .env.docker ]; then
    cp .env.docker .env
    echo -e "${GREEN}✅ .env מוגדר לפורט 5433${NC}"
fi

echo ""
echo "📦 מתקין תלויות..."
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ שגיאה בהתקנת תלויות${NC}"
    exit 1
fi

echo -e "${GREEN}✅ תלויות הותקנו${NC}"
echo ""

echo "🔧 מריץ Prisma migrations..."
npx prisma generate
npx prisma migrate dev --name init

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}⚠️  Migrations נכשלו - אולי כבר רצו${NC}"
fi

echo ""
echo "🌱 מריץ seed (יוצר תבניות ומשתמש דמו)..."
npx prisma db seed

echo ""
echo "================================"
echo -e "${GREEN}✨ הכל מוכן!${NC}"
echo ""
echo "📝 כדי להפעיל את השרת:"
echo "   npm run dev"
echo ""
echo "👤 פרטי התחברות:"
echo "   Email: demo@quicklanding.co"
echo "   Password: demo123"
echo ""
echo "🌐 אתר: http://localhost:3000"
echo ""

