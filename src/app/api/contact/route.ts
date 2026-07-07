import { NextResponse } from "next/server";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_TO_EMAIL = "ssjrenovation@gmail.com";
const DEFAULT_FROM_EMAIL = "SSJ Renovations <website@ssjrenovation.com>";

type FormStatus = "sent" | "error" | "missing";

function readField(formData: FormData, name: string, maxLength = 1200) {
  const value = formData.get(name);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function redirectToContact(request: Request, status: FormStatus) {
  const url = new URL("/contact", request.url);
  url.searchParams.set("form", status);
  url.hash = "contact";
  return NextResponse.redirect(url, 303);
}

function buildMessage({
  name,
  phone,
  email,
  project,
  message,
}: {
  name: string;
  phone: string;
  email: string;
  project: string;
  message: string;
}) {
  const rows = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email || "Not provided"],
    ["Project type", project || "Not provided"],
    ["Message", message || "Not provided"],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 16px;border:1px solid #ded9cf;font-weight:700;color:#171717;">${escapeHtml(label)}</td>
          <td style="padding:12px 16px;border:1px solid #ded9cf;color:#555;">${escapeHtml(value).replace(/\n/g, "<br />")}</td>
        </tr>
      `,
    )
    .join("");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#171717;line-height:1.6;">
      <h1 style="margin:0 0 16px;font-size:24px;">New SSJ renovation inquiry</h1>
      <p style="margin:0 0 20px;color:#555;">A new inquiry was submitted from the SSJ website contact form.</p>
      <table style="border-collapse:collapse;width:100%;max-width:720px;">${htmlRows}</table>
    </div>
  `;

  return { text, html };
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const company = readField(formData, "company", 120);

  if (company) {
    return redirectToContact(request, "sent");
  }

  const name = readField(formData, "name", 120);
  const phone = readField(formData, "phone", 80);
  const email = readField(formData, "email", 160);
  const project = readField(formData, "project", 180);
  const message = readField(formData, "message", 2000);

  if (!name || !phone || !message) {
    return redirectToContact(request, "missing");
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_FORM_TO_EMAIL ?? DEFAULT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FORM_FROM_EMAIL ?? DEFAULT_FROM_EMAIL;
  const { text, html } = buildMessage({ name, phone, email, project, message });

  if (!apiKey) {
    return redirectToContact(request, "error");
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `New SSJ renovation inquiry from ${name}`,
      text,
      html,
      reply_to: isEmail(email) ? email : undefined,
    }),
  });

  if (!response.ok) {
    return redirectToContact(request, "error");
  }

  return redirectToContact(request, "sent");
}
