# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Features

### Authentication
- HTTP Basic Authentication for admin panel
- Bcrypt password hashing
- Session-based authentication

### Data Protection
- SQLite database with proper file permissions
- Password hashing using bcrypt (12 rounds)
- Environment variable support for sensitive data

### HTTP Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security (HTTPS only)

### CORS Policy
- Configurable allowed origins
- Credentials support
- Method restrictions

### Input Validation
- FastAPI automatic validation
- Type checking with Pydantic
- SQL injection prevention via SQLAlchemy ORM

## Security Best Practices

### For Production Deployment

1. **Change Default Credentials**
   ```bash
   # Immediately change default admin password
   python -c "from auth import hash_password; from models import *; db = SessionLocal(); admin = db.query(AdminUser).first(); admin.password = hash_password('your-strong-password'); db.commit()"
   ```

2. **Use Strong Secret Key**
   ```bash
   # Generate a secure secret key
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```

3. **Enable HTTPS**
   - Use SSL/TLS certificates (Let's Encrypt recommended)
   - Set PRODUCTION=true in .env
   - Configure reverse proxy (Nginx/Apache)

4. **Restrict CORS Origins**
   ```env
   ALLOWED_ORIGINS=https://yourdomain.com
   ```

5. **Set Proper File Permissions**
   ```bash
   chmod 600 admin/.env
   chmod 600 admin/nihom.db
   chmod 755 admin/
   ```

6. **Regular Updates**
   - Update dependencies: `pip install -r requirements.txt --upgrade`
   - Monitor security advisories
   - Apply OS security patches

7. **Disable Debug Endpoints**
   - API docs disabled in production mode
   - Remove development features

### Database Security

1. **Regular Backups**
   ```bash
   cp admin/nihom.db backups/nihom_$(date +%Y%m%d).db
   ```

2. **Access Control**
   - Limit database file access to application user only
   - Use read-only accounts where possible

3. **Encryption at Rest**
   - Consider encrypting sensitive data
   - Use full-disk encryption on production servers

### Network Security

1. **Firewall Configuration**
   ```bash
   # Allow only necessary ports
   ufw allow 443/tcp  # HTTPS
   ufw allow 22/tcp   # SSH (restrict to specific IPs)
   ufw enable
   ```

2. **Rate Limiting**
   - Implement rate limiting in reverse proxy
   - Prevent brute force attacks

3. **Monitoring**
   - Enable access logging
   - Monitor for suspicious activity
   - Set up alerts for failed login attempts

## Reporting a Vulnerability

If you discover a security vulnerability, please:

1. **Do NOT** open a public issue
2. Email: admin@nihom.edu.bd
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work to resolve the issue promptly.

## Security Checklist

Before going live:

- [ ] Default admin password changed
- [ ] Strong SECRET_KEY configured
- [ ] HTTPS enabled and enforced
- [ ] CORS origins restricted to production domain
- [ ] File permissions set correctly
- [ ] Firewall configured
- [ ] Backups automated
- [ ] Monitoring enabled
- [ ] Reverse proxy configured
- [ ] Security headers verified
- [ ] Dependencies updated
- [ ] API docs disabled in production
- [ ] Error messages don't expose sensitive info
- [ ] Database file not publicly accessible

## Known Limitations

1. **Single Admin User**: Currently supports one admin user. For multiple admins, extend AdminUser model.

2. **SQLite Concurrency**: SQLite has limited concurrent write capability. For high-traffic scenarios, consider PostgreSQL/MySQL.

3. **No 2FA**: Two-factor authentication not implemented. Can be added using TOTP libraries.

4. **Session Management**: Uses HTTP Basic Auth. For enhanced security, implement JWT or session tokens.

## Security Updates

Check for updates regularly:
- Python packages: `pip list --outdated`
- System packages: `apt update && apt list --upgradable`

## Compliance

This application should be reviewed for compliance with:
- GDPR (if handling EU user data)
- Local data protection laws
- Organizational security policies

## Contact

For security concerns: admin@nihom.edu.bd

Last Updated: 2025-10-18
