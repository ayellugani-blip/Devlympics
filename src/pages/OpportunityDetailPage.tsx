import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Award,
  GraduationCap,
  FileCheck,
  ExternalLink,
  AlertTriangle,
  Sparkles,
  Volume2,
  VolumeX,
  Share2,
  CheckCircle2,
  ListOrdered,
  Clock,
  ShieldCheck,
  Check
} from 'lucide-react';
import { SAMPLE_OPPORTUNITIES } from '../data/opportunities';
import { useAccessibility } from '../context/AccessibilityContext';
import type { SupportedLanguage } from '../types';

export const OpportunityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { speakText, stopSpeaking, isSpeaking, selectedLanguage } = useAccessibility();

  const opportunity = SAMPLE_OPPORTUNITIES.find((o) => o.id === id);

  const [activeTab, setActiveTab] = useState<'simplified' | 'original'>('simplified');
  const [copiedLink, setCopiedLink] = useState(false);
  const [localLang, setLocalLang] = useState<SupportedLanguage>(selectedLanguage);

  if (!opportunity) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Opportunity Not Found</h2>
        <p className="text-sm text-slate-500">
          The opportunity you requested does not exist or has been archived.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#2878D4] hover:bg-[#1F63B4] text-white rounded-xl text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Explore</span>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(`${opportunity.title}. ${opportunity.simplifiedDescription}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-left">
      
      {/* Back button & Category badge */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#20334A] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Opportunities</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-[#EAF5FF] text-[#2878D4] border border-[#CBE0F4]">
            {opportunity.category}
          </span>
          <button
            type="button"
            onClick={handleShare}
            className="p-1.5 text-[#64748B] hover:text-[#20334A] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Copy link to opportunity"
            aria-label="Share opportunity"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-white border border-[#E2EBF5] rounded-3xl p-6 sm:p-8 shadow-xs mb-8">
        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#20334A] tracking-tight leading-tight">
            {opportunity.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#64748B]">
            <div className="flex items-center gap-1.5 font-medium">
              <Building2 className="w-4 h-4 text-[#64748B]" />
              <span>{opportunity.organization}</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <GraduationCap className="w-4 h-4 text-[#64748B]" />
              <span>{opportunity.requiredEducation}</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-[#2878D4] bg-[#EAF5FF] px-2.5 py-0.5 rounded-full border border-[#CBE0F4]">
              <Clock className="w-3.5 h-3.5" />
              <span>
                Deadline: {opportunity.deadline} ({opportunity.deadlineDaysRemaining} days remaining)
              </span>
            </div>
          </div>
        </div>

        {/* Quick Action Bar */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSpeak}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                isSpeaking
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-600" />
                  <span>Stop Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-slate-600" />
                  <span>Listen to Explanation</span>
                </>
              )}
            </button>

            {/* Language Selector for Explanation */}
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span className="text-slate-400">Language:</span>
              <select
                value={localLang}
                onChange={(e) => setLocalLang(e.target.value as SupportedLanguage)}
                className="py-1 px-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 text-xs font-medium cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>
          </div>

          <Link
            to={`/eligibility?opportunity=${opportunity.id}`}
            className="sangam-gradient-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white shadow-md shadow-indigo-500/20 cursor-pointer text-xs sm:text-sm"
          >
            <span>Check My Eligibility for this</span>
            <CheckCircle2 className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Warning Alert if Unclear Information exists */}
      {opportunity.unclearWarnings && opportunity.unclearWarnings.length > 0 && (
        <div className="mb-8 p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Clarifications & Unannounced Details
            </h4>
            {opportunity.unclearWarnings.map((warn, i) => (
              <p key={i} className="text-xs text-amber-800 leading-relaxed">
                {warn}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Layout: Side-by-side or Tabbed Content */}
      <div className="space-y-8">
        
        {/* Toggle between AI Simplification vs Original Circular */}
        <div className="bg-[#F1F6FB] p-1 rounded-xl inline-flex gap-1 border border-[#E2EBF5]">
          <button
            type="button"
            onClick={() => setActiveTab('simplified')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'simplified'
                ? 'bg-white text-[#2878D4] shadow-xs'
                : 'text-[#64748B] hover:text-[#20334A]'
            }`}
          >
            SANGAM Plain-Language Simplification
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('original')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'original'
                ? 'bg-white text-[#2878D4] shadow-xs'
                : 'text-[#64748B] hover:text-[#20334A]'
            }`}
          >
            Original Official Notice
          </button>
        </div>

        {/* Tab 1: SANGAM Plain Language AI Simplification */}
        {activeTab === 'simplified' && (
          <div className="sangam-card p-6 sm:p-8 space-y-8 border-[#CBE0F4]">
            {/* Overview */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2878D4]">
                <Sparkles className="w-4 h-4 text-[#2878D4]" />
                <span>Plain-Language Summary</span>
              </div>
              <p className="text-sm sm:text-base text-[#20334A] leading-relaxed font-normal">
                {opportunity.simplifiedDescription}
              </p>
            </div>

            {/* Benefits & Financial Support */}
            <div className="space-y-3 pt-4 border-t border-[#E2EBF5]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#20334A]">
                <Award className="w-4 h-4 text-[#2878D4]" />
                <span>Benefits & Rewards</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {opportunity.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="p-3 bg-[#EAF5FF] border border-[#CBE0F4] rounded-xl text-xs sm:text-sm text-[#20334A] font-medium flex items-center gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#2878D4] shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility Requirements Breakdown */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Eligibility Requirements (What is needed)</span>
              </div>
              <div className="space-y-2.5">
                {opportunity.detailedEligibility.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5"
                  >
                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      {req.simpleExplanation}
                    </div>
                    {req.sourceQuote && (
                      <div className="text-xs text-slate-500 font-mono italic">
                        Official Clause: "{req.sourceQuote}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents Checklist */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <FileCheck className="w-4 h-4 text-teal-600" />
                <span>Required Documents Checklist</span>
              </div>
              <p className="text-xs text-slate-500">
                Ensure you have clear, scanned copies (PDF or JPG) of these items before applying:
              </p>
              <ul className="space-y-2">
                {opportunity.requiredDocuments.map((doc, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 bg-white border border-slate-200 p-2.5 rounded-lg"
                  >
                    <div className="w-4 h-4 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                      ✓
                    </div>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Application Steps */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900">
                <ListOrdered className="w-4 h-4 text-purple-600" />
                <span>How to Apply (Step-by-Step)</span>
              </div>
              <div className="space-y-3">
                {opportunity.applicationSteps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl border border-slate-200 bg-slate-50/40"
                  >
                    <div className="w-6 h-6 rounded-lg bg-purple-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {step.stepNumber}
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        {step.title}
                      </div>
                      <div className="text-xs text-slate-600 leading-relaxed">
                        {step.instruction}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Original Official Notice */}
        {activeTab === 'original' && (
          <div className="sangam-card p-6 sm:p-8 space-y-4 bg-slate-50/40">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Official Verbatim Notice
              </span>
              <span className="text-[11px] font-mono bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                Unmodified Source
              </span>
            </div>
            <div className="font-mono text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed bg-white border border-slate-200 p-5 rounded-xl">
              {opportunity.description}
            </div>
            <div className="text-xs text-slate-500 pt-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                Verified against public circular records. Official links are provided below.
              </span>
            </div>
          </div>
        )}

        {/* Official Source Link Banner */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-0.5 text-center sm:text-left">
            <span className="text-xs font-bold text-slate-900 block">
              Official Portal Link
            </span>
            <span className="text-xs text-slate-500">
              {opportunity.officialSourceUrl
                ? 'Submit applications exclusively through the official authority portal.'
                : 'Information not available: official portal not declared.'}
            </span>
          </div>

          {opportunity.officialSourceUrl ? (
            <a
              href={opportunity.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition-colors shadow-2xs shrink-0"
            >
              <span>Visit Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-xs text-slate-400 font-medium">
              Information not available
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
