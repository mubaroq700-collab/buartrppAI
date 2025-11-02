# 🚀 Deployment Guide - RPP AI Pagurukiki

Guide lengkap untuk mendeploy aplikasi RPP AI Pagurukiki ke berbagai platform.

## 📋 Prerequisites

- Node.js 18+ 
- npm atau yarn
- ZAI API Key (dapatkan dari https://z.ai/)

## 🔧 Environment Setup

### 1. Environment Variables

Buat file `.env.local` di root project:

```env
# ZAI API Key (Required)
ZAI_API_KEY=your_zai_api_key_here

# App URL (Optional)
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Node Environment (Optional)
NODE_ENV=production
```

### 2. Mendapatkan ZAI API Key

1. Kunjungi [Z.ai](https://z.ai/)
2. Register/Login
3. Dapatkan API key dari dashboard
4. Tambahkan ke environment variables

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

#### Langkah 1: Push ke GitHub

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Add remote
git remote add origin https://github.com/username/rpp-ai-pagurukiki.git
git push -u origin main
```

#### Langkah 2: Deploy ke Vercel

1. Buka [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import dari GitHub
4. Setup environment variables:
   - `ZAI_API_KEY`: Your ZAI API key
5. Click "Deploy"

#### Langkah 3: Custom Domain (Optional)

1. Di Vercel dashboard → Project → Settings → Domains
2. Tambahkan custom domain
3. Update DNS records

---

### Option 2: Netlify

#### Langkah 1: Build untuk Production

```bash
npm run build
```

#### Langkah 2: Deploy ke Netlify

1. Buka [netlify.com](https://netlify.com)
2. Drag & drop folder `.next` ke Netlify
3. Atau gunakan Git integration

#### Langkah 3: Environment Variables

1. Site settings → Build & deploy → Environment
2. Tambahkan:
   - `ZAI_API_KEY`: Your ZAI API key
   - `NODE_ENV`: production

---

### Option 3: Railway

#### Langkah 1: Install Railway CLI

```bash
npm install -g @railway/cli
```

#### Langkah 2: Login dan Deploy

```bash
railway login
railway init
railway up
```

#### Langkah 3: Environment Variables

```bash
railway variables set ZAI_API_KEY=your_api_key
```

---

### Option 4: DigitalOcean App Platform

#### Langkah 1: Build Docker Image

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Langkah 2: Deploy

```bash
# Build image
docker build -t rpp-ai-pagurukiki .

# Push ke DigitalOcean
docker tag rpp-ai-pagurukiki registry.digitalocean.com/username/rpp-ai-pagurukiki
docker push registry.digitalocean.com/username/rpp-ai-pagurukiki
```

---

### Option 5: VPS (Docker)

#### Langkah 1: Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - ZAI_API_KEY=${ZAI_API_KEY}
      - NODE_ENV=production
    restart: unless-stopped
```

#### Langkah 2: Deploy

```bash
# Create .env file
echo "ZAI_API_KEY=your_api_key" > .env

# Deploy
docker-compose up -d
```

---

## 🔍 Troubleshooting

### Common Issues

#### 1. Build Error: "Module not found"

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 2. ZAI API Error

**Solution:**
- Check API key validity
- Ensure environment variables are set correctly
- Check ZAI service status

#### 3. Memory Issues

**Solution:**
- Increase Node.js memory limit:
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
```

#### 4. CORS Issues

**Solution:**
- Add domain to ZAI whitelist
- Check environment variables

### Debug Mode

Enable debug logging:

```bash
export DEBUG=*
npm run dev
```

---

## 📊 Monitoring

### Vercel Analytics

1. Dashboard → Analytics
2. Monitor performance, errors, usage

### Custom Monitoring

Add monitoring code:

```javascript
// src/lib/monitoring.js
export const logEvent = (event, data) => {
  if (typeof window !== 'undefined') {
    console.log(`[EVENT] ${event}:`, data);
  }
};
```

---

## 🔒 Security

### Environment Variables Best Practices

1. **Never commit .env files**
2. **Use different keys for dev/prod**
3. **Rotate keys regularly**
4. **Use key management services**

### API Security

1. **Rate limiting**
2. **Input validation**
3. **HTTPS only**
4. **CORS configuration**

---

## 📈 Performance Optimization

### Build Optimization

```json
// package.json
{
  "scripts": {
    "build": "next build",
    "analyze": "ANALYZE=true next build"
  }
}
```

### Caching

```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
  },
};
```

---

## 🔄 CI/CD Pipeline

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
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📞 Support

Jika mengalami masalah:

1. Check [GitHub Issues](https://github.com/username/rpp-ai-pagurukiki/issues)
2. Contact development team
3. Check ZAI documentation

---

## 🎉 Success!

Setelah deployment berhasil:

1. Test semua fitur
2. Monitor performance
3. Setup backup
4. Document customizations

**🚀 Your RPP AI Pagurukiki is now live!**