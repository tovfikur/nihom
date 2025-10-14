// Mobile Menu Toggle with fancy effects
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

mobileMenu.addEventListener('click', () => {
    const isActive = mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');

    // Add haptic feedback simulation
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }

    // Prevent body scroll when menu is open
    if (isActive) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = 'auto';
    });
});

// Close menu when clicking on overlay (outside menu)
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = 'auto';
    }
});

// Prevent menu close when clicking inside menu
navMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Add touch swipe to close menu
let touchStartX = 0;
let touchEndX = 0;

navMenu.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

navMenu.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    if (touchEndX > touchStartX + 50) { // Swipe right to close
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = 'auto';
    }
}

// Add hover effect sound (optional - can be commented out)
const navLinksHover = document.querySelectorAll('.nav-link');
navLinksHover.forEach(link => {
    link.addEventListener('mouseenter', () => {
        // Visual feedback is enough, but you could add audio here
        link.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// ============================================
// HERO SECTION - EXTRAORDINARY EFFECTS
// ============================================

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = window.innerWidth > 768 ? 50 : 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${startX}%;
            top: ${startY}%;
            animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
            box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.5);
        `;

        particlesContainer.appendChild(particle);
    }
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles on load
document.addEventListener('DOMContentLoaded', createParticles);

// Mouse parallax effect for hero
const hero = document.querySelector('.hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const moveX = (clientX / innerWidth - 0.5) * 30;
        const moveY = (clientY / innerHeight - 0.5) * 30;

        // Apply parallax to floating shapes
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });

        // Apply parallax to gradient orbs
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.3;
            orb.style.transform = `translate(${-moveX * speed}px, ${-moveY * speed}px)`;
        });
    });
}

// Animated counter for stats
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, duration / steps);
}

// Observe stats and trigger counter when visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(num => {
                if (num.textContent === '0') {
                    animateCounter(num);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Enhanced scroll parallax for hero elements
let ticking = false;

function updateHeroParallax() {
    const scrolled = window.pageYOffset;
    const heroHeight = hero ? hero.offsetHeight : 0;

    if (scrolled < heroHeight) {
        const scrollPercent = scrolled / heroHeight;

        // Parallax for hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - scrollPercent * 1.2;
        }

        // Parallax for shapes
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Parallax for orbs
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, index) => {
            const speed = 0.15 + (index * 0.05);
            orb.style.transform = `translateY(${scrolled * speed}px) scale(${1 + scrollPercent * 0.2})`;
        });
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateHeroParallax);
        ticking = true;
    }
});

// ============================================
// NAVBAR AND NAVIGATION
// ============================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for navigation links with proper offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navbarHeight = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Here you would normally send the data to a server
    // For now, we'll just show a success message
    alert(`Thank you, ${name}! Your message has been received. We will get back to you soon.`);

    // Reset form
    contactForm.reset();
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.course-card, .feature-card, .gallery-item, .info-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Gallery lightbox effect
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Add styles for lightbox
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;

        const content = lightbox.querySelector('.lightbox-content');
        content.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
            animation: zoomIn 0.3s ease;
        `;

        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.style.cssText = `
            max-width: 100%;
            max-height: 90vh;
            border-radius: 10px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        `;

        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 40px;
            color: white;
            cursor: pointer;
            transition: color 0.3s ease;
        `;

        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.color = '#f39c12';
        });

        closeBtn.addEventListener('mouseout', () => {
            closeBtn.style.color = 'white';
        });

        // Close lightbox
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }, 300);
        };

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes zoomIn {
        from {
            transform: scale(0.8);
        }
        to {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Course card view details button
const viewButtons = document.querySelectorAll('.btn-view');

viewButtons.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const courseCard = btn.closest('.course-card');
        const courseTitle = courseCard.querySelector('.course-title').textContent;
        alert(`More information about "${courseTitle}" will be available soon. Please contact us for detailed course information.`);
    });
});

// Enhanced parallax effect for hero and sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    // Hero parallax
    if (hero && scrolled < hero.offsetHeight) {
        const heroContent = hero.querySelector('.hero-content');
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / (hero.offsetHeight * 0.8));
        }
    }

    // Parallax for sections
    const sections = document.querySelectorAll('.about-section, .courses-section, .gallery-section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;

        if (scrollPercent > 0 && scrollPercent < 1) {
            const pseudoElements = section.querySelectorAll('::before, ::after');
            section.style.setProperty('--scroll-y', `${scrollPercent * 50}px`);
        }
    });
});

// Form validation
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '' && input.hasAttribute('required')) {
            input.style.borderColor = '#e74c3c';
        } else {
            input.style.borderColor = 'transparent';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = '#3498db';
    });
});

// Email validation
const emailInput = document.getElementById('email');

emailInput.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#e74c3c';
    } else {
        emailInput.style.borderColor = 'transparent';
    }
});

// Counter animation for statistics (can be added later)
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Typing effect for hero subtitle (optional)
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;

    const typeWriter = () => {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    // Start typing effect after page loads
    setTimeout(typeWriter, 500);
}

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Magnetic button effect for hero buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
});

// Card tilt effect
const cards = document.querySelectorAll('.course-card, .feature-card, .info-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Ripple effect on buttons
document.querySelectorAll('.btn, .btn-view').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
        `;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Smooth scroll reveal with stagger effect
const observeWithStagger = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Text reveal animation for about section
const aboutText = document.querySelectorAll('.about-text p, .mission-box');
aboutText.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observeWithStagger.observe(el);
});

// Navbar link hover effect enhancement
navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.letterSpacing = '1px';
    });

    link.addEventListener('mouseleave', function() {
        this.style.letterSpacing = '0px';
    });
});

// Gallery item sequential reveal
const galleryItemsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 150;
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, delay);
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(40px) scale(0.9)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    galleryItemsObserver.observe(item);
});

// Add loading state to form submit
const submitButton = document.querySelector('.btn-submit');
if (submitButton) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        submitButton.textContent = 'Sending...';
        submitButton.style.pointerEvents = 'none';

        setTimeout(() => {
            const name = document.getElementById('name').value;
            alert(`Thank you, ${name}! Your message has been received. We will get back to you soon.`);

            submitButton.textContent = 'Send Message';
            submitButton.style.pointerEvents = 'auto';
            contactForm.reset();
        }, 1500);
    });
}

console.log('NIHOM Website - Developed with care');
console.log('Navy Institute of Hospitality Management');
console.log('Excellence in Culinary Arts & Hospitality Education');