import type { BookingRequestInput, NotificationStatus } from '@/lib/booking/contracts';
import type { BookingConfig } from '@/lib/booking/config';
import { BookingError } from '@/lib/booking/errors';

type NotificationResult = {
  internal: NotificationStatus;
  confirmation: NotificationStatus;
};

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function sendResendEmail(
  config: BookingConfig,
  payload: {
    to: string | string[];
    subject: string;
    html: string;
    text: string;
    replyTo?: string;
  },
) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: config.bookingFromEmail,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      reply_to: payload.replyTo,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new BookingError('EMAIL_DELIVERY_FAILED', detail || 'Email delivery failed.', 502);
  }
}

export async function deliverBookingNotifications(options: {
  bookingId: string;
  intake: BookingRequestInput;
  slotLabel: string;
  config: BookingConfig;
}): Promise<NotificationResult> {
  const { bookingId, intake, slotLabel, config } = options;

  if (!config.resendApiKey || !config.bookingFromEmail) {
    if (config.allowLogOnly) {
      return {
        internal: 'log_only',
        confirmation: 'skipped',
      };
    }

    throw new BookingError(
      'INTEGRATION_NOT_CONFIGURED',
      'Booking email delivery is not configured.',
      503,
    );
  }

  const safeNotes = intake.notes ? escapeHtml(intake.notes) : '';
  const safeRoleTitle = intake.roleTitle ? escapeHtml(intake.roleTitle) : '';
  const safeCompanyName = intake.companyName ? escapeHtml(intake.companyName) : '';
  const safePhone = intake.phone ? escapeHtml(intake.phone) : '';

  await sendResendEmail(config, {
    to: config.bookingNotificationTo,
    replyTo: intake.email,
    subject: `New booking intake request: ${intake.fullName}`,
    text: [
      `Booking ID: ${bookingId}`,
      `Name: ${intake.fullName}`,
      `Email: ${intake.email}`,
      `Company: ${intake.companyName || 'Not provided'}`,
      `Phone: ${intake.phone || 'Not provided'}`,
      `Role title: ${intake.roleTitle || 'Not provided'}`,
      `Requested slot: ${slotLabel}`,
      `Visitor timezone: ${intake.timezone}`,
      `Notes: ${intake.notes || 'Not provided'}`,
    ].join('\n'),
    html: `
      <h2>New booking intake request</h2>
      <p><strong>Booking ID:</strong> ${escapeHtml(bookingId)}</p>
      <p><strong>Name:</strong> ${escapeHtml(intake.fullName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(intake.email)}</p>
      <p><strong>Company:</strong> ${safeCompanyName || 'Not provided'}</p>
      <p><strong>Phone:</strong> ${safePhone || 'Not provided'}</p>
      <p><strong>Role title:</strong> ${safeRoleTitle || 'Not provided'}</p>
      <p><strong>Requested slot:</strong> ${escapeHtml(slotLabel)}</p>
      <p><strong>Visitor timezone:</strong> ${escapeHtml(intake.timezone)}</p>
      <p><strong>Notes:</strong><br/>${safeNotes || 'Not provided'}</p>
    `,
  });

  let confirmation: NotificationStatus = 'sent';

  try {
    await sendResendEmail(config, {
      to: intake.email,
      replyTo: config.bookingReplyToEmail ?? config.bookingNotificationTo,
      subject: 'Booking request received',
      text: [
        `Hi ${intake.fullName},`,
        '',
        'Your intake request was received.',
        `Requested slot: ${slotLabel}`,
        'Status: pending manual confirmation',
        '',
        'Sarah will review the request and confirm the meeting by email.',
      ].join('\n'),
      html: `
        <p>Hi ${escapeHtml(intake.fullName)},</p>
        <p>Your intake request was received.</p>
        <p><strong>Requested slot:</strong> ${escapeHtml(slotLabel)}</p>
        <p><strong>Status:</strong> pending manual confirmation</p>
        <p>Sarah will review the request and confirm the meeting by email.</p>
      `,
    });
  } catch {
    confirmation = 'failed';
  }

  return {
    internal: 'sent',
    confirmation,
  };
}
