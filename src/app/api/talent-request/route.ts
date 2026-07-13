import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { companyName, contactName, workEmail, phone, roleTitle, roleType, timeline, budget, roleDescription, hiringNeeds } = body;

    if (!companyName || !contactName || !workEmail || !roleTitle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.MAKE_WEBHOOK_TALENT_REQUEST;

    if (!webhookUrl) {
      console.error('MAKE_WEBHOOK_TALENT_REQUEST not configured — talent request was NOT delivered');
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
        kind: 'talent-request',
        receivedAt: new Date().toISOString(),
        companyName,
        contactName,
        workEmail,
        phone: phone || '',
        roleTitle,
        roleType: roleType || '',
        timeline: timeline || '',
        budget: budget || '',
        roleDescription: roleDescription || '',
        hiringNeeds: hiringNeeds || '',
        source: 'website',
      }),
    });

    if (!res.ok) {
      console.error('Talent request webhook returned non-OK status:', res.status);
      return NextResponse.json(
        { error: 'Failed to submit request. Please try again.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Talent request received. Sarah will review and reach out to discuss the role.',
    });
  } catch (error) {
    console.error('Talent request form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit request. Please try again.' },
      { status: 500 }
    );
  }
}
