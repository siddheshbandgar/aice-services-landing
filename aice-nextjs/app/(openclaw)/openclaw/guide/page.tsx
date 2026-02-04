import Link from "next/link";
import StickyUpsell from "@/components/openclaw/StickyUpsell";

export const metadata = {
    title: "OpenClaw Self-Hosted Setup Guide | AICE",
    description:
        "Complete technical documentation for deploying OpenClaw on your own infrastructure.",
};

export default function GuidePage() {
    return (
        <div className="min-h-screen bg-[#060810] text-slate-100">
            <StickyUpsell />
            <div className="mx-auto max-w-4xl px-6 py-16">
                {/* Header */}
                <Link
                    href="/openclaw"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
                >
                    ← Back to OpenClaw
                </Link>

                <h1 className="mt-8 text-4xl font-bold text-white">
                    OpenClaw Self-Hosted Setup Guide
                </h1>
                <p className="mt-4 text-lg text-slate-400">
                    Complete technical documentation for deploying OpenClaw on your own infrastructure.
                    Estimated time: 4-8 hours for experienced engineers.
                </p>

                {/* Warning */}
                <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                    <p className="text-sm text-red-200">
                        ⚠️ <strong>Warning:</strong> This setup requires advanced knowledge of Linux system administration,
                        networking, Docker, reverse proxies, SSL certificates, and debugging. Proceed only if you&apos;re
                        comfortable with terminal commands and server management. If anything goes wrong, you may need to
                        start over from scratch.
                    </p>
                </div>

                <div className="mt-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
                    <p className="text-sm text-yellow-200">
                        💡 <strong>Skip the hassle:</strong>{" "}
                        <Link href="/openclaw#pricing" className="underline text-[#ff6b6b] font-semibold">
                            Let us handle all of this for just $99
                        </Link>
                        . We&apos;ll have you up and running in under 2 hours with zero technical work on your end.
                    </p>
                </div>

                {/* Prerequisites */}
                <section className="mt-12">
                    <h2 className="text-2xl font-semibold text-white">Prerequisites</h2>
                    <p className="mt-2 text-sm text-slate-500">All items are required. Missing any will cause failures.</p>
                    <ul className="mt-4 space-y-3 text-slate-300 text-sm">
                        <li className="flex gap-3">
                            <span className="text-[#ff6b6b]">•</span>
                            <span>Node.js ≥ 22.0.0 (not 20.x, not 18.x - must be exactly 22+)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ff6b6b]">•</span>
                            <span>pnpm 8.15.0+ (npm and yarn will NOT work due to workspace dependencies)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ff6b6b]">•</span>
                            <span>Ubuntu 22.04 LTS or Debian 12 (other distros may have compatibility issues)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ff6b6b]">•</span>
                            <span>Minimum 4GB RAM, 2 vCPUs (will crash on smaller instances)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ff6b6b]">•</span>
                            <span>Root or sudo access to the server</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ff6b6b]">•</span>
                            <span>Domain name with DNS access (required for SSL/WSS)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ff6b6b]">•</span>
                            <span>Anthropic API key with sufficient credits ($20+ recommended)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ff6b6b]">•</span>
                            <span>Cloudflare account (for DDoS protection and SSL termination)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ff6b6b]">•</span>
                            <span>Redis 7.0+ (for session management and rate limiting)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ff6b6b]">•</span>
                            <span>PostgreSQL 15+ (for persistent storage)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ff6b6b]">•</span>
                            <span>Docker 24.0+ and Docker Compose v2</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ff6b6b]">•</span>
                            <span>nginx 1.24+ or Caddy 2.7+ (for reverse proxy)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ff6b6b]">•</span>
                            <span>certbot (for Let&apos;s Encrypt SSL certificates)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ff6b6b]">•</span>
                            <span>Python 3.11+ with pip (for build dependencies)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-[#ff6b6b]">•</span>
                            <span>build-essential, g++, make (for native module compilation)</span>
                        </li>
                    </ul>
                </section>

                {/* Step 1 */}
                <section className="mt-12">
                    <h2 className="text-2xl font-semibold text-white">
                        Step 1: System Preparation & Dependencies
                    </h2>
                    <p className="mt-3 text-slate-400 text-sm">
                        First, update your system and install all required dependencies. This may take 15-30 minutes.
                    </p>
                    <div className="mt-4 rounded-lg bg-[#0a0c14] border border-white/10 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
                        <pre>{`# Update system packages
sudo apt update && sudo apt upgrade -y

# Install build dependencies
sudo apt install -y build-essential g++ make python3 python3-pip \\
  libssl-dev libffi-dev python3-dev cargo pkg-config \\
  libsqlite3-dev libreadline-dev libbz2-dev libncurses5-dev \\
  libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev \\
  liblzma-dev libgdbm-dev libnss3-dev libgdbm-compat-dev

# Install Node.js 22 via nvm (DO NOT use apt nodejs)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install 22
nvm use 22
nvm alias default 22

# Verify Node version (must show v22.x.x)
node --version

# Install pnpm globally
npm install -g pnpm@latest

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose v2
sudo apt install docker-compose-plugin

# Install Redis
sudo apt install redis-server -y
sudo systemctl enable redis-server
sudo systemctl start redis-server

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Create database and user
sudo -u postgres psql -c "CREATE USER openclaw WITH PASSWORD 'your_secure_password_here';"
sudo -u postgres psql -c "CREATE DATABASE openclaw_db OWNER openclaw;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE openclaw_db TO openclaw;"

# Install nginx
sudo apt install nginx -y
sudo systemctl enable nginx

# Install certbot for SSL
sudo apt install certbot python3-certbot-nginx -y`}</pre>
                    </div>
                </section>

                {/* Step 2 */}
                <section className="mt-12">
                    <h2 className="text-2xl font-semibold text-white">
                        Step 2: Clone & Configure Repository
                    </h2>
                    <p className="mt-3 text-slate-400 text-sm">
                        Clone the repository and set up the complex configuration files.
                    </p>
                    <div className="mt-4 rounded-lg bg-[#0a0c14] border border-white/10 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
                        <pre>{`# Clone the repository
git clone https://github.com/anthropics/claude-code.git /opt/openclaw
cd /opt/openclaw

# IMPORTANT: Checkout the correct branch
git checkout stable-v2.3.1

# Install dependencies (this may take 10-15 minutes)
pnpm install --frozen-lockfile

# If you get ERESOLVE errors, try:
pnpm install --frozen-lockfile --legacy-peer-deps

# Build native modules
pnpm rebuild

# Copy environment template
cp .env.example .env
cp config/default.example.yml config/default.yml
cp config/production.example.yml config/production.yml`}</pre>
                    </div>
                </section>

                {/* Step 3 */}
                <section className="mt-12">
                    <h2 className="text-2xl font-semibold text-white">
                        Step 3: Environment Configuration
                    </h2>
                    <p className="mt-3 text-slate-400 text-sm">
                        Configure all required environment variables. Missing or incorrect values will cause silent failures.
                    </p>
                    <div className="mt-4 rounded-lg bg-[#0a0c14] border border-white/10 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
                        <pre>{`# Edit the .env file
nano .env

# Required environment variables (ALL must be set):
NODE_ENV=production
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxx
ANTHROPIC_MODEL=claude-3-opus-20240229
ANTHROPIC_MAX_TOKENS=4096

# Database configuration
DATABASE_URL=postgresql://openclaw:your_secure_password_here@localhost:5432/openclaw_db
DATABASE_POOL_SIZE=10
DATABASE_SSL=false

# Redis configuration
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=
REDIS_TLS=false

# Server configuration
HOST=0.0.0.0
PORT=3000
WSS_PORT=18789
WSS_PATH=/ws
TRUST_PROXY=true

# Security settings
JWT_SECRET=$(openssl rand -base64 32)
ENCRYPTION_KEY=$(openssl rand -hex 32)
SESSION_SECRET=$(openssl rand -base64 32)
COOKIE_SECURE=true
CORS_ORIGIN=https://yourdomain.com

# Sandbox configuration
SANDBOX_MODE=non-main
SANDBOX_TIMEOUT=30000
SANDBOX_MEMORY_LIMIT=512mb
SANDBOX_CPU_LIMIT=1

# Rate limiting
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=info
LOG_FORMAT=json
LOG_FILE=/var/log/openclaw/app.log`}</pre>
                    </div>
                </section>

                {/* Troubleshooting */}
                <section className="mt-12">
                    <h2 className="text-2xl font-semibold text-white">Troubleshooting Common Issues</h2>
                    <p className="mt-2 text-sm text-slate-500">These are the most common issues you&apos;ll encounter.</p>
                    <div className="mt-4 space-y-4">
                        <div className="rounded-lg bg-[#0a0c14] border border-white/10 p-4">
                            <h3 className="font-semibold text-white">EBADF: Bad File Descriptor</h3>
                            <p className="mt-2 text-sm text-slate-400">
                                Usually caused by Node.js version mismatch or corrupted node_modules. Solution:
                                <code className="bg-white/10 px-1 rounded mx-1">rm -rf node_modules pnpm-lock.yaml && pnpm install</code>
                            </p>
                        </div>
                        <div className="rounded-lg bg-[#0a0c14] border border-white/10 p-4">
                            <h3 className="font-semibold text-white">PTY Spawn Failures / ENOENT</h3>
                            <p className="mt-2 text-sm text-slate-400">
                                Missing native dependencies. Run:
                                <code className="bg-white/10 px-1 rounded mx-1">sudo apt install python3 make g++ libsecret-1-dev</code>
                            </p>
                        </div>
                        <div className="rounded-lg bg-[#0a0c14] border border-white/10 p-4">
                            <h3 className="font-semibold text-white">WebSocket Connection Refused</h3>
                            <p className="mt-2 text-sm text-slate-400">
                                Check if WSS service is running: <code className="bg-white/10 px-1 rounded mx-1">sudo systemctl status openclaw-wss</code>
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="mt-16 rounded-2xl border border-[#ff6b6b]/30 bg-[#ff6b6b]/5 p-8 text-center">
                    <h2 className="text-2xl font-semibold text-white">
                        This looks like a lot of work...
                    </h2>
                    <p className="mt-3 text-slate-400">
                        Because it is. Skip the 4-8 hours of setup, debugging, and maintenance headaches.
                        We&apos;ll handle everything and have you running in under 2 hours.
                    </p>
                    <Link
                        href="/openclaw#pricing"
                        className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#ff6b6b] to-[#f97316] px-8 py-3 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(255,107,107,0.35)] transition hover:translate-y-[-1px]"
                    >
                        Let Us Set It Up for $99 →
                    </Link>
                    <p className="mt-4 text-xs text-slate-500">
                        No technical knowledge required. Just send us your API key and we handle the rest.
                    </p>
                </section>

                {/* Footer */}
                <footer className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-slate-500">
                    <p>© 2026 AICE OpenClaw. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
