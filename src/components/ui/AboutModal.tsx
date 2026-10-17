import React from 'react';
import { X, Sparkles, ShieldCheck, HeartHandshake, Layers, Globe, ArrowRight } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrySangam?: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onTrySangam
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
      className="fixed inset-0 z-50 bg-[#20334A]/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white border border-[#E2EBF5] rounded-2xl max-w-xl w-full shadow-2xl shadow-[#20334A]/10 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#EAF5FF] via-white to-[#F0FAF7] border-b border-[#E2EBF5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2878D4] to-[#62B6F5] flex items-center justify-center text-white shadow-sm shadow-[#2878D4]/25">
              <Sparkles className="w-5 h-5 text-[#BFE9D2]" />
            </div>
            <div>
              <h2 id="about-modal-title" className="text-lg font-extrabold text-[#20334A]">
                About SANGAM
              </h2>
              <p className="text-xs text-[#64748B]">
                Turning Opportunities into Accessible Possibilities
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#64748B] hover:text-[#20334A] rounded-lg hover:bg-white/80 transition-colors cursor-pointer"
            aria-label="Close About Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5 text-left text-sm text-[#20334A]">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2878D4] mb-1.5">
              Our Purpose
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Every year, thousands of scholarships, research fellowships, and hackathons remain unclaimed simply because official circulars are written in dense, intimidating bureaucratic legalese. 
              <strong className="text-[#20334A] font-semibold"> SANGAM</strong> breaks these barriers through intelligent plain-language translation, multi-lingual audio synthesis, and transparent 3-state eligibility checks.
            </p>
          </div>

          {/* Three Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-[#EAF5FF]/60 border border-[#CBE0F4] rounded-xl">
              <Layers className="w-4 h-4 text-[#2878D4] mb-1.5" />
              <h4 className="text-xs font-bold text-[#20334A]">Plain Language</h4>
              <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                Converts convoluted clauses into straightforward summaries.
              </p>
            </div>

            <div className="p-3 bg-[#F0FAF7] border border-[#BFE9D2] rounded-xl">
              <ShieldCheck className="w-4 h-4 text-[#0D9488] mb-1.5" />
              <h4 className="text-xs font-bold text-[#20334A]">3-State Clarity</h4>
              <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                Transparent rules: Satisfied, Not Satisfied, or Needs Verification.
              </p>
            </div>

            <div className="p-3 bg-[#E8E6FF]/50 border border-[#D5D0FA] rounded-xl">
              <Globe className="w-4 h-4 text-[#4338CA] mb-1.5" />
              <h4 className="text-xs font-bold text-[#20334A]">5+ Languages</h4>
              <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                Native translations in Hindi, Telugu, Tamil, Marathi, and English.
              </p>
            </div>
          </div>

          {/* Ethical AI & Inclusion */}
          <div className="p-3.5 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-[#FFB7A5] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-[#20334A] block">Responsible AI & Human In The Loop</span>
              <span className="text-[#64748B] leading-relaxed">
                SANGAM never fabricates requirements. All extracted criteria link directly to the original notice clauses so students can verify with complete confidence.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F4F9FD] border-t border-[#E2EBF5] flex items-center justify-between">
          <span className="text-[11px] text-[#64748B]">
            Version 2.4 • Hackathon Prototype Edition
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-semibold text-[#64748B] hover:text-[#20334A] rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            {onTrySangam && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onTrySangam();
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2878D4] hover:bg-[#1F63B4] text-white text-xs font-bold rounded-xl shadow-xs shadow-[#2878D4]/20 transition-all cursor-pointer"
              >
                <span>Try SANGAM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
