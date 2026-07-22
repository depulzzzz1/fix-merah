import React from 'react';
import { MessageSquare, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { SUPPORT_PRESETS } from '../data/presets';
import { Preset } from '../types';

interface HeaderProps {
  onSelectPreset: (preset: Preset) => void;
  activePresetId?: string;
}

export const Header: React.FC<HeaderProps> = ({ onSelectPreset, activePresetId }) => {
  return (
    <header className="relative text-center pt-8 pb-6 px-4 max-w-4xl mx-auto">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Brand Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide mb-4 animate-fade-in shadow-inner">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <MessageSquare className="w-3.5 h-3.5" />
        Official Support Mail Utility
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
        WhatsApp Support <span className="whatsapp-gradient-text">Mail Generator</span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">
        Generate a ready-to-send support email for WhatsApp. Pre-fills official target, subject, and diagnostic format so you can send in one click.
      </p>

      {/* Quick Presets Bar */}
      <div className="mt-6 pt-4 border-t border-white/5">
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-3 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Popular Issue Templates (1-Click Auto-Fill):</span>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          {SUPPORT_PRESETS.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm shadow-emerald-500/10'
                    : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:bg-slate-700/60 hover:border-emerald-500/30 hover:text-white'
                }`}
              >
                <Zap className={`w-3 h-3 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                {preset.title}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
