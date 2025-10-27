# 🔄 מדריך RTL ועברית - QuickLanding

## 🎯 תמיכה מלאה בעברית וכיווניות

המערכת נבנתה מאפס עם תמיכה מלאה ב-Right-To-Left (RTL) ובעברית.

---

## 📝 גופן - Noto Sans Hebrew

### למה Noto Sans Hebrew?
- ✅ תמיכה מלאה בעברית
- ✅ קריא ומקצועי
- ✅ משקלים מרובים (300-700)
- ✅ חינמי (Google Fonts)
- ✅ Web-optimized

### יישום
```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Noto Sans Hebrew', sans-serif;
}
```

---

## 🔧 הגדרות RTL

### 1. HTML Direction
```html
<!-- app/layout.tsx -->
<html lang="he" dir="rtl">
```

### 2. TailwindCSS RTL Plugin
```js
// tailwind.config.ts
plugins: [
  require('tailwindcss-rtl')
]
```

### 3. CSS Classes
```css
/* globals.css */
html[dir="rtl"] {
  direction: rtl;
}

html[dir="rtl"] body {
  text-align: right;
}
```

---

## 🎨 רכיבי UI ב-RTL

### Buttons
```tsx
<Button>
  <Icon className="ml-2" /> {/* margin-left ב-RTL = מימין */}
  טקסט
</Button>
```

**הסבר**: 
- `ml-2` (margin-left) הופך ל-margin-right ב-RTL אוטומטית
- האיקון מופיע מצד ימין של הטקסט

### Inputs
```tsx
<Input 
  placeholder="הזן טקסט..." 
  dir="rtl"
/>
```

**שים לב**:
- Placeholder בעברית
- Text alignment ימינה אוטומטית

### Cards
```tsx
<Card>
  <CardHeader>
    <CardTitle>כותרת</CardTitle>
    <CardDescription>תיאור</CardDescription>
  </CardHeader>
  <CardContent>
    תוכן בעברית
  </CardContent>
</Card>
```

**Alignment אוטומטי**:
- טקסט מיושר ימינה
- Padding הפוך

---

## 📱 רספונסיביות ב-RTL

### Flexbox
```tsx
<div className="flex items-center justify-between">
  <span>ימין</span>
  <span>שמאל</span>
</div>
```

ב-RTL:
- "ימין" יהיה **משמאל**
- "שמאל" יהיה **מימין**

### Grid
```tsx
<div className="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

ב-RTL: הסדר נשמר (1, 2, 3 מימין לשמאל)

---

## 🔄 React-Page Editor ב-RTL

### הגדרות עורך
```tsx
// components/Editor/ReactPageEditor.tsx
<div className="react-page-editor" dir="rtl">
  <Editor
    cellPlugins={cellPlugins}
    value={value}
    onChange={handleChange}
    lang="he"
  />
</div>
```

### Custom Styles
```css
/* globals.css */
.react-page-editor {
  direction: rtl;
  font-family: 'Noto Sans Hebrew', sans-serif;
}

.react-page-cell {
  direction: rtl;
}

.react-page-cell-handle {
  right: auto;
  left: 0;
}

.slate-editor {
  direction: rtl;
  text-align: right;
}
```

---

## 🌐 טקסטים בעברית

### כל הטקסטים בממשק
```tsx
// דוגמאות
"התחבר"          // Login
"הירשם"          // Register
"דף חדש"         // New Page
"שמור שינויים"    // Save Changes
"פרסם"           // Publish
"לידים"          // Leads
"הגדרות"         // Settings
```

### Placeholders
```tsx
<Input placeholder="הזן שם מלא" />
<Input placeholder="050-1234567" type="tel" />
<Input placeholder="your@email.com" type="email" dir="ltr" />
```

**שים לב**: 
- Email/URL שומרים `dir="ltr"` (שמאל לימין)
- שאר השדות RTL

---

## 🎯 Best Practices

### 1. Icons Position
```tsx
// ✅ נכון - איקון מימין
<Button>
  <PlusIcon className="ml-2" />
  הוסף דף
</Button>

// ❌ לא נכון
<Button>
  הוסף דף
  <PlusIcon className="mr-2" />
</Button>
```

### 2. Text Direction במקומות מעורבים
```tsx
// כתובת URL/Email - LTR
<Input 
  value={slug} 
  dir="ltr" 
  placeholder="page-url"
/>

// טקסט עברי - RTL (ברירת מחדל)
<Input 
  value={title} 
  placeholder="כותרת הדף"
/>
```

### 3. Dates & Numbers
```tsx
// תאריך בעברית
{new Date().toLocaleDateString('he-IL')}
// ← "27 באוק׳ 2024"

// מספרים (שומרים LTR)
<span dir="ltr">050-1234567</span>
```

### 4. Tables
```html
<table>
  <thead>
    <tr>
      <th className="text-right">שם</th>
      <th className="text-right">טלפון</th>
    </tr>
  </thead>
</table>
```

---

## 🐛 בעיות נפוצות ופתרונות

### בעיה: טקסט לא מיושר ימינה
**פתרון**:
```tsx
<div className="text-right" dir="rtl">
  טקסט בעברית
</div>
```

### בעיה: Icons במקום הלא נכון
**פתרון**: השתמש ב-`ml-*` (לא `mr-*`)
```tsx
<Icon className="ml-2" /> {/* יופיע מימין */}
```

### בעיה: Dropdown נפתח לכיוון הלא נכון
**פתרון**: Radix UI מטפל בזה אוטומטית עם `dir="rtl"` על `<html>`

### בעיה: Editor לא RTL
**פתרון**:
```tsx
<div className="react-page-editor" dir="rtl">
  <Editor />
</div>
```

---

## 📊 תמיכה בדפדפנים

| Browser | RTL Support | Notes |
|---------|-------------|-------|
| Chrome | ✅ מלא | מומלץ |
| Firefox | ✅ מלא | מומלץ |
| Safari | ✅ מלא | טוב |
| Edge | ✅ מלא | מומלץ |

---

## 🎨 עיצוב ו-UX

### צבעים
- **Primary**: #6C63FF (סגול)
- **Background**: #F7F7FB (אפור בהיר)
- **Text**: אפור כהה

### Spacing
- שולי עמוד: 4rem (ימין/שמאל הפוכים ב-RTL)
- Padding: 2rem
- Gap: 1rem

### Typography
- **Headings**: 700 (Bold)
- **Body**: 400 (Regular)
- **Small**: 300 (Light)

---

## ✅ Checklist לבדיקת RTL

- [ ] כל הטקסטים בעברית
- [ ] `dir="rtl"` על `<html>`
- [ ] Noto Sans Hebrew טעון
- [ ] Icons בצד הנכון
- [ ] Alignment נכון בכל הרכיבים
- [ ] Forms עובדים תקין
- [ ] Buttons מיושרים
- [ ] Tables קריאים
- [ ] Editor עובד ב-RTL
- [ ] Mobile responsive

---

## 🔗 משאבים

- [MDN - CSS Direction](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
- [TailwindCSS RTL](https://github.com/20lives/tailwindcss-rtl)
- [Google Fonts - Noto Sans Hebrew](https://fonts.google.com/noto/specimen/Noto+Sans+Hebrew)
- [RTL Styling 101](https://rtlstyling.com/)

---

**✨ המערכת תומכת ב-RTL באופן מלא ומושלם!**

