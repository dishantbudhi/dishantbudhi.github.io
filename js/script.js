document.addEventListener('DOMContentLoaded', function() {
    
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
        if (linkUrl.pathname === currentPath) {
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
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
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
