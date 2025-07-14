// GSAP Animations for Peruvian Coffee Landing Page
// Using templates from the GSAP Template Builder system

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// ============================================
// HERO SECTION ANIMATIONS
// ============================================

// Hero title fade in with stagger (based on fadeIn template)
gsap.from("[data-element-id='hero-title']", {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power2.out",
    delay: 0.5
});

// Hero image scale in effect (based on scaleIn template)
gsap.from("[data-element-id='hero-image']", {
    opacity: 0,
    scale: 0.8,
    duration: 1.5,
    ease: "power3.out",
    delay: 0.8
});

// Hero CTA button with bounce effect
gsap.from("[data-element-id='hero-cta']", {
    opacity: 0,
    y: 30,
    scale: 0.9,
    duration: 1,
    ease: "back.out(1.7)",
    delay: 1.2
});

// ============================================
// FEATURES SECTION ANIMATIONS
// ============================================

// Features header fade in on scroll (based on fadeInOnScroll template)
gsap.from("[data-element-id='features-header']", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
        trigger: "[data-element-id='features-header']",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        once: true
    }
});

// Staggered feature cards reveal (based on staggerReveal template)
gsap.from("[data-element-id^='feature-']", {
    opacity: 0,
    y: 60,
    scale: 0.9,
    duration: 0.8,
    stagger: {
        amount: 0.8,
        from: "start"
    },
    scrollTrigger: {
        trigger: ".features-grid",
        start: "top 75%",
        toggleActions: "play none none reverse",
        once: true
    }
});

// ============================================
// TESTIMONIALS SECTION ANIMATIONS
// ============================================

// Testimonials header slide in from left
gsap.from("[data-element-id='testimonials-header']", {
    opacity: 0,
    x: -100,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "[data-element-id='testimonials-header']",
        start: "top 80%",
        toggleActions: "play none none reverse",
        once: true
    }
});

// Testimonial cards slide in from right with stagger
gsap.from("[data-element-id^='testimonial-']", {
    opacity: 0,
    x: 100,
    duration: 0.8,
    stagger: {
        amount: 0.6,
        from: "start"
    },
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".testimonials-grid",
        start: "top 75%",
        toggleActions: "play none none reverse",
        once: true
    }
});

// ============================================
// CTA SECTION ANIMATIONS
// ============================================

// CTA content fade in with scale
gsap.from("[data-element-id='cta-content']", {
    opacity: 0,
    scale: 0.9,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "[data-element-id='cta-content']",
        start: "top 80%",
        toggleActions: "play none none reverse",
        once: true
    }
});

// Counter animations for stats (based on counterAnimation template)
const stats = [
    { element: "stat-1", endValue: 5000 },
    { element: "stat-2", endValue: 12 },
    { element: "stat-3", endValue: 25 }
];

stats.forEach((stat, index) => {
    const counter = { value: 0 };
    
    gsap.to(counter, {
        value: stat.endValue,
        duration: 2.5,
        ease: "power2.out",
        delay: index * 0.3,
        scrollTrigger: {
            trigger: `[data-element-id='${stat.element}']`,
            start: "top 80%",
            toggleActions: "play none none reverse",
            once: true
        },
        onUpdate: function() {
            const element = document.querySelector(`[data-element-id='${stat.element}'] h3`);
            if (element) {
                element.textContent = Math.round(counter.value).toLocaleString("en-US");
            }
        }
    });
});

// CTA button with bounce effect
gsap.from("[data-element-id='cta-button']", {
    opacity: 0,
    y: 30,
    scale: 0.8,
    duration: 1,
    ease: "back.out(1.7)",
    delay: 0.5,
    scrollTrigger: {
        trigger: "[data-element-id='cta-button']",
        start: "top 80%",
        toggleActions: "play none none reverse",
        once: true
    }
});

// ============================================
// NAVIGATION ANIMATIONS
// ============================================

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: "power2.inOut"
            });
        }
    });
});

// ============================================
// PARALLAX EFFECTS
// ============================================

// Subtle parallax for hero background (based on basicParallax template)
gsap.to(".hero-background", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
    }
});

// ============================================
// INTERACTIVE HOVER EFFECTS
// ============================================

// Feature cards hover effect
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Testimonial cards hover effect
document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// =====================
// TESTIMONIALS CAROUSEL (3 visible, seamless infinite loop)
// =====================

function startTestimonialCarousel() {
    const track = document.querySelector('.carousel-track');
    const viewport = document.querySelector('.carousel-viewport');
    if (!track || !viewport) return;

    // Get all original cards
    const cards = Array.from(track.children);
    if (cards.length === 0) return;

    // Duplicate cards for seamless looping
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

    // Calculate card width including margin
    const cardStyle = getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth + parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);
    const totalCards = cards.length;
    const scrollWidth = cardWidth * totalCards;

    // Set track to flex so cards are in a row
    track.style.display = 'flex';
    track.style.willChange = 'transform';

    // Animate the track leftward, then reset for seamless loop
    gsap.to(track, {
        x: -scrollWidth,
        duration: 20, // Slower = higher number
        ease: "none",
        repeat: -1,
        modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % scrollWidth)
        }
    });
}

window.addEventListener('DOMContentLoaded', startTestimonialCarousel);

// ============================================
// LOADING ANIMATIONS
// ============================================

// Page load sequence

// ============================================
// RESPONSIVE ANIMATIONS
// ============================================

// Adjust animations for mobile devices
function checkMobile() {
    if (window.innerWidth <= 768) {
        // Disable some animations on mobile for better performance
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.scrub) {
                trigger.disable();
            }
        });
    }
}

// Check on load and resize
window.addEventListener('load', checkMobile);
window.addEventListener('resize', checkMobile);

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Clean up ScrollTrigger on page unload
window.addEventListener('beforeunload', () => {
    ScrollTrigger.killAll();
});

console.log('GSAP Animations loaded successfully for Peruvian Coffee Landing Page!'); 