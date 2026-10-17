import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  FileText,
  Compass,
  CheckCircle2,
  HeartHandshake,
  Info,
  User,
  Globe,
  Sliders,
  Sparkles,
  Menu,
  X,
  Volume2,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useUser } from '../../context/UserContext';
import { sangamApi, type BackendStatus } from '../../services/api';
import type { SupportedLanguage } from '../../types';
import { AboutModal } from '../ui/AboutModal';
import { ProfileModal } from '../ui/ProfileModal';

interface SidebarProps {
  onOpenVoiceAssistant?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenVoiceAssistant }) => {
  const location = useLocation();
  const { profile, pastUsage } = useUser();
  const {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    selectedLanguage,
    setLanguage
  } = useAccessibility();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState<BackendStatus>({
    isAvailable: false,
    checked: false,
    message: 'Checking...'
  });

  useEffect(() => {
    sangamApi.checkHealth().then((status) => {
      setBackendStatus(status);
    });
  }, []);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const languages: { code: SupportedLanguage; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' }
  ];

  const navItems = [
    {
      to: '/',
      label: 'Home & Overview',
      icon: Home,
      badge: null
    },
    {
      to: '/upload',
      label: 'Understand Notice',
      icon: FileText,
      badge: 'AI Decoder'
    },
    {
      to: '/explore',
      label: 'Opportunities',
      icon: Compass,
      badge: `${pastUsage.eligibleMatchesCount}+ Fit`
    },
    {
      to: '/eligibility',
      label: 'Eligibility Checker',
      icon: CheckCircle2,
      badge: '3-State'
    },
    {
      to: '/how-it-works',
      label: 'How It Works',
      icon: HeartHandshake,
      badge: null
    }
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-4 sm:p-5 text-left overflow-y-auto">
      {/* Top Branding & Status */}
      <div className="space-y-6">
        
        {/* Brand Logo & Title */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-xl p-1"
          aria-label="SANGAM Homepage"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 transition-transform group-hover:scale-105 shrink-0">
            <svg
              width="22"
              height="22"
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
          <div className="flex flex-col min-w-0">
            <span className="font-black text-xl tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent leading-none">
              SANGAM
            </span>
            <span className="text-[11px] font-semibold text-slate-500 tracking-wide mt-1 truncate">
              Opportunity Accessibility
            </span>
          </div>
        </Link>

        {/* Live Engine Status Badge */}
        <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-cyan-50/50 border border-indigo-100/70 text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                backendStatus.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-cyan-500'
              }`}
            />
            <span className="text-[11px] font-bold text-slate-700">
              {backendStatus.isAvailable ? 'AI Engine Connected' : 'Accessible AI Online'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-indigo-600 font-semibold bg-white px-1.5 py-0.5 rounded border border-indigo-100">
            v2.4
          </span>
        </div>

        {/* Primary Navigation Links */}
        <nav className="space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
            Platform Navigation
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-cyan-500/10 text-indigo-700 font-bold border-l-4 border-indigo-600 shadow-2xs'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/40'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-600'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Utility Actions: Assistant & About */}
        <div className="space-y-1 pt-2 border-t border-slate-100">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
            Tools & Assistance
          </div>

          {onOpenVoiceAssistant && (
            <button
              type="button"
              onClick={onOpenVoiceAssistant}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/40 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                <span>Voice Assistant</span>
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                Live
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setAboutModalOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/40 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Info className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              <span>About SANGAM</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => setAccessibilityOpen(!accessibilityOpen)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/40 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <Sliders className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              <span>Accessibility & Theme</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {fontSize}
            </span>
          </button>

          {/* Collapsible Accessibility Options */}
          {accessibilityOpen && (
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2.5 text-xs animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Font Scaling</span>
                <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setFontSize('normal')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      fontSize === 'normal' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    100%
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSize('large')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      fontSize === 'large' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    115%
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSize('xlarge')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      fontSize === 'xlarge' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    130%
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                <span className="text-slate-600 font-medium">High Contrast</span>
                <button
                  type="button"
                  onClick={() => setHighContrast(!highContrast)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-colors ${
                    highContrast ? 'bg-black text-white' : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  {highContrast ? 'Active' : 'Off'}
                </button>
              </div>
            </div>
          )}

          {/* Language Selector Dropdown */}
          <div className="pt-2">
            <div className="flex items-center gap-2 px-3 pb-1 text-[11px] font-medium text-slate-500">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>Language:</span>
            </div>
            <div className="grid grid-cols-2 gap-1 px-1">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors cursor-pointer truncate ${
                    selectedLanguage === l.code
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-2xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {l.native}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Sticky Candidate Profile Card */}
      <div className="pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setProfileModalOpen(true)}
          className="w-full flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-cyan-50/50 border border-indigo-100 hover:border-indigo-300 transition-all cursor-pointer group text-left"
          title="Open candidate profile and preferences"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-xs shadow-sm shadow-indigo-500/20 shrink-0">
              {getInitials(profile.name)}
            </div>
            <div className="min-w-0">
              <span className="text-xs font-extrabold text-[#0F172A] block truncate group-hover:text-indigo-600 transition-colors">
                {profile.name}
              </span>
              <span className="text-[11px] text-slate-500 truncate block">
                {profile.educationLevel.split('(')[0].trim()}
              </span>
            </div>
          </div>
          <span className="p-1 rounded-lg bg-white border border-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <User className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>

      {/* Modals */}
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />
      <ProfileModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
    </div>
  );

  return (
    <>
      {/* 1. Permanent Desktop Sticky Left Sidebar (Visible on lg and larger) */}
      <aside
        className="hidden lg:flex w-64 xl:w-72 shrink-0 h-screen sticky top-0 bg-white/90 backdrop-blur-xl border-r border-indigo-100/80 z-40 flex-col shadow-xs"
        aria-label="Main Left Sidebar Navigation"
      >
        {sidebarContent}
      </aside>

      {/* 2. Mobile Compact Top Header Bar (Visible on mobile/tablet < lg) */}
      <header className="lg:hidden sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-indigo-100/80 px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-xs">
            <svg
              width="18"
              height="18"
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
          <span className="font-black text-lg tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            SANGAM
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Quick Profile Icon on Mobile */}
          <button
            type="button"
            onClick={() => setProfileModalOpen(true)}
            className="p-2 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold"
            aria-label="Candidate Profile"
          >
            {getInitials(profile.name)}
          </button>

          {/* Hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Toggle navigation drawer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* 3. Mobile Slide-Over Drawer with Backdrop Blur */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="lg:hidden fixed inset-0 z-50 bg-[#0F172A]/40 backdrop-blur-xs flex"
          onClick={(e) => {
            if (e.target === e.currentTarget) setMobileOpen(false);
          }}
        >
          <div className="w-72 max-w-[85vw] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            <div className="p-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Menu & Navigation
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {sidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
