@echo off
echo =====================================
echo NIHOM Admin Panel - Production Deploy
echo =====================================

REM Check if .env exists
if not exist ".env" (
    echo Creating .env file from .env.example...
    copy .env.example .env
    echo Please edit .env file with your production settings!
    pause
    exit /b 1
)

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -r ..\requirements.txt

REM Initialize database
echo Initializing database...
python -c "from models import init_db; init_db()"

REM Create uploads and logs directories
if not exist "..\uploads" mkdir ..\uploads
if not exist "logs" mkdir logs

REM Start production server
echo.
echo =====================================
echo Starting production server...
echo =====================================
echo.

set PRODUCTION=true
python app_prod.py

pause
