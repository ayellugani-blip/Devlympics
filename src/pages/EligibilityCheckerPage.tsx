import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { SAMPLE_OPPORTUNITIES } from '../data/opportunities';
import { sangamApi } from '../services/api';
import type {
  UserProfileInput,
  EligibilityResult,
  Opportunity,
  EvaluationStatus
} from '../types';

export const EligibilityCheckerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preSelectedId = searchParams.get('opportunity');

  // Multi-step state: 1: Opportunity & Basics, 2: Academics, 3: Financial & Details, 4: Results
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string>(
    preSelectedId || SAMPLE_OPPORTUNITIES[0].id
  );

  // User Profile Form State
  const [profile, setProfile] = useState<UserProfileInput>({
    age: 20,
    educationLevel: 'Undergraduate (1st / 2nd Year)',
    fieldOfStudy: 'Computer Science & Engineering',
    enrollmentStatus: '1st Year',
    gpaOrMarks: 84,
    gpaScale: 'percentage',
    annualFamilyIncome: 320000,
    gender: 'Female',
    categoryQuota: 'General',
    location: 'India'
  });

  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);

  // Sync if opportunity query param changes
  useEffect(() => {
    if (preSelectedId) {
      const match = SAMPLE_OPPORTUNITIES.find((o) => o.id === preSelectedId);
      if (match) setSelectedOpportunityId(match.id);
    }
  }, [preSelectedId]);

  const selectedOpportunity: Opportunity =
    SAMPLE_OPPORTUNITIES.find((o) => o.id === selectedOpportunityId) ||
    SAMPLE_OPPORTUNITIES[0];

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    try {
      const evaluation = await sangamApi.evaluateEligibility(
        selectedOpportunityId,
        profile
      );
      setResult(evaluation.data);
      setCurrentStep(4);
    } catch (err) {
      console.error('Evaluation error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setCurrentStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-left">
      
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2878D4] bg-[#EAF5FF] px-2.5 py-1 rounded-md border border-[#CBE0F4]">
          <Sparkles className="w-3.5 h-3.5 text-[#2878D4]" />
          <span>Transparent 3-State Assessment</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#20334A] tracking-tight">
          Personalized Eligibility Checker
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] max-w-2xl">
          Evaluate your qualifications against exact official criteria. Every requirement is assessed as Satisfied, Not Satisfied, or Unknown with clear explanations.
        </p>
      </div>

      {/* Progress Steps (Steps 1, 2, 3, 4) */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-bold text-[#64748B] mb-2">
          <span className={currentStep >= 1 ? 'text-[#2878D4]' : ''}>
            1. Opportunity
          </span>
          <span className={currentStep >= 2 ? 'text-[#2878D4]' : ''}>
            2. Academics
          </span>
          <span className={currentStep >= 3 ? 'text-[#2878D4]' : ''}>
            3. Financial & Personal
          </span>
          <span className={currentStep === 4 ? 'text-[#2878D4]' : ''}>
            4. Evaluation Result
          </span>
        </div>
        <div className="w-full bg-[#E2EBF5] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#2878D4] h-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: Select Target Opportunity */}
      {currentStep === 1 && (
        <div className="sangam-card p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#20334A]">
              Select Opportunity to Evaluate
            </h2>
            <p className="text-xs text-[#64748B]">
              Choose the program or scholarship you wish to check your eligibility against.
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B]">
              Target Opportunity
            </label>
            <select
              value={selectedOpportunityId}
              onChange={(e) => setSelectedOpportunityId(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl text-sm font-semibold text-[#20334A] focus:outline-hidden focus:border-[#2878D4] focus:bg-white"
            >
              {SAMPLE_OPPORTUNITIES.map((opp) => (
                <option key={opp.id} value={opp.id}>
                  [{opp.category}] {opp.title} — {opp.organization}
                </option>
              ))}
            </select>
          </div>

          {/* Preview of Selected Opportunity Requirements */}
          <div className="p-4 bg-[#EAF5FF] border border-[#CBE0F4] rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#20334A]">
              <span>Key Criteria to be Tested:</span>
              <span className="text-[#2878D4]">
                {selectedOpportunity.detailedEligibility.length} verified rules
              </span>
            </div>
            <ul className="text-xs text-[#64748B] space-y-1">
              {selectedOpportunity.detailedEligibility.map((req) => (
                <li key={req.id} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#62B6F5]" />
                  <span>{req.simpleExplanation}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2878D4] hover:bg-[#1F63B4] text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs"
            >
              <span>Continue to Academic Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Academic Profile */}
      {currentStep === 2 && (
        <div className="sangam-card p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              Academic Background
            </h2>
            <p className="text-xs text-slate-500">
              Your educational details help assess degree level, branch, and academic score cutoffs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Education Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Current Level
              </label>
              <select
                value={profile.educationLevel}
                onChange={(e) =>
                  setProfile({ ...profile, educationLevel: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl text-xs font-medium text-[#20334A] focus:outline-hidden focus:border-[#2878D4]"
              >
                <option value="High School / Class 12">High School / Class 12</option>
                <option value="Undergraduate (1st / 2nd Year)">Undergraduate (1st / 2nd Year)</option>
                <option value="Undergraduate (3rd / 4th Year)">Undergraduate (3rd / 4th Year)</option>
                <option value="Postgraduate / Master’s">Postgraduate / Master’s</option>
              </select>
            </div>

            {/* Enrolment / Year Status */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                Year of Study
              </label>
              <select
                value={profile.enrollmentStatus}
                onChange={(e) =>
                  setProfile({ ...profile, enrollmentStatus: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl text-xs font-medium text-[#20334A] focus:outline-hidden focus:border-[#2878D4]"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="Final Year">Final Year</option>
                <option value="Graduated">Graduated</option>
              </select>
            </div>

            {/* Field of Study */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                Field of Study / Branch
              </label>
              <input
                type="text"
                value={profile.fieldOfStudy}
                onChange={(e) =>
                  setProfile({ ...profile, fieldOfStudy: e.target.value })
                }
                placeholder="e.g. Computer Science, Mechanical Engineering, Commerce, Physics..."
                className="w-full px-3.5 py-2.5 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl text-xs font-medium text-[#20334A] focus:outline-hidden focus:border-[#2878D4]"
              />
            </div>

            {/* Score / GPA */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                Score / Percentage / CGPA
              </label>
              <input
                type="number"
                value={profile.gpaOrMarks ?? ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    gpaOrMarks: e.target.value === '' ? null : Number(e.target.value)
                  })
                }
                placeholder="e.g. 85 (leave blank if unknown)"
                className="w-full px-3.5 py-2.5 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl text-xs font-medium text-[#20334A] focus:outline-hidden focus:border-[#2878D4]"
              />
              <span className="text-[11px] text-[#64748B] mt-1 block">
                Leave empty to test an "Unknown" state evaluation
              </span>
            </div>

            {/* Scale */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                Grading Scale
              </label>
              <select
                value={profile.gpaScale}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    gpaScale: e.target.value as 'percentage' | 'gpa10' | 'gpa4'
                  })
                }
                className="w-full px-3.5 py-2.5 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl text-xs font-medium text-[#20334A] focus:outline-hidden focus:border-[#2878D4]"
              >
                <option value="percentage">Percentage (0 - 100%)</option>
                <option value="gpa10">10-Point CGPA Scale</option>
                <option value="gpa4">4-Point GPA Scale</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#E2EBF5]">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#E2EBF5] text-[#64748B] rounded-xl text-xs font-bold hover:bg-[#FAFCFF]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2878D4] hover:bg-[#1F63B4] text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs"
            >
              <span>Continue to Financial & Personal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Financial & Demographics */}
      {currentStep === 3 && (
        <div className="sangam-card p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              Financial & Personal Information
            </h2>
            <p className="text-xs text-slate-500">
              Required only for opportunities with income ceilings, age cutoffs, or affirmative grants.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Annual Family Income */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Annual Family Income (INR)
              </label>
              <input
                type="number"
                value={profile.annualFamilyIncome ?? ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    annualFamilyIncome:
                      e.target.value === '' ? null : Number(e.target.value)
                  })
                }
                placeholder="e.g. 300000 (leave blank to test unknown)"
                className="w-full px-3.5 py-2.5 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl text-xs font-medium text-[#20334A] focus:outline-hidden focus:border-[#2878D4]"
              />
              <span className="text-[11px] text-[#64748B] mt-1 block">
                Total parent/guardian combined earnings
              </span>
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                Age (Years)
              </label>
              <input
                type="number"
                value={profile.age ?? ''}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    age: e.target.value === '' ? null : Number(e.target.value)
                  })
                }
                placeholder="e.g. 20"
                className="w-full px-3.5 py-2.5 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl text-xs font-medium text-[#20334A] focus:outline-hidden focus:border-[#2878D4]"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                Gender
              </label>
              <select
                value={profile.gender}
                onChange={(e) =>
                  setProfile({ ...profile, gender: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl text-xs font-medium text-[#20334A] focus:outline-hidden focus:border-[#2878D4]"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            {/* Social / Category Quota */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#64748B] mb-1.5">
                Category
              </label>
              <select
                value={profile.categoryQuota}
                onChange={(e) =>
                  setProfile({ ...profile, categoryQuota: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl text-xs font-medium text-[#20334A] focus:outline-hidden focus:border-[#2878D4]"
              >
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#E2EBF5]">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#E2EBF5] text-[#64748B] rounded-xl text-xs font-bold hover:bg-[#FAFCFF]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleEvaluate}
              disabled={isEvaluating}
              className="sangam-gradient-btn inline-flex items-center gap-2 px-6 py-2.5 text-white rounded-xl text-xs font-bold cursor-pointer shadow-md shadow-indigo-500/20 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isEvaluating ? 'Evaluating Evidence...' : 'Evaluate My Fit'}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Evaluation Results View */}
      {currentStep === 4 && result && (
        <div className="space-y-6">
          
          {/* Top Summary Banner */}
          <div className="sangam-card p-6 sm:p-8 space-y-4 border-[#CBE0F4]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Evaluation Report for
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#20334A] mt-0.5">
                  {result.opportunityTitle}
                </h2>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg transition-colors cursor-pointer self-start sm:self-center"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Change Inputs</span>
              </button>
            </div>

            {/* 3-State Counters Summary Bar */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
              
              {/* Satisfied Count */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-2xl font-black text-emerald-700">
                  {result.overallSummary.satisfiedCount}
                </div>
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center justify-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Satisfied</span>
                </div>
                <span className="text-[10px] text-emerald-700/80 block mt-0.5">
                  Evidence confirms match
                </span>
              </div>

              {/* Not Satisfied Count */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <div className="text-2xl font-black text-amber-700">
                  {result.overallSummary.notSatisfiedCount}
                </div>
                <div className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center justify-center gap-1 mt-0.5">
                  <XCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Not Satisfied</span>
                </div>
                <span className="text-[10px] text-amber-700/80 block mt-0.5">
                  Outside criteria limits
                </span>
              </div>

              {/* Unknown Count */}
              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200">
                <div className="text-2xl font-black text-slate-700">
                  {result.overallSummary.unknownCount}
                </div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-center gap-1 mt-0.5">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                  <span>Unknown</span>
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Needs more info
                </span>
              </div>

            </div>
          </div>

          {/* Detailed Criteria List with 3-State Indicators */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Detailed Requirements Breakdown
            </h3>

            {result.requirements.map((req) => {
              const isSatisfied = req.status === 'satisfied';
              const isNotSatisfied = req.status === 'not_satisfied';
              const isUnknown = req.status === 'unknown';

              return (
                <div
                  key={req.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isSatisfied
                      ? 'bg-emerald-50/30 border-emerald-200'
                      : isNotSatisfied
                      ? 'bg-amber-50/30 border-amber-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="text-sm font-bold text-slate-900">
                      {req.requirementSimple}
                    </h4>

                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shrink-0 ${
                        isSatisfied
                          ? 'bg-emerald-100 text-emerald-800'
                          : isNotSatisfied
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isSatisfied && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {isNotSatisfied && <XCircle className="w-3.5 h-3.5" />}
                      {isUnknown && <HelpCircle className="w-3.5 h-3.5" />}
                      <span>
                        {isSatisfied
                          ? 'Satisfied'
                          : isNotSatisfied
                          ? 'Not Satisfied'
                          : 'Unknown'}
                      </span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-3">
                    {req.explanation}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2.5 border-t border-slate-200/60 font-mono">
                    <div className="text-slate-500">
                      <span className="font-bold text-slate-700">Your profile evidence:</span>{' '}
                      {req.userEvidence}
                    </div>
                    {req.sourceQuote && (
                      <div className="text-slate-500 line-clamp-2">
                        <span className="font-bold text-slate-700">Official quote:</span>{' '}
                        "{req.sourceQuote}"
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Actionable Next Steps */}
          <div className="sangam-card p-6 border-[#CBE0F4] bg-[#EAF5FF]/40 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#20334A] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#2878D4]" />
              <span>Recommended Next Steps</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#20334A]">
              {result.actionableNextSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#2878D4] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 flex gap-3">
              <Link
                to={`/opportunity/${result.opportunityId}`}
                className="px-4 py-2 bg-[#2878D4] hover:bg-[#1F63B4] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                View Opportunity Document Checklist
              </Link>
            </div>
          </div>

          {/* Mandatory AI Disclaimer */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 inline-block mr-1.5 -mt-0.5" />
            <span className="font-semibold text-slate-700">
              {result.disclaimer}
            </span>
          </div>

        </div>
      )}

    </div>
  );
};
