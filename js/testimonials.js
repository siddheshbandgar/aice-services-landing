/**
 * AICE - Testimonials Carousel Controller
 * Auto-scrolling carousel with pause on hover
 */

class TestimonialsCarousel {
  constructor() {
    this.carousel = document.querySelector('.testimonials-carousel');
    this.track = document.querySelector('.testimonials-track');
    this.dots = document.querySelectorAll('.testimonial-dot');
    this.cards = document.querySelectorAll('.testimonial-card');
    
    if (!this.carousel || !this.track) return;
    
    this.init();
  }
  
  init() {
    // Clone cards for infinite scroll
    this.setupInfiniteScroll();
    
    // Setup dot navigation if present
    if (this.dots.length) {
      this.setupDotNavigation();
    }
  }
  
  setupInfiniteScroll() {
    // Clone all cards and append to track
    const cards = this.track.querySelectorAll('.testimonial-card');
    cards.forEach(card => {
      const clone = card.cloneNode(true);
      this.track.appendChild(clone);
    });
  }
  
  setupDotNavigation() {
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
      });
    });
  }
  
  goToSlide(index) {
    // Update dots
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    // Pause animation and scroll to position
    this.track.style.animationPlayState = 'paused';
    
    const cardWidth = this.cards[0]?.offsetWidth || 400;
    const gap = 24; // spacing-6
    const offset = index * (cardWidth + gap);
    
    this.track.style.transform = `translateX(-${offset}px)`;
    
    // Resume animation after a delay
    setTimeout(() => {
      this.track.style.transform = '';
      this.track.style.animationPlayState = 'running';
    }, 3000);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.testimonialsCarousel = new TestimonialsCarousel();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TestimonialsCarousel;
}
