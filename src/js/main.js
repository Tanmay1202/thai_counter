import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scroll (Lenis) - Physical Viscosity
const lenis = new Lenis({
    lerp: 0.05, 
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Custom Cursor - Precision Adaptive Lens
const cursor = document.querySelector('.custom-cursor');
let cursorX = 0;
let cursorY = 0;

window.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    gsap.to(cursor, {
        x: cursorX - (cursor.offsetWidth / 2),
        y: cursorY - (cursor.offsetHeight / 2),
        duration: 0.5,
        ease: 'power4.out'
    });
});

// Magnetic & Viscous Navigation + Switch Buttons
const interactables = document.querySelectorAll('.nav-item, .nav-logo, .btn-switch, .submit-btn');
interactables.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        
        gsap.to(item, {
            x: x,
            y: y,
            duration: 0.4,
            ease: 'power2.out'
        });
        
        if (item.classList.contains('btn-switch') || item.classList.contains('submit-btn')) {
            gsap.to(cursor, { scale: 0.5, backgroundColor: '#fff', mixBlendMode: 'difference' });
        }
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            x: 0,
            y: 0,
            duration: 1,
            ease: 'elastic.out(1, 0.4)'
        });
        gsap.to(cursor, { scale: 1, backgroundColor: '', mixBlendMode: 'normal' });
    });
});

// Navigation Scroll State
const nav = document.querySelector('.main-nav');
ScrollTrigger.create({
    start: 'top -100',
    onUpdate: (self) => {
        if (self.direction === 1) {
            nav.classList.add('scrolled');
        } else if (self.scroll() < 100) {
            nav.classList.remove('scrolled');
        }
    }
});

// Parallax Assimilation - Multi-layered Depth
const parallaxElements = document.querySelectorAll('[data-speed]');
parallaxElements.forEach(el => {
    const speed = parseFloat(el.getAttribute('data-speed'));
    gsap.to(el, {
        y: -400 * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});

// Mask Reveals - Staggered Engineered Entry
const maskSections = document.querySelectorAll('section');
maskSections.forEach(section => {
    const children = section.querySelectorAll('.mask-child');
    if (children.length > 0) {
        gsap.set(children, { yPercent: 101 });
        
        gsap.to(children, {
            yPercent: 0,
            duration: 1.8,
            stagger: 0.1,
            ease: 'expo.inOut',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    }
});

// Background Stroke Text - Drifting Parallax
const bgText = document.querySelectorAll('.bg-text-stroke');
bgText.forEach(text => {
    gsap.to(text, {
        x: () => (text.style.left ? 100 : -100),
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
});

// Horizontal Scroll
const track = document.querySelector('.horizontal-track');
if (window.innerWidth > 768) {
    const horizontalScroll = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
            trigger: '.horizontal-scroll-section',
            start: 'top top',
            end: () => `+=${track.scrollWidth}`,
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
        }
    });

    // Menu Item Emergence
    const menuCards = document.querySelectorAll('.menu-card');
    menuCards.forEach(card => {
        gsap.from(card.querySelectorAll('.dish-number, .dish-name, .dish-desc'), {
            y: 80,
            opacity: 0,
            stagger: 0.2,
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalScroll,
                start: 'left center+=25%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

console.log('Thai Counter: Synthesized Anthology 3.0 Active.');
