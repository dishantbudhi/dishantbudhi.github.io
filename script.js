class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error('Canvas element not found');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            console.error('Could not get 2D context');
            return;
        }
        
        this.particles = [];
        this.mouse = { x: null, y: null };
        this.animationId = null;
        this.isPaused = false;
        this.scrollTimeout = null;

        this.config = {
            particleCount: this.getParticleCount(),
            particleSpeed: 0.4,
            connectionDistance: 150,
            mouseRepelDistance: 120,
            mouseRepelForce: 0.03,
            lineColor: 'rgba(255, 255, 255, 0.15)',
            backgroundColor: '#0a0a0a'
        };
        
        this.init();
    }
    
    getParticleCount() {
        // Use fewer particles on smaller screens for better performance
        return window.innerWidth < 768 ? 40 : 120;
    }

    init() {
        this.resizeCanvas();
        this.createParticles();
        this.addEventListeners();
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        const { particleCount, particleSpeed } = this.config;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * particleSpeed,
                vy: (Math.random() - 0.5) * particleSpeed
            });
        }
    }
    
    addEventListeners() {
        window.addEventListener('mousemove', e => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        
        window.addEventListener('mouseout', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
        
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.config.particleCount = this.getParticleCount();
            this.createParticles();
        });

        // Pause animation on scroll for smoother performance
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        this.isPaused = true;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.isPaused = false;
            this.animate();
        }, 150); // Resume animation 150ms after scrolling stops
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Move particle
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wall collision
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx = -particle.vx;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy = -particle.vy;
            
            // Mouse repulsion
            if (this.mouse.x !== null) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distSq = dx * dx + dy * dy;
                const repelDistSq = this.config.mouseRepelDistance * this.config.mouseRepelDistance;

                if (distSq < repelDistSq) {
                    const distance = Math.sqrt(distSq);
                    const force = (this.config.mouseRepelDistance - distance) / this.config.mouseRepelDistance;
                    const angle = Math.atan2(dy, dx);
                    particle.vx += Math.cos(angle) * force * this.config.mouseRepelForce;
                    particle.vy += Math.sin(angle) * force * this.config.mouseRepelForce;
                }
            }
            
            // Apply friction
            particle.vx *= 0.995;
            particle.vy *= 0.995;
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = this.config.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        const connectionDistSq = this.config.connectionDistance * this.config.connectionDistance;
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distSq = dx * dx + dy * dy;
                
                if (distSq < connectionDistSq) {
                    const opacity = 1 - (distSq / connectionDistSq);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }

        // Draw particles
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    animate() {
        if (this.isPaused) return;
        this.updateParticles();
        this.draw();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Particle System
    const particleSystem = new ParticleSystem('particles-bg');
    
    // Load Footer
    if (document.getElementById('footer-container')) {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Footer not found');
                return response.text();
            })
            .then(html => {
                document.getElementById('footer-container').innerHTML = html;
            })
            .catch(error => console.error('Error loading footer:', error));
    }
    
    // Animate elements on scroll
    if ('IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.experience-item, .project-card');
        
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            el.classList.add('fade-init');
            fadeObserver.observe(el);
        });
    }
});