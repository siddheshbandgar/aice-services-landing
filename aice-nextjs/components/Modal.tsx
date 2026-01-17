'use client';

import { useState, useEffect, useCallback } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

function formatTime(time: string) {
    const [hours, minutes] = time.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const close = useCallback(() => {
        onClose();
        setTimeout(() => {
            setSelectedDate(null);
            setSelectedTime(null);
            setSubmitted(false);
        }, 350);
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [close]);

    const handleSubmit = () => {
        setSubmitted(true);
        setTimeout(() => close(), 4000);
    };

    const prevMonth = () => {
        const d = new Date(currentMonth);
        d.setMonth(d.getMonth() - 1);
        setCurrentMonth(d);
    };

    const nextMonth = () => {
        const d = new Date(currentMonth);
        d.setMonth(d.getMonth() + 1);
        setCurrentMonth(d);
    };

    // Render calendar days
    const renderCalendar = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        const today = new Date();
        const days = [];

        // Previous month
        for (let i = firstDay - 1; i >= 0; i--) {
            days.push(
                <div key={`prev-${i}`} className="calendar-day other-month disabled">
                    {daysInPrevMonth - i}
                </div>
            );
        }

        // Current month
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const isToday = date.toDateString() === today.toDateString();
            const isPast = date < today && !isToday;
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            const isDisabled = isPast || isWeekend;

            let className = 'calendar-day';
            if (isToday) className += ' today';
            if (isSelected) className += ' selected';
            if (isDisabled) className += ' disabled';

            days.push(
                <div
                    key={`day-${i}`}
                    className={className}
                    onClick={() => !isDisabled && setSelectedDate(date)}
                >
                    {i}
                </div>
            );
        }

        // Next month
        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++) {
            days.push(
                <div key={`next-${i}`} className="calendar-day other-month disabled">
                    {i}
                </div>
            );
        }

        return days;
    };

    const getSummary = () => {
        if (selectedDate && selectedTime) {
            const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
            return <><strong>{dateStr}</strong> at <strong>{formatTime(selectedTime)}</strong></>;
        } else if (selectedDate) {
            const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
            return <><strong>{dateStr}</strong> — Select a time</>;
        }
        return 'Select a date and time to continue';
    };

    if (!isOpen) return null;

    return (
        <>
            <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={close}></div>
            <div className={`modal ${isOpen ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">Book a Demo</h2>
                    <button className="modal-close" aria-label="Close" onClick={close}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <div className="modal-body">
                    {!submitted ? (
                        <div className="booking-content">
                            <div className="booking-layout">
                                {/* Contact Form */}
                                <div className="booking-form">
                                    <div className="booking-form-title">Your Information</div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label className="form-label">First Name <span>*</span></label>
                                            <input type="text" className="form-input" id="firstName" placeholder="John" required />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Last Name <span>*</span></label>
                                            <input type="text" className="form-input" id="lastName" placeholder="Smith" required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Business Email <span>*</span></label>
                                        <input type="email" className="form-input" id="email" placeholder="john@company.com" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Company</label>
                                        <input type="text" className="form-input" id="company" placeholder="Your Company" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Industry</label>
                                        <select className="form-select" id="industry">
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

                                {/* Calendar */}
                                <div className="booking-calendar">
                                    <div className="calendar-header">
                                        <span className="calendar-title">Select Date &amp; Time</span>
                                    </div>
                                    <div className="calendar-nav-row">
                                        <button className="calendar-nav-btn" onClick={prevMonth}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
                                        </button>
                                        <span className="calendar-month">
                                            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                        </span>
                                        <button className="calendar-nav-btn" onClick={nextMonth}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6" /></svg>
                                        </button>
                                    </div>
                                    <div className="calendar-weekdays">
                                        <span className="calendar-weekday">Sun</span>
                                        <span className="calendar-weekday">Mon</span>
                                        <span className="calendar-weekday">Tue</span>
                                        <span className="calendar-weekday">Wed</span>
                                        <span className="calendar-weekday">Thu</span>
                                        <span className="calendar-weekday">Fri</span>
                                        <span className="calendar-weekday">Sat</span>
                                    </div>
                                    <div className="calendar-days">
                                        {renderCalendar()}
                                    </div>

                                    <div className="time-slots">
                                        <div className="time-slots-title">Available Times</div>
                                        <div className="time-slots-grid">
                                            {timeSlots.map(time => (
                                                <button
                                                    key={time}
                                                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                                                    onClick={() => setSelectedTime(time)}
                                                >
                                                    {formatTime(time)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="booking-submit">
                                <div className="booking-summary">{getSummary()}</div>
                                <button
                                    className="btn btn-primary"
                                    disabled={!selectedDate || !selectedTime}
                                    onClick={handleSubmit}
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="booking-success show">
                            <div className="booking-success-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                            <h3 className="booking-success-title">Demo Booked!</h3>
                            <p className="booking-success-desc">We&apos;ve sent a calendar invite to your email. Our team looks forward to meeting you!</p>
                            <div className="booking-details">
                                <div className="booking-detail">
                                    <div className="booking-detail-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                    </div>
                                    <span className="booking-detail-text">
                                        {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="booking-detail">
                                    <div className="booking-detail-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                    </div>
                                    <span className="booking-detail-text">{selectedTime && formatTime(selectedTime)}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
