# NIHOM Admin Panel - Production Deployment Guide

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Deployment Options](#deployment-options)
3. [Environment Configuration](#environment-configuration)
4. [Security Hardening](#security-hardening)
5. [Deployment Methods](#deployment-methods)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Troubleshooting](#troubleshooting)

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] Python 3.8+ is installed on the server
- [ ] Server has sufficient resources (min: 1GB RAM, 10GB storage)
- [ ] Domain name is configured (if applicable)
- [ ] SSL/TLS certificate is obtained (Let's Encrypt recommended)
- [ ] Firewall rules are configured
- [ ] Backup strategy is in place

## Deployment Options

### Option 1: Docker (Recommended)
- Easiest to deploy and manage
- Isolated environment
- Easy to scale

### Option 2: Systemd Service
- Native Linux service
- Better system integration
- Lower overhead

### Option 3: Manual Deployment
- Full control
- Suitable for custom setups

## Environment Configuration

### 1. Create Environment File

```bash
cd admin
cp .env.example .env
```

### 2. Edit `.env` with Production Values

```env
# Production Settings
PRODUCTION=true

# Database
DATABASE_URL=sqlite:///nihom.db

# Security - IMPORTANT: Change this!
SECRET_KEY=your-super-secret-random-key-here-minimum-32-characters

# CORS - Add your actual domain
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Admin Credentials (for initial setup)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password-here

# Server
HOST=0.0.0.0
PORT=8000
RELOAD=False

# Features
ENABLE_CORS=true
```

### 3. Generate Secure Secret Key

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

## Security Hardening

### 1. Change Default Admin Password

After first login, update admin password in the database:

```python
from auth import hash_password
from models import SessionLocal, AdminUser

db = SessionLocal()
admin = db.query(AdminUser).filter(AdminUser.username == 'admin').first()
admin.password = hash_password('your-new-secure-password')
db.commit()
```

### 2. Configure Firewall

```bash
# Allow only necessary ports
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

### 3. Set Up Reverse Proxy (Nginx)

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    # SSL Configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Security Headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Admin API
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Admin Panel
    location /admin {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Website static files
    location / {
        root /var/www/nihom;
        try_files $uri $uri/ /index.html;
    }
}
```

## Deployment Methods

### Method 1: Docker Deployment

#### 1. Build and Run

```bash
cd admin
docker-compose up -d
```

#### 2. View Logs

```bash
docker-compose logs -f
```

#### 3. Stop Service

```bash
docker-compose down
```

### Method 2: Systemd Service

#### 1. Install Dependencies

```bash
cd admin
python3 -m venv venv
source venv/bin/activate
pip install -r ../requirements.txt
```

#### 2. Create Service File

```bash
sudo cp systemd-service.example /etc/systemd/system/nihom-admin.service
sudo nano /etc/systemd/system/nihom-admin.service
# Edit paths to match your installation
```

#### 3. Enable and Start Service

```bash
sudo systemctl daemon-reload
sudo systemctl enable nihom-admin
sudo systemctl start nihom-admin
```

#### 4. Check Status

```bash
sudo systemctl status nihom-admin
```

### Method 3: Manual Deployment

#### Windows

```batch
cd admin
deploy.bat
```

#### Linux

```bash
cd admin
chmod +x deploy.sh
./deploy.sh
```

## Database Backup

### Automated Backup Script

```bash
#!/bin/bash
# backup_db.sh

BACKUP_DIR="/var/backups/nihom"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DB_PATH="/var/www/nihom/admin/nihom.db"

mkdir -p $BACKUP_DIR
cp $DB_PATH $BACKUP_DIR/nihom_${TIMESTAMP}.db

# Keep only last 30 days of backups
find $BACKUP_DIR -name "nihom_*.db" -mtime +30 -delete

echo "Backup completed: nihom_${TIMESTAMP}.db"
```

### Schedule with Cron

```bash
# Run daily at 2 AM
0 2 * * * /path/to/backup_db.sh
```

## Monitoring & Maintenance

### Health Check

```bash
curl http://localhost:8000/health
```

### View Logs

```bash
# Systemd service
sudo journalctl -u nihom-admin -f

# Docker
docker-compose logs -f

# Manual deployment
tail -f admin/logs/access.log
tail -f admin/logs/error.log
```

### Database Maintenance

```bash
# Vacuum database (optimize)
sqlite3 admin/nihom.db "VACUUM;"

# Check database integrity
sqlite3 admin/nihom.db "PRAGMA integrity_check;"
```

## Performance Optimization

### 1. Use Gunicorn with Multiple Workers

```bash
gunicorn app_prod:app \
    --workers 4 \
    --worker-class uvicorn.workers.UvicornWorker \
    --bind 0.0.0.0:8000
```

Worker count = (2 x CPU cores) + 1

### 2. Enable Gzip Compression (Nginx)

```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
```

### 3. Cache Static Assets

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## SSL/TLS Setup with Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## Updating the Application

### 1. Backup Database

```bash
cp admin/nihom.db admin/nihom_backup_$(date +%Y%m%d).db
```

### 2. Pull Latest Changes

```bash
git pull origin main
```

### 3. Update Dependencies

```bash
pip install -r requirements.txt --upgrade
```

### 4. Restart Service

```bash
# Systemd
sudo systemctl restart nihom-admin

# Docker
docker-compose restart

# Manual
pkill gunicorn && ./deploy.sh
```

## Troubleshooting

### Issue: Port Already in Use

```bash
# Find process
sudo lsof -i :8000

# Kill process
sudo kill -9 <PID>
```

### Issue: Permission Denied

```bash
# Fix file permissions
sudo chown -R www-data:www-data /var/www/nihom
sudo chmod -R 755 /var/www/nihom
```

### Issue: Database Locked

```bash
# Check for active connections
fuser admin/nihom.db

# Restart service to release locks
sudo systemctl restart nihom-admin
```

### Issue: 502 Bad Gateway

- Check if backend is running: `curl http://localhost:8000/health`
- Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`
- Verify proxy_pass URL in nginx config

## Security Incident Response

### If Credentials Compromised

1. Immediately change admin password:
```bash
python -c "from auth import hash_password; from models import *; db = SessionLocal(); admin = db.query(AdminUser).first(); admin.password = hash_password('new-secure-password'); db.commit()"
```

2. Change SECRET_KEY in .env
3. Restart application
4. Review access logs for suspicious activity

### Regular Security Tasks

- [ ] Update dependencies monthly: `pip install -r requirements.txt --upgrade`
- [ ] Review access logs weekly
- [ ] Test backups monthly
- [ ] Update system packages: `sudo apt update && sudo apt upgrade`

## Support & Resources

- Application Logs: `admin/logs/`
- Database: `admin/nihom.db`
- Configuration: `admin/.env`
- API Documentation: `http://your-domain/docs`

For additional help, refer to:
- README.md - General information
- ADMIN_GUIDE.md - Admin panel usage
- FastAPI Documentation: https://fastapi.tiangolo.com/
