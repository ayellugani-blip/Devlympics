import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Award,
  GraduationCap,
  Building2,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import type { Opportunity } from '../../types';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity }) => {
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Scholarship':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Internship':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Hackathon':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Competition':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Training':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Fellowship':
        return 'bg-[#EAF5FF] text-[#2878D4] border-[#CBE0F4]';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="sangam-card p-5 sm:p-6 flex flex-col justify-between group hover:border-[#CBE0F4]">
      <div>
        {/* Header: Category Badge and Deadline Countdown */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${getCategoryStyles(
              opportunity.category
            )}`}
          >
            {opportunity.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B] bg-[#FAFCFF] px-2.5 py-0.5 rounded-full border border-[#E2EBF5]">
            <Calendar className="w-3.5 h-3.5 text-[#62B6F5]" />
            <span>
              {opportunity.deadlineDaysRemaining > 0
                ? `${opportunity.deadlineDaysRemaining} days left`
                : 'Closing Soon'}
            </span>
          </div>
        </div>

        {/* Opportunity Title & Organization */}
        <h3 className="text-lg font-bold text-[#20334A] group-hover:text-[#2878D4] transition-colors leading-snug mb-1.5">
          <Link to={`/opportunity/${opportunity.id}`} className="focus:outline-hidden">
            {opportunity.title}
          </Link>
        </h3>
        
        <div className="flex items-center gap-1.5 text-xs text-[#64748B] mb-3.5">
          <Building2 className="w-3.5 h-3.5 text-[#62B6F5] shrink-0" />
          <span className="font-medium line-clamp-1">{opportunity.organization}</span>
        </div>

        {/* Plain Language Simplified Summary */}
        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-4 line-clamp-3">
          {opportunity.simplifiedDescription}
        </p>

        {/* Benefits Pill */}
        {opportunity.benefits && opportunity.benefits.length > 0 && (
          <div className="mb-4 bg-[#EAF5FF]/70 border border-[#CBE0F4] rounded-lg p-2.5 flex items-start gap-2">
            <Award className="w-4 h-4 text-[#2878D4] shrink-0 mt-0.5" />
            <div className="text-xs text-[#20334A] font-medium">
              <span className="font-bold text-[#2878D4]">Key Benefit:</span> {opportunity.benefits[0]}
            </div>
          </div>
        )}

        {/* Eligibility Highlights */}
        <div className="space-y-1.5 mb-5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            Eligibility Highlights
          </div>
          {opportunity.eligibilityHighlights.slice(0, 3).map((highlight, index) => (
            <div key={index} className="flex items-center gap-2 text-xs text-[#64748B]">
              <CheckCircle className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
              <span className="line-clamp-1">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Meta & Actions */}
      <div className="pt-4 border-t border-[#E2EBF5] mt-auto">
        <div className="flex items-center justify-between text-xs text-[#64748B] mb-3">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-[#62B6F5]" />
            <span className="line-clamp-1">{opportunity.requiredEducation}</span>
          </div>
          <span className="text-[11px] font-mono text-[#64748B]">
            Due: {opportunity.deadline}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            to={`/opportunity/${opportunity.id}`}
            className="inline-flex items-center justify-center px-3 py-2 text-xs font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer hover:shadow-xs"
          >
            View Details
          </Link>
          <Link
            to={`/eligibility?opportunity=${opportunity.id}`}
            className="sangam-gradient-btn inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl text-white shadow-md shadow-indigo-500/20 cursor-pointer"
          >
            <span>Check Fit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
