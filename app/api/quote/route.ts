import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, phone, email, address, service, message } = body;

    if (!name || !phone || !email || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Moise Property Care <quotes@moisepropertycare.com>",
      to: process.env.QUOTE_TO_EMAIL as string,
      subject: `New Quote Request - ${service}`,
      replyTo: email,
      text: `
New quote request from Moise Property Care website:

Name: ${name}
Phone: ${phone}
Email: ${email}
Address / Area: ${address || "Not provided"}
Service: ${service}

Message:
${message || "No message provided"}
      `,
    });

    await resend.emails.send({
      from: "Moise Property Care <quotes@moisepropertycare.com>",
      to: email,
      subject: "We received your quote request",
      replyTo: process.env.QUOTE_TO_EMAIL as string,
      text: `
Hi ${name},

Thank you for contacting Moise Property Care.

We received your quote request and will review the details shortly. We'll contact you as soon as possible to confirm availability, pricing, and next steps.

Service requested: ${service}
Area / Address: ${address || "Not provided"}

Thank you,
Moise Property Care
Brooklyn & Lower Manhattan
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote form error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}