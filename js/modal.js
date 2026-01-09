/**
 * AICE - Demo Modal with Calendar Booking
 * Premium calendar UI with date/time selection
 */

class DemoModal {
  constructor() {
    this.overlay = document.querySelector('.modal-overlay');
    this.modal = document.querySelector('.modal');
    this.closeBtn = document.querySelector('.modal-close');
    this.openBtns = document.querySelectorAll('[data-open-modal="demo"]');
    
    this.selectedDate = null;
    this.selectedTime = null;
    this.currentMonth = new Date();
    
    this.isOpen = false;
    this.init();
  }
  
  init() {
    // Replace modal body with calendar UI
    this.createCalendarUI();
    
    // Open modal buttons
    this.openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });
    
    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    
    // Close on overlay click
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }
    
    // Prevent modal click from closing
    if (this.modal) {
      this.modal.addEventListener('click', (e) => e.stopPropagation());
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });
  }
  
  createCalendarUI() {
    const modalBody = document.querySelector('.modal-body');
    if (!modalBody) return;
    
    modalBody.innerHTML = `
      <div class="booking-content">
        <div class="booking-layout">
          <!-- Contact Form -->
          <div class="booking-form">
            <div class="booking-form-title">Your Information</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">First Name <span>*</span></label>
                <input type="text" class="form-input" id="firstName" placeholder="John" required>
              </div>
              <div class="form-group">
                <label class="form-label">Last Name <span>*</span></label>
                <input type="text" class="form-input" id="lastName" placeholder="Smith" required>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Business Email <span>*</span></label>
              <input type="email" class="form-input" id="email" placeholder="john@company.com" required>
            </div>
            <div class="form-group">
              <label class="form-label">Company</label>
              <input type="text" class="form-input" id="company" placeholder="Your Company">
            </div>
            <div class="form-group">
              <label class="form-label">Industry</label>
              <select class="form-select" id="industry">
                <option value="">Select industry</option>
                <option value="real-estate">Real Estate</option>
                <option value="jewelry">Jewelry</option>
                <option value="healthcare">Healthcare</option>
                <option value="business">Business Services</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <!-- Calendar -->
          <div class="booking-calendar">
            <div class="calendar-header">
              <span class="calendar-title">Select Date & Time</span>
            </div>
            <div class="calendar-nav-row">
              <button class="calendar-nav-btn" id="prevMonth">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <span class="calendar-month" id="calendarMonth"></span>
              <button class="calendar-nav-btn" id="nextMonth">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>
            <div class="calendar-weekdays">
              <span class="calendar-weekday">Sun</span>
              <span class="calendar-weekday">Mon</span>
              <span class="calendar-weekday">Tue</span>
              <span class="calendar-weekday">Wed</span>
              <span class="calendar-weekday">Thu</span>
              <span class="calendar-weekday">Fri</span>
              <span class="calendar-weekday">Sat</span>
            </div>
            <div class="calendar-days" id="calendarDays"></div>
            
            <div class="time-slots">
              <div class="time-slots-title">Available Times</div>
              <div class="time-slots-grid" id="timeSlots">
                <button class="time-slot" data-time="09:00">9:00 AM</button>
                <button class="time-slot" data-time="10:00">10:00 AM</button>
                <button class="time-slot" data-time="11:00">11:00 AM</button>
                <button class="time-slot" data-time="14:00">2:00 PM</button>
                <button class="time-slot" data-time="15:00">3:00 PM</button>
                <button class="time-slot" data-time="16:00">4:00 PM</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="booking-submit">
          <div class="booking-summary" id="bookingSummary">
            Select a date and time to continue
          </div>
          <button class="btn btn-primary" id="submitBooking" disabled>Confirm Booking</button>
        </div>
      </div>
      
      <div class="booking-success" id="bookingSuccess">
        <div class="booking-success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 class="booking-success-title">Demo Booked!</h3>
        <p class="booking-success-desc">We've sent a calendar invite to your email. Our team looks forward to meeting you!</p>
        <div class="booking-details" id="bookingDetails"></div>
      </div>
    `;
    
    this.setupCalendarEvents();
    this.renderCalendar();
  }
  
  setupCalendarEvents() {
    // Month navigation
    document.getElementById('prevMonth')?.addEventListener('click', () => {
      this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
      this.renderCalendar();
    });
    
    document.getElementById('nextMonth')?.addEventListener('click', () => {
      this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
      this.renderCalendar();
    });
    
    // Time slot selection
    document.getElementById('timeSlots')?.addEventListener('click', (e) => {
      if (e.target.classList.contains('time-slot')) {
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        e.target.classList.add('selected');
        this.selectedTime = e.target.dataset.time;
        this.updateSummary();
      }
    });
    
    // Submit booking
    document.getElementById('submitBooking')?.addEventListener('click', () => {
      this.submitBooking();
    });
  }
  
  renderCalendar() {
    const days = document.getElementById('calendarDays');
    const monthLabel = document.getElementById('calendarMonth');
    if (!days || !monthLabel) return;
    
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    
    monthLabel.textContent = new Date(year, month).toLocaleDateString('en-US', { 
      month: 'long', year: 'numeric' 
    });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const today = new Date();
    
    let html = '';
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      html += `<div class="calendar-day other-month disabled">${daysInPrevMonth - i}</div>`;
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today && !isToday;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isSelected = this.selectedDate && date.toDateString() === this.selectedDate.toDateString();
      
      let classes = 'calendar-day';
      if (isToday) classes += ' today';
      if (isPast || isWeekend) classes += ' disabled';
      if (isSelected) classes += ' selected';
      
      html += `<div class="${classes}" data-date="${date.toISOString()}">${i}</div>`;
    }
    
    // Next month days
    const remaining = 42 - (firstDay + daysInMonth);
    for (let i = 1; i <= remaining; i++) {
      html += `<div class="calendar-day other-month disabled">${i}</div>`;
    }
    
    days.innerHTML = html;
    
    // Day click events
    days.querySelectorAll('.calendar-day:not(.disabled)').forEach(day => {
      day.addEventListener('click', () => {
        days.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
        day.classList.add('selected');
        this.selectedDate = new Date(day.dataset.date);
        this.updateSummary();
      });
    });
  }
  
  updateSummary() {
    const summary = document.getElementById('bookingSummary');
    const submitBtn = document.getElementById('submitBooking');
    
    if (this.selectedDate && this.selectedTime) {
      const dateStr = this.selectedDate.toLocaleDateString('en-US', { 
        weekday: 'long', month: 'long', day: 'numeric' 
      });
      summary.innerHTML = `<strong>${dateStr}</strong> at <strong>${this.formatTime(this.selectedTime)}</strong>`;
      submitBtn.disabled = false;
    } else if (this.selectedDate) {
      const dateStr = this.selectedDate.toLocaleDateString('en-US', { 
        weekday: 'long', month: 'long', day: 'numeric' 
      });
      summary.innerHTML = `<strong>${dateStr}</strong> — Select a time`;
      submitBtn.disabled = true;
    } else {
      summary.textContent = 'Select a date and time to continue';
      submitBtn.disabled = true;
    }
  }
  
  formatTime(time) {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  }
  
  submitBooking() {
    const firstName = document.getElementById('firstName')?.value;
    const email = document.getElementById('email')?.value;
    
    if (!firstName || !email) {
      alert('Please fill in your name and email');
      return;
    }
    
    const dateStr = this.selectedDate.toLocaleDateString('en-US', { 
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
    
    // Show success
    document.querySelector('.booking-content').style.display = 'none';
    const success = document.getElementById('bookingSuccess');
    success.classList.add('show');
    
    document.getElementById('bookingDetails').innerHTML = `
      <div class="booking-detail">
        <div class="booking-detail-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
        <span class="booking-detail-text">${dateStr}</span>
      </div>
      <div class="booking-detail">
        <div class="booking-detail-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <span class="booking-detail-text">${this.formatTime(this.selectedTime)}</span>
      </div>
    `;
    
    // Auto close after 4 seconds
    setTimeout(() => this.close(), 4000);
  }
  
  open() {
    this.isOpen = true;
    this.overlay?.classList.add('active');
    this.modal?.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.renderCalendar();
  }
  
  close() {
    this.isOpen = false;
    this.overlay?.classList.remove('active');
    this.modal?.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset after close animation
    setTimeout(() => {
      this.selectedDate = null;
      this.selectedTime = null;
      document.querySelector('.booking-content')?.style.removeProperty('display');
      document.getElementById('bookingSuccess')?.classList.remove('show');
      document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
      this.updateSummary();
    }, 350);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.demoModal = new DemoModal();
});
