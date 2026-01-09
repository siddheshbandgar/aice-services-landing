# AICE Services Landing Page - Implementation Plan

## Overview

Build a premium, minimalist landing page for **AICE** (AI Services Company) targeting enterprise clients across Real Estate, Jewelry, Healthcare, Business/Corporate, and Manufacturing verticals.

**Design Philosophy:** Clean, elegant, minimalist aesthetic with white and soft blue tones. No gradients. Premium feel that impresses enterprise clients at first glance.

---

## Phase 1: Core Landing Page (Visual Only)

### Technology Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| Framework | **Vite + Vanilla JS** | Fast, lightweight, no build complexity |
| Styling | **Vanilla CSS** | Maximum control for custom animations |
| Fonts | **Google Fonts (Inter/Outfit)** | Similar to kore.ai's clean typography |
| Icons | **Lucide Icons** | Minimal, modern icon set |
| Animations | **CSS + JavaScript** | Custom ripple effect, smooth scrolling |

---

## Site Architecture

### Pages
1. **Landing Page** (`index.html`) - Hero, What AICE Can Do, Why Choose AICE, Customers, Testimonials, CTA, Footer
2. **Founders Page** (`founders.html`) - Meet the Founders with 4 placeholder cards
3. **Vertical Pages** (placeholders) - Real Estate, Jewelry, Healthcare, Business, Manufacturing

---

## Navbar Design

| Element | Description |
|---------|-------------|
| Logo | "AICE" text logo (bold, black) |
| AI Solutions (Dropdown) | Contains industry verticals |
| Meet the Founders | Link to founders page |
| Book a Demo | **Black button** with white text |

### Industry Verticals (Dropdown Items)
- AI for Real Estate
- AI for Jewelry
- AI for Healthcare
- AI for Business Services
- AI for Manufacturing

---

## Page Sections

### 1. Hero Section
- Interactive ripple effect background (triggers on mouse click)
- Main headline and subheadline
- "Book a Demo" CTA button

### 2. What AICE Can Do (Sticky Scroll)
- Left panel: Sticky list of capabilities
- Right panel: Animated content that changes on scroll
- Items: Automated Calling, Lead Qualification, Document Processing, Customer Support, Workflow Automation, Analytics

### 3. Why Choose AICE (Glass Cards)
- Speed, Control, Flexibility, Deep Capabilities, Proven Experience
- Glassmorphism design with backdrop blur

### 4. Customer Logos (Carousel)
- Auto-scrolling horizontal carousel
- Placeholder logos

### 5. Testimonials (Animated)
- Subtle gradient background
- Auto-sliding carousel with customer quotes

### 6. CTA Section
- Two-column layout with action buttons

### 7. Footer
- Logo, links, social icons, copyright

---

## Book a Demo Modal
- Full Name, Email, Company, Industry dropdown, Message
- Visual only (no backend)

---

## Design Tokens

```css
:root {
  --color-white: #FFFFFF;
  --color-off-white: #F8FAFC;
  --color-light-blue: #E8F4FD;
  --color-accent-blue: #3B82F6;
  --color-black: #0F172A;
  --font-primary: 'Inter', sans-serif;
  --font-heading: 'Outfit', sans-serif;
}
```

---

## Phase 2: Service Demos (Future)
- Real Estate Demo: Upload brochure → AI calling agent demo
- Calendar Integration: Actual demo booking with Calendly/Cal.com
