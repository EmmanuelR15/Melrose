# MELROSE Deployment Guide

## **Environment Variables Configuration**

### **Required Variables**

#### **Supabase Configuration**
```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Setup Instructions:**
1. Create account at [Supabase](https://supabase.com)
2. Create new project
3. Go to Settings > API
4. Copy Project URL and Anon Key
5. Execute `supabase-schema.sql` in SQL Editor

#### **Instagram Basic Display API (Optional)**
```env
PUBLIC_INSTAGRAM_ACCESS_TOKEN=your-instagram-access-token
```

**Setup Instructions:**
1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create App > Business > Instagram Basic Display
3. Add Instagram Test Account
4. Generate Access Token
5. Update shortcodes in `src/components/InstagramFeed.astro`

#### **WhatsApp Business**
```env
PUBLIC_WHATSAPP_NUMBER=5491123456789
```

**Setup Instructions:**
1. Create WhatsApp Business account
2. Get phone number with country code
3. Configure checkout messages in Business API

#### **Google Analytics (Optional)**
```env
PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

**Setup Instructions:**
1. Create Google Analytics 4 property
2. Get Measurement ID
3. Add to environment variables

---

## **Platform-Specific Deployment**

### **Netlify Deployment**

#### **Manual Setup**
1. Connect GitHub repository to Netlify
2. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18

#### **Environment Variables in Netlify**
```bash
# In Netlify dashboard > Site settings > Environment variables
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
PUBLIC_INSTAGRAM_ACCESS_TOKEN=your-instagram-token
PUBLIC_WHATSAPP_NUMBER=5491123456789
PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

#### **Automatic Deploy with GitHub Actions**
```bash
# Required GitHub Secrets
NETLIFY_AUTH_TOKEN=your-netlify-auth-token
NETLIFY_SITE_ID=your-netlify-site-id
LHCI_GITHUB_APP_TOKEN=your-lhci-token
SNYK_TOKEN=your-snyk-token
WEBPAGETEST_API_KEY=your-webpagetest-key
```

### **Vercel Deployment**

#### **Manual Setup**
1. Install Vercel CLI: `npm i -g vercel`
2. Connect repository: `vercel link`
3. Configure project settings

#### **Environment Variables in Vercel**
```bash
# Using Vercel CLI
vercel env add PUBLIC_SUPABASE_URL
vercel env add PUBLIC_SUPABASE_ANON_KEY
vercel env add PUBLIC_INSTAGRAM_ACCESS_TOKEN
vercel env add PUBLIC_WHATSAPP_NUMBER
vercel env add PUBLIC_GOOGLE_ANALYTICS_ID
```

#### **Automatic Deploy**
```bash
# Push to main branch triggers automatic deploy
git push origin main
```

---

## **CI/CD Pipeline**

### **GitHub Actions Workflow**

The `.github/workflows/ci.yml` includes:

#### **Build and Test Stage**
- Node.js 18 setup
- Dependency installation with npm ci
- Linting and type checking
- Production build
- Lighthouse audit

#### **Security Stage**
- npm audit for vulnerabilities
- Snyk security scanning
- Dependency analysis

#### **Deploy Stage**
- Automatic Netlify deployment
- Artifact upload
- Performance monitoring

#### **Monitoring Stage**
- WebPageTest performance analysis
- Bundle size validation
- Core Web Vitals tracking

### **Pipeline Triggers**
```yaml
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
```

---

## **Security Best Practices**

### **Environment Variables Security**
- [x] `.env` excluded from repository (in `.gitignore`)
- [x] `.env.example` included as template
- [x] Secrets stored in platform dashboards
- [x] No hardcoded credentials in code

### **GitHub Secrets**
```bash
# Required for CI/CD
NETLIFY_AUTH_TOKEN=netlify-auth-token
NETLIFY_SITE_ID=netlify-site-id
LHCI_GITHUB_APP_TOKEN=lhci-token
SNYK_TOKEN=snyk-token
WEBPAGETEST_API_KEY=webpagetest-key
```

### **Platform Security**
- **Netlify:** Environment variables encrypted
- **Vercel:** Environment variables encrypted
- **GitHub:** Secrets encrypted and scoped

---

## **Performance Optimization**

### **Build Configuration**
- **Node.js 18** for latest features and performance
- **npm ci** for faster, reliable builds
- **Production optimizations** enabled

### **Caching Strategy**
```toml
# netlify.toml caching
[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### **Bundle Size Monitoring**
```json
{
  "max-size": "150KB",
  "files": "dist/**/*.js"
}
```

---

## **Monitoring and Analytics**

### **Lighthouse CI**
- Automated audits on each deploy
- Performance scores tracking
- SEO and accessibility validation
- Reports stored in `lighthouse-reports/`

### **Performance Monitoring**
```bash
# WebPageTest integration
wpt run https://melrose.netlify.app --location="ec2-us-east-1"

# Bundle size analysis
bundlesize --max-size "150KB" dist/**/*.js
```

### **Error Tracking**
- GitHub Actions error notifications
- Build failure alerts
- Performance regression detection

---

## **Troubleshooting**

### **Common Issues**

#### **Build Failures**
```bash
# Clear cache and rebuild
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### **Environment Variables Not Loading**
```bash
# Verify .env.example structure
cat .env.example

# Check platform configuration
# Netlify: Site settings > Environment variables
# Vercel: Project settings > Environment variables
```

#### **Deploy Failures**
```bash
# Check GitHub Actions logs
# Verify secrets configuration
# Test build locally first
npm run build
npm run preview
```

#### **Performance Issues**
```bash
# Run Lighthouse locally
npm run lighthouse

# Check bundle size
npm run analyze

# Optimize images
npm run optimize:images
```

---

## **Maintenance Schedule**

### **Weekly**
- Monitor build performance
- Check Lighthouse scores
- Review security alerts

### **Monthly**
- Update dependencies
- Review bundle size
- Check Instagram feed performance

### **Quarterly**
- Full security audit
- Performance optimization review
- CI/CD pipeline updates

---

## **Rollback Procedures**

### **Netlify Rollback**
1. Go to Netlify dashboard
2. Select Deploys tab
3. Choose previous successful deploy
4. Click "Publish deploy"

### **Git Rollback**
```bash
# View commit history
git log --oneline

# Rollback to previous commit
git revert HEAD
git push origin main
```

### **Emergency Rollback**
```bash
# Force rollback to specific commit
git reset --hard <commit-hash>
git push --force-with-lease origin main
```

---

## **Contact and Support**

### **Technical Support**
- **GitHub Issues:** [Repository Issues](https://github.com/EmmanuelR15/Melrose/issues)
- **Documentation:** [README.md](https://github.com/EmmanuelR15/Melrose/blob/main/README.md)
- **Setup Guide:** [GIT_SETUP.md](https://github.com/EmmanuelR15/Melrose/blob/main/GIT_SETUP.md)

### **Platform Support**
- **Netlify:** [Netlify Support](https://www.netlify.com/support/)
- **Vercel:** [Vercel Support](https://vercel.com/support)
- **GitHub:** [GitHub Support](https://support.github.com/)

---

**Follow this guide for successful deployment and maintenance of the MELROSE e-commerce platform.**
