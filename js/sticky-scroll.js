/**
 * AICE - Sticky Scroll Section Controller
 * Handles the "What AICE Can Do" section with proper scroll-based activation
 */

class StickyScrollController {
  constructor() {
    this.section = document.querySelector('.sticky-scroll-section');
    this.items = document.querySelectorAll('.sticky-scroll-item');
    this.panels = document.querySelectorAll('.sticky-scroll-panel');
    
    if (!this.section || !this.items.length || !this.panels.length) return;
    
    this.activeIndex = 0;
    this.init();
  }
  
  init() {
    // Set initial active state
    this.setActiveItem(0);
    
    // Setup click handlers for nav items
    this.items.forEach((item, index) => {
      item.addEventListener('click', () => {
        this.setActiveItem(index);
        this.scrollToPanel(index);
      });
    });
    
    // Setup scroll-based activation using Intersection Observer
    this.setupScrollObserver();
  }
  
  setupScrollObserver() {
    const options = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Trigger when panel is in middle of viewport
      threshold: 0,
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          if (!isNaN(index) && index !== this.activeIndex) {
            this.setActiveItem(index);
          }
        }
      });
    }, options);
    
    this.panels.forEach(panel => {
      observer.observe(panel);
    });
  }
  
  setActiveItem(index) {
    this.activeIndex = index;
    
    // Update nav items
    this.items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
    
    // Update panels
    this.panels.forEach((panel, i) => {
      panel.classList.toggle('active', i === index);
    });
  }
  
  scrollToPanel(index) {
    const panel = this.panels[index];
    if (panel) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.stickyScrollController = new StickyScrollController();
});
