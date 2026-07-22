import { SupportFormData } from '../types';

/**
 * Generates the formatted text body for WhatsApp support email.
 */
export function generateEmailBody(formData: SupportFormData): string {
  const fullPhone = `${formData.countryCode}${formData.phoneNumber.trim()}`;
  const userEmail = formData.email.trim() || '[Your Email]';
  const device = formData.deviceModel.trim() || '[Your Device Model]';
  const version = formData.whatsappVersion.trim() || '[WhatsApp Version]';
  const problem = formData.problem;
  const description = formData.message.trim() || '[Issue Description]';

  return `Hello WhatsApp Support,

I am unable to log into my WhatsApp account.

Phone Number:
${fullPhone}

Email:
${userEmail}

Device:
${device}

WhatsApp Version:
${version}

Problem:
${problem}

Description:
${description}

My phone number is active and able to receive SMS and calls.

Please review my account and help me regain access.

Thank you.

Best Regards`;
}

/**
 * Default subject mapping based on problem selection
 */
export function getDefaultSubject(problem: string, customSubject?: string): string {
  if (customSubject && customSubject.trim().length > 0) {
    return customSubject.trim();
  }

  switch (problem) {
    case 'Cannot receive verification code':
      return 'Unable to Receive Verification Code SMS';
    case 'Verification failed':
      return 'Verification Failed - Unable to Complete Setup';
    case 'Account locked':
      return 'Account Locked / Banned - Access Review Request';
    case 'Other':
      return 'Support Request - WhatsApp Account Login Issue';
    case 'Login not available':
    default:
      return 'Unable to Login – Security Restriction';
  }
}

/**
 * Constructs a web Gmail URL pre-filled with recipient, subject, and body.
 */
export function buildGmailUrl(formData: SupportFormData): string {
  const recipient = formData.supportTarget;
  const subject = getDefaultSubject(formData.problem, formData.customSubject);
  const body = generateEmailBody(formData);

  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: recipient,
    su: subject,
    body: body,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}

/**
 * Constructs a standard mailto: URI pre-filled with recipient, subject, and body.
 */
export function buildMailtoUrl(formData: SupportFormData): string {
  const recipient = formData.supportTarget;
  const subject = getDefaultSubject(formData.problem, formData.customSubject);
  const body = generateEmailBody(formData);

  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return `mailto:${recipient}?subject=${encodedSubject}&body=${encodedBody}`;
}

/**
 * Simple email validation regex
 */
export function isValidEmail(email: string): boolean {
  if (!email.trim()) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Phone number validation (digits only, 5 to 15 chars)
 */
export function isValidPhone(phone: string): boolean {
  const digitsOnly = phone.replace(/\D/g, '');
  return digitsOnly.length >= 5 && digitsOnly.length <= 15;
}
