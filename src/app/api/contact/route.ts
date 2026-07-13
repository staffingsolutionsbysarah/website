import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { firstName, lastName, workEmail, company, phone, message } = body;

    if (!firstName || !lastName || !workEmail || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.MAKE_WEBHOOK_CONTACT;

    if (!webhookUrl) {
      console.error('MAKE_WEBHOOK_CONTACT not configured — contact submission was NOT delivered');
      return NextResponse.json(
        { error: 'This form is temporarily unavailable. Please email Sarah directly or try again shortly.' },
        { status: 503 }
      );
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        kind: 'contact',
        receivedAt: new Date().toISOString(),
        firstName,
        lastName,
        workEmail,
        company: company || '',
        phone: phone || '',
        message,
        source: 'website',
      }),
    });

    if (!res.ok) {
      console.error('Contact webhook returned non-OK status:', res.status);
      return NextResponse.json(
        { error: 'Failed to submit form. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. Sarah will be in touch soon.',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}
