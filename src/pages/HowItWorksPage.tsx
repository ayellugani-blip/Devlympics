import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ShieldCheck,
  HeartHandshake,
  HelpCircle,
  Users
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 text-left space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2878D4] bg-[#EAF5FF] px-2.5 py-1 rounded-md border border-[#CBE0F4]">
          <HeartHandshake className="w-3.5 h-3.5 text-[#2878D4]" />
          <span>Social Impact Technology</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#20334A] tracking-tight leading-tight">
          Turning Opportunities into Accessible Possibilities
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] leading-relaxed font-normal">
          SANGAM was created to eliminate the barrier of confusing, dense, and intimidating administrative notices so that deserving candidates can discover, understand, and apply for opportunities with confidence.
        </p>
      </div>

      {/* The 3-Step Architecture */}
      <div className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#20334A]">
          Our Three-Pillar Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Pillar 1 */}
          <div className="sangam-card p-6 sm:p-7 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF5FF] border border-[#CBE0F4] text-[#2878D4] flex items-center justify-center font-extrabold text-lg">
              01
            </div>
            <h3 className="text-lg font-bold text-[#20334A]">
              1. Discover & Upload
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Upload any scholarship circular, PDF notice, or hackathon announcement up to 10 MB, or paste circular text directly. SANGAM parses the structure and isolates key criteria immediately.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#2878D4] flex items-center gap-1">
              <span>Notice parsing & decoding</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="sangam-card p-6 sm:p-7 space-y-4 border-[#72D6D0]/40 bg-[#72D6D0]/5">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F9F8] border border-[#72D6D0]/30 text-[#0F8A83] flex items-center justify-center font-extrabold text-lg">
              02
            </div>
            <h3 className="text-lg font-bold text-[#20334A]">
              2. Understand in Plain Language
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Dense administrative and legal legalese is translated into simple, everyday language. Review deadlines with relative day countdowns, extracted benefits, and listen to explanations aloud in your preferred language.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#0F8A83] flex items-center gap-1">
              <span>Plain language & voice assistance</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="sangam-card p-6 sm:p-7 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E8E6FF] border border-[#D5D1FF] text-[#554DB5] flex items-center justify-center font-extrabold text-lg">
              03
            </div>
            <h3 className="text-lg font-bold text-[#20334A]">
              3. Check Fit & Take Action
            </h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Evaluate preliminary eligibility with complete transparency across exactly three statuses: Satisfied, Not Satisfied, or Unknown. Follow a customized action plan with required document checklists.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#554DB5] flex items-center gap-1">
              <span>3-state matching & action plan</span>
            </div>
          </div>

        </div>
      </div>

      {/* Trust & Ethical AI Principles */}
      <div className="bg-white border border-[#E2EBF5] rounded-3xl p-8 sm:p-10 space-y-6 shadow-xs">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-[#20334A]">
            Our Ethical Principles
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            How we protect students and maintain trust in AI-assisted guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="space-y-1.5">
            <h4 className="font-bold text-[#20334A] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>No Fabricated Information</span>
            </h4>
            <p className="text-[#64748B] leading-relaxed">
              If an official notice has not announced a cut-off percentage or deadline, we label it as "Information not available" rather than inventing estimates.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-[#20334A] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#2878D4]" />
              <span>Honest "Unknown" States</span>
            </h4>
            <p className="text-[#64748B] leading-relaxed">
              We never issue false rejections or approvals. If you haven't entered your household income or marks, we clearly flag it as "Unknown" with advice on how to verify.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-[#20334A] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0F8A83]" />
              <span>Preliminary Evaluation Only</span>
            </h4>
            <p className="text-[#64748B] leading-relaxed">
              SANGAM is an accessibility tool, not an issuing authority. Final selection and verification rest entirely with official institutions.
            </p>
          </div>

          <div className="space-y-1.5">
            <h4 className="font-bold text-[#20334A] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#554DB5]" />
              <span>Inclusive Multi-Language & Voice</span>
            </h4>
            <p className="text-[#64748B] leading-relaxed">
              Designed for first-generation college students and diverse linguistic communities across India with high-contrast, scalable text, and voice audio.
            </p>
          </div>
        </div>

        {/* Official Disclaimer Box */}
        <div className="p-4 bg-[#FAFCFF] border border-[#E2EBF5] rounded-2xl text-xs text-[#64748B] leading-relaxed">
          <span className="font-bold text-[#20334A] block mb-1">
            Mandatory Advisory Disclaimer:
          </span>
          "AI-assisted preliminary evaluation. Verify all requirements with the official issuing authority. SANGAM does not collect application fees or guarantee selection."
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-8 bg-gradient-to-r from-[#2878D4] to-[#1F63B4] text-white rounded-3xl shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold">Ready to understand an opportunity?</h3>
          <p className="text-xs text-[#EAF5FF]">
            Upload or paste any circular notice to get started in seconds.
          </p>
        </div>
        <Link
          to="/"
          className="px-6 py-3 bg-white text-[#2878D4] font-bold rounded-xl text-xs sm:text-sm hover:bg-[#EAF5FF] transition-colors shadow-xs"
        >
          Try SANGAM Now
        </Link>
      </div>

    </div>
  );
};
