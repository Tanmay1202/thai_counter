import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scroll (Lenis)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium exponential easing
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Custom Cursor - Flashlight Lens Logic
const cursor = document.querySelector('.custom-cursor');
let cursorX = 0;
let cursorY = 0;

window.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    gsap.to(cursor, {
        x: cursorX - 10,
        y: cursorY - 10,
        duration: 0.1,
        ease: 'none'
    });
});

// Cursor Interactions
const interactables = document.querySelectorAll('a, button, .menu-card, .nav-logo');
interactables.forEach(item => {
    item.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        gsap.to(cursor, {
            scale: item.classList.contains('menu-card') ? 6 : 4,
            duration: 0.4,
            ease: 'expo.out'
        });
    });
    
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        gsap.to(cursor, {
            scale: 1,
            duration: 0.4,
            ease: 'expo.out'
        });
    });
});

// Hero Animations - Staggered Reveal
const heroLines = document.querySelectorAll('.hero-title .line');
gsap.from(heroLines, {
    yPercent: 100,
    rotateX: -45,
    opacity: 0,
    stagger: 0.15,
    duration: 1.8,
    ease: 'expo.out',
    delay: 0.2
});

gsap.from('.hero-tagline', {
    opacity: 0,
    x: -30,
    duration: 1.5,
    ease: 'power3.out',
    delay: 1.2
});

// Horizontal Scroll - Personalized Flow
const track = document.querySelector('.horizontal-track');
if (window.innerWidth > 768) {
    const horizontalScroll = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
            trigger: '.horizontal-scroll-section',
            start: 'top top',
            end: () => `+=${track.scrollWidth}`,
            scrub: 1.5, // Added a bit more weight to the scrub
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            id: 'horizontalScroll'
        }
    });

    // Animate menu card elements during horizontal scroll
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        gsap.from(card.querySelectorAll('.dish-name, .dish-desc, .dish-number'), {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalScroll,
                start: 'left 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Optimization: Removing obsolete canvas noise
const oldCanvas = document.getElementById('noise-canvas');
if (oldCanvas) oldCanvas.remove();

console.log('Thai Counter: Midnight Anthology Loaded.');
