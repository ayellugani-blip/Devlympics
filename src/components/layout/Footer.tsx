import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#FAFCFF] border-t border-[#E2EBF5] mt-16 text-[#64748B] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2878D4] to-[#62B6F5] flex items-center justify-center text-white shadow-xs shadow-[#2878D4]/20">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 19C7 19 8.5 15 12 12C15.5 9 17 5 20 5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 5C7 5 8.5 9 12 12C15.5 15 17 19 20 19"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeOpacity="0.85"
                  />
                </svg>
              </div>
              <span className="font-extrabold text-base text-[#20334A] tracking-tight">
                SANGAM
              </span>
            </div>
            <p className="text-[#64748B] text-xs leading-relaxed max-w-sm">
              Turning Opportunities into Accessible Possibilities by simplifying complex notices into plain language, transparent eligibility, and actionable steps.
            </p>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[#20334A] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleScrollTo('understand')}
                  className="text-[#64748B] hover:text-[#2878D4] transition-colors cursor-pointer text-left"
                >
                  Understand an Opportunity
                </button>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="text-[#64748B] hover:text-[#2878D4] transition-colors cursor-pointer text-left block"
                >
                  Browse Opportunities
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScrollTo('how-it-works')}
                  className="text-[#64748B] hover:text-[#2878D4] transition-colors cursor-pointer text-left"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Transparency */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-[#20334A] uppercase tracking-wider">
              Ethical Advisory
            </h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              AI-assisted preliminary guidance. We never fabricate eligibility criteria or deadlines. Always confirm final requirements with official issuing authorities.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-[#E2EBF5] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#64748B]">
          <p>© 2026 SANGAM. Designed for human inclusion and accessibility.</p>
          <span className="flex items-center gap-1.5 text-[#64748B]">
            <HeartHandshake className="w-3.5 h-3.5 text-[#FFB7A5]" />
            Social Impact Initiative
          </span>
        </div>
      </div>
    </footer>
  );
};
