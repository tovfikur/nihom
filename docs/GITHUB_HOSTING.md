# GitHub Hosting Guide - NIHOM Website & Admin Panel

## Overview

This guide shows you how to host your NIHOM website and admin panel **completely free** using:

- **GitHub Pages** - Website hosting (free, unlimited)
- **Render.com / Railway.app** - Backend API hosting (free tier)
- **GitHub Actions** - Auto-deployment (free)

## Architecture

```
┌─────────────────┐         ┌──────────────────┐
│  GitHub Pages   │◄────────│  Website Files   │
│  (Frontend)     │         │  HTML/CSS/JS     │
└────────┬────────┘         └──────────────────┘
         │
         │ API Calls
         ▼
┌─────────────────┐         ┌──────────────────┐
│  Render.com     │◄────────│  Admin Backend   │
│  (Backend API)  │         │  Python/FastAPI  │
└─────────────────┘         └──────────────────┘
```

## Step 1: Setup GitHub Repository

### 1.1 Create GitHub Account
1. Go to https://github.com
2. Sign up for a free account

### 1.2 Create Repository
1. Click "New repository"
2. Name: `nihom-website`
3. Description: "NIHOM Website and Admin Panel"
4. Public or Private (your choice)
5. Click "Create repository"

### 1.3 Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add files
git add .

# Commit
git commit -m "Initial commit - NIHOM website and admin panel"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/nihom-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Deploy Backend to Render.com (FREE)

Render.com offers **free tier** with:
- 750 hours/month runtime
- Automatic SSL
- Auto-deploy from GitHub

### 2.1 Sign Up for Render
1. Go to https://render.com
2. Sign up with your GitHub account
3. Authorize Render to access your repositories

### 2.2 Deploy Admin Backend

1. Click "New +" → "Web Service"
2. Connect your `nihom-website` repository
3. Configure:
   - **Name**: `nihom-admin`
   - **Region**: Oregon (or closest to you)
   - **Branch**: `main`
   - **Root Directory**: (leave blank)
   - **Build Command**: `cd admin && pip install -r ../requirements.txt`
   - **Start Command**: `cd admin && gunicorn app_prod:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`
   - **Plan**: Free

4. **Environment Variables** (click "Advanced"):
   ```
   PRODUCTION=true
   SECRET_KEY=<click "Generate" for random key>
   ALLOWED_ORIGINS=https://YOUR_USERNAME.github.io
   DATABASE_URL=sqlite:///nihom.db
   ```

5. **Add Persistent Disk** (for database):
   - Name: `nihom-db`
   - Mount Path: `/opt/render/project/src/admin`
   - Size: 1 GB

6. Click "Create Web Service"

### 2.3 Wait for Deployment
- First deploy takes 3-5 minutes
- You'll get a URL like: `https://nihom-admin.onrender.com`
- Note this URL - you'll need it!

## Step 3: Deploy Website to GitHub Pages

### 3.1 Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" → "Pages"
3. Under "Source":
   - Branch: `main`
   - Folder: `/ (root)`
4. Click "Save"

### 3.2 Configure API Endpoint

Update your admin panel HTML to use the Render backend:

```bash
# Edit admin/admin_panel.html
# Change this line:
const API_BASE = '';

# To this (use your Render URL):
const API_BASE = 'https://nihom-admin.onrender.com';
```

Commit and push:
```bash
git add admin/admin_panel.html
git commit -m "Update API endpoint for GitHub hosting"
git push
```

### 3.3 Access Your Site

After 1-2 minutes, your site will be live at:
- **Website**: `https://YOUR_USERNAME.github.io/nihom-website/`
- **Admin Panel**: `https://YOUR_USERNAME.github.io/nihom-website/admin/admin_panel.html`

## Alternative: Railway.app (Also FREE)

Railway offers:
- 500 hours/month free
- $5 credit/month
- Easier setup

### Deploy on Railway

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `nihom-website` repository
5. Railway auto-detects Python and deploys
6. Get your URL: `https://nihom-admin-production.up.railway.app`

## Step 4: Update CORS Settings

Update backend CORS to allow GitHub Pages:

In `admin/.env` on Render/Railway dashboard:
```env
ALLOWED_ORIGINS=https://YOUR_USERNAME.github.io,https://nihom-admin.onrender.com
```

## Step 5: Custom Domain (Optional)

### For GitHub Pages

1. Buy domain (Namecheap, Google Domains, etc.)
2. In your repo, create file `CNAME`:
   ```
   www.yourdomai.com
   ```
3. Configure DNS:
   ```
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```

### For Render Backend

1. In Render dashboard, go to your service
2. Settings → Custom Domain
3. Add: `api.yourdomain.com`
4. Update DNS:
   ```
   Type: CNAME
   Name: api
   Value: nihom-admin.onrender.com
   ```

## Deployment Workflow

