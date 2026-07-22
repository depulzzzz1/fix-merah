export type ProblemOption =
  | 'Login not available'
  | 'Cannot receive verification code'
  | 'Verification failed'
  | 'Account locked'
  | 'Other';

export type SupportTarget =
  | 'android_web@support.whatsapp.com'
  | 'iphone_web@support.whatsapp.com'
  | 'support@whatsapp.com';

export interface CountryCode {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  formatHint?: string;
}

export interface SupportFormData {
  countryCode: string;
  phoneNumber: string;
  email: string;
  deviceModel: string;
  whatsappVersion: string;
  problem: ProblemOption;
  message: string;
  supportTarget: SupportTarget;
  customSubject?: string;
}

export interface Preset {
  id: string;
  title: string;
  description: string;
  problem: ProblemOption;
  message: string;
  suggestedSubject: string;
  icon: string;
}

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info' | 'warning';
}
