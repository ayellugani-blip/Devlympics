import React, { useState, useRef } from 'react';
import {
  Upload,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileCheck,
  Volume2,
  VolumeX,
  Calendar,
  Building2,
  AlertTriangle,
  Loader2,
  ExternalLink,
  RotateCcw,
  BookOpen,
  Languages,
  CheckSquare,
  Clock,
  X,
  User,
  TrendingUp,
  Award,
  Layers,
  Sparkle,
  FileText,
  Check
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useUser } from '../context/UserContext';
import { ProfileModal } from '../components/ui/ProfileModal';
import { sangamApi } from '../services/api';
import type {
  ExtractedOpportunityResult,
  UserProfileInput,
  EligibilityResult,
  ActionPlan,
  SupportedLanguage
} from '../types';

export const HomePage: React.FC = () => {
  const { speakText, stopSpeaking, isSpeaking, selectedLanguage } = useAccessibility();
  const { profile: userProfile, pastUsage } = useUser();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Time-aware greeting
  const getGreetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Step 1: Upload & Input State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const understandSectionRef = useRef<HTMLDivElement>(null);
  const resultsSectionRef = useRef<HTMLDivElement>(null);
  const eligibilitySectionRef = useRef<HTMLDivElement>(null);
  const planSectionRef = useRef<HTMLDivElement>(null);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Step 2 & 3: Extracted Opportunity & View Mode
  const [extractedData, setExtractedData] = useState<ExtractedOpportunityResult | null>(null);
  const [activeTab, setActiveTab] = useState<'simplified' | 'original'>('simplified');
  const [explanationLanguage, setExplanationLanguage] = useState<SupportedLanguage>(selectedLanguage);

  // Step 4: Eligibility Check State
  const [showEligibilityForm, setShowEligibilityForm] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [eligibilityResult, setEligibilityResult] = useState<EligibilityResult | null>(null);
  const [profile, setProfile] = useState<UserProfileInput>({
    age: 20,
    educationLevel: 'Undergraduate (1st / 2nd Year)',
    fieldOfStudy: 'Computer Science & Engineering',
    enrollmentStatus: '1st Year',
    gpaOrMarks: 82,
    gpaScale: 'percentage',
    annualFamilyIncome: 350000,
    gender: 'Female',
    categoryQuota: 'General'
  });

  // Step 5: Action Plan State
  const [showActionPlan, setShowActionPlan] = useState<boolean>(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const [actionPlan, setActionPlan] = useState<ActionPlan | null>(null);
  const [completedChecklistIds, setCompletedChecklistIds] = useState<Record<string, boolean>>({});

  const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

  // Scroll Helpers
  const scrollToUnderstand = () => {
    understandSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // File Validation
  const validateAndSetFile = (file: File) => {
    setErrorMessage(null);
    const validExtensions = /\.(pdf|jpe?g|png|webp)$/i;

    if (!validExtensions.test(file.name)) {
      setErrorMessage('Unsupported file format. Please upload a PDF, JPG, PNG, or WebP document.');
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(`File exceeds 10 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB).`);
      return;
    }

    setUploadedFile(file);
  };

  // Sample Notice Loader for 1-click test driving
  const loadSampleNotice = (type: 'merit' | 'gsoc' | 'hackathon') => {
    setUploadedFile(null);
    setErrorMessage(null);
    setExtractedData(null);
    setEligibilityResult(null);
    setActionPlan(null);
    setShowEligibilityForm(false);
    setShowActionPlan(false);

    if (type === 'merit') {
      setPastedText(`Ministry of Education & National Scholarship Portal (NSP)
Central Sector Scheme of Scholarship for College and University Students (2026).
Applications are invited from meritorious students who have scored above the 80th percentile in the relevant Class XII Board Examinations. 
Applicants must be pursuing regular, full-time undergraduate courses in recognized institutions. Total parental annual income must not exceed Rs. 4,50,000/-.
Scholarship amount: Rs. 12,000 per annum for graduation; Rs. 20,000 for post-graduation.
Last date for online submission: 30 November 2026. Required documents: Class 12 marksheet, Income certificate, College bonafide, Aadhaar.`);
    } else if (type === 'gsoc') {
      setPastedText(`Google Summer of Code (GSoC) 2026 Official Guidelines.
Google Open Source Programs Office invites developers aged 18+ to submit programming proposals to open source mentoring organizations.
Selected contributors receive stipends between $1,500 and $3,300 upon satisfactory milestone completion.
Application period closes: April 14, 2026. Required: Government Photo ID, written project proposal, GitHub profile.`);
    } else {
      setPastedText(`Smart India Hackathon (SIH) 2026 Student Hardware & Software Edition.
Organized by AICTE & Ministry of Education Innovation Cell.
Open to registered teams of 6 undergraduate/postgraduate students from the same college with mandatory female representation.
Winning team per problem statement awarded Rs. 1,00,000 cash prize.
Deadline for institute nomination and idea submission: 20 September 2026.`);
    }
  };

  // Step 1 Submission: Extract & Simplify
  const handleProcessNotice = async () => {
    if (!uploadedFile && !pastedText.trim()) {
      setErrorMessage('Please upload a notice document or paste announcement text.');
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);
    setUploadProgress(20);
    setProcessingStage('Reading notice structure...');

    setTimeout(() => {
      setUploadProgress(50);
      setProcessingStage('Extracting eligibility rules & deadlines...');
    }, 400);

    setTimeout(() => {
      setUploadProgress(85);
      setProcessingStage('Generating plain-language translation...');
    }, 800);

    try {
      const response = await sangamApi.extractOpportunity(uploadedFile, pastedText);
      setTimeout(() => {
        setUploadProgress(100);
        setExtractedData(response.data);
        setIsProcessing(false);
        setTimeout(() => {
          resultsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }, 1200);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to simplify opportunity notice.');
      setIsProcessing(false);
    }
  };

  // Step 4 Submission: Evaluate Eligibility
  const handleCheckEligibility = async () => {
    if (!extractedData) return;
    setIsEvaluating(true);

    try {
      const evalResponse = await sangamApi.evaluateEligibility(
        'opp-1', // maps to active opportunity
        profile
      );
      setEligibilityResult(evalResponse.data);
      setShowEligibilityForm(true);
      setTimeout(() => {
        eligibilitySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Eligibility evaluation error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Step 5 Submission: Generate Action Plan
  const handleGenerateActionPlan = async () => {
    if (!extractedData) return;
    setIsGeneratingPlan(true);

    try {
      const planResponse = await sangamApi.generateActionPlan(
        extractedData.title,
        extractedData.deadlines.applicationDeadline,
        extractedData.requiredDocuments,
        eligibilityResult?.overallSummary.unknownCount || 0
      );
      setActionPlan(planResponse.data);
      setShowActionPlan(true);
      setTimeout(() => {
        planSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error('Action plan generation error:', err);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const toggleChecklistItem = (id: string) => {
    setCompletedChecklistIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAudioPlayback = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else if (extractedData) {
      speakText(`${extractedData.title}. ${extractedData.simplifiedSummary}`);
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 text-left">
      
      {/* 1. Personalized Welcoming & Past Usage Dashboard */}
      <section className="relative pt-4 sm:pt-6 pb-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Candidate Welcome Banner */}
          <div className="sangam-card p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-white/95 via-indigo-50/30 to-cyan-50/30 border border-indigo-100 shadow-xl shadow-indigo-500/5">
            {/* Radiant Ambient Orb */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-blue-400/15 via-indigo-400/15 to-cyan-400/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Left: Personalized Greeting & Details */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-cyan-500/10 border border-indigo-200/60 text-xs font-bold text-indigo-700 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>CANDIDATE WORKSPACE &bull; ACTIVE SESSION</span>
                </div>

                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0F172A] tracking-tight">
                    {getGreetingTime()},{' '}
                    <span className="sangam-gradient-text">{userProfile.name}</span> 👋
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium max-w-2xl">
                    Welcome back to your personalized opportunity platform. Review your past circular analysis, track approaching application deadlines, or decode a new announcement below.
                  </p>
                </div>

                {/* Candidate Credentials Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-semibold">
                  <span className="px-3 py-1 rounded-xl bg-white border border-indigo-100 text-indigo-800 shadow-2xs">
                    🎓 {userProfile.educationLevel}
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
                    📚 {userProfile.fieldOfStudy}
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-white border border-emerald-200 text-emerald-800 shadow-2xs">
                    ⚡ {userProfile.gpaOrMarks}% Recorded Marks
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-white border border-cyan-200 text-cyan-800 shadow-2xs">
                    💰 ₹{(userProfile.annualFamilyIncome / 100000).toFixed(1)}L/yr Income Cap
                  </span>
                </div>
              </div>

              {/* Right: Quick Action to Edit Profile */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-indigo-50/60 border border-indigo-200 text-indigo-700 text-xs font-bold transition-all shadow-xs hover:border-indigo-300 cursor-pointer"
                >
                  <User className="w-4 h-4 text-indigo-600" />
                  <span>Edit Profile / Name</span>
                </button>
                <span className="text-[11px] text-slate-500 font-medium">
                  Last active: Today
                </span>
              </div>

            </div>

            {/* 3 Key Past Usage Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-indigo-100/70">
              
              {/* Stat 1: Notices Analyzed */}
              <div className="p-4 rounded-2xl bg-white/80 border border-indigo-100 hover:border-indigo-300 transition-all shadow-2xs group text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Notices Analyzed
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs shadow-xs">
                    <FileText className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-[#0F172A] tracking-tight">
                  {pastUsage.noticesAnalyzedCount}
                </div>
                <span className="text-xs font-semibold text-indigo-600 block mt-0.5">
                  Circulars decoded into plain language
                </span>
                <button
                  type="button"
                  onClick={scrollToUnderstand}
                  className="text-[11px] font-bold text-slate-500 hover:text-indigo-600 inline-flex items-center gap-1 mt-2 transition-colors cursor-pointer"
                >
                  <span>Decode new notice</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Stat 2: Eligible Matches */}
              <div className="p-4 rounded-2xl bg-white/80 border border-purple-100 hover:border-purple-300 transition-all shadow-2xs group text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Eligible Matches
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center text-xs shadow-xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-[#0F172A] tracking-tight">
                  {pastUsage.eligibleMatchesCount}
                </div>
                <span className="text-xs font-semibold text-purple-600 block mt-0.5">
                  Scholarships & grants matching profile
                </span>
                <a
                  href="/explore"
                  className="text-[11px] font-bold text-slate-500 hover:text-purple-600 inline-flex items-center gap-1 mt-2 transition-colors cursor-pointer"
                >
                  <span>Explore opportunities</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>

              {/* Stat 3: Approaching Deadlines */}
              <div className="p-4 rounded-2xl bg-white/80 border border-amber-100 hover:border-amber-300 transition-all shadow-2xs group text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Deadlines Tracking
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 text-white flex items-center justify-center text-xs shadow-xs">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-[#0F172A] tracking-tight">
                  {pastUsage.savedDeadlinesCount}
                </div>
                <span className="text-xs font-semibold text-amber-700 block mt-0.5">
                  Nearest closing Nov 30, 2026 (14 days)
                </span>
                <span className="text-[11px] text-slate-500 block mt-2">
                  National Merit Scholarship &bull; 14 days left
                </span>
              </div>

            </div>

            {/* Past Usage Activity Feed Strip */}
            <div className="pt-4 mt-5 border-t border-indigo-100/70 text-left">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                  Your Recent Platform Activity & Decoded Circulars
                </span>
                <span className="text-[11px] font-semibold text-indigo-600">
                  3 verified items saved
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1 text-xs">
                {pastUsage.recentActivities.map((act) => (
                  <div
                    key={act.id}
                    onClick={() => {
                      if (act.id === 'opp-1') loadSampleNotice('merit');
                      else if (act.id === 'opp-3') loadSampleNotice('hackathon');
                      else loadSampleNotice('gsoc');
                      scrollToUnderstand();
                    }}
                    className="p-3 bg-white/90 hover:bg-indigo-50/40 border border-slate-200/80 hover:border-indigo-200 rounded-xl transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {act.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {act.date}
                        </span>
                      </div>
                      <h4 className="font-bold text-[#0F172A] line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {act.title}
                      </h4>
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" />
                        {act.fitScore}
                      </span>
                      <span className="font-medium text-slate-500 group-hover:text-indigo-600 inline-flex items-center gap-0.5">
                        <span>Review</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Direct Opportunity Accessibility Hero Section (Centered, Clean, Rich Gradients) */}
      <section className="relative pt-6 sm:pt-10 pb-4 text-center overflow-hidden">
        {/* Soft background ambient gradient glow */}
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-indigo-50/40 via-cyan-50/20 to-transparent pointer-events-none" />
        <div className="absolute top-10 left-1/3 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/3 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-5 text-center">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-cyan-500/10 border border-indigo-200/80 text-xs font-bold tracking-wider uppercase text-indigo-700 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>BRIDGING THE INFORMATION GAP &bull; DIRECT EMPOWERMENT</span>
          </div>

          {/* Inspiring Centered Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.15]">
            Turning Complicated Opportunity Notices into{' '}
            <span className="sangam-gradient-text block sm:inline">
              Accessible Possibilities.
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            No candidate should lose a scholarship, fellowship, or competition because of intimidating administrative jargon, missing deadlines, or language barriers. Upload or paste any notice below to decode criteria immediately.
          </p>

          {/* Action Buttons with Gradient Effects */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={scrollToUnderstand}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-white sangam-gradient-btn text-sm sm:text-base cursor-pointer group"
            >
              <Upload className="w-4 h-4" />
              <span>Decode an Opportunity Notice</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={scrollToHowItWorks}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-slate-700 hover:text-indigo-600 bg-white/90 hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-200 shadow-xs transition-all cursor-pointer text-sm sm:text-base"
            >
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>See How It Works</span>
            </button>
          </div>

          {/* Micro Trust Points */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-y-2 gap-x-5 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              PDFs, Circulars & Photos up to 10 MB
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              3-State Honest Eligibility (Satisfied / Not Satisfied / Unknown)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-600" />
              5+ Indian Languages & Voice Output
            </span>
          </div>

        </div>
      </section>

      {/* 2. Unified Opportunity Processor (Step 1 — Upload or Paste) */}
      <section
        id="understand"
        ref={understandSectionRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20"
      >
        <div className="sangam-card p-6 sm:p-8 space-y-6">
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#20334A]">
                Upload or Paste Notice
              </h2>
              <span className="text-xs font-semibold text-[#2878D4] bg-[#EAF5FF] border border-[#CBE0F4] px-2.5 py-0.5 rounded-full">
                Step 1 of 5
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Provide an official circular or guideline document to extract deadlines, criteria, and benefits.
            </p>
          </div>

          {/* Quick Test Samples */}
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
            <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
              Try with a sample:
            </span>
            <button
              type="button"
              onClick={() => loadSampleNotice('merit')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#EAF5FF] hover:bg-[#D8EDFF] text-[#2878D4] border border-[#CBE0F4] transition-colors cursor-pointer"
            >
              National Merit Scholarship
            </button>
            <button
              type="button"
              onClick={() => loadSampleNotice('gsoc')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#F0FAF7] hover:bg-[#E0F5EE] text-[#0D9488] border border-[#BFE9D2] transition-colors cursor-pointer"
            >
              Google Summer of Code
            </button>
            <button
              type="button"
              onClick={() => loadSampleNotice('hackathon')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#E8E6FF] hover:bg-[#DDD9FA] text-[#4338CA] border border-[#D5D0FA] transition-colors cursor-pointer"
            >
              Smart India Hackathon
            </button>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                validateAndSetFile(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-[#2878D4] bg-[#EAF5FF]/60'
                : 'border-[#CBE0F4] hover:border-[#2878D4] bg-[#FAFCFF] hover:bg-[#EAF5FF]/30'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  validateAndSetFile(e.target.files[0]);
                }
              }}
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              className="hidden"
            />

            <div className="w-12 h-12 rounded-2xl bg-[#EAF5FF] text-[#2878D4] flex items-center justify-center mx-auto mb-2.5">
              <Upload className="w-6 h-6" />
            </div>

            <span className="text-xs sm:text-sm font-bold text-[#20334A] block">
              {uploadedFile ? uploadedFile.name : 'Click to select or drag and drop notice file'}
            </span>
            <span className="text-[11px] text-[#64748B] block mt-0.5">
              Accepted formats: PDF, JPG, PNG, WebP (up to 10 MB)
            </span>

            {uploadedFile && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E2EBF5] rounded-lg text-xs font-medium text-[#20334A]">
                <FileCheck className="w-4 h-4 text-[#0D9488]" />
                <span>{(uploadedFile.size / 1024).toFixed(0)} KB attached</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setUploadedFile(null);
                  }}
                  className="text-[#64748B] hover:text-[#20334A] ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* OR Text Divider */}
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#64748B]">
            <div className="flex-1 border-t border-[#E2EBF5]" />
            <span>Or Paste Circular Text</span>
            <div className="flex-1 border-t border-[#E2EBF5]" />
          </div>

          {/* Text Area */}
          <div>
            <textarea
              rows={4}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste notice announcement or eligibility text here..."
              className="w-full p-3.5 rounded-xl border border-[#E2EBF5] bg-[#FAFCFF] text-xs sm:text-sm text-[#20334A] focus:outline-hidden focus:border-[#2878D4] focus:bg-white leading-relaxed placeholder:text-[#64748B]"
            />
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="p-3 bg-[#FFF6F3] border border-[#FFB7A5] rounded-xl flex items-center gap-2 text-xs font-semibold text-[#C2410C]">
              <AlertTriangle className="w-4 h-4 text-[#C2410C] shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Processing Status Progress */}
          {isProcessing && (
            <div className="space-y-2 p-3.5 bg-[#EAF5FF]/60 border border-[#CBE0F4] rounded-xl">
              <div className="flex items-center justify-between text-xs font-semibold text-[#20334A]">
                <span className="flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2878D4]" />
                  <span>{processingStage}</span>
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-[#CBE0F4] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#2878D4] h-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Clear One Submission Action */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-[#64748B] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
              No data stored without your consent.
            </span>

            <button
              type="button"
              onClick={handleProcessNotice}
              disabled={isProcessing || (!uploadedFile && !pastedText.trim())}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2878D4] hover:bg-[#1F63B4] text-white rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all shadow-xs disabled:opacity-40"
            >
              <Sparkles className="w-4 h-4 text-[#BFE9D2]" />
              <span>{isProcessing ? 'Processing Notice...' : 'Simplify Notice'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* 3. Step 2 & 3: Extracted Opportunity & Plain Language Understanding */}
      {extractedData && (
        <section
          ref={resultsSectionRef}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-20 animate-in fade-in duration-300"
        >
          <div className="sangam-card p-6 sm:p-8 space-y-6 border-[#CBE0F4]">
            
            {/* Header: Title, Category, Audio Control */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#E2EBF5]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D9488] bg-[#F0FAF7] px-2 py-0.5 rounded-md border border-[#BFE9D2]">
                    Extracted & Simplified
                  </span>
                  <span className="text-[10px] font-semibold text-[#64748B]">
                    Step 2 of 5
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#20334A]">
                  {extractedData.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-[#64748B]">
                  <Building2 className="w-3.5 h-3.5 text-[#62B6F5]" />
                  <span>{extractedData.organization}</span>
                  <span className="text-[#CBE0F4]">•</span>
                  <span className="font-semibold text-[#2878D4]">{extractedData.category}</span>
                </div>
              </div>

              {/* Step 3 Controls: Choose How to Understand (Audio & Language) */}
              <div className="flex items-center gap-2 self-start">
                <button
                  type="button"
                  onClick={handleAudioPlayback}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                    isSpeaking
                      ? 'bg-[#FFF6F3] text-[#C2410C] border-[#FFB7A5]'
                      : 'bg-[#FAFCFF] hover:bg-[#EAF5FF] text-[#20334A] border-[#E2EBF5]'
                  }`}
                  title="Listen to explanation aloud"
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-[#C2410C]" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#2878D4]" />
                      <span>Listen Aloud</span>
                    </>
                  )}
                </button>

                <select
                  value={explanationLanguage}
                  onChange={(e) => setExplanationLanguage(e.target.value as SupportedLanguage)}
                  className="py-1.5 px-2 bg-[#FAFCFF] border border-[#E2EBF5] rounded-lg text-[#20334A] text-xs font-semibold cursor-pointer focus:border-[#2878D4]"
                  title="Select explanation language"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="mr">मराठी (Marathi)</option>
                </select>
              </div>
            </div>

            {/* Plain-Language Explanation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2878D4] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#2878D4]" />
                  Plain-Language Explanation
                </span>
                <div className="bg-[#FAFCFF] border border-[#E2EBF5] p-0.5 rounded-lg inline-flex text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setActiveTab('simplified')}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      activeTab === 'simplified' ? 'bg-[#EAF5FF] text-[#2878D4] shadow-2xs font-bold' : 'text-[#64748B]'
                    }`}
                  >
                    Simplified
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('original')}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                      activeTab === 'original' ? 'bg-[#EAF5FF] text-[#2878D4] shadow-2xs font-bold' : 'text-[#64748B]'
                    }`}
                  >
                    Original Text
                  </button>
                </div>
              </div>

              {activeTab === 'simplified' ? (
                <div className="p-4 bg-[#EAF5FF]/50 border border-[#CBE0F4] rounded-xl text-xs sm:text-sm text-[#20334A] leading-relaxed font-medium">
                  {extractedData.simplifiedSummary}
                </div>
              ) : (
                <div className="p-4 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl text-xs font-mono text-[#64748B] whitespace-pre-line leading-relaxed">
                  {pastedText || uploadedFile?.name || 'Uploaded document contents processed.'}
                </div>
              )}
            </div>

            {/* Key Dates & Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl space-y-1">
                <span className="font-bold text-[#20334A] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#2878D4]" />
                  Application Deadline
                </span>
                <span className="text-[#20334A] font-semibold block text-sm">
                  {extractedData.deadlines.applicationDeadline}
                </span>
              </div>

              <div className="p-3.5 bg-[#F0FAF7] border border-[#BFE9D2] rounded-xl space-y-1">
                <span className="font-bold text-[#0D9488] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488]" />
                  Key Benefit / Grant
                </span>
                <span className="text-[#0D9488] font-medium block">
                  {extractedData.benefits[0] || 'Official recognition and funding'}
                </span>
              </div>
            </div>

            {/* Required Documents */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#20334A] block">
                Required Documents Checklist
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#20334A]">
                {extractedData.requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="p-2.5 bg-white border border-[#E2EBF5] rounded-lg flex items-center gap-2">
                    <span className="text-[#0D9488] font-bold">✓</span>
                    <span className="line-clamp-1">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unclear Warnings if any */}
            {extractedData.unclearOrMissingWarnings.length > 0 && (
              <div className="p-3.5 bg-[#FFF6F3] border border-[#FFB7A5] rounded-xl text-xs text-[#C2410C] flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Notice Information Gap:</span>
                  <span>{extractedData.unclearOrMissingWarnings[0]}</span>
                </div>
              </div>
            )}

            {/* Two Clear Contextual Next Actions */}
            <div className="pt-4 border-t border-[#E2EBF5] flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-[#64748B]">
                Next: verify your profile qualifications or generate your action checklist.
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCheckEligibility}
                  className="px-5 py-2.5 bg-[#2878D4] hover:bg-[#1F63B4] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#BFE9D2]" />
                  <span>Check Eligibility</span>
                </button>

                <button
                  type="button"
                  onClick={handleGenerateActionPlan}
                  className="px-4 py-2.5 bg-white hover:bg-[#EAF5FF] text-[#2878D4] border border-[#2878D4]/30 rounded-xl text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <CheckSquare className="w-4 h-4 text-[#2878D4]" />
                  <span>Create Action Plan</span>
                </button>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 4. Step 4: Eligibility Check (Inline Flow) */}
      {showEligibilityForm && extractedData && (
        <section
          ref={eligibilitySectionRef}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-20 animate-in fade-in duration-300"
        >
          <div className="sangam-card p-6 sm:p-8 space-y-6 border-[#BFE9D2]">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E2EBF5]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D9488] bg-[#F0FAF7] px-2 py-0.5 rounded-md border border-[#BFE9D2]">
                  Step 4 of 5
                </span>
                <h3 className="text-xl font-bold text-[#20334A] mt-1">
                  Personalized Eligibility Check
                </h3>
              </div>
              <span className="text-xs text-[#64748B]">
                Comparing profile against official notice
              </span>
            </div>

            {/* Profile Input Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#20334A] mb-1">Year of Study</label>
                <select
                  value={profile.enrollmentStatus}
                  onChange={(e) => setProfile({ ...profile, enrollmentStatus: e.target.value })}
                  className="w-full p-2 bg-[#FAFCFF] border border-[#E2EBF5] rounded-lg text-xs text-[#20334A]"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="Final Year">Final Year</option>
                  <option value="Graduated">Graduated</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#20334A] mb-1">Academic Score (%)</label>
                <input
                  type="number"
                  value={profile.gpaOrMarks ?? ''}
                  onChange={(e) => setProfile({ ...profile, gpaOrMarks: e.target.value ? Number(e.target.value) : null })}
                  placeholder="e.g. 82"
                  className="w-full p-2 bg-[#FAFCFF] border border-[#E2EBF5] rounded-lg text-xs text-[#20334A]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#20334A] mb-1">Annual Family Income (₹)</label>
                <input
                  type="number"
                  value={profile.annualFamilyIncome ?? ''}
                  onChange={(e) => setProfile({ ...profile, annualFamilyIncome: e.target.value ? Number(e.target.value) : null })}
                  placeholder="e.g. 350000"
                  className="w-full p-2 bg-[#FAFCFF] border border-[#E2EBF5] rounded-lg text-xs text-[#20334A]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleCheckEligibility}
                disabled={isEvaluating}
                className="px-4 py-2 bg-[#2878D4] hover:bg-[#1F63B4] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                {isEvaluating ? 'Evaluating...' : 'Re-Evaluate Fit'}
              </button>
            </div>

            {/* 3-State Results Breakdown */}
            {eligibilityResult && (
              <div className="space-y-4 pt-4 border-t border-[#E2EBF5]">
                
                {/* 3 Counters */}
                <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="p-3 bg-[#F0FAF7] border border-[#BFE9D2] rounded-xl">
                    <span className="text-xl font-black text-[#0D9488] block">
                      {eligibilityResult.overallSummary.satisfiedCount}
                    </span>
                    <span className="font-bold text-[#0D9488] uppercase text-[10px]">
                      Satisfied
                    </span>
                  </div>
                  <div className="p-3 bg-[#FFF6F3] border border-[#FFB7A5] rounded-xl">
                    <span className="text-xl font-black text-[#C2410C] block">
                      {eligibilityResult.overallSummary.notSatisfiedCount}
                    </span>
                    <span className="font-bold text-[#C2410C] uppercase text-[10px]">
                      Not Satisfied
                    </span>
                  </div>
                  <div className="p-3 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl">
                    <span className="text-xl font-black text-[#64748B] block">
                      {eligibilityResult.overallSummary.unknownCount}
                    </span>
                    <span className="font-bold text-[#64748B] uppercase text-[10px]">
                      Unknown
                    </span>
                  </div>
                </div>

                {/* Requirements items */}
                <div className="space-y-2.5">
                  {eligibilityResult.requirements.map((req) => (
                    <div
                      key={req.id}
                      className={`p-3.5 rounded-xl border text-xs ${
                        req.status === 'satisfied'
                          ? 'bg-[#F0FAF7]/60 border-[#BFE9D2]'
                          : req.status === 'not_satisfied'
                          ? 'bg-[#FFF6F3]/60 border-[#FFB7A5]'
                          : 'bg-[#FAFCFF] border-[#E2EBF5]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-[#20334A]">{req.requirementSimple}</span>
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                            req.status === 'satisfied'
                              ? 'bg-[#BFE9D2] text-[#0D9488]'
                              : req.status === 'not_satisfied'
                              ? 'bg-[#FFB7A5] text-[#991B1B]'
                              : 'bg-[#EDF4FB] text-[#64748B]'
                          }`}
                        >
                          {req.status === 'satisfied'
                            ? 'Satisfied'
                            : req.status === 'not_satisfied'
                            ? 'Not Satisfied'
                            : 'Unknown'}
                        </span>
                      </div>
                      <p className="text-[#64748B] mb-1">{req.explanation}</p>
                      {req.sourceQuote && (
                        <span className="text-[11px] text-[#64748B] font-mono italic block">
                          Official notice quote: "{req.sourceQuote}"
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mandatory Disclaimer */}
                <div className="p-3 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl text-center text-[11px] text-[#64748B]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488] inline mr-1 -mt-0.5" />
                  <span>{eligibilityResult.disclaimer}</span>
                </div>

                {/* Next Step: Action Plan */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleGenerateActionPlan}
                    className="px-5 py-2.5 bg-[#2878D4] hover:bg-[#1F63B4] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Proceed to Step 5: Action Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

          </div>
        </section>
      )}

      {/* 5. Step 5: Action Plan & Personalized Checklist */}
      {showActionPlan && actionPlan && (
        <section
          ref={planSectionRef}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-20 animate-in fade-in duration-300"
        >
          <div className="sangam-card p-6 sm:p-8 space-y-6 border-[#CBE0F4]">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E2EBF5]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4338CA] bg-[#E8E6FF] px-2 py-0.5 rounded-md border border-[#D5D0FA]">
                  Step 5 of 5
                </span>
                <h3 className="text-xl font-bold text-[#20334A] mt-1">
                  Personalized Application Action Plan
                </h3>
              </div>
              <span className="text-xs font-semibold text-[#64748B]">
                Deadline: {actionPlan.deadline}
              </span>
            </div>

            {/* Milestones */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#20334A] block">
                Timeline Milestones
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                {actionPlan.milestones.map((m) => (
                  <div key={m.id} className="p-3 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl space-y-1">
                    <span className="font-bold text-[#20334A] block">{m.title}</span>
                    <span className="text-[11px] text-[#2878D4] font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {m.deadline}
                    </span>
                    <span className="text-[#64748B] text-[11px] block">{m.notes}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Document Checklist */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#20334A] block">
                Interactive Document & Submission Checklist
              </span>
              <div className="space-y-2">
                {actionPlan.checklist.map((item) => {
                  const isChecked = completedChecklistIds[item.id] || false;
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleChecklistItem(item.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs transition-colors cursor-pointer ${
                        isChecked
                          ? 'bg-[#F0FAF7] border-[#BFE9D2] text-[#64748B] line-through'
                          : 'bg-white border-[#E2EBF5] text-[#20334A] hover:border-[#CBE0F4]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 rounded text-[#2878D4] focus:ring-[#2878D4]"
                        />
                        <span className="font-semibold">{item.title}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase text-[#64748B]">
                        {item.category}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Practical Advice Tips */}
            <div className="p-4 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl space-y-1 text-xs text-[#64748B]">
              <span className="font-bold text-[#20334A] block">Application Best Practices:</span>
              <ul className="list-disc list-inside space-y-0.5">
                {actionPlan.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

          </div>
        </section>
      )}

      {/* 6. Two Compact Explanations of SANGAM's Core Problem Solving */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Gap 1 */}
          <div className="sangam-card p-6 sm:p-7 space-y-2.5 border-[#CBE0F4]">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5FF] text-[#2878D4] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2878D4] block">
              Core Problem 1
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#20334A]">
              Complex Information → Simple Understanding
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-normal">
              Official application circulars are typically packed with dense administrative legalese. SANGAM translates complex guidelines into simple everyday language, clear checklists, and direct official citations.
            </p>
          </div>

          {/* Gap 2 */}
          <div className="sangam-card p-6 sm:p-7 space-y-2.5 border-[#BFE9D2]">
            <div className="w-10 h-10 rounded-xl bg-[#F0FAF7] text-[#0D9488] flex items-center justify-center">
              <Languages className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D9488] block">
              Core Problem 2
            </span>
            <h3 className="text-base sm:text-lg font-bold text-[#20334A]">
              Language Barriers → Accessible Understanding
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed font-normal">
              Opportunities should not depend on English fluency alone. Access translated summaries in your mother tongue, listen to audio answers out loud, and check preliminary fit using honest 3-state evaluation.
            </p>
          </div>

        </div>
      </section>

      {/* 7. Simple 3-Step "How It Works" Section */}
      <section id="how-it-works" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2878D4] bg-[#EAF5FF] px-2.5 py-0.5 rounded-full border border-[#CBE0F4]">
            How It Works
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#20334A]">
            Three Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
          
          <div className="p-5 bg-white border border-[#E2EBF5] rounded-2xl shadow-2xs space-y-2 hover:border-[#CBE0F4] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#2878D4] text-white flex items-center justify-center text-xs font-bold">
              1
            </div>
            <h4 className="text-sm font-bold text-[#20334A]">Upload or Paste</h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Upload any scholarship circular, PDF notice, or brochure up to 10 MB.
            </p>
          </div>

          <div className="p-5 bg-white border border-[#E2EBF5] rounded-2xl shadow-2xs space-y-2 hover:border-[#BFE9D2] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#62B6F5] text-white flex items-center justify-center text-xs font-bold">
              2
            </div>
            <h4 className="text-sm font-bold text-[#20334A]">Understand</h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Read simplified criteria, key benefits, dates, and listen in your language.
            </p>
          </div>

          <div className="p-5 bg-white border border-[#E2EBF5] rounded-2xl shadow-2xs space-y-2 hover:border-[#72D6D0] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#72D6D0] text-[#20334A] flex items-center justify-center text-xs font-bold">
              3
            </div>
            <h4 className="text-sm font-bold text-[#20334A]">Take Action</h4>
            <p className="text-xs text-[#64748B] leading-relaxed">
              Check preliminary eligibility across 3 clear statuses and follow your checklist.
            </p>
          </div>

        </div>

        <div className="mt-8 text-center text-xs text-[#64748B]">
          SANGAM assists with document comprehension; it does not replace official issuing decisions.
        </div>
      </section>

      {/* Candidate Profile Modal */}
      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

    </div>
  );
};
