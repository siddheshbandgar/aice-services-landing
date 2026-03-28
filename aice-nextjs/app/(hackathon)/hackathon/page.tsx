'use client';

import { useEffect } from 'react';

export default function HackathonPage() {

    // Nav scroll
    useEffect(() => {
        const nav = document.getElementById('navbar');
        if (!nav) return;
        const handler = () => nav.classList.toggle('scrolled', window.scrollY > 50);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
    }, []);

    // Mobile menu
    useEffect(() => {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        if (!hamburger || !navLinks) return;
        const toggle = () => navLinks.classList.toggle('open');
        hamburger.addEventListener('click', toggle);
        const links = Array.from(navLinks.querySelectorAll('a'));
        const close = () => navLinks.classList.remove('open');
        links.forEach(l => l.addEventListener('click', close));
        return () => {
            hamburger.removeEventListener('click', toggle);
            links.forEach(l => l.removeEventListener('click', close));
        };
    }, []);

    // Scroll reveal
    useEffect(() => {
        const reveals = Array.from(document.querySelectorAll('.reveal'));
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
        reveals.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Stacked panels hero background
    useEffect(() => {
        const PANEL_COUNT = 22, Z_SPREAD = 42, SIGMA = 2.8;
        const IMAGES = [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
            'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80',
            'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80',
            'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80',
            'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&q=80',
            'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&q=80',
            'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&q=80',
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
            'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=80',
            'https://images.unsplash.com/photo-1510784722466-f2aa240c3c4a?w=400&q=80',
            'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=400&q=80',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80',
            'https://images.unsplash.com/photo-1540390769625-2fc3f8b1d50c?w=400&q=80',
            'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80',
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80',
            'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&q=80',
            'https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=400&q=80',
            'https://images.unsplash.com/photo-1501696461415-6bd6660c6742?w=400&q=80',
            'https://images.unsplash.com/photo-1445962125599-30f582ac21f4?w=400&q=80',
            'https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=400&q=80',
            'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&q=80',
        ];
        const GRADIENTS = [
            'linear-gradient(135deg, rgba(99,55,255,0.55), rgba(236,72,153,0.45))',
            'linear-gradient(135deg, rgba(6,182,212,0.55), rgba(59,130,246,0.45))',
            'linear-gradient(135deg, rgba(245,158,11,0.55), rgba(239,68,68,0.45))',
            'linear-gradient(135deg, rgba(16,185,129,0.45), rgba(6,182,212,0.55))',
            'linear-gradient(135deg, rgba(236,72,153,0.55), rgba(245,158,11,0.45))',
            'linear-gradient(135deg, rgba(59,130,246,0.55), rgba(99,55,255,0.45))',
            'linear-gradient(135deg, rgba(239,68,68,0.45), rgba(236,72,153,0.55))',
            'linear-gradient(135deg, rgba(6,182,212,0.45), rgba(16,185,129,0.55))',
            'linear-gradient(135deg, rgba(99,55,255,0.45), rgba(6,182,212,0.55))',
            'linear-gradient(135deg, rgba(245,158,11,0.45), rgba(16,185,129,0.55))',
            'linear-gradient(135deg, rgba(239,68,68,0.55), rgba(245,158,11,0.45))',
            'linear-gradient(135deg, rgba(99,55,255,0.55), rgba(59,130,246,0.45))',
            'linear-gradient(135deg, rgba(16,185,129,0.55), rgba(99,55,255,0.45))',
            'linear-gradient(135deg, rgba(236,72,153,0.45), rgba(59,130,246,0.55))',
            'linear-gradient(135deg, rgba(6,182,212,0.55), rgba(245,158,11,0.45))',
            'linear-gradient(135deg, rgba(59,130,246,0.45), rgba(16,185,129,0.55))',
            'linear-gradient(135deg, rgba(245,158,11,0.55), rgba(99,55,255,0.45))',
            'linear-gradient(135deg, rgba(239,68,68,0.45), rgba(6,182,212,0.55))',
            'linear-gradient(135deg, rgba(99,55,255,0.45), rgba(236,72,153,0.55))',
            'linear-gradient(135deg, rgba(16,185,129,0.45), rgba(245,158,11,0.55))',
            'linear-gradient(135deg, rgba(236,72,153,0.55), rgba(239,68,68,0.45))',
            'linear-gradient(135deg, rgba(59,130,246,0.55), rgba(6,182,212,0.45))',
        ];

        class Spring {
            value: number; target: number; velocity: number;
            stiffness: number; damping: number; mass: number;
            constructor(init: number, stiff: number, damp: number, mass: number) {
                this.value = init; this.target = init; this.velocity = 0;
                this.stiffness = stiff; this.damping = damp; this.mass = mass;
            }
            set(t: number) { this.target = t; }
            tick(dt: number) {
                const f = (this.target - this.value) * this.stiffness - this.velocity * this.damping;
                this.velocity += (f / this.mass) * dt;
                this.value += this.velocity * dt;
            }
        }

        const container = document.getElementById('stackedPanels');
        const heroSection = document.getElementById('heroSection');
        if (!container || !heroSection) return;

        const scene = document.createElement('div');
        scene.className = 'stacked-panels-scene';
        container.appendChild(scene);
        (container as HTMLElement).style.perspective = '900px';

        type PanelEntry = { el: HTMLElement; baseZ: number };
        const panels: PanelEntry[] = [];
        const waveY: Spring[] = [];
        const scaleYs: Spring[] = [];

        for (let i = 0; i < PANEL_COUNT; i++) {
            const t = i / (PANEL_COUNT - 1);
            const w = 200 + t * 80, h = 280 + t * 120;
            const panel = document.createElement('div');
            panel.className = 'sp-panel';
            panel.style.cssText = `width:${w}px;height:${h}px;margin-left:${-w / 2}px;margin-top:${-h / 2}px;opacity:${0.25 + t * 0.75}`;
            const img = document.createElement('div'); img.className = 'sp-panel-img'; img.style.backgroundImage = `url(${IMAGES[i]})`; panel.appendChild(img);
            const grad = document.createElement('div'); grad.className = 'sp-panel-gradient'; grad.style.background = GRADIENTS[i]; panel.appendChild(grad);
            const vig = document.createElement('div'); vig.className = 'sp-panel-vignette'; panel.appendChild(vig);
            const brd = document.createElement('div'); brd.className = 'sp-panel-border'; brd.style.border = `1px solid rgba(255,255,255,${0.08 + t * 0.22})`; panel.appendChild(brd);
            scene.appendChild(panel);
            panels.push({ el: panel, baseZ: (i - (PANEL_COUNT - 1)) * Z_SPREAD });
            waveY.push(new Spring(0, 160, 22, 0.6));
            scaleYs.push(new Spring(1, 160, 22, 0.6));
        }

        const rotY = new Spring(-42, 80, 22, 1);
        const rotX = new Spring(18, 80, 22, 1);

        const onMouseMove = (e: MouseEvent) => {
            const rect = heroSection.getBoundingClientRect();
            const cx = (e.clientX - rect.left) / rect.width;
            const cy = (e.clientY - rect.top) / rect.height;
            rotY.set(-42 + (cx - 0.5) * 14);
            rotX.set(18 + (cy - 0.5) * -10);
            const pos = cx * (PANEL_COUNT - 1);
            for (let j = 0; j < PANEL_COUNT; j++) {
                const d = Math.abs(j - pos);
                const inf = Math.exp(-(d * d) / (2 * SIGMA * SIGMA));
                waveY[j].set(-inf * 70);
                scaleYs[j].set(0.35 + inf * 0.65);
            }
        };
        const onMouseLeave = () => {
            rotY.set(-42); rotX.set(18);
            for (let j = 0; j < PANEL_COUNT; j++) { waveY[j].set(0); scaleYs[j].set(1); }
        };
        heroSection.addEventListener('mousemove', onMouseMove);
        heroSection.addEventListener('mouseleave', onMouseLeave);

        let last = performance.now();
        let rafId: number;
        const animate = (now: number) => {
            const dt = Math.min((now - last) / 1000, 0.05); last = now;
            rotY.tick(dt); rotX.tick(dt);
            scene.style.transform = `rotateY(${rotY.value}deg) rotateX(${rotX.value}deg)`;
            for (let j = 0; j < PANEL_COUNT; j++) {
                waveY[j].tick(dt); scaleYs[j].tick(dt);
                panels[j].el.style.transform = `translateZ(${panels[j].baseZ}px) translateY(${waveY[j].value}px) scaleY(${scaleYs[j].value})`;
                panels[j].el.style.transformOrigin = 'bottom center';
            }
            rafId = requestAnimationFrame(animate);
        };
        rafId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(rafId);
            heroSection.removeEventListener('mousemove', onMouseMove);
            heroSection.removeEventListener('mouseleave', onMouseLeave);
            if (container.contains(scene)) container.removeChild(scene);
        };
    }, []);

    // Globe
    useEffect(() => {
        const canvas = document.getElementById('cobeGlobe') as HTMLCanvasElement | null;
        if (!canvas) return;

        let destroy: (() => void) | undefined;
        let ro: ResizeObserver | undefined;

        const init = () => {
            const w = canvas.offsetWidth;
            if (w === 0) return false;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            import(/* webpackIgnore: true */ 'https://esm.sh/cobe@0.6.3' as any).then((mod: any) => {
                const createGlobe = mod.default;
                let phi = 0, pointerDown: number | null = null, dragPhi = 0, phiOffset = 0;

                const globe = createGlobe(canvas, {
                    devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
                    width: w * 2, height: w * 2,
                    phi: 0.4, theta: 0.25, dark: 1, diffuse: 1.2,
                    mapSamples: 16000, mapBrightness: 6,
                    baseColor: [0.18, 0.18, 0.18],
                    markerColor: [0.706, 0.949, 0.251],
                    glowColor: [0.08, 0.08, 0.08],
                    markers: [
                        { location: [19.076, 72.877], size: 0.08 },
                        { location: [28.613, 77.209], size: 0.06 },
                        { location: [17.385, 78.486], size: 0.07 },
                        { location: [13.082, 80.270], size: 0.05 },
                        { location: [12.971, 77.594], size: 0.06 },
                        { location: [40.712, -74.006], size: 0.05 },
                        { location: [51.507, -0.127], size: 0.05 },
                        { location: [1.352, 103.819], size: 0.04 },
                        { location: [25.276, 55.296], size: 0.06 },
                        { location: [35.689, 139.691], size: 0.04 },
                        { location: [-33.868, 151.209], size: 0.04 },
                        { location: [22.396, 114.109], size: 0.05 },
                    ],
                    onRender: (state: { phi: number }) => {
                        state.phi = phi + phiOffset + dragPhi;
                        phi += 0.004;
                    },
                });
                destroy = globe.destroy;
                canvas.style.opacity = '1';

                const onDown = (e: PointerEvent) => { pointerDown = e.clientX; canvas.style.cursor = 'grabbing'; };
                const onMove = (e: PointerEvent) => { if (pointerDown !== null) dragPhi = (e.clientX - pointerDown) / 300; };
                const onUp = () => {
                    if (pointerDown !== null) { phiOffset += dragPhi; dragPhi = 0; }
                    pointerDown = null; canvas.style.cursor = 'grab';
                };
                canvas.addEventListener('pointerdown', onDown);
                window.addEventListener('pointermove', onMove);
                window.addEventListener('pointerup', onUp);
            }).catch(() => {/* globe unavailable */});

            return true;
        };

        if (!init()) {
            ro = new ResizeObserver((entries) => {
                if (entries[0]?.contentRect.width > 0) { ro?.disconnect(); init(); }
            });
            ro.observe(canvas);
        }

        return () => {
            destroy?.();
            ro?.disconnect();
        };
    }, []);

    return (
        <>
            <style>{`
                *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
                :root {
                    --bg: #0a0a0a; --bg-card: #111111; --bg-card-hover: #161616;
                    --border: #1e1e1e; --border-highlight: #2a2a2a;
                    --text: #f5f5f5; --text-secondary: #a0a0a0; --text-muted: #666666;
                    --accent: #b4f240; --accent-dim: rgba(180,242,64,0.15); --accent-glow: rgba(180,242,64,0.3);
                }
                html { scroll-behavior: smooth; }
                body { font-family: inherit; background: var(--bg); color: var(--text); line-height: 1.6; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
                .icon-svg { flex-shrink: 0; color: var(--accent); }

                nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); background: rgba(10,10,10,0.8); border-bottom: 1px solid var(--border); transition: all 0.3s ease; }
                nav.scrolled { background: rgba(10,10,10,0.95); }
                .nav-brand { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; }
                .nav-brand-text { font-weight: 700; font-size: 1.1rem; color: var(--text); letter-spacing: -0.02em; }
                .nav-brand-divider { color: var(--text-muted); font-weight: 300; margin: 0 0.25rem; }
                .nav-brand-sub { font-weight: 500; font-size: 0.85rem; color: var(--text-secondary); }
                .nav-links { display: flex; align-items: center; gap: 2rem; list-style: none; }
                .nav-links a { color: var(--text-secondary); text-decoration: none; font-size: 0.875rem; font-weight: 400; transition: color 0.2s; }
                .nav-links a:hover { color: var(--text); }
                .nav-aice-link { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--text-secondary) !important; font-size: 0.8rem !important; border: 1px solid var(--border-highlight); padding: 0.35rem 0.85rem; border-radius: 6px; transition: all 0.2s !important; }
                .nav-aice-link:hover { border-color: var(--accent) !important; color: var(--accent) !important; }
                .btn-apply-nav { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.5rem; background: var(--accent); color: #0a0a0a; font-weight: 600; font-size: 0.875rem; border: none; border-radius: 8px; text-decoration: none; cursor: pointer; transition: all 0.25s ease; }
                .btn-apply-nav:hover { background: #c8ff4d; box-shadow: 0 0 30px var(--accent-glow); transform: translateY(-1px); }
                .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
                .hamburger span { display: block; width: 24px; height: 2px; background: var(--text); transition: all 0.3s; }

                .hero { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 8rem 2rem 4rem; overflow: hidden; }
                .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(180,242,64,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(180,242,64,0.03) 0%, transparent 50%); pointer-events: none; }
                .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent); pointer-events: none; }
                .hero-content { position: relative; text-align: center; max-width: 900px; z-index: 2; }
                .hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1.25rem; border: 1px solid var(--border-highlight); border-radius: 100px; font-size: 0.8rem; font-weight: 500; color: var(--accent); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 2rem; background: var(--accent-dim); }
                .hero-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse-dot 2s ease-in-out infinite; }
                @keyframes pulse-dot { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
                .hero h1 { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 800; line-height: 1.08; letter-spacing: -0.03em; margin-bottom: 1.5rem; }
                .hero h1 .highlight { background: linear-gradient(135deg, var(--accent), #d4ff70); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
                .hero-sub { font-size: 1.15rem; color: var(--text-secondary); max-width: 620px; margin: 0 auto 2.5rem; line-height: 1.7; font-weight: 400; }
                .hero-meta { display: flex; justify-content: center; gap: 2.5rem; margin-bottom: 3rem; flex-wrap: wrap; }
                .hero-meta-item { text-align: center; }
                .hero-meta-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 0.35rem; font-weight: 500; }
                .hero-meta-value { font-size: 1rem; font-weight: 600; color: var(--text); }
                .hero-cta { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

                .btn-primary { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.9rem 2.25rem; background: var(--accent); color: #0a0a0a; font-weight: 700; font-size: 1rem; border: none; border-radius: 10px; text-decoration: none; cursor: pointer; transition: all 0.3s ease; letter-spacing: -0.01em; }
                .btn-primary:hover { background: #c8ff4d; box-shadow: 0 4px 40px var(--accent-glow); transform: translateY(-2px); }
                .btn-secondary { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.9rem 2.25rem; background: transparent; color: var(--text); font-weight: 500; font-size: 1rem; border: 1px solid var(--border-highlight); border-radius: 10px; text-decoration: none; cursor: pointer; transition: all 0.3s ease; }
                .btn-secondary:hover { border-color: var(--text-muted); background: rgba(255,255,255,0.03); }

                .stacked-panels-wrap { position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: auto; opacity: 0.25; mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, transparent 15%, rgba(0,0,0,0.4) 40%, black 70%); -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 50%, transparent 15%, rgba(0,0,0,0.4) 40%, black 70%); }
                .stacked-panels-scene { position: absolute; top: 50%; left: 50%; width: 0; height: 0; transform-style: preserve-3d; }
                .sp-panel { position: absolute; border-radius: 12px; overflow: hidden; pointer-events: none; will-change: transform; backface-visibility: hidden; }
                .sp-panel-img { position: absolute; inset: 0; background-size: cover; background-position: center; }
                .sp-panel-gradient { position: absolute; inset: 0; mix-blend-mode: multiply; }
                .sp-panel-vignette { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.32)); }
                .sp-panel-border { position: absolute; inset: 0; border-radius: inherit; box-sizing: border-box; }
                @media (max-width: 768px) { .stacked-panels-wrap { display: none; } }

                section { padding: 6rem 2rem; }
                .container { max-width: 1100px; margin: 0 auto; }
                .section-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent); font-weight: 600; margin-bottom: 0.75rem; }
                .section-title { font-size: clamp(1.75rem, 4vw, 2.75rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 1.25rem; }
                .section-desc { font-size: 1.05rem; color: var(--text-secondary); max-width: 600px; line-height: 1.7; }

                .stat-banner { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); padding: 3rem 2rem; background: var(--bg-card); }
                .stat-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; text-align: center; }
                .stat-number { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -0.03em; background: linear-gradient(135deg, var(--accent), #d4ff70); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1.2; }
                .stat-label { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 0.35rem; font-weight: 500; }

                .deal-section { border-top: 1px solid var(--border); }
                .deal-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 3.5rem; }
                .deal-card { padding: 2rem; border: 1px solid var(--border); border-radius: 16px; background: var(--bg-card); transition: all 0.3s ease; position: relative; overflow: hidden; }
                .deal-card:hover { border-color: var(--border-highlight); background: var(--bg-card-hover); transform: translateY(-2px); }
                .deal-card-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--accent-dim); display: flex; align-items: center; justify-content: center; margin-bottom: 1.25rem; }
                .deal-card h3 { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.6rem; letter-spacing: -0.01em; }
                .deal-card p { font-size: 0.925rem; color: var(--text-secondary); line-height: 1.65; }
                .deal-card-highlight { border-color: rgba(180,242,64,0.25); }
                .deal-card-highlight::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--accent), transparent); }

                .product-section { border-top: 1px solid var(--border); background: linear-gradient(180deg, rgba(180,242,64,0.02), transparent 40%); }
                .product-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 3.5rem; align-items: center; }
                .product-features { display: flex; flex-direction: column; gap: 1.5rem; }
                .product-feature { display: flex; gap: 1rem; align-items: flex-start; }
                .product-feature-icon { flex-shrink: 0; width: 36px; height: 36px; border-radius: 10px; background: var(--accent-dim); display: flex; align-items: center; justify-content: center; margin-top: 2px; }
                .product-feature h4 { font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem; }
                .product-feature p { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; }

                /* Chat visual */
                .product-chat { border: 1px solid var(--border); border-radius: 20px; background: var(--bg-card); overflow: hidden; position: relative; }
                .product-chat::before { content: ''; position: absolute; top: -1px; left: 20%; right: 20%; height: 1px; background: linear-gradient(90deg, transparent, var(--accent), transparent); }
                .chat-header { display: flex; align-items: center; gap: 0.85rem; padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); }
                .chat-avatar { width: 38px; height: 38px; border-radius: 10px; background: var(--accent-dim); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; flex-shrink: 0; }
                .chat-name { font-size: 0.9rem; font-weight: 600; color: var(--text); }
                .chat-online { font-size: 0.75rem; color: #4ade80; display: flex; align-items: center; gap: 0.3rem; margin-top: 0.1rem; }
                .chat-online-dot { width: 6px; height: 6px; border-radius: 50%; background: #4ade80; animation: pulse-dot 2s ease-in-out infinite; }
                .chat-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 0.85rem; }
                .chat-bubble { padding: 0.75rem 1rem; border-radius: 14px; font-size: 0.875rem; line-height: 1.55; max-width: 85%; }
                .chat-bubble.customer { background: rgba(255,255,255,0.06); border: 1px solid var(--border-highlight); color: var(--text-secondary); align-self: flex-end; border-bottom-right-radius: 4px; }
                .chat-bubble.agent { background: rgba(180,242,64,0.1); border: 1px solid rgba(180,242,64,0.2); color: var(--text); align-self: flex-start; border-bottom-left-radius: 4px; }
                .chat-bubble.agent strong { color: var(--accent); }
                .chat-badges { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.25rem; }
                .chat-badge { padding: 0.3rem 0.75rem; border: 1px solid rgba(180,242,64,0.3); border-radius: 100px; font-size: 0.7rem; font-weight: 600; color: var(--accent); letter-spacing: 0.06em; text-transform: uppercase; background: var(--accent-dim); }

                .globe-section { border-top: 1px solid var(--border); }
                .globe-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; margin-top: 3rem; }
                .globe-text { display: flex; flex-direction: column; }
                .scope-tags { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 2rem; }
                .scope-tag { padding: 0.45rem 1rem; border: 1px solid var(--border-highlight); border-radius: 100px; font-size: 0.8rem; font-weight: 500; color: var(--text-secondary); background: rgba(255,255,255,0.03); transition: all 0.25s ease; }
                .scope-tag:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-dim); }
                .globe-canvas-wrap { position: relative; width: 100%; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; }
                .globe-canvas-wrap canvas { width: 100% !important; height: 100% !important; cursor: grab; opacity: 0; transition: opacity 1.2s ease; border-radius: 50%; touch-action: none; }
                .globe-canvas-wrap canvas:active { cursor: grabbing; }

                .schedule-section { border-top: 1px solid var(--border); }
                .timeline { margin-top: 3.5rem; position: relative; }
                .timeline::before { content: ''; position: absolute; left: 20px; top: 0; bottom: 0; width: 1px; background: var(--border); }
                .timeline-item { display: flex; gap: 2rem; padding: 1.75rem 0; position: relative; }
                .timeline-dot { flex-shrink: 0; width: 40px; height: 40px; border-radius: 50%; background: var(--bg-card); border: 1px solid var(--border-highlight); display: flex; align-items: center; justify-content: center; position: relative; z-index: 2; }
                .timeline-item.active .timeline-dot { border-color: var(--accent); background: var(--accent-dim); }
                .timeline-time { font-size: 0.8rem; color: var(--accent); font-weight: 500; margin-bottom: 0.35rem; font-variant-numeric: tabular-nums; }
                .timeline-title { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.35rem; }
                .timeline-desc { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; }

                .scoring-section { border-top: 1px solid var(--border); background: linear-gradient(180deg, rgba(180,242,64,0.015), transparent 50%); }
                .scoring-table { margin-top: 3rem; border: 1px solid var(--border); border-radius: 16px; overflow: hidden; background: var(--bg-card); }
                .scoring-row { display: grid; grid-template-columns: 2fr 1fr 2fr; gap: 1rem; padding: 1.25rem 2rem; border-bottom: 1px solid var(--border); align-items: center; }
                .scoring-row:last-child { border-bottom: none; }
                .scoring-row.header { background: rgba(255,255,255,0.02); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted); font-weight: 600; }
                .scoring-action { font-weight: 500; font-size: 0.95rem; }
                .scoring-points { color: var(--accent); font-weight: 600; font-size: 0.95rem; }
                .scoring-verify { font-size: 0.85rem; color: var(--text-secondary); }

                .who-section { border-top: 1px solid var(--border); }
                .who-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-top: 3.5rem; }
                .who-card { padding: 2rem; border: 1px solid var(--border); border-radius: 16px; background: var(--bg-card); text-align: center; transition: all 0.3s ease; }
                .who-card:hover { border-color: var(--border-highlight); transform: translateY(-2px); }
                .who-icon { width: 48px; height: 48px; border-radius: 12px; background: var(--accent-dim); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; }
                .who-card h3 { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; }
                .who-card p { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6; }

                .cta-section { border-top: 1px solid var(--border); text-align: center; padding: 8rem 2rem; position: relative; overflow: hidden; }
                .cta-section::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 40% at 50% 100%, rgba(180,242,64,0.06), transparent 70%); pointer-events: none; }
                .cta-section .section-title { max-width: 700px; margin: 0 auto 1rem; }
                .cta-section .section-desc { margin: 0 auto 3rem; text-align: center; }
                .cta-details { display: flex; justify-content: center; gap: 3rem; margin-bottom: 3rem; flex-wrap: wrap; }
                .cta-detail { display: flex; align-items: center; gap: 0.5rem; font-size: 0.95rem; color: var(--text-secondary); }
                .cta-btn-row { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem; }
                .btn-aice-small { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.45rem 1.1rem; background: transparent; color: var(--text-muted); font-size: 0.78rem; font-weight: 500; border: 1px solid var(--border); border-radius: 6px; text-decoration: none; transition: all 0.2s ease; letter-spacing: 0.01em; }
                .btn-aice-small:hover { border-color: var(--border-highlight); color: var(--text-secondary); }

                footer { border-top: 1px solid var(--border); padding: 3rem 2rem; }
                .footer-inner { max-width: 1100px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
                .footer-brand { display: flex; align-items: center; gap: 1.5rem; }
                .footer-brand a { color: var(--text-secondary); text-decoration: none; font-size: 0.85rem; transition: color 0.2s; }
                .footer-brand a:hover { color: var(--text); }
                .footer-copy { font-size: 0.8rem; color: var(--text-muted); }

                @media (max-width: 768px) {
                    .nav-links { display: none; }
                    .hamburger { display: flex; }
                    .nav-links.open { display: flex; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: rgba(10,10,10,0.98); border-bottom: 1px solid var(--border); padding: 1.5rem 2rem; gap: 1rem; }
                    .hero { padding: 7rem 1.5rem 3rem; min-height: auto; }
                    .hero-meta { gap: 1.5rem; }
                    .hero h1 { font-size: 2.2rem; }
                    section { padding: 4rem 1.5rem; }
                    .product-grid, .globe-layout { grid-template-columns: 1fr; }
                    .globe-canvas-wrap { max-width: 400px; margin: 0 auto; }
                    .stat-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
                    .scoring-row { grid-template-columns: 1fr; gap: 0.25rem; padding: 1rem 1.25rem; }
                    .scoring-row.header { display: none; }
                }
                @media (max-width: 480px) {
                    .hero h1 { font-size: 1.85rem; }
                    .deal-grid, .who-grid { grid-template-columns: 1fr; }
                    .cta-details { flex-direction: column; align-items: center; gap: 1rem; }
                }

                .reveal { opacity: 0; transform: translateY(30px); transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
                .reveal.visible { opacity: 1; transform: translateY(0); }
            `}</style>

            {/* Nav */}
            <nav id="navbar">
                <a href="https://aice.services" target="_blank" rel="noopener noreferrer" className="nav-brand">
                    <span className="nav-brand-text">AICE</span>
                    <span className="nav-brand-divider">/</span>
                    <span className="nav-brand-sub">Sales Hackathon</span>
                </a>
                <ul className="nav-links" id="navLinks">
                    <li><a href="#deal">The Deal</a></li>
                    <li><a href="#product">The Product</a></li>
                    <li><a href="#scope">Scope</a></li>
                    <li><a href="#schedule">Schedule</a></li>
                    <li><a href="#scoring">Scoring</a></li>
                    <li>
                        <a href="https://aice.services" target="_blank" rel="noopener noreferrer" className="nav-aice-link">
                            ← aice.services
                        </a>
                    </li>
                    <li><a href="https://app.youform.com/forms/nn4bbvki" target="_blank" rel="noopener noreferrer" className="btn-apply-nav">Apply Now →</a></li>
                </ul>
                <button className="hamburger" id="hamburger" aria-label="Toggle menu">
                    <span></span><span></span><span></span>
                </button>
            </nav>

            {/* Hero */}
            <section className="hero" id="heroSection">
                <div className="hero-bg"></div>
                <div className="hero-grid"></div>
                <div className="stacked-panels-wrap" id="stackedPanels"></div>
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="hero-badge-dot"></span>
                        Hyderabad&apos;s First Sales Hackathon
                    </div>
                    <h1>Sell. Close. <span className="highlight">Earn for life.</span></h1>
                    <p className="hero-sub">
                        8 hours. 20 seats. One AI product. Sell Magical CX at the hackathon and earn{' '}
                        <strong>20% lifetime recurring commission</strong> on every deal you lock in.
                    </p>
                    <div className="hero-meta">
                        <div className="hero-meta-item">
                            <div className="hero-meta-label">Date</div>
                            <div className="hero-meta-value">April 4, 2026</div>
                        </div>
                        <div className="hero-meta-item">
                            <div className="hero-meta-label">Time</div>
                            <div className="hero-meta-value">10 AM – 6 PM</div>
                        </div>
                        <div className="hero-meta-item">
                            <div className="hero-meta-label">Venue</div>
                            <div className="hero-meta-value">Skyview 10, Gachibowli</div>
                        </div>
                        <div className="hero-meta-item">
                            <div className="hero-meta-label">Seats</div>
                            <div className="hero-meta-value">20 Only</div>
                        </div>
                    </div>
                    <div className="hero-cta">
                        <a href="https://app.youform.com/forms/nn4bbvki" target="_blank" rel="noopener noreferrer" className="btn-primary">Apply Now →</a>
                        <a href="#product" className="btn-secondary">Learn about the product</a>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <div className="stat-banner">
                <div className="stat-grid">
                    <div><div className="stat-number">20%</div><div className="stat-label">Lifetime Commission</div></div>
                    <div><div className="stat-number">8hrs</div><div className="stat-label">Sales Sprint</div></div>
                    <div><div className="stat-number">20</div><div className="stat-label">Seats Only</div></div>
                    <div><div className="stat-number">∞</div><div className="stat-label">Recurring Revenue</div></div>
                </div>
            </div>

            {/* The Deal */}
            <section className="deal-section" id="deal">
                <div className="container reveal">
                    <div className="section-label">Why Show Up</div>
                    <h2 className="section-title">The deal is simple</h2>
                    <p className="section-desc">This isn&apos;t a workshop. It&apos;s a high-stakes sales sprint. You sell, you earn. The better you sell, the more you take home.</p>
                    <div className="deal-grid">
                        <div className="deal-card deal-card-highlight">
                            <div className="deal-card-icon">
                                <svg className="icon-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            </div>
                            <h3>20% Lifetime Commission</h3>
                            <p>Every deal you close earns you 20% recurring revenue for the lifetime of that customer. Your client, your income stream.</p>
                        </div>
                        <div className="deal-card">
                            <div className="deal-card-icon">
                                <svg className="icon-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                            </div>
                            <h3>Prizes &amp; Token Credits</h3>
                            <p>Top performers walk away with exciting prizes and free Magical CX token credits. Performance pays, literally.</p>
                        </div>
                        <div className="deal-card">
                            <div className="deal-card-icon">
                                <svg className="icon-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </div>
                            <h3>Network with Builders</h3>
                            <p>Get in the room with Hyderabad&apos;s top founders, builders, and investors. The people you meet here will matter more than the prize.</p>
                        </div>
                        <div className="deal-card">
                            <div className="deal-card-icon">
                                <svg className="icon-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                            </div>
                            <h3>Solo or Team</h3>
                            <p>Come alone or bring a team. Stronger the team, more deals you crack. We&apos;ll pair solo players with other hustlers in the room.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Product */}
            <section className="product-section" id="product">
                <div className="container reveal">
                    <div className="section-label">What You&apos;re Selling</div>
                    <h2 className="section-title">Magical CX</h2>
                    <p className="section-desc">An AI-native customer support agent and CRM that remembers every conversation, responds with empathy, and turns support into revenue.</p>
                    <div className="product-grid">
                        <div className="product-features">
                            <div className="product-feature">
                                <div className="product-feature-icon">
                                    <svg className="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 6 8 12 8 12s8-6 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
                                </div>
                                <div>
                                    <h4>HumanlyClear™ Conversations</h4>
                                    <p>AI responses that feel like your best human agents. Clear, empathetic, and context-aware across every channel.</p>
                                </div>
                            </div>
                            <div className="product-feature">
                                <div className="product-feature-icon">
                                    <svg className="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                                </div>
                                <div>
                                    <h4>EFRO™ Revenue Engine</h4>
                                    <p>Introduces upgrades, offers, and saves at the right moment. Turns every support conversation into a revenue opportunity.</p>
                                </div>
                            </div>
                            <div className="product-feature">
                                <div className="product-feature-icon">
                                    <svg className="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                                </div>
                                <div>
                                    <h4>Conversational Memory</h4>
                                    <p>Remembers past chats, orders, and preferences. Customers never repeat themselves again.</p>
                                </div>
                            </div>
                            <div className="product-feature">
                                <div className="product-feature-icon">
                                    <svg className="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                </div>
                                <div>
                                    <h4>Omnichannel Inbox</h4>
                                    <p>Web, Email, WhatsApp, Instagram, Messenger — one intelligent brain unifying every customer touchpoint.</p>
                                </div>
                            </div>
                            <div className="product-feature">
                                <div className="product-feature-icon">
                                    <svg className="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
                                </div>
                                <div>
                                    <h4>Self-Learning Engine</h4>
                                    <p>Gets smarter with every conversation. 98%+ accuracy that improves continuously.</p>
                                </div>
                            </div>
                        </div>

                        {/* Chat visual — replaces code block */}
                        <div className="product-chat">
                            <div className="chat-header">
                                <div className="chat-avatar">✨</div>
                                <div>
                                    <div className="chat-name">Magical CX Agent</div>
                                    <div className="chat-online">
                                        <span className="chat-online-dot"></span>
                                        Always on
                                    </div>
                                </div>
                            </div>
                            <div className="chat-body">
                                <div className="chat-bubble customer">Hi, I placed an order 3 days ago — where is it?</div>
                                <div className="chat-bubble agent">
                                    Hi Priya! Your order <strong>#8821</strong> shipped via BlueDart yesterday. Expected delivery: <strong>tomorrow by 6 PM</strong> 📦
                                </div>
                                <div className="chat-bubble customer">Can I exchange the size?</div>
                                <div className="chat-bubble agent">
                                    Done! Exchange raised. Pickup within 2 hours. As a <strong>Gold member</strong>, enjoy <strong>15% off</strong> your next order 🎁
                                </div>
                                <div className="chat-badges">
                                    <span className="chat-badge">Empathetic</span>
                                    <span className="chat-badge">Memory</span>
                                    <span className="chat-badge">Revenue Engine</span>
                                    <span className="chat-badge">98% Accuracy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
                        <a href="https://www.magicalcx.com" target="_blank" rel="noopener noreferrer" className="btn-secondary">Explore Magical CX →</a>
                        <a href="https://www.magicalcx.com/pricing" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ marginLeft: '1rem' }}>View Pricing →</a>
                    </div>
                </div>
            </section>

            {/* Globe / Scope */}
            <section className="globe-section" id="scope">
                <div className="container reveal">
                    <div className="globe-layout">
                        <div className="globe-text">
                            <div className="section-label">Scope of Magical CX</div>
                            <h2 className="section-title">Built for brands<br />that sell online</h2>
                            <p className="section-desc">Magical CX powers customer experience for D2C and e-commerce businesses across industries. These are the verticals your prospects operate in.</p>
                            <div className="scope-tags">
                                <span className="scope-tag">Jewellery</span>
                                <span className="scope-tag">Fashion Accessories</span>
                                <span className="scope-tag">Apparel &amp; Clothing</span>
                                <span className="scope-tag">Cosmetics &amp; Beauty</span>
                                <span className="scope-tag">Lipsticks &amp; Makeup</span>
                                <span className="scope-tag">Perfumes &amp; Fragrances</span>
                                <span className="scope-tag">Packaged Food</span>
                                <span className="scope-tag">Protein &amp; Supplements</span>
                            </div>
                            <a href="https://www.magicalcx.com" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '2.5rem', width: 'fit-content' }}>Explore Magical CX →</a>
                        </div>
                        <div className="globe-canvas-wrap">
                            <canvas id="cobeGlobe"></canvas>
                        </div>
                    </div>
                </div>
            </section>

            {/* Schedule */}
            <section className="schedule-section" id="schedule">
                <div className="container reveal">
                    <div className="section-label">The Day</div>
                    <h2 className="section-title">Schedule</h2>
                    <p className="section-desc">8 hours. Every minute counts. Here&apos;s how the day breaks down.</p>
                    <div className="timeline">
                        <div className="timeline-item active">
                            <div className="timeline-dot">
                                <svg className="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                            </div>
                            <div>
                                <div className="timeline-time">10:00 AM – 11:00 AM</div>
                                <div className="timeline-title">Networking &amp; Ice-Breaking</div>
                                <div className="timeline-desc">Meet the room. Founders, builders, closers, investors. Form your teams or find your partner. The people you meet here could change your trajectory.</div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-dot">
                                <svg className="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                            </div>
                            <div>
                                <div className="timeline-time">11:00 AM – 12:00 PM</div>
                                <div className="timeline-title">Product Deep Dive</div>
                                <div className="timeline-desc">Learn everything about Magical CX — the product, the pain it solves, the pricing, and the exact playbook to sell it. We arm you with everything you need.</div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-dot">
                                <svg className="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
                            </div>
                            <div>
                                <div className="timeline-time">12:00 PM – 12:30 PM</div>
                                <div className="timeline-title">Sales Strategy &amp; Scripts</div>
                                <div className="timeline-desc">Cold calling scripts, LinkedIn DM templates, email outreach, gate-crashing tactics. You get the playbook — but you&apos;re not limited to it. Get creative.</div>
                            </div>
                        </div>
                        <div className="timeline-item active">
                            <div className="timeline-dot">
                                <svg className="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
                            </div>
                            <div>
                                <div className="timeline-time">12:30 PM – 5:00 PM</div>
                                <div className="timeline-title">The Blitz — Go Sell</div>
                                <div className="timeline-desc">4+ hours of pure hustle. Call, DM, pitch, demo, close. This is your arena. The leaderboard is live. Every deal counts. Every lead matters.</div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-dot">
                                <svg className="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                            </div>
                            <div>
                                <div className="timeline-time">5:00 PM – 5:30 PM</div>
                                <div className="timeline-title">Closing &amp; Scoring</div>
                                <div className="timeline-desc">Sales sprint ends. We tally points, verify leads, and calculate final scores based on the point system.</div>
                            </div>
                        </div>
                        <div className="timeline-item active">
                            <div className="timeline-dot">
                                <svg className="icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
                            </div>
                            <div>
                                <div className="timeline-time">5:30 PM – 6:00 PM</div>
                                <div className="timeline-title">Winners &amp; Celebrations</div>
                                <div className="timeline-desc">Top performers are crowned. Prizes distributed. Commissions locked. The start of something bigger.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scoring */}
            <section className="scoring-section" id="scoring">
                <div className="container reveal">
                    <div className="section-label">How We Score</div>
                    <h2 className="section-title">Point system</h2>
                    <p className="section-desc">Deals won&apos;t always close in 5 hours. That&apos;s why we score on leading indicators — every action moves you up the leaderboard.</p>
                    <div className="scoring-table">
                        <div className="scoring-row header"><span>Action</span><span>Points</span><span>Verification</span></div>
                        <div className="scoring-row"><span className="scoring-action">Qualified Lead Generated</span><span className="scoring-points">10 pts</span><span className="scoring-verify">Name, phone, and verified pain point</span></div>
                        <div className="scoring-row"><span className="scoring-action">Demo Booked</span><span className="scoring-points">50 pts</span><span className="scoring-verify">Calendar invite accepted by the prospect</span></div>
                        <div className="scoring-row"><span className="scoring-action">Live Demo Delivered</span><span className="scoring-points">100 pts</span><span className="scoring-verify">Prospect on a live Zoom/call during the hackathon</span></div>
                        <div className="scoring-row"><span className="scoring-action">Deal Closed / Payment Made</span><span className="scoring-points">500 pts</span><span className="scoring-verify">Payment confirmation or signed agreement</span></div>
                    </div>
                </div>
            </section>

            {/* Who */}
            <section className="who-section" id="who">
                <div className="container reveal">
                    <div className="section-label">Who Belongs Here</div>
                    <h2 className="section-title">This room is for the hungry</h2>
                    <p className="section-desc">We don&apos;t care about your degree or your resume. We care about what you&apos;ve built, sold, or shipped.</p>
                    <div className="who-grid">
                        <div className="who-card">
                            <div className="who-icon">
                                <svg className="icon-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                            </div>
                            <h3>Builders</h3>
                            <p>Developers and techies who understand products and want to learn the other side — selling what you build.</p>
                        </div>
                        <div className="who-card">
                            <div className="who-icon">
                                <svg className="icon-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </div>
                            <h3>Closers</h3>
                            <p>Sales pros, BDRs, or anyone who&apos;s ever cold-called a stranger and turned a &quot;no&quot; into a deal.</p>
                        </div>
                        <div className="who-card">
                            <div className="who-icon">
                                <svg className="icon-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 13v-2z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
                            </div>
                            <h3>Marketers</h3>
                            <p>Growth hackers, content creators, and marketers who know how to generate demand and move people to action.</p>
                        </div>
                        <div className="who-card">
                            <div className="who-icon">
                                <svg className="icon-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>
                            </div>
                            <h3>Students &amp; Hustlers</h3>
                            <p>College students, freelancers, or anyone with high agency. If you&apos;re hungry, this room is for you.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section" id="apply">
                <div className="container reveal">
                    <div className="section-label">Limited to 20 Seats</div>
                    <h2 className="section-title">Resumes are dead.<br />Proof of Work is everything.</h2>
                    <p className="section-desc">Show us what you&apos;ve built, sold, or shipped. A link, a screenshot, anything real. That&apos;s your ticket in.</p>
                    <div className="cta-details">
                        <div className="cta-detail">
                            <svg className="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>
                            Skyview 10, Gachibowli
                        </div>
                        <div className="cta-detail">
                            <svg className="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                            April 4, 2026
                        </div>
                        <div className="cta-detail">
                            <svg className="icon-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            10 AM – 6 PM
                        </div>
                    </div>
                    <a href="https://app.youform.com/forms/nn4bbvki" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}>Apply Now →</a>
                    <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Selection is based on Proof of Work. No tourists. No fluff.</p>
                    <div className="cta-btn-row">
                        <a href="https://aice.services" target="_blank" rel="noopener noreferrer" className="btn-aice-small">
                            ← aice.services
                        </a>
                    </div>
                </div>
            </section>

            <footer>
                <div className="footer-inner">
                    <div className="footer-brand">
                        <a href="https://aice.services" target="_blank" rel="noopener noreferrer"><strong>AICE</strong></a>
                        <a href="https://www.magicalcx.com" target="_blank" rel="noopener noreferrer">Magical CX</a>
                        <a href="https://www.instagram.com/ajaxx6.4/" target="_blank" rel="noopener noreferrer">@ajaxx6.4</a>
                    </div>
                    <div className="footer-copy">&copy; 2026 AICE. All rights reserved.</div>
                </div>
            </footer>
        </>
    );
}
