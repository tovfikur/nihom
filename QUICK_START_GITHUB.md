# Quick Start: Deploy to GitHub in 10 Minutes

## What You'll Get
- ✅ **Free** website hosting on GitHub Pages
- ✅ **Free** admin panel backend on Render.com
- ✅ Automatic HTTPS/SSL
- ✅ Auto-deployment on code changes
- ✅ Professional domain support

## Prerequisites
- GitHub account (free)
- Git installed on your computer

## Step-by-Step Guide

### 1. Push to GitHub (2 minutes)

```bash
# In your project folder
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/nihom-website.git
git branch -M main
git push -u origin main
```

### 2. Deploy Backend to Render (4 minutes)

1. **Go to https://render.com**
2. **Sign in with GitHub**
3. **New → Web Service**
4. **Select your repository**
5. **Configure**:
   - Name: `nihom-admin`
   - Build: `cd admin && pip install -r ../requirements.txt`
   - Start: `cd admin && gunicorn app_prod:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT`
   - Plan: **Free**

6. **Environment Variables**:
   ```
   PRODUCTION=true
   SECRET_KEY=<click Generate>
   ALLOWED_ORIGINS=https://YOUR_USERNAME.github.io
   ```

7. **Add Disk** (Important!):
   - Disk Name: `nihom-db`
   - Mount: `/opt/render/project/src/admin`
   - Size: 1 GB

8. **Click "Create Web Service"**

9. **Note your URL**: `https://nihom-admin.onrender.com`

### 3. Update Admin Panel (1 minute)

Edit `admin/admin_panel.html` line 151:

```javascript
// Change from:
const API_BASE = '';

// To (use YOUR Render URL):
const API_BASE = 'https://nihom-admin.onrender.com';
```

Commit and push:
```bash
git add admin/admin_panel.html
git commit -m "Update API endpoint"
git push
```

### 4. Enable GitHub Pages (2 minutes)

1. Go to your GitHub repository
2. **Settings** → **Pages**
3. Source: **Branch: main**, **Folder: / (root)**
4. **Save**
5. Wait 1-2 minutes

### 5. Access Your Site (1 minute)

Your site is now live!

- **Website**: `https://YOUR_USERNAME.github.io/nihom-website/`
- **Admin Panel**: `https://YOUR_USERNAME.github.io/nihom-website/admin/admin_panel.html`

**Login**: admin / admin123 (⚠️ **Change immediately!**)

## Verify Everything Works

### Test Website
```
https://YOUR_USERNAME.github.io/nihom-website/
```
Should show your NIHOM website

### Test Admin Panel
```
https://YOUR_USERNAME.github.io/nihom-website/admin/admin_panel.html
```
Should show login prompt

### Test Backend
```
https://nihom-admin.onrender.com/health
```
Should return: `{"status":"healthy"}`

## Change Admin Password (IMPORTANT!)

1. Go to admin panel
2. Login with admin/admin123
3. Open browser console (F12)
4. Run:
```javascript
fetch(API_BASE + '/api/admin/change-password', {
  method: 'POST',
  headers: {'Authorization': 'Basic ' + btoa('admin:admin123')},
  body: new FormData(document.querySelector('form'))
})
```

Or change in database directly:
```bash
# On Render dashboard → Shell
python -c "from auth import hash_password; from models import *; db = SessionLocal(); admin = db.query(AdminUser).first(); admin.password = hash_password('NEW_PASSWORD'); db.commit()"
```

## Keep Backend Awake (Optional)

Free tier sleeps after 15 min. Keep it awake:

1. **Go to https://uptimerobot.com** (free)
2. **Add New Monitor**:
   - Type: HTTP(s)
   - URL: `https://nihom-admin.onrender.com/health`
   - Interval: 5 minutes
3. **Create Monitor**

Now your backend stays awake 24/7!

## Update Content

Just edit in admin panel and save - changes are instant!

To update code:
```bash
git add .
git commit -m "Update"
git push
```

Auto-deploys in 2-3 minutes!

## Costs

Everything is **100% FREE**:
- GitHub Pages: Free unlimited
- Render.com: Free 750 hrs/month
- SSL Certificates: Free automatic
- **Total: $0/month**

## Troubleshooting

**Admin panel shows "Connection Error"**
- Wait 30 seconds (backend waking up)
- Check Render URL is correct in admin_panel.html
- Verify Render service is running

**Website not showing**
- Wait 2 minutes after enabling Pages
- Check repo is public
- Clear browser cache

**Backend crashes**
- Check Render logs
- Verify disk is attached
- Check environment variables

## Next Steps

✅ Your site is live and fully functional!

Recommended:
1. Change admin password
2. Set up UptimeRobot monitoring
3. Add custom domain (optional)
4. Customize content via admin panel

## Support

- Full Guide: See `GITHUB_HOSTING.md`
- Production: See `PRODUCTION_DEPLOY.md`
- Security: See `SECURITY.md`

---

**Congratulations!** Your website with admin panel is now live on GitHub! 🎉
