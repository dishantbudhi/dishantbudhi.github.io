// Load footer with error handling
async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        if (!response.ok) throw new Error('Footer failed to load');
        const data = await response.text();
        document.getElementById('footer-container').innerHTML = data;
    } catch (error) {
        console.error('Error loading footer:', error);
        // Fallback footer content
        document.getElementById('footer-container').innerHTML = `
            <footer class="footer">
                <div class="footer-content">
                    <div class="footer-right">
                        <a href="mailto:budhi.d@northeastern.edu" class="footer-email">budhi.d@northeastern.edu</a>
                    </div>
                </div>
            </footer>
        `;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadFooter();
    
    // Add subtle hover effects to project cards (desktop only)
    if (window.matchMedia('(hover: hover)').matches) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', handleProjectHover);
            card.addEventListener('mouseleave', handleProjectLeave);
        });
    }
    
    // Smooth scroll for anchor links
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
    
    // Add touch feedback for mobile
    addTouchFeedback();
    
    // Lazy load enhancements
    setupLazyLoading();
    
    // Add intersection observer for subtle animations
    setupScrollAnimations();
});

// Project card hover handlers
function handleProjectHover(e) {
    e.currentTarget.style.transform = 'translateY(-4px)';
}

function handleProjectLeave(e) {
    e.currentTarget.style.transform = 'translateY(0)';
}

// Touch feedback for better mobile UX
function addTouchFeedback() {
    const touchElements = document.querySelectorAll('a, button');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            this.style.opacity = '';
        }, { passive: true });
    });
}

// Setup lazy loading for images if needed
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        // Observe any future lazy-loaded images
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Subtle scroll animations
function setupScrollAnimations() {
    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.experience-item, .project-card');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeObserver.observe(el);
        });
    }
}

// Detect if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Console easter egg with ASCII art
console.log('%c' + `
    ╔════════════════════════════╗
    ║   Hey there, developer! 👋  ║
    ╚════════════════════════════╝
`, 'font-family: monospace; color: #00ff00;');
console.log('%cLooking for the source? Check out: https://github.com/dishantbudhi', 'font-size: 14px; color: #999;');
console.log('%cInterested in working together? Get in touch: budhi.d@northeastern.edu', 'font-size: 14px; color: #999;');

// Performance monitoring (dev only)
if (window.location.hostname === 'localhost') {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
    });
}