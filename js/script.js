document.addEventListener('DOMContentLoaded', function() {
    
    // --- PRELOADER ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Initialize all components
    initNavigation();
    initSlideshow();
    initModal();
    initScrollAnimations();
});

// --- NAVIGATION ---
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navbar.classList.toggle('nav-open');
        });
    }

    // Set active link
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        const linkUrl = new URL(link.href);
        // Match either the directory or the index.html file within it
        if (linkUrl.pathname === currentPath || `${linkUrl.pathname}index.html` === currentPath) {
            link.classList.add('active');
        }
    });
}


// --- SLIDESHOW ---
let slideIndex = 1;

function initSlideshow() {
    if (document.querySelector('.slideshow-container')) {
        showSlides(slideIndex);
    }
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  if (slides.length === 0) return;

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}


// --- IMAGE MODAL ---
function initModal() {
    const modal = document.getElementById("imageModal");
    if (!modal) return;

    const modalImg = document.getElementById("modalImage");
    const images = document.getElementsByClassName('slide-image');
    const closeBtn = document.getElementsByClassName("close-modal-btn")[0];

    for (let i = 0; i < images.length; i++) {
        images[i].onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
        }
    }

    if(closeBtn) {
        closeBtn.onclick = function() {
            closeAndResetModal();
        }
    }

    modalImg.onclick = function() {
        this.classList.toggle('zoomed-in');
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            closeAndResetModal();
        }
    }

    function closeAndResetModal() {
        modal.style.display = "none";
        modalImg.classList.remove('zoomed-in');
    }
}

// --- SCROLL ANIMATIONS ---
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');

                    // Handle staggered children animations
                    if (entry.target.hasAttribute('data-stagger-children')) {
                        const children = entry.target.querySelectorAll('.feature-card, .project-card, .toolkit-category');
                        children.forEach((child, index) => {
                            child.setAttribute('data-stagger-child', '');
                            child.style.setProperty('--stagger-delay', (index * 150) + 'ms');
                        });
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15 // A bit more of the element needs to be visible
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => {
            el.classList.add('visible');
        });
    }
}