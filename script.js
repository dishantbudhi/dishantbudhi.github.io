// Function to initialize tsParticles (Corrected)
async function loadParticles(id, options) {
    await tsParticles.load(id, options);
}

// Configuration for the particle animation
const particlesConfig = {
    fpsLimit: 60,
    particles: {
        color: { value: "#ffffff" },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: "out",
            random: false,
            speed: 1,
            straight: false,
        },
        number: {
            density: {
                enable: true,
            },
            value: 80,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 3 },
        },
    },
    interactivity: {
        detectsOn: "window", // THIS IS THE FIX
        events: {
            onHover: {
                enable: true,
                mode: "repulse",
            },
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4,
            },
        },
    },
    detectRetina: true,
};

// Load footer with error handling
async function loadFooter() {
    try {
        const response = await fetch('footer.html');
        if (!response.ok) throw new Error('Footer failed to load');
        const data = await response.text();
        document.getElementById('footer-container').innerHTML = data;
        await setLastUpdatedDate(); // Call after footer is loaded
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

// Fetches the last commit date from GitHub and updates the footer
async function setLastUpdatedDate() {
    const dateElement = document.getElementById('last-updated');
    if (!dateElement) return;

    try {
        // Fetch the latest commit from your repository
        const response = await fetch('https://api.github.com/repos/dishantbudhi/dishantbudhi.github.io/commits?per_page=1');
        if (!response.ok) throw new Error('Failed to fetch last commit date from GitHub');
        
        const data = await response.json();
        const lastCommitDate = new Date(data[0].commit.committer.date);
        
        const year = lastCommitDate.getFullYear();
        const month = String(lastCommitDate.getMonth() + 1).padStart(2, '0');
        const day = String(lastCommitDate.getDate()).padStart(2, '0');
        
        dateElement.textContent = `LAST UPDATED ${year}-${month}-${day}`;
    } catch (error) {
        console.error('Error fetching last updated date:', error);
        // Fallback to today's date if the API call fails
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        dateElement.textContent = `LAST UPDATED ${year}-${month}-${day}`;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Correctly call the loadParticles function
    loadParticles("tsparticles", particlesConfig);
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