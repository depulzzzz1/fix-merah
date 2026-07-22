/**
 * WhatsApp Support Mail Generator
 * Modern single-page web app for generating official WhatsApp support emails.
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { FormSection } from './components/FormSection';
import { EmailPreview } from './components/EmailPreview';
import { TipsCard } from './components/TipsCard';
import { Toast } from './components/Toast';
import { SupportFormData, Preset, CountryCode, ToastMessage } from './types';
import { DEFAULT_COUNTRY } from './data/countryCodes';
import { SUPPORT_PRESETS } from './data/presets';
import { buildGmailUrl, buildMailtoUrl, isValidEmail, isValidPhone } from './utils/emailGenerator';
import { FileEdit, Eye, Shield, CheckCircle } from 'lucide-react';

const INITIAL_FORM_DATA: SupportFormData = {
  countryCode: DEFAULT_COUNTRY.dialCode,
  phoneNumber: '',
  email: '',
  deviceModel: 'Android Device',
  whatsappVersion: 'Latest Official Release',
  problem: 'Login not available',
  message: 'I am unable to log into my WhatsApp account. When attempting to register or log in, I encounter a login restriction.',
  supportTarget: 'android_web@support.whatsapp.com',
};

export default function App() {
  const [formData, setFormData] = useState<SupportFormData>(INITIAL_FORM_DATA);
  const [activePresetId, setActivePresetId] = useState<string | undefined>(SUPPORT_PRESETS[0].id);
  const [mobileTab, setMobileTab] = useState<'form' | 'preview'>('form');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const newToast: ToastMessage = {
      id: Date.now().toString(),
      text,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateForm = (updated: Partial<SupportFormData>) => {
    setFormData((prev) => ({ ...prev, ...updated }));
  };

  const handleSelectCountry = (country: CountryCode) => {
    setFormData((prev) => ({
      ...prev,
      countryCode: country.dialCode,
    }));
    addToast(`Selected country ${country.name} (${country.dialCode})`, 'info');
  };

  const handleSelectPreset = (preset: Preset) => {
    setActivePresetId(preset.id);
    setFormData((prev) => ({
      ...prev,
      problem: preset.problem,
      message: preset.message,
      customSubject: preset.suggestedSubject,
    }));
    addToast(`Applied template: ${preset.title}`);
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setActivePresetId(undefined);
    addToast('Form reset to default values', 'info');
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    addToast(`Copied ${label} to clipboard!`);
  };

  const handleGenerateAndOpen = (method: 'gmail' | 'mailto') => {
    if (!formData.phoneNumber.trim()) {
      addToast('Please enter your phone number first', 'warning');
      setMobileTab('form');
      return;
    }

    if (!isValidEmail(formData.email)) {
      addToast('Please enter a valid contact email address', 'warning');
      setMobileTab('form');
      return;
    }

    if (method === 'gmail') {
      const gmailUrl = buildGmailUrl(formData);
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      addToast('Opening Gmail with pre-filled support email!', 'success');
    } else {
      const mailtoUrl = buildMailtoUrl(formData);
      window.location.href = mailtoUrl;
      addToast('Opening default mail client...', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b141a] text-[#e9edef] flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Top Header */}
      <Header
        onSelectPreset={handleSelectPreset}
        activePresetId={activePresetId}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
        {/* Mobile Tab Switcher */}
        <div className="lg:hidden flex p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <button
            type="button"
            onClick={() => setMobileTab('form')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
              mobileTab === 'form'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileEdit className="w-4 h-4" />
            1. Form Input
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
              mobileTab === 'preview'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            2. Email Preview
          </button>
        </div>

        {/* Split Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Input Form */}
          <div className={`lg:col-span-6 ${mobileTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
            <FormSection
              formData={formData}
              onChange={handleUpdateForm}
              onSelectCountry={handleSelectCountry}
            />
          </div>

          {/* Right Column: Live Email Preview */}
          <div className={`lg:col-span-6 ${mobileTab === 'form' ? 'hidden lg:block' : 'block'}`}>
            <EmailPreview
              formData={formData}
              onCopyText={handleCopyText}
              onReset={handleResetForm}
              onGenerateAndOpen={handleGenerateAndOpen}
            />
          </div>
        </div>

        {/* Support Resolution Tips */}
        <TipsCard />
      </main>

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-slate-400 bg-[#070d11]">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>100% Client-Side Generator • No Personal Data Collected • Opens Directly in Your Mail Client</span>
          </div>
          <p className="text-slate-400">
            WhatsApp Support Mail Generator &bull; Prepares ready-to-send support emails for WhatsApp.
          </p>
        </div>
      </footer>
    </div>
  );
}
