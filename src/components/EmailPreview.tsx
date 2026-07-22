import React, { useState } from 'react';
import {
  Copy,
  Check,
  Mail,
  Send,
  ExternalLink,
  Shield,
  Eye,
  Edit3,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { SupportFormData } from '../types';
import {
  generateEmailBody,
  getDefaultSubject,
  buildGmailUrl,
  buildMailtoUrl,
} from '../utils/emailGenerator';

interface EmailPreviewProps {
  formData: SupportFormData;
  onCopyText: (text: string, label: string) => void;
  onReset: () => void;
  onGenerateAndOpen: (method: 'gmail' | 'mailto') => void;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({
  formData,
  onCopyText,
  onReset,
  onGenerateAndOpen,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const recipient = formData.supportTarget;
  const subject = getDefaultSubject(formData.problem, formData.customSubject);
  const bodyText = generateEmailBody(formData);

  const handleCopy = (text: string, sectionKey: string, labelName: string) => {
    onCopyText(text, labelName);
    setCopiedSection(sectionKey);
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  const handleCopyAll = () => {
    const fullContent = `TO: ${recipient}\nSUBJECT: ${subject}\n\nBODY:\n${bodyText}`;
    handleCopy(fullContent, 'all', 'Entire Email Content');
  };

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-7 shadow-2xl border border-emerald-500/20 space-y-5 flex flex-col h-full relative">
      {/* Top Header of Preview */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              Generated Email Preview
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Ready to Send
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Live preview formatted according to official WhatsApp Support diagnostics.
            </p>
          </div>
        </div>

        {/* Quick Reset button */}
        <button
          type="button"
          onClick={onReset}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors border border-transparent hover:border-rose-500/20 flex items-center gap-1.5 text-xs font-medium"
          title="Reset Form"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Preview Box Container */}
      <div className="space-y-4 flex-1">
        {/* RECIPIENT / TO SECTION */}
        <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 space-y-1 relative group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">
              TO (Recipient)
            </span>
            <button
              type="button"
              onClick={() => handleCopy(recipient, 'to', 'Recipient Email')}
              className="text-[11px] text-slate-400 hover:text-emerald-300 flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700 transition-colors"
            >
              {copiedSection === 'to' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy TO</span>
                </>
              )}
            </button>
          </div>
          <div className="font-mono text-sm font-semibold text-white truncate">
            {recipient}
          </div>
        </div>

        {/* SUBJECT SECTION */}
        <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 space-y-1 relative group">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">
              SUBJECT
            </span>
            <button
              type="button"
              onClick={() => handleCopy(subject, 'subject', 'Email Subject')}
              className="text-[11px] text-slate-400 hover:text-emerald-300 flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700 transition-colors"
            >
              {copiedSection === 'subject' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Subject</span>
                </>
              )}
            </button>
          </div>
          <div className="font-semibold text-sm text-slate-100">
            {subject}
          </div>
        </div>

        {/* BODY SECTION */}
        <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2 relative group">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">
              BODY (Message Content)
            </span>
            <button
              type="button"
              onClick={() => handleCopy(bodyText, 'body', 'Email Body')}
              className="text-[11px] text-slate-400 hover:text-emerald-300 flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700 transition-colors"
            >
              {copiedSection === 'body' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Body</span>
                </>
              )}
            </button>
          </div>

          <pre className="text-xs sm:text-sm font-mono text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[380px] custom-scrollbar p-1">
            {bodyText}
          </pre>
        </div>
      </div>

      {/* Primary Execution Bar */}
      <div className="pt-2 space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Gmail Web Launcher */}
          <button
            type="button"
            onClick={() => onGenerateAndOpen('gmail')}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Open in Gmail
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </button>

          {/* Mailto Launcher */}
          <button
            type="button"
            onClick={() => onGenerateAndOpen('mailto')}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-emerald-400" />
            Open Default Email App
          </button>
        </div>

        {/* Copy All Button */}
        <button
          type="button"
          onClick={handleCopyAll}
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-slate-300 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          {copiedSection === 'all' ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">All Content Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy Entire Email (TO + SUBJECT + BODY)</span>
            </>
          )}
        </button>

        {/* User reassurance note */}
        <p className="text-[11px] text-center text-slate-400 pt-1 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Your email client will open with recipient, subject, and body pre-filled. Just click <strong>Send</strong>.</span>
        </p>
      </div>
    </div>
  );
};
