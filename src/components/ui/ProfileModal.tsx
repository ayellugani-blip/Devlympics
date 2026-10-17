import React, { useState } from 'react';
import { X, User, CheckCircle2, Sliders, GraduationCap, DollarSign, BookOpen, Save, Sparkles } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useUser } from '../../context/UserContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose
}) => {
  const { selectedLanguage } = useAccessibility();
  const { profile, updateProfile, pastUsage } = useUser();

  const [formData, setFormData] = useState({
    name: profile.name,
    educationLevel: profile.educationLevel,
    fieldOfStudy: profile.fieldOfStudy,
    gpaOrMarks: profile.gpaOrMarks,
    annualFamilyIncome: profile.annualFamilyIncome,
    categoryQuota: profile.categoryQuota
  });

  const [isEditing, setIsEditing] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  // Sync state if profile prop changes
  React.useEffect(() => {
    setFormData({
      name: profile.name,
      educationLevel: profile.educationLevel,
      fieldOfStudy: profile.fieldOfStudy,
      gpaOrMarks: profile.gpaOrMarks,
      annualFamilyIncome: profile.annualFamilyIncome,
      categoryQuota: profile.categoryQuota
    });
  }, [profile]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      className="fixed inset-0 z-50 bg-[#0F172A]/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white/95 backdrop-blur-xl border border-indigo-100 rounded-3xl max-w-lg w-full shadow-2xl shadow-indigo-500/10 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 text-left">
        
        {/* Radiant Gradient Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner">
              <User className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="profile-modal-title" className="text-lg font-extrabold tracking-tight">
                  Candidate Profile & Activity
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold text-white tracking-wide uppercase">
                  Active
                </span>
              </div>
              <p className="text-xs text-blue-100 font-medium">
                Personalizes your welcome greeting & 3-state eligibility matching
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close Profile Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {savedNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Profile updated! Welcoming greeting and eligibility results are now personalized.</span>
            </div>
          )}

          {!isEditing ? (
            <div className="space-y-4">
              {/* User Identity Highlight */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-cyan-50/50 border border-indigo-100 rounded-2xl">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block mb-0.5">
                    Candidate Name
                  </span>
                  <span className="text-base font-extrabold text-[#0F172A]">
                    {profile.name}
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    {profile.fieldOfStudy}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-indigo-700 bg-white px-3 py-1 rounded-full border border-indigo-200 shadow-2xs">
                    {pastUsage.noticesAnalyzedCount} Notices Checked
                  </span>
                </div>
              </div>

              {/* Grid of Profile Attributes */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50/80 border border-slate-200/80 rounded-xl">
                  <span className="text-slate-500 text-[11px] block flex items-center gap-1.5 mb-1 font-medium">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                    Education Level
                  </span>
                  <span className="font-bold text-[#0F172A]">{profile.educationLevel}</span>
                </div>

                <div className="p-3 bg-slate-50/80 border border-slate-200/80 rounded-xl">
                  <span className="text-slate-500 text-[11px] block flex items-center gap-1.5 mb-1 font-medium">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    Field of Study
                  </span>
                  <span className="font-bold text-[#0F172A] truncate block">{profile.fieldOfStudy}</span>
                </div>

                <div className="p-3 bg-slate-50/80 border border-slate-200/80 rounded-xl">
                  <span className="text-slate-500 text-[11px] block flex items-center gap-1.5 mb-1 font-medium">
                    <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                    Current Marks / GPA
                  </span>
                  <span className="font-bold text-emerald-700">{profile.gpaOrMarks}%</span>
                </div>

                <div className="p-3 bg-slate-50/80 border border-slate-200/80 rounded-xl">
                  <span className="text-slate-500 text-[11px] block flex items-center gap-1.5 mb-1 font-medium">
                    <DollarSign className="w-3.5 h-3.5 text-cyan-600" />
                    Family Annual Income
                  </span>
                  <span className="font-bold text-[#0F172A]">₹{profile.annualFamilyIncome.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Past Usage Summary Bar */}
              <div className="p-3.5 bg-gradient-to-r from-indigo-50/60 to-purple-50/60 border border-indigo-100 rounded-2xl flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-indigo-900 block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    SANGAM Past Usage Overview
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {pastUsage.eligibleMatchesCount} eligible opportunities matched &bull; {pastUsage.savedDeadlinesCount} deadlines tracking
                  </span>
                </div>
                <span className="font-bold uppercase text-indigo-600 bg-white px-2.5 py-1 rounded-lg border border-indigo-200 shadow-2xs">
                  {selectedLanguage}
                </span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Your Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-sm font-semibold"
                  placeholder="e.g. Arun Kumar"
                  required
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Displayed on the home page welcoming greeting and sidebar.
                </span>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Education Level</label>
                <select
                  value={formData.educationLevel}
                  onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-600 bg-white"
                >
                  <option value="Senior Secondary (Class 11 / 12)">Senior Secondary (Class 11 / 12)</option>
                  <option value="Undergraduate (1st / 2nd Year)">Undergraduate (1st / 2nd Year)</option>
                  <option value="Undergraduate (Final Year)">Undergraduate (Final Year)</option>
                  <option value="Postgraduate / PhD">Postgraduate / PhD</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Field of Study / Branch</label>
                <input
                  type="text"
                  value={formData.fieldOfStudy}
                  onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-600"
                  placeholder="e.g. Computer Science, Mechanical Engineering, Commerce..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Marks / Percentile (%)</label>
                  <input
                    type="number"
                    min="40"
                    max="100"
                    value={formData.gpaOrMarks}
                    onChange={(e) => setFormData({ ...formData, gpaOrMarks: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-600"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Family Income (₹/yr)</label>
                  <input
                    type="number"
                    min="50000"
                    step="10000"
                    value={formData.annualFamilyIncome}
                    onChange={(e) => setFormData({ ...formData, annualFamilyIncome: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-600"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold cursor-pointer shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save & Update Welcome
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-500">
            Stored locally in your browser
          </span>
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold transition-all shadow-xs cursor-pointer"
            >
              Edit Profile & Name
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
