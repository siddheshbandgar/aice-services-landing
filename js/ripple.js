/**
 * AICE - Water Ripple Effect (Kore.ai style)
 * Creates concentric circular ripples emanating from center with subtle animation
 */

class WaterRipple {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ripples = [];
    this.isRunning = false;
    this.centerX = 0;
    this.centerY = 0;
    
    // Configuration for kore.ai style ripples
    this.config = {
      rippleCount: 6,           // Number of concentric rings
      baseRadius: 80,           // Starting radius
      ringSpacing: 120,         // Space between rings
      animationSpeed: 0.3,      // How fast rings expand
      maxExpansion: 50,         // Max expansion during animation
      baseOpacity: 0.08,        // Base opacity of rings
      color: { r: 59, g: 130, b: 246 } // Blue color
    };
    
    this.phase = 0;
    this.init();
  }
  
  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Click to create ripple burst
    this.canvas.addEventListener('click', (e) => {
      this.createClickRipple(e);
    });
    
    this.start();
  }
  
  resize() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
  }
  
  createClickRipple(event) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Add a new click ripple
    this.ripples.push({
      x: x,
      y: y,
      radius: 0,
      maxRadius: 500,
      opacity: 0.3,
      speed: 4
    });
  }
  
  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw background gradient (radial, light blue center to white edges)
    const bgGradient = this.ctx.createRadialGradient(
      this.centerX, this.centerY, 0,
      this.centerX, this.centerY, Math.max(this.width, this.height) * 0.7
    );
    bgGradient.addColorStop(0, '#E0F4FD');
    bgGradient.addColorStop(0.3, '#EBF8FF');
    bgGradient.addColorStop(0.6, '#F5FBFF');
    bgGradient.addColorStop(1, '#FFFFFF');
    
    this.ctx.fillStyle = bgGradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw concentric static ripples (like kore.ai)
    this.drawConcentricRipples();
    
    // Draw click ripples
    this.drawClickRipples();
  }
  
  drawConcentricRipples() {
    const { rippleCount, baseRadius, ringSpacing, animationSpeed, maxExpansion, baseOpacity, color } = this.config;
    
    // Slow breathing animation
    const breathe = Math.sin(this.phase * animationSpeed) * maxExpansion;
    
    for (let i = 0; i < rippleCount; i++) {
      const radius = baseRadius + (i * ringSpacing) + breathe * (1 - i * 0.1);
      const opacity = baseOpacity * (1 - i * 0.12);
      
      if (opacity <= 0) continue;
      
      // Draw ring
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
      
      // Draw softer inner glow for first few rings
      if (i < 3) {
        const glowGradient = this.ctx.createRadialGradient(
          this.centerX, this.centerY, radius - 20,
          this.centerX, this.centerY, radius + 20
        );
        glowGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        glowGradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * 0.3})`);
        glowGradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = glowGradient;
        this.ctx.lineWidth = 40;
        this.ctx.stroke();
      }
    }
    
    this.phase += 0.02;
  }
  
  drawClickRipples() {
    this.ripples = this.ripples.filter(ripple => {
      ripple.radius += ripple.speed;
      ripple.opacity -= 0.008;
      
      if (ripple.opacity <= 0 || ripple.radius >= ripple.maxRadius) {
        return false;
      }
      
      // Draw expanding ring
      this.ctx.beginPath();
      this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(59, 130, 246, ${ripple.opacity})`;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      
      // Draw second ring following
      if (ripple.radius > 30) {
        this.ctx.beginPath();
        this.ctx.arc(ripple.x, ripple.y, ripple.radius - 30, 0, Math.PI * 2);
        this.ctx.strokeStyle = `rgba(59, 130, 246, ${ripple.opacity * 0.6})`;
        this.ctx.lineWidth = 1.5;
        this.ctx.stroke();
      }
      
      return true;
    });
  }
  
  animate() {
    this.draw();
    
    if (this.isRunning) {
      requestAnimationFrame(() => this.animate());
    }
  }
  
  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }
  
  stop() {
    this.isRunning = false;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    window.waterRipple = new WaterRipple(canvas);
  }
});
