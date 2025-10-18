# NIHOM Admin Panel - Quick Start Guide

## Starting the Admin Panel

### Option 1: Using the startup script (Recommended)

**Windows:**
```batch
cd admin
start.bat
```

**Linux/Mac:**
```bash
cd admin
chmod +x start.sh
./start.sh
```

### Option 2: Manual start
```bash
cd admin
pip install -r ../requirements.txt
python app.py
```

## Accessing the Admin Panel

Once started, open your browser and go to:
- **Admin Panel**: http://localhost:8000/admin
- **API Docs**: http://localhost:8000/docs

### Default Login Credentials
- **Username**: `admin`
- **Password**: `admin123`

## Managing Content

### 1. Hero Section
Edit the main homepage banner including:
- Badge text
- Title (two lines)
- Subtitle (three words)
- Description
- Statistics (students, programs, faculty)

### 2. About Us
Update the about section content:
- Section tag and title
- Lead paragraph
- Three main paragraphs

### 3. Mission & Vision
Edit the institution's mission and vision statements.

### 4. Courses
Manage course listings:
- Edit course title and description
- Change course images
- Reorder courses (display_order)
- Enable/disable courses

### 5. Gallery
Manage gallery images:
- Add new images
- Edit image URLs and descriptions
- Change display order
- Delete images
- Enable/disable images

### 6. Contact Information
Update contact details:
- Location
- Email
- Phone

## Uploading Images

To upload a new image:
1. Use the `/api/upload` endpoint in the API docs
2. Or manually copy images to the appropriate folder and reference the path

## Tips

- Changes are saved immediately when you click "Save Changes"
- The green success message confirms your changes were saved
- All content is stored in the SQLite database (`admin/nihom.db`)
- You can backup the database by copying the `nihom.db` file

## API Integration

To make your website dynamic and pull content from the database, update your HTML/JavaScript to fetch from these endpoints:

```javascript
// Example: Fetch hero content
fetch('http://localhost:8000/api/hero')
    .then(res => res.json())
    .then(data => {
        // Update your page with the data
        document.querySelector('.hero-title').textContent =
            data.title_line1 + ' ' + data.title_line2;
    });
```

## Troubleshooting

**Port already in use:**
- The admin panel runs on port 8000 by default
- Stop any other services using port 8000 or edit `app.py` to change the port

**Dependencies not installing:**
- Make sure Python 3.8+ is installed
- Try: `pip install --upgrade pip`
- Then: `pip install -r requirements.txt`

**Database errors:**
- Delete `admin/nihom.db` to reset
- Run the startup script again to recreate with default data

## Security Notes

- Change the default admin password in production
- The password is stored as a bcrypt hash in the database
- For production use, add proper authentication middleware
- Consider using HTTPS in production

## Support

For issues, check:
1. README.md for general information
2. `/docs` endpoint for API documentation
3. Python error messages in the console
