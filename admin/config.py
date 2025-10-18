"""Production configuration management"""
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
env_path = Path(__file__).parent / '.env'
if env_path.exists():
    load_dotenv(env_path)

class Settings:
    """Application settings"""

    # Database
    DATABASE_URL: str = os.getenv('DATABASE_URL', 'sqlite:///nihom.db')

    # Security
    SECRET_KEY: str = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    ALLOWED_ORIGINS: list = os.getenv('ALLOWED_ORIGINS', 'http://localhost,http://localhost:8000').split(',')

    # Admin credentials (used for initial setup only)
    ADMIN_USERNAME: str = os.getenv('ADMIN_USERNAME', 'admin')
    ADMIN_PASSWORD: str = os.getenv('ADMIN_PASSWORD', 'admin123')

    # Server
    HOST: str = os.getenv('HOST', '0.0.0.0')
    PORT: int = int(os.getenv('PORT', '8000'))
    RELOAD: bool = os.getenv('RELOAD', 'False').lower() == 'true'

    # CORS
    ENABLE_CORS: bool = os.getenv('ENABLE_CORS', 'true').lower() == 'true'

    # Production mode
    PRODUCTION: bool = os.getenv('PRODUCTION', 'False').lower() == 'true'

settings = Settings()
