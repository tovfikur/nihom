#!/bin/bash

echo "Starting NIHOM Admin Panel..."
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r ../requirements.txt

# Start the server
echo ""
echo "========================================"
echo "NIHOM Admin Panel Starting..."
echo "========================================"
echo "Admin Panel: http://localhost:8000/admin"
echo "API Docs: http://localhost:8000/docs"
echo "========================================"
echo ""

python app.py
