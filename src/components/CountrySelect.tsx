import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, Globe } from 'lucide-react';
import { POPULAR_COUNTRY_CODES } from '../data/countryCodes';
import { CountryCode } from '../types';

interface CountrySelectProps {
  selectedDialCode: string;
  onSelectCountry: (country: CountryCode) => void;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
  selectedDialCode,
  onSelectCountry,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry =
    POPULAR_COUNTRY_CODES.find((c) => c.dialCode === selectedDialCode) ||
    POPULAR_COUNTRY_CODES[0];

  const filteredCountries = POPULAR_COUNTRY_CODES.filter((c) => {
    const query = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.dialCode.includes(query) ||
      c.code.toLowerCase().includes(query)
    );
  });

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
        Country Code
      </label>

      {/* Selector Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl glass-input text-left font-medium text-sm hover:border-emerald-500/50 transition-all focus:outline-none"
      >
        <div className="flex items-center gap-2 truncate">
          <span className="text-lg leading-none">{selectedCountry.flag}</span>
          <span className="font-bold text-emerald-400">{selectedCountry.dialCode}</span>
          <span className="text-slate-400 text-xs truncate">({selectedCountry.code})</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 z-50 glass-panel rounded-2xl shadow-2xl border border-slate-700/80 p-2.5 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 max-h-72 flex flex-col">
          {/* Search Box */}
          <div className="relative mb-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search country or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900/90 text-xs text-slate-200 border border-slate-700 focus:border-emerald-500 focus:outline-none placeholder-slate-500"
              autoFocus
            />
          </div>

          {/* List of Countries */}
          <div className="overflow-y-auto space-y-1 pr-1 custom-scrollbar flex-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((c) => {
                const isSelected = c.dialCode === selectedDialCode;
                return (
                  <button
                    key={`${c.code}-${c.dialCode}`}
                    type="button"
                    onClick={() => {
                      onSelectCountry(c);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                        : 'hover:bg-slate-800 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{c.flag}</span>
                      <span className="font-medium truncate max-w-[120px] sm:max-w-[160px]">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-emerald-400 font-bold">{c.dialCode}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                <Globe className="w-5 h-5 mx-auto mb-1 text-slate-500 opacity-50" />
                No country found matching "{search}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
