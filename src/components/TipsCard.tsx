import React from 'react';
import { ShieldCheck, Zap, Clock, AlertCircle } from 'lucide-react';

export const TipsCard: React.FC = () => {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-white/10 space-y-4">
      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
        <ShieldCheck className="w-4 h-4" />
        <span>Tips for Faster WhatsApp Support Resolution</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="font-semibold text-white flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Use Registered Email
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Send the email from the exact address registered with your account or linked to your phone store account.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="font-semibold text-white flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            Expected Response Time
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            WhatsApp automated support responds within 1–24 hours with an automated ticket ID and review status.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="font-semibold text-white flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-emerald-400" />
            Do Not Duplicate Emails
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Sending multiple emails in a short period can delay support responses or trigger spam filters.
          </p>
        </div>
      </div>
    </div>
  );
};
