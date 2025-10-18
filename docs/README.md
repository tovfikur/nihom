# NIHOM Website & Admin Panel

Official website for Navy Institute of Hospitality Management (NIHOM) with a complete content management system.

## 🚀 Quick Start

Choose your deployment option:

| Option | Time | Cost | Guide |
|--------|------|------|-------|
| **Local Development** | 2 min | FREE | Run `cd admin && start.bat` |
| **GitHub Hosting** ⭐ | 10 min | FREE | See `QUICK_START_GITHUB.md` |
| **Production VPS** | 1 hour | $5/mo | See `PRODUCTION_DEPLOY.md` |

👉 **New to this?** Start with [QUICK_START_GITHUB.md](QUICK_START_GITHUB.md) for free hosting!

## About

Navy Institute of Hospitality Management (NIHOM) is a renowned organization run under the supervision of Bangladesh Navy, located at Labonchora, Khulna.

## Features

### Website
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Gallery**: Click on images to view them in full-screen lightbox
- **Course Showcase**: Detailed presentation of all available courses
- **Contact Form**: Easy way for visitors to get in touch
- **Smooth Navigation**: Sticky navbar with smooth scroll effects

### Admin Panel
- **Simple & Fast**: Built with FastAPI and SQLite - minimal setup required
- **Easy Content Management**: Edit all website content through a clean web interface
- **Image Management**: Upload and manage gallery images
- **Database-Driven**: All content stored in SQLite database
- **RESTful API**: Full API documentation available

## Quick Start - Admin Panel

### Prerequisites
- Python 3.8 or higher

### Installation & Running

#### Windows
```batch
cd admin
start.bat
```

#### Linux/Mac
```bash
cd admin
chmod +x start.sh
./start.sh
```

The script will automatically:
1. Create a virtual environment (if needed)
2. Install dependencies
3. Initialize the database with default content
4. Start the admin panel server

### Access Admin Panel
- **Admin Panel**: http://localhost:8000/admin
- **API Documentation**: http://localhost:8000/docs
- **Default Username**: admin
- **Default Password**: admin123

## Admin Panel Sections

1. **Hero Section**: Manage homepage hero content, stats, and taglines
2. **About Us**: Edit about section paragraphs
3. **Mission & Vision**: Update mission and vision statements
4. **Courses**: Manage course listings and details
5. **Gallery**: Add, edit, or remove gallery images
6. **Contact Info**: Update contact information

## File Structure

```
httpnihom25.com/
├── admin/
│   ├── app.py              # FastAPI application
│   ├── models.py           # Database models
│   ├── admin_panel.html    # Admin UI
│   ├── start.bat           # Windows startup script
│   ├── start.sh            # Linux/Mac startup script
│   └── nihom.db            # SQLite database (auto-created)
├── requirements.txt        # Python dependencies
├── index.html              # Main website
├── styles.css              # Website styles
├── script.js               # Website scripts
├── Nihom Web_extracted/    # Course images
└── Various Photos_extracted/  # Gallery photos
```

## Website Sections

1. **Home**: Hero section with key information
2. **About**: Detailed information about NIHOM
3. **Mission & Vision**: Institutional mission and vision statements
4. **Courses**: Overview of available programs:
   - Bakery and Pastry Production
   - Food and Beverage Production
   - Food and Beverage Service
5. **Gallery**: Photos of facilities and campus
6. **Contact**: Contact information and inquiry form

## Technologies Used

### Website
- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Google Fonts (Poppins)

### Admin Panel
- **Backend**: FastAPI (Python)
- **Database**: SQLite with SQLAlchemy ORM
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Server**: Uvicorn ASGI server

## API Endpoints

- `GET/PUT /api/hero` - Hero section content
- `GET/PUT /api/about` - About section content
- `GET/PUT /api/mission-vision` - Mission & vision
- `GET /api/courses` - List all courses
- `PUT /api/courses/{id}` - Update a course
- `GET/POST /api/gallery` - Gallery images
- `PUT/DELETE /api/gallery/{id}` - Manage images
- `GET/PUT /api/contact` - Contact information
- `POST /api/upload` - Upload images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [README.md](README.md) | You are here - General overview |
| [QUICK_START_GITHUB.md](QUICK_START_GITHUB.md) | ⭐ **10-min setup** - Free GitHub hosting |
| [DEPLOYMENT_OPTIONS.md](DEPLOYMENT_OPTIONS.md) | Compare all deployment options |
| [GITHUB_HOSTING.md](GITHUB_HOSTING.md) | Complete GitHub hosting guide |
| [PRODUCTION_DEPLOY.md](PRODUCTION_DEPLOY.md) | VPS/server production deployment |
| [ADMIN_GUIDE.md](ADMIN_GUIDE.md) | How to use the admin panel |
| [SECURITY.md](SECURITY.md) | Security best practices |

## Credits

Developed for Navy Institute of Hospitality Management (NIHOM)

---

**Navy Institute of Hospitality Management**
Excellence in Culinary Arts & Hospitality Education
