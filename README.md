# NIHOM - Navy Institute of Hospitality Management

Official website with content management system for Navy Institute of Hospitality Management.

## 📁 Project Structure

```
nihom/
├── frontend/          # 🌐 Static website (HTML/CSS/JS)
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── *.html        # Course pages
├── admin/            # ⚙️ Backend API & Admin Panel
│   ├── app_prod.py   # Production server
│   ├── models.py     # Database
│   └── admin_panel.html
├── docs/             # 📚 Documentation
├── config/           # 🔧 Deployment configs
└── source-files/     # 📄 Original source files
```

## 🚀 Quick Start

### Option 1: View Website Locally

Simply open `frontend/index.html` in your browser!

### Option 2: Run Admin Panel

```bash
cd admin
start.bat  # Windows
# or
./start.sh  # Linux/Mac
```

Visit: http://localhost:8000/admin

**Login**: admin / admin123

### Option 3: Deploy to GitHub (FREE)

See `docs/QUICK_START_GITHUB.md` for 10-minute free hosting!

## 📚 Documentation

| Guide | Description |
|-------|-------------|
| [QUICK_START_GITHUB.md](docs/QUICK_START_GITHUB.md) | ⭐ Deploy free on GitHub (10 min) |
| [DEPLOYMENT_STEPS.md](docs/DEPLOYMENT_STEPS.md) | Complete deployment walkthrough |
| [DEPLOYMENT_OPTIONS.md](docs/DEPLOYMENT_OPTIONS.md) | Compare all hosting options |
| [ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md) | How to use admin panel |
| [PRODUCTION_DEPLOY.md](docs/PRODUCTION_DEPLOY.md) | VPS/server deployment |
| [GITHUB_HOSTING.md](docs/GITHUB_HOSTING.md) | GitHub Pages guide |
| [SECURITY.md](docs/SECURITY.md) | Security best practices |

## 🎯 Features

### Frontend (Static Website)
- ✅ Responsive design
- ✅ Modern UI with animations
- ✅ Course showcase
- ✅ Gallery
- ✅ Contact form
- ✅ Mobile-friendly

### Admin Panel (CMS)
- ✅ Edit all website content
- ✅ Manage courses & gallery
- ✅ Upload images
- ✅ User authentication
- ✅ REST API
- ✅ SQLite database

## 🌐 Live Demo

- **Website**: https://tovfikur.github.io/nihom/frontend/
- **Admin Panel**: https://tovfikur.github.io/nihom/admin/admin_panel.html
- **Backend API**: https://nihom-admin.onrender.com

## 💻 Technology Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Responsive design
- No frameworks needed

**Backend:**
- Python 3.11
- FastAPI (API framework)
- SQLite (database)
- SQLAlchemy (ORM)
- Bcrypt (security)

## 🔒 Security

- HTTP Basic Authentication
- Bcrypt password hashing
- CORS protection
- Security headers
- Environment variables for secrets

## 📦 Deployment Options

| Platform | Cost | Time | Difficulty |
|----------|------|------|------------|
| **GitHub Pages + Render** | FREE | 10 min | Easy ⭐ |
| **Local Server** | FREE | 2 min | Very Easy |
| **VPS/Cloud** | $5-20/mo | 1 hour | Medium |

## 🛠️ Development

### Frontend Only
```bash
cd frontend
# Open index.html in browser
# Or use live server
python -m http.server 8080
```

### Full Stack (with admin)
```bash
# Install dependencies
pip install -r requirements.txt

# Run admin backend
cd admin
python app.py
```

## 📝 Making Changes

### Update Website Content
1. Go to admin panel
2. Login and edit content
3. Changes are instant!

### Update Code
```bash
git add .
git commit -m "Your changes"
git push
```
Auto-deploys if using GitHub Pages!

## 🤝 Contributing

This is a production website for NIHOM. For modifications:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

© 2025 Navy Institute of Hospitality Management (NIHOM)

## 🆘 Support

- **Documentation**: See `docs/` folder
- **Issues**: Create GitHub issue
- **Contact**: admin@nihom.edu.bd

---

**Navy Institute of Hospitality Management**
Excellence in Culinary Arts & Hospitality Education
Labonchora, Khulna, Bangladesh
