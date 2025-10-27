# 🚀 התחלה מהירה - QuickLanding

## ⚡ התקנה בדקה אחת

### 1. התקן תלויות
```bash
npm install
```

### 2. הגדר .env
צור קובץ `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/quicklanding?schema=public"
NEXTAUTH_SECRET="super-secret-key-change-me"
NEXTAUTH_URL="http://localhost:3000"
```

💡 **טיפ**: הרץ `openssl rand -base64 32` כדי ליצור NEXTAUTH_SECRET חזק

### 3. הכן את הדאטהבייס
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 4. הפעל את השרת
```bash
npm run dev
```

✅ **זהו!** גלוש ל-http://localhost:3000

---

## 👤 התחבר עם חשבון הדמו

```
אימייל: demo@quicklanding.co
סיסמה: demo123
```

---

## 📱 מה עכשיו?

1. **צור דף חדש** - לחץ על "דף חדש" בדשבורד
2. **בחר תבנית** - קליניקה, נדל"ן, קורס או איקומרס
3. **ערוך בעורך** - שנה טקסטים, הוסף בלוקים
4. **הגדר webhook** (אופציונלי) - קבל התראות על לידים
5. **פרסם!** - הדף שלך חי ב-`/p/your-slug`

---

## 🐛 בעיות?

### PostgreSQL לא רץ?
```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

### Port 3000 תפוס?
```bash
npm run dev -- -p 3001
```

### שכחת הסיסמה?
הרץ מחדש את ה-seed:
```bash
npx prisma db seed
```

---

## 📚 תיעוד מלא
ראה [README.md](./README.md) למידע מפורט יותר.

