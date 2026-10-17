export type OpportunityCategory = 
  | 'Scholarship' 
  | 'Internship' 
  | 'Hackathon' 
  | 'Competition' 
  | 'Training' 
  | 'Fellowship';

export type EvaluationStatus = 'satisfied' | 'not_satisfied' | 'unknown';

export interface DetailedRequirement {
  id: string;
  criterion: string;
  simpleExplanation: string;
  sourceQuote?: string;
  field: 'age' | 'educationLevel' | 'fieldOfStudy' | 'enrollmentStatus' | 'gpaOrMarks' | 'income' | 'gender' | 'categoryQuota' | 'location';
  operator: 'eq' | 'gte' | 'lte' | 'in' | 'contains';
  targetValue: any;
}

export interface ApplicationStep {
  stepNumber: number;
  title: string;
  instruction: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: OpportunityCategory;
  description: string; // Original official notice
  simplifiedDescription: string; // SANGAM Plain Language AI Simplification
  deadline: string; // e.g., '2026-11-30'
  deadlineDaysRemaining: number;
  eligibilityHighlights: string[];
  detailedEligibility: DetailedRequirement[];
  benefits: string[];
  requiredEducation: string;
  fieldOfStudy: string[];
  location: string;
  requiredDocuments: string[];
  applicationSteps: ApplicationStep[];
  officialSourceUrl: string | null;
  unclearWarnings?: string[];
  isDemonstration: boolean;
  tags: string[];
}

export interface UserProfileInput {
  age?: number | null;
  educationLevel: string;
  fieldOfStudy: string;
  enrollmentStatus: string; // '1st Year' | '2nd Year' | '3rd Year' | 'Final Year' | 'Graduated' | 'Any'
  gpaOrMarks?: number | null;
  gpaScale: 'percentage' | 'gpa10' | 'gpa4';
  annualFamilyIncome?: number | null; // In INR
  gender?: string; // 'Male' | 'Female' | 'Other' | 'Prefer not to say'
  categoryQuota?: string; // 'General' | 'OBC' | 'SC' | 'ST' | 'EWS'
  location?: string;
}

export interface EvaluatedRequirement {
  id: string;
  requirementSimple: string;
  status: EvaluationStatus;
  explanation: string;
  sourceQuote?: string | null;
  userEvidence?: string | null;
}

export interface EligibilityResult {
  opportunityId: string;
  opportunityTitle: string;
  overallSummary: {
    satisfiedCount: number;
    notSatisfiedCount: number;
    unknownCount: number;
    totalCount: number;
    fitVerdict: 'High Fit' | 'Partial Fit' | 'Action Required' | 'More Info Needed';
  };
  requirements: EvaluatedRequirement[];
  actionableNextSteps: string[];
  disclaimer: string;
}

export interface ExtractedOpportunityResult {
  title: string;
  organization: string;
  category: OpportunityCategory;
  simplifiedSummary: string;
  keyEligibility: string[];
  deadlines: {
    applicationDeadline: string;
    announcementDate?: string;
  };
  benefits: string[];
  requiredDocuments: string[];
  officialLink: string | null;
  unclearOrMissingWarnings: string[];
  confidenceScore: number;
}

export interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  audioState?: 'idle' | 'playing' | 'paused';
  timestamp: string;
  suggestedPrompts?: string[];
}

export type SupportedLanguage = 'en' | 'hi' | 'te' | 'ta' | 'mr';

export type FontScale = 'normal' | 'large' | 'xlarge';

export interface ActionPlanMilestone {
  id: string;
  title: string;
  deadline: string;
  completed: boolean;
  notes?: string;
}

export interface ActionPlanItem {
  id: string;
  category: 'document' | 'application' | 'verification';
  title: string;
  description: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ActionPlan {
  opportunityTitle: string;
  deadline: string;
  milestones: ActionPlanMilestone[];
  checklist: ActionPlanItem[];
  tips: string[];
}

export interface AccessibilitySettings {
  fontSize: FontScale;
  highContrast: boolean;
  selectedLanguage: SupportedLanguage;
}


