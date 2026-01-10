/**
 * AICE - Premium Water Ripple Effect
 * Beautiful concentric ripples with click interaction
 */

(function() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width, height, centerX, centerY;
  let time = 0;
  let clickRipples = [];
  let mouseX = 0, mouseY = 0;
  
  // Configuration - BOLD & VISIBLE
  const config = {
    // Static rings
    numRings: 8,
    baseRadius: 50,
    ringGap: 100,
    ringColor: { r: 59, g: 130, b: 246 },
    maxOpacity: 0.25,    // Much more visible
    ringWidth: 2.5,      // Thicker rings
    
    // Animation
    pulseSpeed: 0.008,   // Faster pulse
    pulseAmount: 35,     // More movement
  };
  
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parent = canvas.parentElement;
    const rect = parent.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    ctx.scale(dpr, dpr);
    width = rect.width;
    height = rect.height;
    centerX = width / 2;
    centerY = height / 2;
  }
  
  function addClickRipple(x, y) {
    // Create multiple rings for premium effect - MORE VISIBLE
    for (let i = 0; i < 4; i++) {
      clickRipples.push({
        x: x,
        y: y,
        radius: i * 25,
        opacity: 0.7 - i * 0.12,  // Much higher opacity
        speed: 6 - i * 0.8,
        lineWidth: 4 - i * 0.6,   // Thicker lines
      });
    }
  }
  
  function drawBackground() {
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, Math.max(width, height) * 0.85
    );
    gradient.addColorStop(0, '#E8F4FD');
    gradient.addColorStop(0.3, '#EEF7FF');
    gradient.addColorStop(0.6, '#F5FAFF');
    gradient.addColorStop(1, '#FAFCFF');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  function drawStaticRings() {
    const { numRings, baseRadius, ringGap, ringColor, maxOpacity, ringWidth, pulseSpeed, pulseAmount } = config;
    
    // Breathing animation
    const breath = Math.sin(time * pulseSpeed) * pulseAmount;
    
    // Subtle parallax
    const offsetX = (mouseX - centerX) * 0.012;
    const offsetY = (mouseY - centerY) * 0.012;
    const cx = centerX + offsetX;
    const cy = centerY + offsetY;
    
    for (let i = 0; i < numRings; i++) {
      const phase = i * 0.2;
      const ringBreath = Math.sin(time * pulseSpeed + phase) * pulseAmount * (1 - i * 0.06);
      const radius = baseRadius + (i * ringGap) + ringBreath;
      const opacity = maxOpacity * Math.max(0, 1 - (i / numRings) * 0.75);
      
      if (opacity <= 0 || radius > Math.max(width, height)) continue;
      
      // Main ring
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ringColor.r}, ${ringColor.g}, ${ringColor.b}, ${opacity})`;
      ctx.lineWidth = ringWidth;
      ctx.stroke();
      
      // Soft glow for inner rings
      if (i < 5) {
        const glowGradient = ctx.createRadialGradient(cx, cy, radius - 20, cx, cy, radius + 20);
        glowGradient.addColorStop(0, `rgba(${ringColor.r}, ${ringColor.g}, ${ringColor.b}, 0)`);
        glowGradient.addColorStop(0.5, `rgba(${ringColor.r}, ${ringColor.g}, ${ringColor.b}, ${opacity * 0.2})`);
        glowGradient.addColorStop(1, `rgba(${ringColor.r}, ${ringColor.g}, ${ringColor.b}, 0)`);
        
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = glowGradient;
        ctx.lineWidth = 40;
        ctx.stroke();
      }
    }
  }
  
  function drawClickRipples() {
    const { ringColor } = config;
    
    clickRipples = clickRipples.filter(ripple => {
      ripple.radius += ripple.speed;
      ripple.opacity -= 0.006;
      
      if (ripple.opacity <= 0 || ripple.radius > 700) return false;
      
      // Main ring
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ringColor.r}, ${ringColor.g}, ${ringColor.b}, ${ripple.opacity})`;
      ctx.lineWidth = ripple.lineWidth;
      ctx.stroke();
      
      // Glow
      const glow = ctx.createRadialGradient(
        ripple.x, ripple.y, ripple.radius - 15,
        ripple.x, ripple.y, ripple.radius + 15
      );
      glow.addColorStop(0, `rgba(${ringColor.r}, ${ringColor.g}, ${ringColor.b}, 0)`);
      glow.addColorStop(0.5, `rgba(${ringColor.r}, ${ringColor.g}, ${ringColor.b}, ${ripple.opacity * 0.2})`);
      glow.addColorStop(1, `rgba(${ringColor.r}, ${ringColor.g}, ${ringColor.b}, 0)`);
      
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      ctx.strokeStyle = glow;
      ctx.lineWidth = 30;
      ctx.stroke();
      
      return true;
    });
  }
  
  function draw() {
    ctx.clearRect(0, 0, width, height);
    drawBackground();
    drawStaticRings();
    drawClickRipples();
    time++;
    requestAnimationFrame(draw);
  }
  
  // Initialize
  function init() {
    resize();
    
    // Resize handler
    window.addEventListener('resize', resize);
    
    // Mouse move for parallax
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Click handler for ripples
    canvas.addEventListener('click', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addClickRipple(x, y);
    });
    
    // Also trigger on touch
    canvas.addEventListener('touchstart', (e) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      addClickRipple(x, y);
    });
    
    // Initial dramatic ripple sequence on page load
    setTimeout(() => {
      addClickRipple(centerX, centerY);
    }, 300);
    setTimeout(() => {
      addClickRipple(centerX, centerY);
    }, 700);
    setTimeout(() => {
      addClickRipple(centerX, centerY);
    }, 1100);
    
    // Start animation
    draw();
  }
  
  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
