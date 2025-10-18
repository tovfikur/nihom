@echo off
echo Starting NIHOM Admin Panel...
echo.

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -r ../requirements.txt

REM Start the server
echo.
echo ========================================
echo NIHOM Admin Panel Starting...
echo ========================================
echo Admin Panel: http://localhost:8000/admin
echo API Docs: http://localhost:8000/docs
echo ========================================
echo.

python app.py
