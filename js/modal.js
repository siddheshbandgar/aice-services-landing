/**
 * AICE - Demo Modal Controller
 * Handles the Book a Demo modal functionality
 */

class DemoModal {
  constructor() {
    this.overlay = document.querySelector('.modal-overlay');
    this.modal = document.querySelector('.modal');
    this.form = document.querySelector('#demo-form');
    this.formContent = document.querySelector('.form-content');
    this.successMessage = document.querySelector('.form-success');
    this.closeBtn = document.querySelector('.modal-close');
    this.openBtns = document.querySelectorAll('[data-open-modal="demo"]');
    
    if (!this.modal || !this.overlay) return;
    
    this.isOpen = false;
    this.init();
  }
  
  init() {
    // Open modal buttons
    this.openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });
    
    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => {
        this.close();
      });
    }
    
    // Close on overlay click
    this.overlay.addEventListener('click', () => {
      this.close();
    });
    
    // Prevent modal click from closing
    this.modal.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Form submission
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        this.handleSubmit(e);
      });
    }
  }
  
  open() {
    this.isOpen = true;
    this.overlay.classList.add('active');
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus first input
    setTimeout(() => {
      const firstInput = this.form?.querySelector('input');
      if (firstInput) firstInput.focus();
    }, 100);
  }
  
  close() {
    this.isOpen = false;
    this.overlay.classList.remove('active');
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset form after closing
    setTimeout(() => {
      this.resetForm();
    }, 300);
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    // Simple validation
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());
    
    // Log form data (for demo purposes)
    console.log('Demo Request:', data);
    
    // Show success message
    this.showSuccess();
  }
  
  showSuccess() {
    if (this.formContent) {
      this.formContent.style.display = 'none';
    }
    if (this.successMessage) {
      this.successMessage.classList.add('show');
    }
    
    // Auto close after 3 seconds
    setTimeout(() => {
      this.close();
    }, 3000);
  }
  
  resetForm() {
    if (this.form) {
      this.form.reset();
    }
    if (this.formContent) {
      this.formContent.style.display = '';
    }
    if (this.successMessage) {
      this.successMessage.classList.remove('show');
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.demoModal = new DemoModal();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DemoModal;
}
