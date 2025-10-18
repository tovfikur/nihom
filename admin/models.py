from sqlalchemy import create_engine, Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

Base = declarative_base()

class HeroContent(Base):
    __tablename__ = 'hero_content'
    id = Column(Integer, primary_key=True)
    badge_text = Column(String(200), default='Since 2020 | Bangladesh Navy')
    title_line1 = Column(String(100), default='Navy Institute of')
    title_line2 = Column(String(100), default='Hospitality Management')
    subtitle_word1 = Column(String(50), default='Excellence')
    subtitle_word2 = Column(String(50), default='in Culinary Arts')
    subtitle_word3 = Column(String(100), default='& Hospitality Education')
    description = Column(Text)
    stat_students = Column(Integer, default=500)
    stat_programs = Column(Integer, default=3)
    stat_faculty = Column(Integer, default=50)

class AboutContent(Base):
    __tablename__ = 'about_content'
    id = Column(Integer, primary_key=True)
    section_tag = Column(String(50), default='About Us')
    section_title = Column(String(200))
    lead_text = Column(Text)
    paragraph1 = Column(Text)
    paragraph2 = Column(Text)
    paragraph3 = Column(Text)

class MissionVision(Base):
    __tablename__ = 'mission_vision'
    id = Column(Integer, primary_key=True)
    mission_text = Column(Text)
    vision_text = Column(Text)

class Course(Base):
    __tablename__ = 'courses'
    id = Column(Integer, primary_key=True)
    slug = Column(String(100), unique=True)
    title = Column(String(200))
    short_description = Column(Text)
    image_url = Column(String(500))
    is_active = Column(Boolean, default=True)
    display_order = Column(Integer, default=0)

class GalleryImage(Base):
    __tablename__ = 'gallery_images'
    id = Column(Integer, primary_key=True)
    image_url = Column(String(500))
    alt_text = Column(String(200))
    caption = Column(String(500))
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

class ContactInfo(Base):
    __tablename__ = 'contact_info'
    id = Column(Integer, primary_key=True)
    location = Column(Text)
    email = Column(String(100))
    phone = Column(String(50))

class AdminUser(Base):
    __tablename__ = 'admin_users'
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True)
    password = Column(String(200))  # Store hashed password
    email = Column(String(100))

# Database setup
engine = create_engine('sqlite:///nihom.db', echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def init_db():
    """Initialize database with tables and seed data"""
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # Check if data exists
        if db.query(AdminUser).count() == 0:
            # Create default admin (password: admin123)
            admin = AdminUser(
                username='admin',
                password='$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIm.KUiy/O',  # bcrypt hash of 'admin123'
                email='admin@nihom.edu.bd'
            )
            db.add(admin)

            # Seed hero content
            hero = HeroContent(
                description='Developing skilled human resources in culinary and hospitality management, adhering to global standards'
            )
            db.add(hero)

            # Seed about content
            about = AboutContent(
                section_title='Navy Institute of Hospitality Management',
                lead_text='Navy Institute of Hospitality Management (NIHOM) is a renowned organization run under the supervision of Bangladesh Navy. It is located at Labonchora, Khulna.',
                paragraph1='As an independent institution with its own Board of Governors, NIHOM is dedicated to provide exceptional education and training in the field of hospitality management. It is situated at the campus of School of Logistics and Management (SOLAM) of Bangladesh Navy.',
                paragraph2='At Navy Institute of Hospitality Management, we offer a range of comprehensive programs specializing in areas such as Bakery and Pastry Production, Food and Beverage Production and Food and Beverage Service. Our institute boasts state-of-the-art equipment and furniture, providing our students with a hands-on learning experience in a modern and conducive environment.',
                paragraph3='We take pride in our team of highly skilled teachers, trainers, chefs, and demonstrators who work tirelessly to ensure our students to receive the highest quality education. Their expertise and commitment play a crucial role in shaping the future professionals of the culinary and hospitality industry.'
            )
            db.add(about)

            # Seed mission and vision
            mv = MissionVision(
                mission_text='The mission of Navy Institute of Hospitality Management (NIHOM) is to preserve and elevate the culinary arts in the form of practical and theoretical training. Through our various courses like food and beverage production, bakery and pastry production, food and beverage service we aim to inspire the students, make them skilled and confident in the culinary and service profession.',
                vision_text='Our vision of Navy Institute of Hospitality Management (NIHOM) extends beyond educating and training students to achieve professional excellence in the Hospitality Industry. We aspire to shape the individuals as qualified for future through unlocking true potential of them and nurturing their individual growth.'
            )
            db.add(mv)

            # Seed courses
            courses = [
                Course(slug='bakery-pastry', title='Bakery and Pastry Production',
                       short_description='Master the art of baking and pastry making with hands-on training in modern techniques and traditional methods.',
                       image_url='Nihom Web_extracted/images/bakery-pastry-production.jpg', display_order=1),
                Course(slug='food-beverage-production', title='Food and Beverage Production',
                       short_description='Learn professional cooking techniques, menu planning, and kitchen management from expert chefs.',
                       image_url='Nihom Web_extracted/images/food-beverage-production.jpg', display_order=2),
                Course(slug='food-beverage-service', title='Food and Beverage Service',
                       short_description='Develop excellence in service management, customer relations, and hospitality operations.',
                       image_url='Nihom Web_extracted/images/food-beverage-service.jpg', display_order=3)
            ]
            for course in courses:
                db.add(course)

            # Seed gallery
            gallery = [
                GalleryImage(image_url='Various Photos_extracted/images/gallery-1.jpg', alt_text='Bakery and Pastry Production - NIHOM', display_order=1),
                GalleryImage(image_url='Various Photos_extracted/images/gallery-2.jpg', alt_text='Bakery and Pastry Training - NIHOM', display_order=2),
                GalleryImage(image_url='Various Photos_extracted/images/gallery-3.jpg', alt_text='Pastry Arts - NIHOM', display_order=3),
                GalleryImage(image_url='Various Photos_extracted/images/gallery-4.jpg', alt_text='Food and Beverage Production - NIHOM', display_order=4),
                GalleryImage(image_url='Various Photos_extracted/images/gallery-5.jpg', alt_text='Culinary Training - NIHOM', display_order=5),
                GalleryImage(image_url='Various Photos_extracted/images/gallery-6.jpg', alt_text='Food and Beverage Service - NIHOM', display_order=6)
            ]
            for img in gallery:
                db.add(img)

            # Seed contact info
            contact = ContactInfo(
                location='Labonchora, Khulna\nCampus of School of Logistics and Management (SOLAM)\nBangladesh Navy',
                email='info@nihom.edu.bd',
                phone='Contact number coming soon'
            )
            db.add(contact)

            db.commit()
            print("[OK] Database initialized with seed data")
            print("[OK] Admin user: admin / admin123")
    finally:
        db.close()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
