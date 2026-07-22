import React from 'react';
import {
  Phone,
  Mail,
  Smartphone,
  Info,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  FileText,
  Layers,
  Sparkles,
} from 'lucide-react';
import { SupportFormData, ProblemOption, CountryCode, SupportTarget } from '../types';
import { CountrySelect } from './CountrySelect';
import { isValidEmail, isValidPhone } from '../utils/emailGenerator';

interface FormSectionProps {
  formData: SupportFormData;
  onChange: (updated: Partial<SupportFormData>) => void;
  onSelectCountry: (country: CountryCode) => void;
}

const PROBLEM_OPTIONS: ProblemOption[] = [
  'Login not available',
  'Cannot receive verification code',
  'Verification failed',
  'Account locked',
  'Other',
];

const COMMON_DEVICES = [
  'iPhone 15 Pro',
  'iPhone 14 / 13',
  'Samsung Galaxy S24 / S23',
  'Xiaomi Redmi Note 13',
  'Google Pixel 8 / 7',
  'OPPO / Vivo / Realme',
];

export const FormSection: React.FC<FormSectionProps> = ({
  formData,
  onChange,
  onSelectCountry,
}) => {
  const isPhoneValid = isValidPhone(formData.phoneNumber);
  const isEmailValid = isValidEmail(formData.email);

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-7 shadow-xl border border-white/10 space-y-6 relative overflow-hidden">
      {/* Section Title */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">
              Account & Device Information
            </h2>
            <p className="text-xs text-slate-400">
              Fill in your details below to assemble the support diagnostic report.
            </p>
          </div>
        </div>
      </div>

      {/* Target Support Email Channel */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
          <span>Target Support Channel</span>
          <span className="text-[10px] text-emerald-400 font-normal">Official WhatsApp Addresses</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { id: 'android_web@support.whatsapp.com' as SupportTarget, label: 'Android / Web', desc: 'android_web@support.whatsapp.com' },
            { id: 'iphone_web@support.whatsapp.com' as SupportTarget, label: 'iPhone / iOS', desc: 'iphone_web@support.whatsapp.com' },
            { id: 'support@whatsapp.com' as SupportTarget, label: 'General / Business', desc: 'support@whatsapp.com' },
          ].map((item) => {
            const isSelected = formData.supportTarget === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ supportTarget: item.id })}
                className={`p-2.5 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-sm shadow-emerald-500/10'
                    : 'bg-slate-900/60 border-slate-700/80 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold flex items-center justify-between mb-1">
                  <span>{item.label}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <span className="text-[10px] text-slate-400 truncate font-mono">{item.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Phone Number Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Country Code Selector */}
        <div className="sm:col-span-4">
          <CountrySelect
            selectedDialCode={formData.countryCode}
            onSelectCountry={onSelectCountry}
          />
        </div>

        {/* Phone Number Field */}
        <div className="sm:col-span-8">
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              Phone Number <span className="text-rose-400">*</span>
            </span>
            {formData.phoneNumber && (
              <span className={`text-[10px] flex items-center gap-1 ${isPhoneValid ? 'text-emerald-400' : 'text-amber-400'}`}>
                {isPhoneValid ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" /> Valid format
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3 h-3" /> Digit count check
                  </>
                )}
              </span>
            )}
          </label>
          <div className="relative">
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => onChange({ phoneNumber: e.target.value.replace(/[^\d]/g, '') })}
              placeholder="e.g. 81234567890"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-mono tracking-wider font-semibold placeholder-slate-600 focus:ring-1 focus:ring-emerald-500"
              required
            />
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Enter the phone number registered with WhatsApp without leading 0 (e.g., <span className="text-emerald-400 font-mono">{formData.countryCode}81234567890</span>).
          </p>
        </div>
      </div>

      {/* Email Address */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            Your Email Address <span className="text-rose-400">*</span>
          </span>
          {formData.email && (
            <span className={`text-[10px] flex items-center gap-1 ${isEmailValid ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isEmailValid ? (
                <>
                  <CheckCircle2 className="w-3 h-3" /> Valid email
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3" /> Invalid email format
                </>
              )}
            </span>
          )}
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder="e.g. yourname@gmail.com"
          className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm placeholder-slate-600"
          required
        />
        <p className="mt-1 text-[11px] text-slate-400">
          WhatsApp Support will send their reply and ticket updates to this email address.
        </p>
      </div>

      {/* Device Model & WhatsApp Version Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Device Model */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            Device Model
          </label>
          <input
            type="text"
            value={formData.deviceModel}
            onChange={(e) => onChange({ deviceModel: e.target.value })}
            placeholder="e.g. Samsung Galaxy S23 Ultra"
            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm placeholder-slate-600 mb-2"
          />
          {/* Quick presets for devices */}
          <div className="flex flex-wrap gap-1">
            {COMMON_DEVICES.slice(0, 4).map((dev) => (
              <button
                key={dev}
                type="button"
                onClick={() => onChange({ deviceModel: dev })}
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-emerald-300 transition-colors border border-slate-700/50"
              >
                + {dev}
              </button>
            ))}
          </div>
        </div>

        {/* WhatsApp Version */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            WhatsApp Version
          </label>
          <input
            type="text"
            value={formData.whatsappVersion}
            onChange={(e) => onChange({ whatsappVersion: e.target.value })}
            placeholder="e.g. 2.24.12.75"
            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm placeholder-slate-600 mb-2"
          />
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => onChange({ whatsappVersion: 'Latest Official Version (Play Store / App Store)' })}
              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-emerald-300 transition-colors border border-slate-700/50"
            >
              + Latest Official Version
            </button>
            <button
              type="button"
              onClick={() => onChange({ whatsappVersion: '2.24.18.80 (Official Release)' })}
              className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-emerald-300 transition-colors border border-slate-700/50"
            >
              + Standard Android
            </button>
          </div>
        </div>
      </div>

      {/* Problem Dropdown */}
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          Primary Problem Category <span className="text-rose-400">*</span>
        </label>
        <select
          value={formData.problem}
          onChange={(e) => onChange({ problem: e.target.value as ProblemOption })}
          className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
        >
          {PROBLEM_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-slate-900 text-slate-100 py-2">
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Custom Description Textarea */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            Problem Description / Extra Context
          </label>
          <span className="text-[10px] text-slate-500 font-mono">
            {formData.message.length} chars
          </span>
        </div>
        <textarea
          rows={5}
          value={formData.message}
          onChange={(e) => onChange({ message: e.target.value })}
          placeholder="e.g. Describe what error message appears on screen, how long this issue has persisted, or if you recently changed phones."
          className="w-full px-3.5 py-3 rounded-xl glass-input text-sm placeholder-slate-600 leading-relaxed resize-y focus:ring-1 focus:ring-emerald-500"
        />
        <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-400 bg-slate-900/40 p-2 rounded-lg border border-white/5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
          <span>
            The generated support email will automatically include key statements verifying your number is active and ready for SMS/calls.
          </span>
        </div>
      </div>
    </div>
  );
};
