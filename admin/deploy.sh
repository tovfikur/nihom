#!/bin/bash

echo "====================================="
echo "NIHOM Admin Panel - Production Deploy"
echo "====================================="

# Check if .env exists
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "Please edit .env file with your production settings!"
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
pip install -r ../requirements.txt

# Initialize database
echo "Initializing database..."
python -c "from models import init_db; init_db()"

# Create uploads directory
mkdir -p ../uploads

# Start with gunicorn for production
echo ""
echo "====================================="
echo "Starting production server..."
echo "====================================="
echo ""

gunicorn app_prod:app \
    --workers 4 \
    --worker-class uvicorn.workers.UvicornWorker \
    --bind 0.0.0.0:8000 \
    --access-logfile logs/access.log \
    --error-logfile logs/error.log \
    --log-level info \
    --daemon

echo "Server started on http://0.0.0.0:8000"
echo "Logs: logs/access.log and logs/error.log"
echo ""
echo "To stop the server:"
echo "  pkill gunicorn"
