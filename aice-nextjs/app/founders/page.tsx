import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Meet the Founders | AICE',
    description: 'Meet the founders of AICE - The visionary team behind enterprise AI solutions.',
};

const founders = [
    {
        name: 'Manish Keswani',
        designation: 'Co-Founder | Strategy & Partnerships',
        image: 'https://media.licdn.com/dms/image/v2/C4D03AQH76XeYk97cNA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1643351983354?e=1769644800&v=beta&t=0EHqhvSmcrmCP-q3FDVrghYXMfLFutJZ2WxYzHAO6Uk',
        linkedin: 'https://www.linkedin.com/in/manish-keswani-9a5a7814b/',
        twitter: 'https://twitter.com/',
    },
    {
        name: 'Hrushikesh Kuklare',
        designation: 'Co-Founder | AI & Research',
        image: 'https://media.licdn.com/dms/image/v2/D4D03AQFRopXYTMw6bw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1701061434772?e=1769644800&v=beta&t=KhbCR1ua97UopKTNBoCbL3BbpIVKrEZ9Z3ZW-kh7rM8',
        linkedin: 'https://www.linkedin.com/in/hrushikesh-kuklare/',
        twitter: 'https://twitter.com/',
    },
    {
        name: 'Ajinkya Hazare',
        designation: 'Co-Founder | Platform & Delivery',
        image: 'https://media.licdn.com/dms/image/v2/D4D03AQFbI3DgCKQgmw/profile-displayphoto-shrink_400_400/B4DZYcWkImG4Ak-/0/1744232400341?e=1769644800&v=beta&t=Sg01VbyJTPp-fVDAj8ZUdV1nbkUbcgIpuqhnuW8jXko',
        linkedin: 'https://www.linkedin.com/in/ajinkya-hazare-b59258170/',
        twitter: 'https://twitter.com/',
    },
    {
        name: 'Siddhesh Bandgar',
        designation: 'Co-Founder | Product & Engineering',
        image: '/siddhesh.jpeg',
        linkedin: 'https://www.linkedin.com/in/siddhesh-bandgar/',
        twitter: 'https://twitter.com/',
    },
];

export default function FoundersPage() {
    return (
        <main>
            <section className="founders-hero">
                <div className="founders-hero-content">
                    <h1 className="founders-hero-title">Meet the Founders</h1>
                    <p className="founders-hero-subtitle">
                        The visionary team building the future of enterprise AI
                    </p>
                </div>
            </section>

            <section className="founders-section">
                <div className="founders-container">
                    <div className="founders-grid-equal">
                        {founders.map((founder) => (
                            <div key={founder.name} className="founder-card-minimal">
                                <div className="founder-avatar-wrapper">
                                    <Image
                                        src={founder.image}
                                        alt={founder.name}
                                        width={140}
                                        height={140}
                                        style={{ objectFit: 'cover', borderRadius: '50%' }}
                                    />
                                </div>
                                <h3 className="founder-name">{founder.name}</h3>
                                <p className="founder-designation">{founder.designation}</p>
                                <div className="founder-social-links">
                                    <a
                                        href={founder.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-icon linkedin"
                                        aria-label="LinkedIn"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                    <a
                                        href={founder.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-icon twitter"
                                        aria-label="Twitter"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
