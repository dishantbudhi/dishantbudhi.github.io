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
        
        this.config = {
            particleCount: 150,
            particleSpeed: 0.4,
            connectionDistance: 150,
            mouseRepelDistance: 120,
            mouseRepelForce: 0.03,
            lineColor: 'rgba(255, 255, 255, 0.15)',
            backgroundColor: '#0a0a0a'
        };
        
        this.init();
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
        window.addEventListener('mousemove', (e) => {
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
            this.createParticles();
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx = -particle.vx;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy = -particle.vy;
            }
            
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.mouseRepelDistance) {
                    const force = (this.config.mouseRepelDistance - distance) / this.config.mouseRepelDistance;
                    const angle = Math.atan2(dy, dx);
                    particle.vx += Math.cos(angle) * force * this.config.mouseRepelForce;
                    particle.vy += Math.sin(angle) * force * this.config.mouseRepelForce;
                    
                    const maxSpeed = 2;
                    const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
                    if (speed > maxSpeed) {
                        particle.vx = (particle.vx / speed) * maxSpeed;
                        particle.vy = (particle.vy / speed) * maxSpeed;
                    }
                }
            }
            
            particle.vx *= 0.995;
            particle.vy *= 0.995;
            
            const minSpeed = 0.15;
            const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
            if (currentSpeed < minSpeed) {
                const angle = Math.atan2(particle.vy, particle.vx);
                particle.vx = Math.cos(angle) * minSpeed;
                particle.vy = Math.sin(angle) * minSpeed;
            }
        });
    }
    
    drawParticles() {
        this.ctx.fillStyle = this.config.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw particles as small dots
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Draw connections
        this.ctx.strokeStyle = this.config.lineColor;
        this.ctx.lineWidth = 0.5;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.config.connectionDistance) {
                    const opacity = 1 - (distance / this.config.connectionDistance);
                    this.ctx.globalAlpha = opacity * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        this.ctx.globalAlpha = 1;
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing particle system...');
    
    // Small delay to ensure canvas is properly rendered
    setTimeout(() => {
        const particleSystem = new ParticleSystem('particles-bg');
        console.log('Particle system initialized');
    }, 100);
    
    if (document.getElementById('footer-container')) {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Footer not found');
                return response.text();
            })
            .then(html => {
                document.getElementById('footer-container').innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                document.getElementById('footer-container').innerHTML = `
                    <footer class="footer" role="contentinfo">
                        <div class="footer-content">
                            <div class="footer-top-row">
                                <div class="footer-left">
                                    <span class="version" aria-label="Version">v3.0.7</span>
                                    <span class="update-date" id="last-updated" aria-label="Last updated">Last updated: July 2025</span>
                                </div>
                                <nav class="footer-links" aria-label="External links">
                                    <a href="https://github.com/dishantbudhi" class="footer-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                                        GitHub<sup aria-hidden="true">↗</sup>
                                    </a>
                                    <a href="https://www.linkedin.com/in/dishantbudhi" class="footer-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                                        LinkedIn<sup aria-hidden="true">↗</sup>
                                    </a>
                                    <a href="https://calendly.com/dbudhi" class="footer-link" target="_blank" rel="noopener noreferrer" aria-label="Schedule a meeting">
                                        Calendly<sup aria-hidden="true">↗</sup>
                                    </a>
                                    <a href="files/resume.docx" class="footer-link" download aria-label="Download resume">
                                        Resume<sup aria-hidden="true">↓</sup>
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </footer>
                `;
            });
    }
    
    if ('IntersectionObserver' in window) {
        setTimeout(() => {
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
        }, 100);
    }
});