// JM Trade Advisory & Consulting
// Modern Interactive Features - Enhanced Version

(function() {
    'use strict';

    // DOM Elements
    const sections = document.querySelectorAll('.section');
    const header = document.querySelector('header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    // ========================================
    // Mobile Menu Toggle
    // ========================================
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const nav = document.querySelector('nav');
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu on link click
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.querySelector('nav');
            nav.classList.remove('active');
        });
    });

    // ========================================
    // Create Progress Dots
    // ========================================
    function createProgressDots() {
        const existingDots = document.querySelector('.scroll-progress');
        if (existingDots) existingDots.remove();
        
        const progressContainer = document.createElement('div');
        progressContainer.className = 'scroll-progress';
        
       // Update this section in your main.js (around line 45-50)
const sectionIds = ['home', 'market', 'about', 'services', 'pricing', 'insights', 'contact'];
const sectionLabels = ['Home', 'Market', 'About', 'Services', 'Pricing', 'Insights', 'Contact'];
        
        sectionIds.forEach((id, index) => {
            if (document.getElementById(id)) {
                const dot = document.createElement('div');
                dot.className = 'progress-dot';
                dot.setAttribute('data-section', id);
                dot.setAttribute('data-tooltip', sectionLabels[index]);
                dot.addEventListener('click', () => {
                    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
                });
                progressContainer.appendChild(dot);
            }
        });
        
        document.body.appendChild(progressContainer);
    }

    // ========================================
    // Update Active Section
    // ========================================
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 150;
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Update progress dots
        document.querySelectorAll('.progress-dot').forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
        
        // Update navigation links
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ========================================
    // Header Scroll Effect
    // ========================================
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // ========================================
    // Counter Animation (Enhanced)
    // ========================================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-box h3 .counter, .stat-box h3');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let counter = entry.target;
                    
                    // Find the actual counter element
                    if (!counter.classList.contains('counter')) {
                        counter = counter.querySelector('.counter');
                        if (!counter) return;
                    }
                    
                    // Get target value
                    let target = counter.getAttribute('data-target');
                    if (!target) {
                        const text = counter.innerText;
                        const match = text.match(/\d+(\.\d+)?/);
                        if (match) target = parseFloat(match[0]);
                        else return;
                    } else {
                        target = parseFloat(target);
                    }
                    
                    const hasPlus = counter.innerText.includes('+');
                    const hasB = counter.innerText.includes('B');
                    
                    if (counter.getAttribute('data-animated') === 'true') return;
                    counter.setAttribute('data-animated', 'true');
                    
                    let current = 0;
                    const increment = target / 60;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            let displayValue = Math.floor(current);
                            if (hasB) displayValue = (current / 1).toFixed(1);
                            counter.innerText = (hasB ? displayValue + 'B' : displayValue) + (hasPlus ? '+' : '');
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = (hasB ? target + 'B' : Math.floor(target)) + (hasPlus ? '+' : '');
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    // ========================================
    // Modern Intersection Observer for Cards
    // ========================================
    function setupScrollReveal() {
        const revealElements = document.querySelectorAll('.service-card, .stat-box, .blog-post, .pricing-card');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => {
            // Add initial class for CSS transition
            el.classList.add('reveal-element');
            revealObserver.observe(el);
        });
    }

    // ========================================
    // Parallax Effect on Hero
    // ========================================
    function setupParallax() {
        const hero = document.querySelector('.section-hero');
        if (!hero) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.35;
            hero.style.backgroundPosition = `50% ${rate}px`;
        });
    }

    // ========================================
    // Smooth Scroll to Next Section
    // ========================================
    window.scrollToNext = function() {
        const currentScroll = window.scrollY;
        let nextSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (sectionTop > currentScroll + 50 && !nextSection) {
                nextSection = section;
            }
        });
        
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // ========================================
    // Keyboard Navigation
    // ========================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            window.scrollToNext();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const currentScroll = window.scrollY;
            let prevSection = null;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (sectionTop < currentScroll - 50) {
                    prevSection = section;
                }
            });
            
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // ========================================
    // Set Initial Styles
    // ========================================
    function setInitialStyles() {
        // For the CSS-based animation (using .visible class)
        document.querySelectorAll('.service-card, .stat-box, .blog-post, .pricing-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#contact') {
                return;
            }
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========================================
    // Add CSS for visible class
    // ========================================
    function addVisibleStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .service-card.visible, 
            .stat-box.visible, 
            .blog-post.visible, 
            .pricing-card.visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .reveal-element {
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            /* Stagger animations */
            .service-card:nth-child(1).visible { transition-delay: 0.1s; }
            .service-card:nth-child(2).visible { transition-delay: 0.2s; }
            .service-card:nth-child(3).visible { transition-delay: 0.3s; }
            .service-card:nth-child(4).visible { transition-delay: 0.4s; }
            
            .stat-box:nth-child(1).visible { transition-delay: 0.1s; }
            .stat-box:nth-child(2).visible { transition-delay: 0.2s; }
            .stat-box:nth-child(3).visible { transition-delay: 0.3s; }
            
            .pricing-card:nth-child(1).visible { transition-delay: 0.1s; }
            .pricing-card:nth-child(2).visible { transition-delay: 0.2s; }
            .pricing-card:nth-child(3).visible { transition-delay: 0.3s; }
        `;
        document.head.appendChild(style);
    }

    // ========================================
    // Preload Images for Smooth Experience
    // ========================================
    function preloadImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            const src = img.getAttribute('src');
            if (src && !src.startsWith('data:')) {
                const preloader = new Image();
                preloader.src = src;
            }
        });
    }

    // ========================================
    // Initialize on Load
    // ========================================
    function init() {
        addVisibleStyles();
        createProgressDots();
        setInitialStyles();
        
        // Initial checks
        updateActiveSection();
        handleHeaderScroll();
        
        // Setup features
        setupScrollReveal();
        setupParallax();
        
        // Event listeners
        window.addEventListener('scroll', () => {
            updateActiveSection();
            handleHeaderScroll();
        });
        
        window.addEventListener('load', () => {
            updateActiveSection();
            setTimeout(() => {
                animateCounters();
                preloadImages();
            }, 100);
        });
    }

    // Start everything
    init();
})();