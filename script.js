// =============================================
//               CONFIGURATION
// =============================================
const Config = {
    particles: {
        count: window.innerWidth < 768 ? 60 : 120,
        speed: 0.2,
        connectionDistance: 220,
        mouseRepelDistance: 120,
        mouseRepelForce: 0.05,
        friction: 0.995,
        margin: 150,
    },
    performance: {
        scrollPauseDelay: 150,
        targetFPS: 60,
    },
    animation: {
        fadeThreshold: 0.1,
        fadeRootMargin: '0px 0px -50px 0px',
    }
};

// =============================================
//              PARTICLE SYSTEM
// =============================================
class Particle {
    constructor(x, y, vx, vy, config) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.config = config;
    }

    update(bounds, mouse) {
        this.x += this.vx;
        this.y += this.vy;

        // Apply friction
        this.vx *= this.config.friction;
        this.vy *= this.config.friction;

        // Wrap around edges
        if (this.x < -this.config.margin) this.x = bounds.width + this.config.margin;
        if (this.x > bounds.width + this.config.margin) this.x = -this.config.margin;
        if (this.y < -this.config.margin) this.y = bounds.height + this.config.margin;
        if (this.y > bounds.height + this.config.margin) this.y = -this.config.margin;

        // Mouse repulsion
        if (mouse.x !== null) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distSq = dx * dx + dy * dy;
            
            if (distSq < this.config.mouseRepelDistance ** 2) {
                const distance = Math.sqrt(distSq);
                const force = (this.config.mouseRepelDistance - distance) / this.config.mouseRepelDistance;
                const angle = Math.atan2(dy, dx);
                this.vx += Math.cos(angle) * force * this.config.mouseRepelForce;
                this.vy += Math.sin(angle) * force * this.config.mouseRepelForce;
            }
        }
    }
}

class ParticleSystem {
    constructor(canvasId, config) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.config = config;
        this.particles = [];
        this.mouse = { x: null, y: null };
        this.animationId = null;
        this.isPaused = false;
        this.scrollTimeout = null;
        this.lastFrameTime = 0;
        this.frameInterval = 1000 / Config.performance.targetFPS;

        this.init();
    }

    init() {
        this.setupCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    setupCanvas() {
        this.devicePixelRatio = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.canvas.width = width * this.devicePixelRatio;
        this.canvas.height = height * this.devicePixelRatio;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;

        this.ctx.scale(this.devicePixelRatio, this.devicePixelRatio);
    }
    
    createParticles() {
        this.particles = [];
        const bounds = this.getBounds();
        for (let i = 0; i < this.config.count; i++) {
            const x = Math.random() * (bounds.width + this.config.margin * 2) - this.config.margin;
            const y = Math.random() * (bounds.height + this.config.margin * 2) - this.config.margin;
            const vx = (Math.random() - 0.5) * this.config.speed;
            const vy = (Math.random() - 0.5) * this.config.speed;
            this.particles.push(new Particle(x, y, vx, vy, this.config));
        }
    }

    bindEvents() {
        window.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: true });
        window.addEventListener('mouseout', this.handleMouseOut.bind(this));
        // This event listener handles window resizing to ensure the background scales.
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
        window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    }

    handleMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
    }

    handleMouseOut() {
        this.mouse.x = null;
        this.mouse.y = null;
    }
    
    // This function is called when the window is resized.
    handleResize() {
        // It re-calculates the canvas size and re-draws the particles.
        this.setupCanvas();
        this.createParticles();
    }

    handleScroll() {
        this.isPaused = true;
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.isPaused = false;
            if (!this.animationId) this.animate();
        }, Config.performance.scrollPauseDelay);
    }

    getBounds() {
        return {
            width: this.canvas.width / this.devicePixelRatio,
            height: this.canvas.height / this.devicePixelRatio,
        };
    }

    update() {
        const bounds = this.getBounds();
        this.particles.forEach(p => p.update(bounds, this.mouse));
    }
    
    draw() {
        const bounds = this.getBounds();
        this.ctx.clearRect(0, 0, bounds.width, bounds.height);
        
        const connDistSq = this.config.connectionDistance ** 2;

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                const distSq = (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;

                if (distSq < connDistSq) {
                    const opacity = 1 - distSq / connDistSq;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
                    this.ctx.stroke();
                }
            }
        }
    }

    animate(timestamp = 0) {
        if (this.isPaused) {
            this.animationId = null;
            return;
        }

        const deltaTime = timestamp - this.lastFrameTime;

        if (deltaTime >= this.frameInterval) {
            this.lastFrameTime = timestamp;
            this.update();
            this.draw();
        }
        
        this.animationId = requestAnimationFrame(this.animate.bind(this));
    }
    
    debounce(func, wait) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
}

// =============================================
//           COMPONENT FRAMEWORK
// =============================================
class Component {
    constructor(config = {}) {
        this.config = config;
        this.init();
    }

    init() {
        // To be implemented by child classes
    }
}

class Footer extends Component {
    async init() {
        this.container = document.getElementById('footer-container');
        if (!this.container) return;

        try {
            const response = await fetch('footer.html');
            if (!response.ok) throw new Error('Footer content not found');
            this.container.innerHTML = await response.text();
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }
}

class ScrollAnimator extends Component {
    init() {
        if (!('IntersectionObserver' in window)) return;

        this.elements = document.querySelectorAll('.experience-item, .project-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, this.config);
        
        this.elements.forEach(el => {
            el.classList.add('fade-init');
            observer.observe(el);
        });
    }
}

// =============================================
//                  MAIN APP
// =============================================
class App {
    constructor() {
        this.initComponents();
    }
    
    initComponents() {
        new ParticleSystem('particles-bg', Config.particles);
        new Footer();
        new ScrollAnimator({ 
            threshold: Config.animation.fadeThreshold,
            rootMargin: Config.animation.fadeRootMargin 
        });
    }
}

// =============================================
//                 INITIALIZE
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    new App();
});