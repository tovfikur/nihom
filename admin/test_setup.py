"""Quick test to verify admin panel setup"""
import sys

try:
    # Test imports
    print("Testing imports...")
    import fastapi
    import uvicorn
    import sqlalchemy
    from models import init_db, SessionLocal, HeroContent

    print("[OK] All imports successful")

    # Test database initialization
    print("\nInitializing database...")
    init_db()
    print("[OK] Database initialized")

    # Test database query
    print("\nTesting database query...")
    db = SessionLocal()
    hero = db.query(HeroContent).first()
    if hero:
        print(f"[OK] Database query successful")
        print(f"  Hero title: {hero.title_line1} {hero.title_line2}")
    else:
        print("[ERROR] No data found in database")
    db.close()

    print("\n" + "="*50)
    print("SETUP TEST COMPLETE!")
    print("="*50)
    print("\nYou can now start the admin panel:")
    print("  Windows: start.bat")
    print("  Linux/Mac: ./start.sh")
    print("\nOr run directly:")
    print("  python app.py")
    print("\nThen visit: http://localhost:8000/admin")
    print("="*50)

except Exception as e:
    print(f"\n[ERROR] Error: {e}")
    print("\nPlease install dependencies:")
    print("  pip install -r ../requirements.txt")
    sys.exit(1)
