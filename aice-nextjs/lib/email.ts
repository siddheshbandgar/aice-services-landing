import nodemailer from "nodemailer";

const GMAIL_ADDRESS = process.env.GMAIL_ADDRESS || "";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || "";

function getTransporter() {
  if (!GMAIL_ADDRESS || !GMAIL_APP_PASSWORD) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_ADDRESS, pass: GMAIL_APP_PASSWORD },
  });
}

export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) {
    console.error("Email not configured: GMAIL_ADDRESS / GMAIL_APP_PASSWORD missing");
    return false;
  }
  try {
    await transporter.sendMail({ from: GMAIL_ADDRESS, to, subject, html });
    console.log(`Email sent to ${to}`);
    return true;
  } catch (err) {
    console.error(`Failed to send email to ${to}:`, err);
    return false;
  }
}

export function ticketsLiveEmail(eventName: string, eventUrl: string) {
  return {
    subject: `TICKETS LIVE: ${eventName} — BOOK NOW!`,
    html: `<html><body style="font-family:Arial,sans-serif;padding:20px;text-align:center;">
      <h1 style="color:#e63946;">Tickets Are LIVE!</h1>
      <p style="font-size:18px;"><strong>${eventName}</strong></p>
      <p>Tickets are available on BookMyShow right now.</p>
      <p style="margin:30px 0;">
        <a href="${eventUrl}" style="background:#e63946;color:white;padding:15px 40px;text-decoration:none;border-radius:8px;font-size:20px;font-weight:bold;">BOOK NOW</a>
      </p>
      <p style="color:#666;font-size:12px;">Automated alert from SemiMatch</p>
    </body></html>`,
  };
}

export function soldOutEmail(eventName: string, eventUrl: string) {
  return {
    subject: `Sold Out: ${eventName}`,
    html: `<html><body style="font-family:Arial,sans-serif;padding:20px;">
      <h2 style="color:#999;">Tickets Sold Out</h2>
      <p><strong>${eventName}</strong></p>
      <p>Unfortunately, tickets appear to be sold out on BookMyShow.</p>
      <p><a href="${eventUrl}">Check Event Page</a> (sometimes more tickets get released)</p>
      <p style="color:#666;font-size:12px;">We'll keep monitoring in case more tickets are released.</p>
    </body></html>`,
  };
}

export function comingSoonEmail(eventName: string, eventUrl: string) {
  return {
    subject: `Monitoring Active: ${eventName} — Coming Soon`,
    html: `<html><body style="font-family:Arial,sans-serif;padding:20px;text-align:center;">
      <h1 style="color:#ea580c;">We're Watching!</h1>
      <p style="font-size:18px;"><strong>${eventName}</strong></p>
      <p>The event is listed on BookMyShow with status <strong>"Coming Soon"</strong>.</p>
      <p>Tickets aren't live yet — but we're checking every few minutes.</p>
      <p>The <strong>instant</strong> tickets go live, you'll get another email with a direct booking link.</p>
      <p style="margin:20px 0;"><a href="${eventUrl}" style="color:#ea580c;font-weight:bold;">View Event on BookMyShow</a></p>
      <p style="color:#666;font-size:12px;">SemiMatch Ticket Alerts &middot; You're all set, just wait for our next email.</p>
    </body></html>`,
  };
}

export function welcomeEmail(eventName: string) {
  return {
    subject: `You're in! ${eventName} — Ticket Alert Active`,
    html: `<html><body style="font-family:Arial,sans-serif;padding:20px;text-align:center;">
      <h1 style="color:#ea580c;">You're In!</h1>
      <p style="font-size:18px;"><strong>${eventName}</strong></p>
      <p>Your ticket alert is now <strong>active</strong>. We're monitoring BookMyShow 24x7.</p>
      <p>The moment tickets go live, you'll get an email with a <strong>direct booking link</strong>.</p>
      <div style="background:#f8f9fa;border-radius:12px;padding:20px;margin:20px 0;">
        <p style="margin:0;color:#666;">What happens next?</p>
        <p style="margin:8px 0 0;font-size:14px;">We check BookMyShow every few minutes. When tickets drop, you'll get an instant email — no delays.</p>
      </div>
      <p style="color:#666;font-size:12px;">SemiMatch Ticket Alerts &middot; semif674@gmail.com</p>
    </body></html>`,
  };
}
