import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Globe,
  Sliders,
  Menu,
  X,
  Server,
  User,
  Info,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { sangamApi, type BackendStatus } from '../../services/api';
import type { SupportedLanguage } from '../../types';
import { AboutModal } from '../ui/AboutModal';
import { ProfileModal } from '../ui/ProfileModal';

export const Navbar: React.FC = () => {
  const {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    selectedLanguage,
    setLanguage
  } = useAccessibility();

  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const [backendStatus, setBackendStatus] = useState<BackendStatus>({
    isAvailable: false,
    checked: false,
    message: 'Checking...'
  });

  useEffect(() => {
    sangamApi.checkHealth().then((status) => {
      setBackendStatus(status);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' }
  ];

  const handleNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${anchorId}`);
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-md border-b border-[#E2EBF5] shadow-xs shadow-[#2878D4]/5'
            : 'bg-white/50 backdrop-blur-sm border-b border-[#E2EBF5]/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* LEFT SIDE: Brand Name & Logo */}
            <Link
              to="/"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2878D4] rounded-lg p-1"
              aria-label="SANGAM Homepage"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2878D4] via-[#3B82F6] to-[#62B6F5] flex items-center justify-center text-white shadow-xs shadow-[#2878D4]/30 transition-transform group-hover:scale-105">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
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
                  <circle cx="12" cy="12" r="3" fill="#72D6D0" />
                </svg>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-lg tracking-tight text-[#20334A] group-hover:text-[#2878D4] transition-colors leading-none">
                  SANGAM
                </span>
                <span className="text-[11px] font-medium text-[#64748B] leading-tight mt-0.5">
                  Opportunity Accessibility
                </span>
              </div>
            </Link>

            {/* RIGHT SIDE: Navigation Options (About, Profile, Explore, How It Works, Language, Accessibility, CTA) */}
            <div className="hidden lg:flex items-center gap-4">
              
              {/* Primary Links */}
              <nav className="flex items-center gap-1 xl:gap-2">
                <button
                  type="button"
                  onClick={() => handleNavClick('understand')}
                  className="px-2.5 py-1.5 text-xs font-semibold text-[#64748B] hover:text-[#2878D4] hover:bg-[#EAF5FF]/60 rounded-lg transition-colors cursor-pointer"
                >
                  Understand
                </button>
                <Link
                  to="/explore"
                  className="px-2.5 py-1.5 text-xs font-semibold text-[#64748B] hover:text-[#2878D4] hover:bg-[#EAF5FF]/60 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Compass className="w-3.5 h-3.5 text-[#62B6F5]" />
                  <span>Opportunities</span>
                </Link>
                <button
                  type="button"
                  onClick={() => handleNavClick('how-it-works')}
                  className="px-2.5 py-1.5 text-xs font-semibold text-[#64748B] hover:text-[#2878D4] hover:bg-[#EAF5FF]/60 rounded-lg transition-colors cursor-pointer"
                >
                  How It Works
                </button>
                <button
                  type="button"
                  onClick={() => setAboutModalOpen(true)}
                  className="px-2.5 py-1.5 text-xs font-semibold text-[#64748B] hover:text-[#2878D4] hover:bg-[#EAF5FF]/60 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-[#2878D4]" />
                  <span>About</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(true)}
                  className="px-2.5 py-1.5 text-xs font-semibold text-[#2878D4] bg-[#EAF5FF]/80 hover:bg-[#EAF5FF] border border-[#CBE0F4] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <User className="w-3.5 h-3.5 text-[#2878D4]" />
                  <span>Profile</span>
                </button>
              </nav>

              <div className="h-4 w-px bg-[#E2EBF5]" />

              {/* Controls: Language & Accessibility */}
              <div className="flex items-center gap-2">
                {/* Language Selector Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setLangDropdownOpen(!langDropdownOpen);
                      setAccessibilityOpen(false);
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#20334A] bg-[#FAFCFF] hover:bg-[#EAF5FF]/60 border border-[#E2EBF5] rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2878D4]"
                    aria-expanded={langDropdownOpen}
                    aria-label="Select Interface Language"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#2878D4]" />
                    <span className="uppercase">{selectedLanguage}</span>
                  </button>

                  {langDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E2EBF5] rounded-xl shadow-xl shadow-[#20334A]/8 py-1.5 z-50">
                      <div className="px-3 py-1.5 text-[11px] font-semibold text-[#64748B] uppercase tracking-wider border-b border-[#F4F9FD]">
                        Language
                      </div>
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            setLanguage(lang.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            selectedLanguage === lang.code
                              ? 'bg-[#EAF5FF] text-[#2878D4] font-semibold'
                              : 'text-[#20334A] hover:bg-[#FAFCFF]'
                          }`}
                        >
                          <span>{lang.native}</span>
                          <span className="text-[11px] text-[#64748B] font-normal">({lang.label})</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Accessibility Controls Popover */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setAccessibilityOpen(!accessibilityOpen);
                      setLangDropdownOpen(false);
                    }}
                    className="p-1.5 text-[#64748B] hover:text-[#2878D4] bg-[#FAFCFF] hover:bg-[#EAF5FF]/60 border border-[#E2EBF5] rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2878D4]"
                    title="Accessibility Preferences (Text scaling, Contrast)"
                    aria-label="Accessibility Settings"
                  >
                    <Sliders className="w-4 h-4" />
                  </button>

                  {accessibilityOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white border border-[#E2EBF5] rounded-2xl shadow-xl shadow-[#20334A]/8 p-4 z-50 text-left">
                      <div className="flex items-center justify-between pb-3 border-b border-[#E2EBF5] mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#20334A]">
                          Accessibility Options
                        </span>
                        <span className="text-[10px] bg-[#EAF5FF] text-[#2878D4] px-2 py-0.5 rounded-full font-medium border border-[#CBE0F4]">
                          WCAG 2.1 AA
                        </span>
                      </div>

                      {/* Text Size Scale */}
                      <div className="mb-4">
                        <label className="block text-xs font-medium text-[#20334A] mb-2">
                          Text Size (Display Scaling)
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          <button
                            type="button"
                            onClick={() => setFontSize('normal')}
                            className={`py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                              fontSize === 'normal'
                                ? 'bg-[#2878D4] text-white border-[#2878D4] shadow-xs'
                                : 'bg-white text-[#20334A] border-[#E2EBF5] hover:bg-[#FAFCFF]'
                            }`}
                          >
                            Default
                          </button>
                          <button
                            type="button"
                            onClick={() => setFontSize('large')}
                            className={`py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                              fontSize === 'large'
                                ? 'bg-[#2878D4] text-white border-[#2878D4] shadow-xs'
                                : 'bg-white text-[#20334A] border-[#E2EBF5] hover:bg-[#FAFCFF]'
                            }`}
                          >
                            Large
                          </button>
                          <button
                            type="button"
                            onClick={() => setFontSize('xlarge')}
                            className={`py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                              fontSize === 'xlarge'
                                ? 'bg-[#2878D4] text-white border-[#2878D4] shadow-xs'
                                : 'bg-white text-[#20334A] border-[#E2EBF5] hover:bg-[#FAFCFF]'
                            }`}
                          >
                            X-Large
                          </button>
                        </div>
                      </div>

                      {/* High Contrast Mode */}
                      <div className="pt-2 border-t border-[#E2EBF5] flex items-center justify-between">
                        <div>
                          <span className="text-xs font-medium text-[#20334A] block">High Contrast</span>
                          <span className="text-[11px] text-[#64748B]">Enhanced borders & contrast</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setHighContrast(!highContrast)}
                          className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                            highContrast ? 'bg-[#2878D4]' : 'bg-[#E2EBF5]'
                          }`}
                          role="switch"
                          aria-checked={highContrast}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                              highContrast ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Backend Status Details */}
                      <div className="mt-4 pt-3 border-t border-[#E2EBF5] text-[11px] text-[#64748B] flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Server className="w-3 h-3 text-[#64748B]" />
                          Backend Engine:
                        </span>
                        <span
                          className={`font-semibold ${
                            backendStatus.isAvailable ? 'text-[#0D9488]' : 'text-[#64748B]'
                          }`}
                        >
                          {backendStatus.isAvailable ? 'Live Connected' : 'Demo Mode (Active)'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary Action Button */}
                <button
                  type="button"
                  onClick={() => handleNavClick('understand')}
                  className="inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-bold rounded-xl text-white bg-[#2878D4] hover:bg-[#1F63B4] shadow-sm shadow-[#2878D4]/20 hover:shadow-[#2878D4]/30 transition-all cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2878D4]"
                >
                  Try SANGAM
                </button>
              </div>

            </div>

            {/* Mobile / Tablet Menu Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setProfileModalOpen(true)}
                className="p-1.5 text-[#2878D4] bg-[#EAF5FF] rounded-lg border border-[#CBE0F4]"
                aria-label="Open Profile"
              >
                <User className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 text-[#20334A] hover:bg-[#EAF5FF] rounded-lg transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E2EBF5] bg-white/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-2.5 animate-in slide-in-from-top-2 duration-200">
            <button
              type="button"
              onClick={() => handleNavClick('understand')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-[#20334A] hover:bg-[#EAF5FF] rounded-lg transition-colors"
            >
              Understand an Opportunity
            </button>
            <Link
              to="/explore"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-[#20334A] hover:bg-[#EAF5FF] rounded-lg transition-colors flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#62B6F5]" />
              <span>Browse Catalog</span>
            </Link>
            <button
              type="button"
              onClick={() => handleNavClick('how-it-works')}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-[#20334A] hover:bg-[#EAF5FF] rounded-lg transition-colors"
            >
              How It Works
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setAboutModalOpen(true);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-[#20334A] hover:bg-[#EAF5FF] rounded-lg transition-colors flex items-center gap-2"
            >
              <Info className="w-4 h-4 text-[#2878D4]" />
              <span>About SANGAM</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setProfileModalOpen(true);
              }}
              className="w-full text-left px-3 py-2 text-sm font-semibold text-[#2878D4] bg-[#EAF5FF] rounded-lg transition-colors flex items-center gap-2"
            >
              <User className="w-4 h-4 text-[#2878D4]" />
              <span>Student Profile</span>
            </button>

            {/* Language Selection in Drawer */}
            <div className="pt-2 border-t border-[#E2EBF5]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] block px-3 mb-1.5">
                Language
              </span>
              <div className="grid grid-cols-3 gap-1 px-2">
                {languages.slice(0, 3).map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => setLanguage(lang.code)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border text-center transition-colors ${
                      selectedLanguage === lang.code
                        ? 'bg-[#2878D4] text-white border-[#2878D4]'
                        : 'bg-white text-[#20334A] border-[#E2EBF5]'
                    }`}
                  >
                    {lang.native}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 border-t border-[#E2EBF5]">
              <button
                type="button"
                onClick={() => handleNavClick('understand')}
                className="w-full py-2.5 bg-[#2878D4] hover:bg-[#1F63B4] text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm shadow-[#2878D4]/20"
              >
                <span>Try SANGAM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* About Modal */}
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        onTrySangam={() => handleNavClick('understand')}
      />

      {/* Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </>
  );
};
