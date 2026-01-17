/**
 * AICE - Main Application
 * Fluid animations, scroll reveals, and premium interactions
 */

// Smooth reveal animations on scroll
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('.reveal, .glass-card, .testimonial-card, .cta-card');
    this.init();
  }
  
  init() {
    // Add reveal class to elements
    this.elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    this.elements.forEach(el => observer.observe(el));
  }
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Premium hover effects
function setupHoverEffects() {
  // Cards with 3D tilt effect
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// Magnetic button effect
function setupMagneticButtons() {
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// Page load animation
function pageLoadAnimation() {
  document.body.classList.add('loaded');
  
  // Animate hero elements
  const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-cta');
  heroElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + index * 150);
  });
}

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.counter);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCounter();
        observer.disconnect();
      }
    });
    
    observer.observe(counter);
  });
}

// Hero video click-to-play functionality
function setupHeroVideoInteraction() {
  const heroSection = document.querySelector('.hero');
  const heroVideo = document.querySelector('.hero-video');
  
  if (heroSection && heroVideo) {
    heroSection.style.cursor = 'pointer';
    
    // Use capture phase to ensure we get the click first
    heroSection.addEventListener('click', (e) => {
      // Don't trigger on button clicks or links
      if (e.target.closest('.btn') || e.target.closest('a') || e.target.closest('button')) return;
      
      // Restart the video from beginning
      heroVideo.pause();
      heroVideo.currentTime = 0;
      
      // Use a promise-based play with error handling
      const playPromise = heroVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Video play was prevented:', error);
        });
      }
      
      // Add a subtle pulse effect on click
      heroSection.classList.add('hero-clicked');
      setTimeout(() => {
        heroSection.classList.remove('hero-clicked');
      }, 600);
    }, true); // Use capture phase
    
    console.log('✅ Hero video interaction initialized');
  } else {
    console.log('⚠️ Hero section or video not found');
  }
}


// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  pageLoadAnimation();
  setupSmoothScroll();
  setupHoverEffects();
  setupHeroVideoInteraction();
  // setupMagneticButtons(); // Uncomment for magnetic button effect
  animateCounters();
  
  // Delayed scroll reveal for smoother page load
  setTimeout(() => {
    new ScrollReveal();
  }, 100);
  
  console.log('✨ AICE Landing Page Initialized');
});

// Preload critical resources
window.addEventListener('load', () => {
  // Add any post-load animations or optimizations here
});
