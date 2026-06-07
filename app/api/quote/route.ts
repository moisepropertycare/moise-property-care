import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
  name,
  phone,
  email,
  address,
  service,
  propertyType,
  bedrooms,
  bathrooms,
  condition,
  timeframe,
  message,
   } = body;


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

Service:
${service}

Property Type:
${propertyType}

Bedrooms:
${bedrooms}

Bathrooms:
${bathrooms}

Property Condition:
${condition}

Requested Timeframe:
${timeframe}

Address / Area:
${address || "Not provided"}

Message:
${message || "No message provided"}
`,
    });

    await resend.emails.send({
  from: "Moise Property Care <quotes@moisepropertycare.com>",
  to: email,
  subject: "We received your quote request",
  replyTo: "quotes@moisepropertycare.com",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0f172a;">
      <div style="text-align: center; margin-bottom: 24px;">
        <img src="https://www.moisepropertycare.com/logo.png" alt="Moise Property Care" style="max-width: 160px; height: auto;" />
      </div>

      <h2 style="color: #172554; margin-bottom: 12px;">We received your quote request</h2>

      <p>Hi ${name},</p>

      <p>
        Thank you for contacting <strong>Moise Property Care</strong>.
        We received your quote request and will review the details shortly.
      </p>

      <p>
        We’ll contact you as soon as possible to confirm availability, pricing, and next steps.
      </p>

      <div style="background: #f8fafc; border-radius: 16px; padding: 16px; margin: 24px 0;">
        <p><strong>Service requested:</strong> ${service}</p>
        <p><strong>Area / Address:</strong> ${address || "Not provided"}</p>
      </div>

      <p>Thank you,<br /><strong>Moise Property Care</strong></p>

      <p style="color: #16a34a; font-weight: bold;">Brooklyn & Lower Manhattan</p>
    </div>
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