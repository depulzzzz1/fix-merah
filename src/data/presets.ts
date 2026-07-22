import { Preset } from '../types';

export const SUPPORT_PRESETS: Preset[] = [
  {
    id: 'login-security',
    title: 'Login Security Restriction',
    description: 'Unable to log into account due to security restrictions or temporary lockout',
    problem: 'Login not available',
    suggestedSubject: 'Unable to Login – Security Restriction',
    message: 'I am unable to complete the login process for my WhatsApp account. When attempting to log in, I am informed that login is currently restricted or unavailable on my device. My phone number is active and ready to receive verification SMS.',
    icon: 'ShieldAlert',
  },
  {
    id: 'otp-not-received',
    title: 'Cannot Receive SMS Code',
    description: 'SMS verification code or phone call OTP never arrives',
    problem: 'Cannot receive verification code',
    suggestedSubject: 'Verification Code Not Received via SMS or Call',
    message: 'I am trying to register/verify my WhatsApp number, but I am not receiving any SMS verification code or phone call OTP. I have checked my mobile signal, SMS inbox, and cellular carrier settings, and everything is working properly for other services.',
    icon: 'MessageSquareX',
  },
  {
    id: 'verification-failed',
    title: 'Verification Failed Error',
    description: 'Code accepted or rejected with "Verification Failed" error message',
    problem: 'Verification failed',
    suggestedSubject: 'Verification Failed - Unable to Complete Setup',
    message: 'Whenever I enter the 6-digit code or complete verification steps, the app displays a "Verification Failed" error message. I have tried restarting my device and clearing app cache, but the problem persists.',
    icon: 'KeyRound',
  },
  {
    id: 'account-locked',
    title: 'Account Banned / Banned Lock',
    description: 'Account flagged or locked under terms of service review',
    problem: 'Account locked',
    suggestedSubject: 'Account Locked / Banned - Review Request',
    message: 'My WhatsApp account has been locked or banned. I believe this may have happened by mistake, as I strictly use WhatsApp for personal communication and adhere to WhatsApp Terms of Service. Please review my account activity and help me regain access.',
    icon: 'Lock',
  },
  {
    id: 'device-change',
    title: 'Device Change / Code Loop',
    description: 'Stuck in verification loop after transferring to a new phone',
    problem: 'Other',
    suggestedSubject: 'Device Transfer Verification Loop Issue',
    message: 'After switching to my new phone, I am stuck in a continuous verification request loop when trying to restore my chats and log in. Please inspect my account status to allow seamless device registration.',
    icon: 'Smartphone',
  },
];
