/**
 * AICE - Award-Winning Water Ripple Effect
 * Premium concentric circles with fluid animation
 * Inspired by Kore.ai's hero section
 */

class WaterRipple {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.rings = [];
    this.clickRipples = [];
    this.time = 0;
    this.isRunning = false;
    
    // Premium configuration
    this.config = {
      // Static rings
      numRings: 12,
      baseRadius: 50,
      ringGap: 80,
      
      // Ring appearance  
      ringColor: { r: 59, g: 130, b: 246 },
      maxOpacity: 0.12,
      ringWidth: 1.2,
      
      // Animation
      pulseSpeed: 0.004,
      pulseAmount: 30,
      
      // Click ripple
      clickSpeed: 6,
      clickFade: 0.008,
      clickMaxRadius: 800,
    };
    
    this.init();
  }
  
  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    
    // Track mouse for subtle parallax
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    
    // Create click ripples
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.addClickRipple(e.clientX - rect.left, e.clientY - rect.top);
    });
    
    // Initial ripple on page load
    setTimeout(() => {
      this.addClickRipple(this.centerX, this.centerY);
    }, 500);
    
    this.start();
  }
  
  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parent = this.canvas.parentElement;
    const rect = parent.getBoundingClientRect();
    
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
  
  addClickRipple(x, y) {
    // Create multiple rings for each click
    for (let i = 0; i < 4; i++) {
      this.clickRipples.push({
        x: x,
        y: y,
        radius: i * 25,
        opacity: 0.35 - i * 0.08,
        speed: this.config.clickSpeed - i * 0.8,
        width: 2.5 - i * 0.4,
      });
    }
  }
  
  draw() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw premium radial gradient background
    this.drawBackground();
    
    // Draw static concentric rings with pulse animation
    this.drawRings();
    
    // Draw click ripples
    this.drawClickRipples();
    
    this.time++;
  }
  
  drawBackground() {
    // Beautiful radial gradient like Kore.ai
    const gradient = this.ctx.createRadialGradient(
      this.centerX, this.centerY, 0,
      this.centerX, this.centerY, Math.max(this.width, this.height) * 0.85
    );
    
    // Very soft blue gradient
    gradient.addColorStop(0, '#E8F4FD');    // Light blue center
    gradient.addColorStop(0.25, '#EEF7FF');
    gradient.addColorStop(0.5, '#F4FAFF');  // Fade to off-white
    gradient.addColorStop(0.75, '#F9FCFF');
    gradient.addColorStop(1, '#FEFEFE');    // Almost white edges
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
  
  drawRings() {
    const { numRings, baseRadius, ringGap, ringColor, maxOpacity, ringWidth, pulseSpeed, pulseAmount } = this.config;
    
    // Gentle breathing animation
    const breath = Math.sin(this.time * pulseSpeed) * pulseAmount;
    
    // Slight center offset based on mouse position for depth effect
    let offsetX = 0, offsetY = 0;
    if (this.mouseX !== undefined) {
      offsetX = (this.mouseX - this.centerX) * 0.015;
      offsetY = (this.mouseY - this.centerY) * 0.015;
    }
    
    const cx = this.centerX + offsetX;
    const cy = this.centerY + offsetY;
    
    for (let i = 0; i < numRings; i++) {
      // Each ring has a slightly different phase for a wave effect
      const phase = i * 0.25;
      const ringBreath = Math.sin(this.time * pulseSpeed + phase) * pulseAmount * (1 - i * 0.05);
      
      const radius = baseRadius + (i * ringGap) + ringBreath + breath * 0.3;
      
      // Fade opacity based on distance from center
      const opacity = maxOpacity * Math.max(0, 1 - (i / numRings) * 0.7);
      
      if (opacity <= 0) continue;
      
      // Main ring
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(${ringColor.r}, ${ringColor.g}, ${ringColor.b}, ${opacity})`;
      this.ctx.lineWidth = ringWidth;
      this.ctx.stroke();
      
      // Soft glow around rings (only for first 6 rings)
      if (i < 6) {
        const glowGradient = this.ctx.createRadialGradient(
          cx, cy, radius - 25,
          cx, cy, radius + 25
        );
        glowGradient.addColorStop(0, `rgba(${ringColor.r}, ${ringColor.g}, ${ringColor.b}, 0)`);
        glowGradient.addColorStop(0.5, `rgba(${ringColor.r}, ${ringColor.g}, ${ringColor.b}, ${opacity * 0.25})`);
        glowGradient.addColorStop(1, `rgba(${ringColor.r}, ${ringColor.g}, ${ringColor.b}, 0)`);
        
        this.ctx.beginPath();
        this.ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = glowGradient;
        this.ctx.lineWidth = 50;
        this.ctx.stroke();
      }
    }
  }
  
  drawClickRipples() {
    const { ringColor, clickMaxRadius, clickFade } = this.config;
    
    this.clickRipples = this.clickRipples.filter(ripple => {
      ripple.radius += ripple.speed;
      ripple.opacity -= clickFade;
      
      if (ripple.opacity <= 0 || ripple.radius >= clickMaxRadius) {
        return false;
      }
      
      // Main ring
      this.ctx.beginPath();
      this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(${ringColor.r}, ${ringColor.g}, ${ringColor.b}, ${ripple.opacity})`;
      this.ctx.lineWidth = ripple.width;
      this.ctx.stroke();
      
      // Glow effect
      const glow = this.ctx.createRadialGradient(
        ripple.x, ripple.y, ripple.radius - 20,
        ripple.x, ripple.y, ripple.radius + 20
      );
      glow.addColorStop(0, `rgba(${ringColor.r}, ${ringColor.g}, ${ringColor.b}, 0)`);
      glow.addColorStop(0.5, `rgba(${ringColor.r}, ${ringColor.g}, ${ringColor.b}, ${ripple.opacity * 0.25})`);
      glow.addColorStop(1, `rgba(${ringColor.r}, ${ringColor.g}, ${ringColor.b}, 0)`);
      
      this.ctx.beginPath();
      this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = glow;
      this.ctx.lineWidth = 40;
      this.ctx.stroke();
      
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    window.waterRipple = new WaterRipple(canvas);
  }
});
