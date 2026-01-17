/**
 * AICE - Testimonials Carousel with Arrow Navigation
 */

class TestimonialsCarousel {
  constructor() {
    this.track = document.querySelector('.testimonials-track');
    this.cards = document.querySelectorAll('.testimonial-card');
    this.dots = document.querySelectorAll('.testimonial-dot');
    this.prevBtn = document.getElementById('testimonialPrev');
    this.nextBtn = document.getElementById('testimonialNext');
    
    if (!this.track || !this.cards.length) return;
    
    this.currentIndex = 0;
    this.cardsPerView = this.getCardsPerView();
    this.maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
    
    this.init();
  }
  
  init() {
    // Arrow buttons
    this.prevBtn?.addEventListener('click', () => this.prev());
    this.nextBtn?.addEventListener('click', () => this.next());
    
    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goTo(index));
    });
    
    // Handle resize
    window.addEventListener('resize', () => {
      this.cardsPerView = this.getCardsPerView();
      this.maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
      this.goTo(Math.min(this.currentIndex, this.maxIndex));
    });
    
    // Initial state
    this.updateButtons();
  }
  
  getCardsPerView() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }
  
  prev() {
    if (this.currentIndex > 0) {
      this.goTo(this.currentIndex - 1);
    }
  }
  
  next() {
    if (this.currentIndex < this.maxIndex) {
      this.goTo(this.currentIndex + 1);
    }
  }
  
  goTo(index) {
    this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
    
    // Calculate offset
    const cardWidth = this.cards[0].offsetWidth;
    const gap = 24; // Match CSS gap
    const offset = this.currentIndex * (cardWidth + gap);
    
    this.track.style.transform = `translateX(-${offset}px)`;
    
    this.updateDots();
    this.updateButtons();
  }
  
  updateDots() {
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }
  
  updateButtons() {
    if (this.prevBtn) {
      this.prevBtn.disabled = this.currentIndex === 0;
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
    }
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  window.testimonials = new TestimonialsCarousel();
});
