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
    
    if (webhookUrl) {
      await fetch(webhookUrl, {
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
