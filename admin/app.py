from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Form
from fastapi.responses import HTMLResponse, FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pathlib import Path
import shutil
from typing import Optional
from models import *

app = FastAPI(title="NIHOM Admin Panel")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory=".."), name="static")

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_db()

# ============ API ENDPOINTS ============

# Hero Content
@app.get("/api/hero")
def get_hero(db: Session = Depends(get_db)):
    hero = db.query(HeroContent).first()
    if not hero:
        raise HTTPException(status_code=404, detail="Hero content not found")
    return hero

@app.put("/api/hero")
def update_hero(
    badge_text: str = Form(...),
    title_line1: str = Form(...),
    title_line2: str = Form(...),
    subtitle_word1: str = Form(...),
    subtitle_word2: str = Form(...),
    subtitle_word3: str = Form(...),
    description: str = Form(...),
    stat_students: int = Form(...),
    stat_programs: int = Form(...),
    stat_faculty: int = Form(...),
    db: Session = Depends(get_db)
):
    hero = db.query(HeroContent).first()
    if hero:
        hero.badge_text = badge_text
        hero.title_line1 = title_line1
        hero.title_line2 = title_line2
        hero.subtitle_word1 = subtitle_word1
        hero.subtitle_word2 = subtitle_word2
        hero.subtitle_word3 = subtitle_word3
        hero.description = description
        hero.stat_students = stat_students
        hero.stat_programs = stat_programs
        hero.stat_faculty = stat_faculty
        db.commit()
        return {"message": "Hero content updated successfully"}
    raise HTTPException(status_code=404, detail="Hero content not found")

# About Content
@app.get("/api/about")
def get_about(db: Session = Depends(get_db)):
    about = db.query(AboutContent).first()
    if not about:
        raise HTTPException(status_code=404, detail="About content not found")
    return about

@app.put("/api/about")
def update_about(
    section_tag: str = Form(...),
    section_title: str = Form(...),
    lead_text: str = Form(...),
    paragraph1: str = Form(...),
    paragraph2: str = Form(...),
    paragraph3: str = Form(...),
    db: Session = Depends(get_db)
):
    about = db.query(AboutContent).first()
    if about:
        about.section_tag = section_tag
        about.section_title = section_title
        about.lead_text = lead_text
        about.paragraph1 = paragraph1
        about.paragraph2 = paragraph2
        about.paragraph3 = paragraph3
        db.commit()
        return {"message": "About content updated successfully"}
    raise HTTPException(status_code=404, detail="About content not found")

# Mission & Vision
@app.get("/api/mission-vision")
def get_mission_vision(db: Session = Depends(get_db)):
    mv = db.query(MissionVision).first()
    if not mv:
        raise HTTPException(status_code=404, detail="Mission/Vision not found")
    return mv

@app.put("/api/mission-vision")
def update_mission_vision(
    mission_text: str = Form(...),
    vision_text: str = Form(...),
    db: Session = Depends(get_db)
):
    mv = db.query(MissionVision).first()
    if mv:
        mv.mission_text = mission_text
        mv.vision_text = vision_text
        db.commit()
        return {"message": "Mission & Vision updated successfully"}
    raise HTTPException(status_code=404, detail="Mission/Vision not found")

# Courses
@app.get("/api/courses")
def get_courses(db: Session = Depends(get_db)):
    return db.query(Course).order_by(Course.display_order).all()

@app.get("/api/courses/{course_id}")
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@app.put("/api/courses/{course_id}")
def update_course(
    course_id: int,
    title: str = Form(...),
    short_description: str = Form(...),
    image_url: str = Form(...),
    is_active: bool = Form(True),
    display_order: int = Form(0),
    db: Session = Depends(get_db)
):
    course = db.query(Course).filter(Course.id == course_id).first()
    if course:
        course.title = title
        course.short_description = short_description
        course.image_url = image_url
        course.is_active = is_active
        course.display_order = display_order
        db.commit()
        return {"message": "Course updated successfully"}
    raise HTTPException(status_code=404, detail="Course not found")

# Gallery
@app.get("/api/gallery")
def get_gallery(db: Session = Depends(get_db)):
    return db.query(GalleryImage).order_by(GalleryImage.display_order).all()

@app.get("/api/gallery/{image_id}")
def get_gallery_image(image_id: int, db: Session = Depends(get_db)):
    image = db.query(GalleryImage).filter(GalleryImage.id == image_id).first()
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    return image

@app.put("/api/gallery/{image_id}")
def update_gallery_image(
    image_id: int,
    image_url: str = Form(...),
    alt_text: str = Form(...),
    caption: str = Form(""),
    is_active: bool = Form(True),
    display_order: int = Form(0),
    db: Session = Depends(get_db)
):
    image = db.query(GalleryImage).filter(GalleryImage.id == image_id).first()
    if image:
        image.image_url = image_url
        image.alt_text = alt_text
        image.caption = caption
        image.is_active = is_active
        image.display_order = display_order
        db.commit()
        return {"message": "Gallery image updated successfully"}
    raise HTTPException(status_code=404, detail="Image not found")

@app.delete("/api/gallery/{image_id}")
def delete_gallery_image(image_id: int, db: Session = Depends(get_db)):
    image = db.query(GalleryImage).filter(GalleryImage.id == image_id).first()
    if image:
        db.delete(image)
        db.commit()
        return {"message": "Image deleted successfully"}
    raise HTTPException(status_code=404, detail="Image not found")

@app.post("/api/gallery")
def add_gallery_image(
    image_url: str = Form(...),
    alt_text: str = Form(...),
    caption: str = Form(""),
    display_order: int = Form(0),
    db: Session = Depends(get_db)
):
    new_image = GalleryImage(
        image_url=image_url,
        alt_text=alt_text,
        caption=caption,
        display_order=display_order
    )
    db.add(new_image)
    db.commit()
    return {"message": "Gallery image added successfully", "id": new_image.id}

# Contact Info
@app.get("/api/contact")
def get_contact(db: Session = Depends(get_db)):
    contact = db.query(ContactInfo).first()
    if not contact:
        raise HTTPException(status_code=404, detail="Contact info not found")
    return contact

@app.put("/api/contact")
def update_contact(
    location: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    db: Session = Depends(get_db)
):
    contact = db.query(ContactInfo).first()
    if contact:
        contact.location = location
        contact.email = email
        contact.phone = phone
        db.commit()
        return {"message": "Contact info updated successfully"}
    raise HTTPException(status_code=404, detail="Contact info not found")

# Image Upload
@app.post("/api/upload")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Create uploads directory if it doesn't exist
        upload_dir = Path("../uploads")
        upload_dir.mkdir(exist_ok=True)

        # Save file
        file_path = upload_dir / file.filename
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return {"filename": file.filename, "url": f"uploads/{file.filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Admin Panel HTML
@app.get("/admin", response_class=HTMLResponse)
async def admin_panel():
    with open("admin_panel.html", "r", encoding="utf-8") as f:
        return f.read()

# Root redirect
@app.get("/")
async def root():
    return {"message": "NIHOM Admin API", "admin_panel": "/admin", "docs": "/docs"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