Once set up, updates are automatic:

```bash
# Make changes to your code
# ...

# Commit and push
git add .
git commit -m "Update content"
git push

# GitHub Pages auto-updates in 1-2 minutes
# Render auto-deploys in 2-3 minutes
```

## Cost Breakdown

| Service | Cost | What's Included |
|---------|------|-----------------|
| GitHub Pages | **FREE** | Unlimited bandwidth, 1GB storage |
| Render.com | **FREE** | 750 hrs/month, 512MB RAM, SSL |
| Railway.app | **FREE** | 500 hrs/month, $5 credit, SSL |
| Custom Domain | ~$10/year | Optional |

**Total: $0/month** (or $10/year with custom domain)

## Free Tier Limitations

### GitHub Pages
- ✅ No limits for static sites
- ✅ Custom domains supported
- ❌ No server-side code
- ❌ No database

### Render Free Tier
- ✅ Automatic SSL
- ✅ Auto-deploy from git
- ✅ 750 hours/month
- ⚠️ Sleeps after 15 min inactivity (wakes in <30s)
- ⚠️ 512 MB RAM

### Railway Free Tier
- ✅ Automatic SSL
- ✅ $5 credit/month
- ✅ 500 hours/month
- ⚠️ After free credit, requires payment

## Keeping Services Awake

Free tiers sleep after inactivity. Keep them awake:

### Option 1: UptimeRobot (Free)
1. Go to https://uptimerobot.com
2. Create monitor for your Render URL
3. Ping every 5 minutes

### Option 2: Cron-job.org (Free)
1. Go to https://cron-job.org
2. Create job to hit your `/health` endpoint
3. Run every 5 minutes

## Monitoring & Logs

### GitHub Pages
- Settings → Pages → View deployment logs

### Render.com
- Dashboard → Logs (real-time)
- Dashboard → Events (deployment history)

### Railway.app
- Project → Deployments → View logs

## Troubleshooting

### Website Not Loading
1. Check GitHub Pages is enabled
2. Wait 1-2 minutes after push
3. Check repository is public (or GitHub Pro for private)

### Admin Panel Can't Connect to API
1. Check Render service is running
2. Verify API_BASE URL in admin_panel.html
3. Check CORS settings in backend
4. Wait 30s if service was sleeping

### Backend Crashes
1. Check Render logs for errors
2. Verify environment variables
3. Check database disk is attached
4. Free tier has 512MB RAM limit

### Database Not Persisting
1. Verify persistent disk is added in Render
2. Check mount path is correct
3. Database resets without persistent disk

## Updating Content

### Via Admin Panel
1. Go to admin panel URL
2. Login (admin/admin123 initially)
3. **Change password immediately!**
4. Edit content and save

### Via Code
1. Edit files locally
2. Commit and push to GitHub
3. Auto-deploys to both services

## Security Checklist

- [ ] Change default admin password
- [ ] Use strong SECRET_KEY (auto-generated on Render)
- [ ] Set correct ALLOWED_ORIGINS
- [ ] Enable HTTPS only (automatic on both platforms)
- [ ] Don't commit .env file
- [ ] Use environment variables for secrets

## Backup Strategy

### Manual Backup
```bash
# Download database from Render
render ssh nihom-admin
cd admin
cat nihom.db > backup.db
# Download via SCP
```

### Automated Backup
Set up GitHub Actions to backup database weekly:
```yaml
# .github/workflows/backup.yml
name: Backup Database
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly
# ... backup script
```

## Advanced: CI/CD Pipeline

GitHub Actions can automate testing before deployment:

```yaml
# .github/workflows/test.yml
name: Test Before Deploy
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
      - run: pip install -r requirements.txt
      - run: cd admin && python test_setup.py
```

## Support Resources

- **GitHub Pages**: https://docs.github.com/pages
- **Render**: https://render.com/docs
- **Railway**: https://docs.railway.app
- **FastAPI**: https://fastapi.tiangolo.com

## Quick Reference

### Useful URLs
- GitHub Repo: `https://github.com/YOUR_USERNAME/nihom-website`
- Website: `https://YOUR_USERNAME.github.io/nihom-website`
- Admin Panel: `https://YOUR_USERNAME.github.io/nihom-website/admin/admin_panel.html`
- Backend API: `https://nihom-admin.onrender.com`
- API Docs: `https://nihom-admin.onrender.com/docs`

### Common Commands
```bash
# Update website
git add .
git commit -m "Update"
git push

# View Render logs
render logs

# Restart Render service
render restart nihom-admin
```

## Next Steps

1. ✅ Deploy backend to Render.com
2. ✅ Deploy website to GitHub Pages
3. ✅ Test admin panel
4. ✅ Change default password
5. ✅ Add custom domain (optional)
6. ✅ Set up monitoring
7. ✅ Configure backups

You now have a **completely free**, production-ready website with content management!
