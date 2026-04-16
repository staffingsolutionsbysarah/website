import { NextResponse } from 'next/server';
import { createIssueForBooking, linkCandidateToIssue } from '@/lib/linear';

type CalEventType = 'BOOKING_CREATED' | 'BOOKING_CANCELLED' | 'BOOKING_CONFIRMED' | 'BOOKING_REQUESTED';

interface CalAttendee {
  name: string;
  email: string;
  timeZone: string;
  locale?: string;
}

interface CalBooking {
  id: number;
  uid: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  eventType: string;
  status: string;
  attendees: CalAttendee[];
  organizer: CalAttendee;
  location?: {
    type: string;
    link?: string;
  };
  meetingId?: string;
  recordingConsent?: boolean;
}

interface CalWebhookPayload {
  event: CalEventType;
  payload: CalBooking;
}

async function verifyWebhookSignature(payload: string, signature: string | null): Promise<boolean> {
  if (!signature) return false;
  
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) {
    console.error('CAL_WEBHOOK_SECRET not configured');
    return false;
  }

  const encoder = new TextEncoder();
  const key = encoder.encode(secret);
  const data = encoder.encode(payload);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const sig = await crypto.subtle.sign('HMAC', cryptoKey, data);
  
  const signatureBytes = Buffer.from(signature);
  const computedBytes = Buffer.from(sig);
  if (signatureBytes.length !== computedBytes.length) return false;
  let result = 0;
  for (let i = 0; i < signatureBytes.length; i++) {
    result |= signatureBytes[i] ^ computedBytes[i];
  }
  return result === 0;
}

function extractBookingData(payload: CalWebhookPayload) {
  const { event, payload: booking } = payload;
  
  const primaryAttendee = booking.attendees?.[0];
  const organizer = booking.organizer;

  return {
    event,
    receivedAt: new Date().toISOString(),
    booking: {
      id: booking.uid,
      title: booking.title,
      description: booking.description || '',
      startTime: booking.startTime,
      endTime: booking.endTime,
      eventType: booking.eventType,
      status: booking.status,
      location: booking.location,
      meetingId: booking.meetingId,
    },
    attendee: primaryAttendee ? {
      name: primaryAttendee.name,
      email: primaryAttendee.email,
      timeZone: primaryAttendee.timeZone,
    } : null,
    organizer: organizer ? {
      name: organizer.name,
      email: organizer.email,
    } : null,
  };
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('cal-webhook-signature');
    
    if (!(await verifyWebhookSignature(rawBody, signature))) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    const payload: CalWebhookPayload = JSON.parse(rawBody);
    const { event } = payload;

    const supportedEvents: CalEventType[] = [
      'BOOKING_CREATED',
      'BOOKING_CANCELLED',
      'BOOKING_CONFIRMED',
      'BOOKING_REQUESTED',
    ];

    if (!supportedEvents.includes(event)) {
      return NextResponse.json({
        success: true,
        message: `Event type ${event} not handled`,
      });
    }

    const webhookData = extractBookingData(payload);

    const makeWebhookUrl = process.env.MAKE_WEBHOOK_CALENDLY;
    
    if (makeWebhookUrl) {
      try {
        const response = await fetch(makeWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            kind: 'cal-booking',
            ...webhookData,
          }),
        });

        if (!response.ok) {
          console.error('Make.com webhook failed:', response.status);
        }
      } catch (makeError) {
        console.error('Make.com webhook error:', makeError);
      }
    }

    if (event === 'BOOKING_CREATED') {
      const hasLinearCredentials = process.env.LINEAR_API_KEY && process.env.LINEAR_TEAM_ID;
      
      if (hasLinearCredentials && webhookData.attendee) {
        try {
          const issue = await createIssueForBooking({
            candidateName: webhookData.attendee.name,
            candidateEmail: webhookData.attendee.email,
            position: webhookData.booking.title,
            notes: webhookData.booking.description || undefined,
          });
          
          console.log('Created Linear issue for booking:', issue.identifier);
          
          if (webhookData.attendee.email) {
            try {
              await linkCandidateToIssue(issue.id, webhookData.attendee.email);
              console.log('Linked candidate to Linear issue');
            } catch (linkError) {
              console.error('Failed to link candidate to issue:', linkError);
            }
          }
        } catch (linearError) {
          console.error('Failed to create Linear issue:', linearError);
        }
      } else if (!hasLinearCredentials) {
        console.warn('Linear credentials not configured, skipping issue creation');
      }
    }

    console.log(`Cal.com webhook received: ${event}`, {
      bookingId: webhookData.booking.id,
      attendee: webhookData.attendee?.email,
    });

    return NextResponse.json({
      success: true,
      message: `Processed ${event}`,
    });
  } catch (error) {
    console.error('Cal.com webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
