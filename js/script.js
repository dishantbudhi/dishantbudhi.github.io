// Enhanced Portfolio Script with Fluid Animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize
    initNavigation();
    initAnimations();
    initParallax();
    initTiltEffect();
    initPageTransitions();

    // Specific initializations based on page
    if (document.querySelector('.photo-gallery')) {
        initImageModal();
    }
    
    // Navigation Enhancement
    function initNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-links a');
        const navToggle = document.querySelector('.nav-toggle');
        const currentPath = window.location.pathname;
        
        // Active link highlighting
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (currentPath.endsWith(linkPath) || 
                (linkPath === 'index.html' && (currentPath.endsWith('/') || currentPath === ''))) {
                link.classList.add('active');
            }
        });
        
        // Navbar scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScroll = currentScroll;
        });
        
        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navbar.classList.toggle('mobile-open');
            });
        }
    }
    
    // Advanced Animations
    function initAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        document.querySelectorAll('[class*="fade"], [class*="slide"], .feature-card, .timeline-item, .project-card').forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
        
        // Stagger animations for cards
        const cards = document.querySelectorAll('.feature-card, .project-card, .value-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
    
    // Parallax Effect
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.gradient-orb, .floating-element');
        
        if (parallaxElements.length === 0) return;
        
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.parallaxSpeed || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }
    
    // 3D Tilt Effect
    function initTiltEffect() {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            });
            
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
    
    // Smooth Page Transitions
    function initPageTransitions() {
        const links = document.querySelectorAll('a:not([href^="#"]):not([target="_blank"])');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const url = new URL(link.href, window.location.origin);

                if (url.hostname === window.location.hostname) {
                    e.preventDefault();
                    document.body.classList.add('fade-out');
                    setTimeout(() => {
                        window.location.href = link.href;
                    }, 300);
                }
            });
        });
        
        window.addEventListener('pageshow', () => {
            document.body.classList.remove('fade-out');
        });
    }

    // Image Modal Functionality
    function initImageModal() {
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImage");
        const captionText = document.getElementById("modal-caption");
        const galleryItems = document.querySelectorAll(".gallery-item");
        const closeModalBtn = document.querySelector(".close-modal-btn");
        const modalContentWrapper = document.querySelector('.modal-content-wrapper');

        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const content = this.querySelector('.gallery-content');
                
                if (img && content) {
                    modal.style.display = "flex";
                    setTimeout(() => modal.classList.add('visible'), 10);
                    modalImg.src = img.src;
                    captionText.innerHTML = content.innerHTML;
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        function closeModal() {
            modal.classList.remove('visible');
            document.body.style.overflow = 'auto';
            
            setTimeout(() => {
                modal.style.display = "none";
                resetZoom();
            }, 300);
        }

        function resetZoom() {
            modalImg.classList.remove('zoomed-in');
            if(modalContentWrapper) {
                modalContentWrapper.scrollTop = 0;
                modalContentWrapper.scrollLeft = 0;
            }
        }

        if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        
        window.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.style.display !== "none") {
                closeModal();
            }
        });
        
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                closeModal();
            }
        });

        modalImg.addEventListener('click', (e) => {
            e.stopPropagation();
            modalImg.classList.toggle('zoomed-in');
            
            if (!modalImg.classList.contains('zoomed-in')) {
                resetZoom();
            }
        });
    }
    
    // Mouse Trail Effect (for desktop)
    if (window.innerWidth > 768) {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        document.body.appendChild(trail);
        
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateTrail() {
            const speed = 0.1;
            
            trailX += (mouseX - trailX) * speed;
            trailY += (mouseY - trailY) * speed;
            
            trail.style.transform = `translate(${trailX}px, ${trailY}px)`;
            
            requestAnimationFrame(animateTrail);
        }
        
        animateTrail();
    }
    
    // Dynamic Background Animation
    const dynamicBg = document.querySelector('.dynamic-bg');
    if (dynamicBg) {
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            
            const orbs = dynamicBg.querySelectorAll('.gradient-orb');
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 20;
                orb.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
            });
        });
    }
    
    // Typing Effect for Hero Title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const words = heroTitle.querySelectorAll('.word');
        words.forEach((word, index) => {
            word.style.animationDelay = `${index * 0.15}s`;
        });
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Performance optimization - Debounce resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reinitialize effects that depend on viewport size
            if (window.innerWidth <= 768) {
                // Remove mouse trail on mobile
                const trail = document.querySelector('.mouse-trail');
                if (trail) trail.remove();
            }
        }, 250);
    });
});

// Add CSS for mouse trail
const style = document.createElement('style');
style.textContent = `
    .mouse-trail {
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, var(--primary) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        mix-blend-mode: screen;
        opacity: 0.5;
    }
    
    body.fade-out {
        opacity: 0;
        transition: opacity 0.3s ease-out;
    }
`;
document.head.appendChild(style);