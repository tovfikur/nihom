# ✅ Your Code is on GitHub!

Repository: **https://github.com/tovfikur/nihom**

## Next Steps to Complete Deployment

### Step 1: Enable GitHub Pages (2 minutes)

1. **Go to**: https://github.com/tovfikur/nihom/settings/pages

2. **Under "Build and deployment"**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**

3. **Click "Save"**

4. **Wait 1-2 minutes** - Your site will be live at:
   - **https://tovfikur.github.io/nihom/**

---

### Step 2: Deploy Backend to Render.com (5 minutes)

#### 2.1 Sign Up

1. **Go to**: https://render.com
2. **Click "Get Started"**
3. **Sign in with GitHub** (easiest option)
4. **Authorize Render** to access your repositories

#### 2.2 Create Web Service

1. **Click "New +"** → **"Web Service"**

2. **Connect your repository**:
   - Find and select: **tovfikur/nihom**
   - Click "Connect"

3. **Configure the service**:

   | Setting | Value |
   |---------|-------|
   | **Name** | `nihom-admin` |
   | **Region** | Oregon (or closest to you) |
   | **Branch** | `main` |
   | **Root Directory** | Leave blank |
   | **Runtime** | Python 3 |
   | **Build Command** | `cd admin && pip install -r ../requirements.txt` |
   | **Start Command** | `cd admin && gunicorn app_prod:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT` |
   | **Instance Type** | **Free** |

4. **Click "Advanced"** to add environment variables:

   Add these environment variables (click "+ Add Environment Variable"):

   ```
   PRODUCTION=true
   ```

   For SECRET_KEY, click "Generate" button - it will create a random secure key automatically

   ```
   ALLOWED_ORIGINS=https://tovfikur.github.io
   ```

   ```
   DATABASE_URL=sqlite:///nihom.db
   ```

5. **Add Persistent Disk** (IMPORTANT - for database):
   - Scroll down to "Disks"
   - Click "+ Add Disk"
   - **Name**: `nihom-db`
   - **Mount Path**: `/opt/render/project/src/admin`
   - **Size**: 1 GB

6. **Click "Create Web Service"**

#### 2.3 Wait for Deployment

- First deployment takes **3-5 minutes**
- Watch the logs - you'll see it installing dependencies
- When you see "Uvicorn running on...", it's done!
- You'll get a URL like: **https://nihom-admin.onrender.com**
- **COPY THIS URL** - you'll need it next!

---

### Step 3: Update Admin Panel with Backend URL (2 minutes)

Now that your backend is deployed, update the admin panel to use it:

1. **Open**: `K:\httpnihom25.com\admin\admin_panel.html`

2. **Find line 151** (search for `const API_BASE`):
   ```javascript
   const API_BASE = '';
   ```

3. **Replace with your Render URL** (the one you just copied):
   ```javascript
   const API_BASE = 'https://nihom-admin.onrender.com';
   ```

4. **Save the file**

5. **Commit and push**:
   ```bash
   git add admin/admin_panel.html
   git commit -m "Update API endpoint for production"
   git push
   ```

6. **Wait 1-2 minutes** for GitHub Pages to update

---

### Step 4: Test Everything! (2 minutes)

#### Test Your Website
Visit: **https://tovfikur.github.io/nihom/**

✅ Should show your NIHOM website

#### Test Admin Panel
Visit: **https://tovfikur.github.io/nihom/admin/admin_panel.html**

✅ Should show admin login page

**Login with**:
- Username: `admin`
- Password: `admin123`

⚠️ **IMPORTANT**: Change this password immediately after first login!

#### Test Backend API
Visit: **https://nihom-admin.onrender.com/health**

✅ Should return: `{"status":"healthy","version":"1.0.0"}`

---

### Step 5: Change Default Password (1 minute)

**CRITICAL SECURITY STEP!**

#### Option 1: Via Render Shell

1. Go to your Render dashboard
2. Click on **nihom-admin** service
3. Click **"Shell"** tab
4. Run this command (replace `YOUR_NEW_PASSWORD`):

```python
python -c "from auth import hash_password; from models import *; db = SessionLocal(); admin = db.query(AdminUser).first(); admin.password = hash_password('YOUR_NEW_PASSWORD'); db.commit(); print('Password changed successfully!')"
```

#### Option 2: Create New Admin User

Add this feature to your admin panel later, or manually update the database.

---

### Step 6: Keep Backend Awake (Optional - 3 minutes)

Free tier on Render sleeps after 15 minutes of inactivity. Keep it awake:

1. **Go to**: https://uptimerobot.com
2. **Sign up** (free account)
3. **Add New Monitor**:
   - Type: **HTTP(s)**
   - Friendly Name: `NIHOM Admin`
   - URL: `https://nihom-admin.onrender.com/health`
   - Monitoring Interval: **5 minutes**
4. **Create Monitor**

Now your backend stays awake 24/7!

---

## 🎉 Deployment Complete!

Your website is now **100% live and free**!

### Your Live URLs:

- **Website**: https://tovfikur.github.io/nihom/
- **Admin Panel**: https://tovfikur.github.io/nihom/admin/admin_panel.html
- **Backend API**: https://nihom-admin.onrender.com
- **API Docs**: https://nihom-admin.onrender.com/docs
- **GitHub Repo**: https://github.com/tovfikur/nihom

### Quick Reference:

| What | Where |
|------|-------|
| Edit content | Admin panel |
| View logs | Render dashboard → Logs tab |
| Update code | `git push` (auto-deploys) |
| Admin login | admin / admin123 (change this!) |

---

## Updating Content

Just use the admin panel! Changes are instant.

To update code:
```bash
git add .
git commit -m "Your changes"
git push
```

Auto-deploys in 2-3 minutes!

---

## Troubleshooting

**Website not showing?**
- Wait 2 minutes after enabling GitHub Pages
- Check Settings → Pages shows green checkmark
- Try incognito/private browsing

**Admin panel can't connect?**
- Wait 30 seconds (backend waking up)
- Check you updated API_BASE in admin_panel.html
- Verify Render service is "Live"

**Render deployment failed?**
- Check logs in Render dashboard
- Verify environment variables are set
- Make sure disk is attached

---

## Costs Breakdown

- GitHub Pages: **FREE** (unlimited)
- Render.com: **FREE** (750 hrs/month)
- UptimeRobot: **FREE** (50 monitors)
- SSL/HTTPS: **FREE** (automatic)

**Total: $0/month** 🎉

Optional:
- Custom domain: ~$10/year

---

## Support

- **Documentation**: See all the MD files in your repo
- **Render Support**: https://render.com/docs
- **GitHub Pages**: https://docs.github.com/pages

---

**Congratulations!** Your NIHOM website with admin panel is now live on the internet! 🚀
