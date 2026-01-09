/**
 * AICE - Navbar Controller
 * Handles dropdown menus, mobile menu, and scroll behavior
 */

class NavbarController {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.mobileToggle = document.querySelector('.mobile-menu-toggle');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.dropdownItems = document.querySelectorAll('.nav-item');
    this.mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    this.isScrolled = false;
    this.isMobileMenuOpen = false;
    
    this.init();
  }
  
  init() {
    this.setupScrollBehavior();
    this.setupMobileMenu();
    this.setupDropdowns();
    this.setupMobileDropdowns();
  }
  
  setupScrollBehavior() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
    
    // Initial check
    this.handleScroll();
  }
  
  handleScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY > 50 && !this.isScrolled) {
      this.navbar.classList.add('scrolled');
      this.isScrolled = true;
    } else if (scrollY <= 50 && this.isScrolled) {
      this.navbar.classList.remove('scrolled');
      this.isScrolled = false;
    }
  }
  
  setupMobileMenu() {
    if (!this.mobileToggle || !this.mobileMenu) return;
    
    this.mobileToggle.addEventListener('click', () => {
      this.toggleMobileMenu();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMobileMenuOpen && 
          !this.mobileMenu.contains(e.target) && 
          !this.mobileToggle.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }
  
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.mobileToggle.classList.toggle('active', this.isMobileMenuOpen);
    this.mobileMenu.classList.toggle('active', this.isMobileMenuOpen);
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }
  
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.mobileToggle.classList.remove('active');
    this.mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  setupDropdowns() {
    this.dropdownItems.forEach(item => {
      const dropdown = item.querySelector('.dropdown-menu');
      if (!dropdown) return;
      
      let timeoutId;
      
      item.addEventListener('mouseenter', () => {
        clearTimeout(timeoutId);
        this.closeAllDropdowns();
        item.classList.add('active');
      });
      
      item.addEventListener('mouseleave', () => {
        timeoutId = setTimeout(() => {
          item.classList.remove('active');
        }, 150);
      });
    });
  }
  
  setupMobileDropdowns() {
    this.mobileNavItems.forEach(item => {
      const toggle = item.querySelector('.mobile-nav-link');
      const dropdown = item.querySelector('.mobile-dropdown');
      
      if (!toggle || !dropdown) return;
      
      toggle.addEventListener('click', (e) => {
        if (dropdown) {
          e.preventDefault();
          item.classList.toggle('active');
        }
      });
    });
  }
  
  closeAllDropdowns() {
    this.dropdownItems.forEach(item => {
      item.classList.remove('active');
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.navbarController = new NavbarController();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavbarController;
}
