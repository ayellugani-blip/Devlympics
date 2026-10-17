import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Upload,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Building2,
  FileCheck,
  X
} from 'lucide-react';
import { sangamApi } from '../services/api';
import type { ExtractedOpportunityResult } from '../types';

export const UploadSimplifyPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStage, setProcessingStage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [extractedResult, setExtractedResult] = useState<ExtractedOpportunityResult | null>(null);
  const [isLiveBackendResponse, setIsLiveBackendResponse] = useState<boolean>(false);

  const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

  const validateAndSetFile = (file: File) => {
    setErrorMessage(null);
    const validTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/webp'
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(pdf|jpe?g|png|webp)$/i)) {
      setErrorMessage('Unsupported file type. Please upload a PDF, JPG, PNG, or WebP document.');
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(`File exceeds the 10 MB size limit (Selected file is ${(file.size / (1024 * 1024)).toFixed(1)} MB).`);
      return;
    }

    setUploadedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleProcess = async () => {
    if (!uploadedFile && !pastedText.trim()) {
      setErrorMessage('Please either upload a document or paste circular text to decode.');
      return;
    }

    setErrorMessage(null);
    setIsProcessing(true);
    setUploadProgress(15);
    setProcessingStage('Reading document structure...');

    // Simulate multi-stage visual progress
    const timer1 = setTimeout(() => {
      setUploadProgress(45);
      setProcessingStage('Parsing legal clauses & eligibility rules...');
    }, 600);

    const timer2 = setTimeout(() => {
      setUploadProgress(80);
      setProcessingStage('Generating plain-language translation & extracting dates...');
    }, 1200);

    try {
      const response = await sangamApi.extractOpportunity(uploadedFile, pastedText);
      
      setTimeout(() => {
        setUploadProgress(100);
        setExtractedResult(response.data);
        setIsLiveBackendResponse(response.isLiveBackend);
        setIsProcessing(false);
      }, 1800);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to extract opportunity details.');
      setIsProcessing(false);
    }
  };

  const loadSampleNotice = (sampleType: 'scholarship' | 'gsoc' | 'hackathon') => {
    setUploadedFile(null);
    setErrorMessage(null);
    setExtractedResult(null);

    if (sampleType === 'scholarship') {
      setPastedText(`Ministry of Education & National Scholarship Portal (NSP)
Circular No: NSP/HE/2026/08
Subject: Central Sector Scheme of Scholarship for College and University Students.
The Department of Higher Education invites online applications from meritorious students who have scored above the 80th percentile in the relevant Class XII Board Examinations. 
Applicants must be pursuing regular, full-time undergraduate courses in recognized institutions. Total parental annual income must not exceed Rs. 4,50,000/-.
Scholarship amount: Rs. 12,000 per annum for graduation.
Last date for online submission: 30 November 2026.`);
    } else if (sampleType === 'gsoc') {
      setPastedText(`Google Summer of Code 2026 Official Program Guidelines.
Google Open Source Programs Office invites developers aged 18+ to submit proposals for participating open source mentoring organizations.
Selected contributors receive stipends between $1,500 and $3,300 upon satisfactory milestone completion.
Application period closes: April 14, 2026.`);
    } else {
      setPastedText(`Smart India Hackathon (SIH) 2026 Guidelines.
Organized by AICTE & Ministry of Education Innovation Cell.
Open to registered teams of 6 undergraduate/postgraduate students with mandatory female participation.
Winning team per problem statement awarded Rs. 1,00,000 cash prize.
Deadline for institute nomination and idea submission: 20 September 2026.`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 text-left">
      
      {/* Header */}
      <div className="mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2878D4] bg-[#EAF5FF] px-2.5 py-1 rounded-md border border-[#CBE0F4]">
          <Sparkles className="w-3.5 h-3.5 text-[#2878D4]" />
          <span>Intelligent Document Understanding</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#20334A] tracking-tight">
          Upload & Simplify Any Notice
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] max-w-2xl">
          Have an official circular, PDF announcement, or flyer? Upload it here. SANGAM extracts deadlines, requirements, and benefits into simple human language.
        </p>
      </div>

      {/* Main Upload Card */}
      <div className="sangam-card p-6 sm:p-8 space-y-6">
        
        {/* Sample Notices Quick Test Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">
            Quick Test Samples:
          </span>
          <button
            type="button"
            onClick={() => loadSampleNotice('scholarship')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#EAF5FF] hover:bg-[#D5EAFE] text-[#2878D4] border border-[#CBE0F4] transition-colors cursor-pointer"
          >
            National Merit Scholarship Notice
          </button>
          <button
            type="button"
            onClick={() => loadSampleNotice('gsoc')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#E8F9F8] hover:bg-[#D1F3F1] text-[#0F8A83] border border-[#72D6D0]/40 transition-colors cursor-pointer"
          >
            Google Summer of Code Guidelines
          </button>
          <button
            type="button"
            onClick={() => loadSampleNotice('hackathon')}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#E8E6FF] hover:bg-[#D8D4FF] text-[#554DB5] border border-[#D5D1FF] transition-colors cursor-pointer"
          >
            Smart India Hackathon Announcement
          </button>
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-[#2878D4] bg-[#EAF5FF]/60 scale-[1.01]'
              : 'border-[#E2EBF5] hover:border-[#62B6F5] bg-[#FAFCFF]'
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

          <div className="w-14 h-14 rounded-2xl bg-[#EAF5FF] text-[#2878D4] border border-[#CBE0F4] flex items-center justify-center mx-auto mb-3 shadow-2xs">
            <Upload className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <span className="text-sm font-bold text-[#20334A] block">
              {uploadedFile ? uploadedFile.name : 'Click to select or drag and drop your notice'}
            </span>
            <p className="text-xs text-[#64748B]">
              Supports PDF, JPG, PNG, and WebP (up to 10 MB)
            </p>
          </div>

          {uploadedFile && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>{(uploadedFile.size / 1024).toFixed(0)} KB ready to decode</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setUploadedFile(null);
                }}
                className="text-slate-400 hover:text-slate-600 p-0.5 ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* OR Divider */}
        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-[#64748B]">
          <div className="flex-1 border-t border-[#E2EBF5]" />
          <span>Or Paste Announcement Text</span>
          <div className="flex-1 border-t border-[#E2EBF5]" />
        </div>

        {/* Pasted Textarea */}
        <div>
          <textarea
            rows={5}
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste raw notice text, WhatsApp circular, eligibility criteria, or guidelines here..."
            className="w-full p-4 rounded-xl border border-[#E2EBF5] bg-[#FAFCFF] text-xs sm:text-sm text-[#20334A] focus:outline-hidden focus:border-[#2878D4] focus:bg-white leading-relaxed placeholder:text-[#64748B]"
          />
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-rose-700">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Progress Bar (during extraction) */}
        {isProcessing && (
          <div className="space-y-2 p-4 bg-[#EAF5FF] border border-[#CBE0F4] rounded-xl">
            <div className="flex items-center justify-between text-xs font-semibold text-[#20334A]">
              <span className="flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2878D4]" />
                <span>{processingStage}</span>
              </span>
              <span className="text-[#2878D4] font-bold">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-[#D5EAFE] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#2878D4] h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-[#64748B] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Information is processed locally or via secure endpoint.</span>
          </div>

          <button
            type="button"
            onClick={handleProcess}
            disabled={isProcessing || (!uploadedFile && !pastedText.trim())}
            className="sangam-gradient-btn inline-flex items-center gap-2 px-6 py-2.5 text-white rounded-xl text-xs font-bold cursor-pointer shadow-md shadow-indigo-500/20 disabled:opacity-40"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isProcessing ? 'Simplifying...' : 'Simplify & Extract Details'}</span>
          </button>
        </div>

      </div>

      {/* Extracted Structured Results View */}
      {extractedResult && (
        <div className="mt-8 sangam-card p-6 sm:p-8 space-y-6 border-[#CBE0F4] animate-in fade-in duration-300">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2EBF5]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                Successfully Decoded
              </span>
              <h2 className="text-2xl font-extrabold text-[#20334A] mt-1">
                {extractedResult.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-[#64748B] mt-1">
                <Building2 className="w-3.5 h-3.5 text-[#64748B]" />
                <span>{extractedResult.organization}</span>
                <span className="text-slate-300">•</span>
                <span className="font-semibold text-[#2878D4]">{extractedResult.category}</span>
              </div>
            </div>

            <div className="text-xs text-[#64748B] bg-[#FAFCFF] px-3 py-1.5 rounded-xl border border-[#E2EBF5]">
              {isLiveBackendResponse ? '🟢 SANGAM FastAPI Backend' : '🔷 Demonstration Engine'}
            </div>
          </div>

          {/* Plain-Language Summary */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2878D4] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#2878D4]" />
              <span>SANGAM Plain-Language Explanation</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#20334A] leading-relaxed font-normal bg-[#EAF5FF]/50 p-4 rounded-xl border border-[#CBE0F4]">
              {extractedResult.simplifiedSummary}
            </p>
          </div>

          {/* Deadlines & Key Dates */}
          <div className="p-4 bg-[#FAFCFF] border border-[#E2EBF5] rounded-xl flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-medium text-[#20334A]">
              <Calendar className="w-4 h-4 text-[#2878D4]" />
              <span>Application Deadline:</span>
              <span className="font-bold text-[#20334A]">
                {extractedResult.deadlines.applicationDeadline}
              </span>
            </div>
            {extractedResult.deadlines.announcementDate && (
              <span className="text-xs text-[#64748B]">
                Results: {extractedResult.deadlines.announcementDate}
              </span>
            )}
          </div>

          {/* Key Eligibility Criteria */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Extracted Eligibility Criteria
            </h3>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
              {extractedResult.keyEligibility.map((crit, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-white border border-slate-200 p-2.5 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{crit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Benefits & Grants
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {extractedResult.benefits.map((b, i) => (
                <div key={i} className="p-2.5 bg-emerald-50/50 border border-emerald-100 rounded-lg text-xs font-medium text-emerald-900">
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Required Documents Checklist */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Required Documents
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {extractedResult.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2">
                  <span className="text-teal-600 font-bold">✓</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Unclear Warnings if any */}
          {extractedResult.unclearOrMissingWarnings.length > 0 && (
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Notice Information Gaps</span>
              </span>
              {extractedResult.unclearOrMissingWarnings.map((warn, i) => (
                <p key={i} className="text-xs text-amber-800">
                  {warn}
                </p>
              ))}
            </div>
          )}

          {/* Actions on Extracted Notice */}
          <div className="pt-4 border-t border-[#E2EBF5] flex flex-wrap items-center justify-between gap-3">
            {extractedResult.officialLink && (
              <a
                href={extractedResult.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#20334A]"
              >
                <span>Official Source Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <Link
              to="/eligibility"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2878D4] hover:bg-[#1F63B4] text-white rounded-xl text-xs font-bold transition-colors shadow-xs ml-auto"
            >
              <span>Check My Eligibility for this Notice</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      )}

    </div>
  );
};
