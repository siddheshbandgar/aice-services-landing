# AICE Services Revamp

A premium, high-performance landing page for AICE (AI Services Company) built with Next.js. This project targets enterprise clients across Real Estate, Jewelry, Healthcare, Business/Corporate, and Manufacturing verticals.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: Lucide React
- **Fonts**: Geist (via `next/font`)

## Getting Started

The Next.js application is located in the `aice-nextjs` directory.

1.  Navigate to the project directory:

    ```bash
    cd aice-nextjs
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Run the development server:

    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

The project follows the Next.js App Router structure:

```
aice-nextjs/
├── app/
│   ├── (main)/             # Main marketing site layout group
│   │   ├── page.tsx        # Home page
│   │   ├── business/       # Business vertical
│   │   ├── founders/       # Founders page
│   │   ├── healthcare/     # Healthcare vertical
│   │   ├── jewelry/        # Jewelry vertical
│   │   ├── manufacturing/  # Manufacturing vertical
│   │   └── real-estate/    # Real Estate vertical
│   ├── (openclaw)/         # OpenClaw specific layout group
│   │   └── openclaw/       # OpenClaw landing & guide
│   │       └── guide/
│   ├── api/                # API routes
│   └── globals.css         # Global styles & Tailwind
├── components/             # Reusable UI components
│   ├── HeroSection.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Modal.tsx
│   ├── StickyScroll.tsx
│   └── ...
└── public/                 # Static assets
```

## Key Features

- **Dynamic UI**: interactive water ripple effects and glassmorphism design.
- **Sticky Scroll**: "What AICE Can Do" section with smooth scroll animations.
- **Service Modals**: "Book a Demo" functionality with dedicated modal components.
- **Vertical Specific Pages**: Dedicated landing pages for different industries.
- **OpenClaw Integration**: Specialized section for OpenClaw tools and guides.

## License

© 2026 AICE. All rights reserved.
