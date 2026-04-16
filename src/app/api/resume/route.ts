import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { firstName, lastName, email, phone, location, linkedinUrl, resumeUrl, targetRole, notes } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.MAKE_WEBHOOK_RESUME;
    
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kind: 'resume',
          receivedAt: new Date().toISOString(),
          firstName,
          lastName,
          email,
          phone: phone || '',
          location: location || '',
          linkedinUrl: linkedinUrl || '',
          resumeUrl: resumeUrl || '',
          targetRole: targetRole || '',
          notes: notes || '',
          source: 'website',
        }),
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Your resume has been submitted. Sarah will review and be in touch if there is a fit.',
    });
  } catch (error) {
    console.error('Resume form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit resume. Please try again.' },
      { status: 500 }
    );
  }
}
