# 🚀 מדריך Deploy - QuickLanding

## ☁️ אפשרויות Deployment

---

## 1️⃣ Vercel (מומלץ ביותר)

### למה Vercel?
- ✅ אופטימיזציה ל-Next.js
- ✅ Deploy אוטומטי מ-Git
- ✅ HTTPS חינם
- ✅ Edge Functions
- ✅ PostgreSQL זמין

### שלבי Deploy

#### א. הכנה
```bash
# וודא שהכל עובד לוקאלית
npm run build
npm start
```

#### ב. העלאה ל-GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/quicklanding.git
git push -u origin main
```

#### ג. חיבור ל-Vercel

1. היכנס ל-https://vercel.com
2. "New Project"
3. Import מ-GitHub
4. בחר את הרפוזיטורי

#### ד. הגדרות Environment Variables

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://your-domain.vercel.app
```

**חשוב**: 
- השתמש ב-PostgreSQL מנוהל (Vercel Postgres / Supabase)
- צור `NEXTAUTH_SECRET` חזק: `openssl rand -base64 32`

#### ה. Deploy!
לחץ "Deploy" - זהו!

---

## 2️⃣ Railway

### שלבים

1. היכנס ל-https://railway.app
2. "New Project" → Deploy from GitHub
3. בחר repository
4. הוסף PostgreSQL Plugin
5. הגדר Environment Variables:
```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=${{RAILWAY_PUBLIC_DOMAIN}}
```
6. Deploy אוטומטי!

### עלויות
- $5/חודש (Hobby)
- DB + App

---

## 3️⃣ DigitalOcean App Platform

### שלבים

1. צור App מ-GitHub
2. הוסף Managed PostgreSQL
3. Build Command: `npm run build`
4. Run Command: `npm start`
5. הגדר ENV vars
6. Deploy

### עלויות
- $5-12/חודש (Basic)
- $7/חודש (Managed DB)

---

## 4️⃣ Self-Hosted (VPS)

### דרישות
- Ubuntu 22.04+
- Node.js 18+
- PostgreSQL 14+
- Nginx
- PM2

### התקנה

#### 1. התקן תלויות
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2
```

#### 2. הגדר PostgreSQL
```bash
sudo -u postgres psql

CREATE DATABASE quicklanding;
CREATE USER quicklanding_user WITH PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE quicklanding TO quicklanding_user;
\q
```

#### 3. Clone & Setup
```bash
cd /var/www
git clone https://github.com/username/quicklanding.git
cd quicklanding

# Install dependencies
npm install

# Setup .env
nano .env
# הזן את כל הערכים

# Run migrations
npx prisma migrate deploy
npx prisma db seed

# Build
npm run build
```

#### 4. PM2 Setup
```bash
# Start app
pm2 start npm --name "quicklanding" -- start

# Auto-restart on reboot
pm2 startup
pm2 save
```

#### 5. Nginx Config
```nginx
# /etc/nginx/sites-available/quicklanding
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/quicklanding /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 6. SSL (Certbot)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 🔐 Environment Variables

### חובה
```env
DATABASE_URL="postgresql://user:password@host:5432/db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="https://yourdomain.com"
```

### אופציונלי (לעתיד)
```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your@email.com"
SMTP_PASS="your-password"
```

---

## 🗄 Database Options

### 1. Vercel Postgres
- **עלות**: $0.25/GB
- **Setup**: 1-click
- **טוב ל**: Start-ups

### 2. Supabase
- **עלות**: חינם (500MB) / $25/חודש
- **Setup**: קל מאוד
- **טוב ל**: MVP-Production

### 3. Railway PostgreSQL
- **עלות**: $5/חודש
- **Setup**: 1-click
- **טוב ל**: Hobby projects

### 4. AWS RDS
- **עלות**: $15-50/חודש
- **Setup**: מורכב
- **טוב ל**: Enterprise

### 5. DigitalOcean Managed
- **עלות**: $7-15/חודש
- **Setup**: בינוני
- **טוב ל**: Production

---

## 📊 Production Checklist

### Security
- [ ] HTTPS מוגדר
- [ ] NEXTAUTH_SECRET חזק
- [ ] DB credentials מאובטחים
- [ ] Rate limiting פעיל
- [ ] CORS מוגדר נכון

### Performance
- [ ] Build optimization
- [ ] Image optimization
- [ ] Caching headers
- [ ] CDN (אופציונלי)

### Monitoring
- [ ] Error tracking (Sentry)
- [ ] Uptime monitoring
- [ ] Analytics
- [ ] Logs

### Backup
- [ ] DB backups אוטומטיים
- [ ] Code ב-Git
- [ ] ENV vars מגובים

---

## 🚨 Common Issues

### Build Failed
**גורם**: חסר ENV variable  
**פתרון**: וודא שכל ה-ENV vars מוגדרים

### Database Connection Error
**גורם**: DATABASE_URL לא נכון  
**פתרון**: בדוק connection string

### NextAuth Error
**גורם**: NEXTAUTH_URL לא תואם  
**פתרון**: וודא שה-URL הוא הדומיין האמיתי

### Prisma Errors
**גורם**: Migrations לא רצו  
**פתרון**: 
```bash
npx prisma migrate deploy
```

---

## 💰 עלויות משוערות

### Hobby (1000 משתמשים/חודש)
- **Vercel**: $0 (Free tier)
- **Supabase**: $0 (Free tier)
- **Total**: **$0-5/חודש**

### Startup (10K משתמשים/חודש)
- **Vercel Pro**: $20
- **Supabase Pro**: $25
- **Total**: **$45/חודש**

### Scale (100K משתמשים/חודש)
- **Vercel Enterprise**: $150+
- **AWS RDS**: $50+
- **Total**: **$200+/חודש**

---

## 🔄 CI/CD

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - run: npx prisma migrate deploy
```

---

## 📈 Scaling Tips

### Database
- Connection pooling (PgBouncer)
- Read replicas
- Caching (Redis)

### App
- Multiple instances
- Load balancer
- CDN

### Storage
- S3/R2 לתמונות
- Object storage

---

## 🆘 תמיכה

### Issues
- GitHub Issues
- Discord Community
- Email: support@quicklanding.co

---

**🎉 בהצלחה עם ה-Deployment!**

