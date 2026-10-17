import type {
  Opportunity,
  UserProfileInput,
  EligibilityResult,
  EvaluatedRequirement,
  EvaluationStatus,
  ExtractedOpportunityResult,
  ActionPlan,
  ActionPlanItem
} from '../types';
import { SAMPLE_OPPORTUNITIES } from '../data/opportunities';

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:8000/api';

export interface BackendStatus {
  isAvailable: boolean;
  checked: boolean;
  message: string;
}

class SangamApiService {
  private cachedStatus: BackendStatus = {
    isAvailable: false,
    checked: false,
    message: 'Checking connection...'
  };

  /**
   * Health Check: GET /api/health
   */
  async checkHealth(): Promise<BackendStatus> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000); // Fast 2s timeout

      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        this.cachedStatus = {
          isAvailable: true,
          checked: true,
          message: 'Connected to SANGAM Intelligence Backend'
        };
      } else {
        this.cachedStatus = {
          isAvailable: false,
          checked: true,
          message: 'Backend server returned non-200. Operating in Standalone Demonstration Mode.'
        };
      }
    } catch {
      this.cachedStatus = {
        isAvailable: false,
        checked: true,
        message: 'Standalone Demonstration Mode (Ready for backend connection at ' + API_BASE_URL + ')'
      };
    }
    return this.cachedStatus;
  }

  getBackendStatus(): BackendStatus {
    return this.cachedStatus;
  }

  /**
   * Document Extraction: POST /api/opportunity/extract
   * Accepts multipart/form-data for files or JSON for text.
   */
  async extractOpportunity(
    file?: File | null,
    pastedText?: string
  ): Promise<{ data: ExtractedOpportunityResult; isLiveBackend: boolean }> {
    // 1. Try real backend first if candidate parameters exist
    try {
      const formData = new FormData();
      let hasData = false;

      if (file) {
        formData.append('file', file);
        hasData = true;
      }
      if (pastedText && pastedText.trim().length > 0) {
        formData.append('text', pastedText);
        hasData = true;
      }

      if (hasData) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(`${API_BASE_URL}/opportunity/extract`, {
          method: 'POST',
          body: formData,
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const json = await response.json();
          this.cachedStatus.isAvailable = true;
          return { data: json, isLiveBackend: true };
        }
      }
    } catch {
      // Backend unavailable or timed out; proceed to transparent client-side demo parser
    }

    // 2. Intelligent, deterministic demonstration fallback with realistic document parsing
    const simulatedResult = this.parseDocumentLocally(file, pastedText);
    return { data: simulatedResult, isLiveBackend: false };
  }

  /**
   * Client-side deterministic parser for demonstration
   */
  private parseDocumentLocally(
    file?: File | null,
    text?: string
  ): ExtractedOpportunityResult {
    const rawContent = (text || file?.name || '').toLowerCase();

    if (rawContent.includes('google') || rawContent.includes('gsoc') || rawContent.includes('code')) {
      return {
        title: 'Google Summer of Code (GSoC) 2026',
        organization: 'Google Open Source Programs Office',
        category: 'Internship',
        simplifiedSummary: 'A 12-week remote open source programming program for students and beginners. Mentored by experienced open-source maintainers with a milestone stipend of up to $3,300.',
        keyEligibility: [
          'Age 18 years or older as of project registration',
          'Beginner or newcomer to open source software contributions',
          'Eligible to receive online international stipend in country of residence'
        ],
        deadlines: {
          applicationDeadline: '2026-04-14',
          announcementDate: '2026-05-01'
        },
        benefits: [
          'Direct mentorship from open source developers',
          'Milestone-based international stipend (~₹1,50,000 - ₹2,80,000)',
          'Global industry credential'
        ],
        requiredDocuments: [
          'Official Government Photo ID',
          'Written Technical Project Proposal adhering to organization format',
          'GitHub or GitLab repository activity proof'
        ],
        officialLink: 'https://summerofcode.withgoogle.com',
        unclearOrMissingWarnings: [
          'Stipend amount may vary slightly depending on purchasing power parity updates for 2026.'
        ],
        confidenceScore: 0.94
      };
    }

    if (rawContent.includes('hackathon') || rawContent.includes('sih') || rawContent.includes('smart india')) {
      return {
        title: 'Smart India Hackathon (SIH) 2026',
        organization: 'Ministry of Education Innovation Cell & AICTE',
        category: 'Hackathon',
        simplifiedSummary: 'A nationwide collegiate hackathon where college teams of 6 students solve practical problem statements issued by government ministries and PSUs for ₹1,00,000 prizes.',
        keyEligibility: [
          'Enrolled in AICTE or UGC recognized institution',
          'Team must consist of exactly 6 students from the same college',
          'Mandatory at least 1 female teammate'
        ],
        deadlines: {
          applicationDeadline: '2026-09-20',
          announcementDate: '2026-10-15'
        },
        benefits: [
          '₹1,00,000 Cash Prize per problem statement',
          'Incubation and central government prototype grants',
          'Travel allowance for Grand Finale nodal centres'
        ],
        requiredDocuments: [
          'College Bonafide Certificate with Principal Seal',
          'Valid Student Identity Cards for all 6 members',
          'SIH Idea PPT presentation'
        ],
        officialLink: 'https://sih.gov.in',
        unclearOrMissingWarnings: [
          'The official list of hardware problem statements will be published in late August.'
        ],
        confidenceScore: 0.92
      };
    }

    // Default parsed document structure: National Merit Scholarship
    return {
      title: 'National Merit Scholarship for Higher Education 2026',
      organization: 'Ministry of Education & National Scholarship Portal',
      category: 'Scholarship',
      simplifiedSummary: 'Central government scholarship supporting undergraduate students who achieved above 80th percentile in Class 12 board examinations and belong to families earning under ₹4.5 Lakhs/year.',
      keyEligibility: [
        'Class 12th Board score in top 20th percentile (approx. 80%+)',
        'Annual household income does not exceed ₹4,50,000',
        'Enrolled in full-time regular undergraduate degree'
      ],
      deadlines: {
        applicationDeadline: '2026-11-30',
        announcementDate: '2026-12-20'
      },
      benefits: [
        '₹12,000 per year for 3-year Undergraduate degree',
        '₹20,000 per year for Postgraduate courses',
        'Direct Benefit Transfer (DBT) directly into student bank account'
      ],
      requiredDocuments: [
        'Class 12 Marksheet & Passing Certificate',
        'Income Certificate from competent Revenue Authority (Tehsildar)',
        'College Bonafide Student Certificate with AISHE Code',
        'Aadhaar Card linked to active bank account'
      ],
      officialLink: 'https://scholarships.gov.in',
      unclearOrMissingWarnings: [
        'Official renewal quotas for 2026 are subject to annual state-wise allocations.'
      ],
      confidenceScore: 0.96
    };
  }

  /**
   * Evaluate Eligibility: POST /api/eligibility/evaluate
   * Evaluates user profile against opportunity requirements.
   * Uses strictly 3 statuses: 'satisfied' | 'not_satisfied' | 'unknown'.
   */
  async evaluateEligibility(
    opportunityId: string,
    profile: UserProfileInput
  ): Promise<{ data: EligibilityResult; isLiveBackend: boolean }> {
    // 1. Try real backend first if candidate exists
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(`${API_BASE_URL}/eligibility/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ opportunity_id: opportunityId, user_profile: profile }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const json = await response.json();
        return { data: json, isLiveBackend: true };
      }
    } catch {
      // Backend not running; evaluate with deterministic client engine
    }

    // 2. Deterministic 3-state evaluation logic
    const opp = SAMPLE_OPPORTUNITIES.find((o) => o.id === opportunityId) || SAMPLE_OPPORTUNITIES[0];
    const evaluatedRequirements: EvaluatedRequirement[] = [];

    let satisfiedCount = 0;
    let notSatisfiedCount = 0;
    let unknownCount = 0;

    for (const req of opp.detailedEligibility) {
      let status: EvaluationStatus = 'unknown';
      let explanation = '';
      let userEvidence: string | null = null;

      if (req.field === 'gpaOrMarks') {
        if (profile.gpaOrMarks !== null && profile.gpaOrMarks !== undefined && !isNaN(profile.gpaOrMarks)) {
          // Normalize to percentage
          let marksVal = profile.gpaOrMarks;
          if (profile.gpaScale === 'gpa10') marksVal = marksVal * 9.5;
          if (profile.gpaScale === 'gpa4') marksVal = (marksVal / 4) * 100;

          userEvidence = `${profile.gpaOrMarks} (${profile.gpaScale === 'percentage' ? '%' : profile.gpaScale})`;

          if (marksVal >= req.targetValue) {
            status = 'satisfied';
            explanation = `Your score of ${userEvidence} meets or exceeds the required threshold of ${req.targetValue}%.`;
          } else {
            status = 'not_satisfied';
            explanation = `Your recorded score of ${userEvidence} is below the requirement of ${req.targetValue}%.`;
          }
        } else {
          status = 'unknown';
          explanation = 'Academic marks or GPA was not provided in your profile. Please enter your marks to confirm.';
          userEvidence = 'Not provided';
        }
      } else if (req.field === 'income') {
        if (profile.annualFamilyIncome !== null && profile.annualFamilyIncome !== undefined && !isNaN(profile.annualFamilyIncome)) {
          userEvidence = `₹${profile.annualFamilyIncome.toLocaleString('en-IN')} / year`;
          if (profile.annualFamilyIncome <= req.targetValue) {
            status = 'satisfied';
            explanation = `Your household income of ${userEvidence} is within the maximum limit of ₹${req.targetValue.toLocaleString('en-IN')}.`;
          } else {
            status = 'not_satisfied';
            explanation = `Your household income of ${userEvidence} exceeds the upper cap of ₹${req.targetValue.toLocaleString('en-IN')}.`;
          }
        } else {
          status = 'unknown';
          explanation = 'Annual family income was not provided. An official income certificate is needed to verify this.';
          userEvidence = 'Not provided';
        }
      } else if (req.field === 'enrollmentStatus') {
        if (profile.enrollmentStatus && profile.enrollmentStatus !== 'Any') {
          userEvidence = profile.enrollmentStatus;
          if (Array.isArray(req.targetValue) && req.targetValue.includes(profile.enrollmentStatus)) {
            status = 'satisfied';
            explanation = `Your enrolment status (${userEvidence}) is eligible for this opportunity.`;
          } else if (req.targetValue === profile.enrollmentStatus) {
            status = 'satisfied';
            explanation = `Enrolled status matches the required term (${req.targetValue}).`;
          } else {
            status = 'not_satisfied';
            explanation = `This opportunity requires candidates in ${Array.isArray(req.targetValue) ? req.targetValue.join(', ') : req.targetValue}, but your status is ${userEvidence}.`;
          }
        } else {
          status = 'unknown';
          explanation = 'Year of study or enrolment status is not specified.';
          userEvidence = 'Not provided';
        }
      } else if (req.field === 'age') {
        if (profile.age !== null && profile.age !== undefined && !isNaN(profile.age)) {
          userEvidence = `${profile.age} years`;
          if (profile.age >= req.targetValue) {
            status = 'satisfied';
            explanation = `Age of ${userEvidence} satisfies the minimum requirement of ${req.targetValue} years.`;
          } else {
            status = 'not_satisfied';
            explanation = `Age of ${userEvidence} is under the required minimum of ${req.targetValue} years.`;
          }
        } else {
          status = 'unknown';
          explanation = 'Age was not specified in your profile.';
          userEvidence = 'Not provided';
        }
      } else if (req.field === 'gender') {
        if (profile.gender) {
          userEvidence = profile.gender;
          if (req.targetValue === 'Female' && profile.gender === 'Female') {
            status = 'satisfied';
            explanation = 'Requirement for female applicant is satisfied.';
          } else if (req.targetValue === 'Any') {
            status = 'satisfied';
            explanation = 'Open to all genders.';
          } else if (req.targetValue === 'Female' && profile.gender !== 'Female') {
            status = 'not_satisfied';
            explanation = 'This opportunity is reserved specifically for women applicants.';
          } else {
            status = 'satisfied';
            explanation = 'Gender criteria met.';
          }
        } else {
          status = 'unknown';
          explanation = 'Gender details not specified.';
          userEvidence = 'Not provided';
        }
      } else if (req.field === 'fieldOfStudy') {
        if (profile.fieldOfStudy) {
          userEvidence = profile.fieldOfStudy;
          const userLower = profile.fieldOfStudy.toLowerCase();
          const targetList: string[] = Array.isArray(req.targetValue) ? req.targetValue : [req.targetValue];
          const matches = targetList.some((t) => t.toLowerCase().includes(userLower) || userLower.includes(t.toLowerCase()) || t.toLowerCase() === 'any general degree' || t.toLowerCase() === 'all engineering branches');

          if (matches) {
            status = 'satisfied';
            explanation = `Your discipline (${userEvidence}) aligns with the target fields of study.`;
          } else {
            status = 'unknown';
            explanation = `Your discipline (${userEvidence}) may need case-by-case review against accepted branches (${targetList.slice(0, 3).join(', ')}).`;
          }
        } else {
          status = 'unknown';
          explanation = 'Field of study not specified.';
          userEvidence = 'Not provided';
        }
      } else {
        status = 'unknown';
        explanation = 'Additional document verification is needed for this specific condition.';
      }

      if (status === 'satisfied') satisfiedCount++;
      else if (status === 'not_satisfied') notSatisfiedCount++;
      else unknownCount++;

      evaluatedRequirements.push({
        id: req.id,
        requirementSimple: req.simpleExplanation,
        status,
        explanation,
        sourceQuote: req.sourceQuote || null,
        userEvidence: userEvidence || 'Not provided in profile'
      });
    }

    // Determine verdict
    let fitVerdict: 'High Fit' | 'Partial Fit' | 'Action Required' | 'More Info Needed' = 'High Fit';
    if (notSatisfiedCount > 0) {
      fitVerdict = 'Action Required';
    } else if (unknownCount > 0 && satisfiedCount > 0) {
      fitVerdict = 'Partial Fit';
    } else if (unknownCount > 0 && satisfiedCount === 0) {
      fitVerdict = 'More Info Needed';
    }

    // Actionable next steps
    const actionableNextSteps: string[] = [];
    if (notSatisfiedCount > 0) {
      actionableNextSteps.push('Review the unsatisfied criteria above to see if waiver policies apply or explore alternative open opportunities.');
    }
    if (unknownCount > 0) {
      actionableNextSteps.push('Gather missing verification documents (such as latest income certificate or marksheet) to complete your assessment.');
    }
    if (satisfiedCount === evaluatedRequirements.length) {
      actionableNextSteps.push('You satisfy all preliminary criteria! Download your application document checklist.');
      actionableNextSteps.push(`Visit the official portal at ${opp.officialSourceUrl || 'the authority website'} before the deadline (${opp.deadline}).`);
    } else {
      actionableNextSteps.push(`Check the official notice portal (${opp.officialSourceUrl || 'official website'}) for any institution-specific circulars.`);
    }

    const result: EligibilityResult = {
      opportunityId: opp.id,
      opportunityTitle: opp.title,
      overallSummary: {
        satisfiedCount,
        notSatisfiedCount,
        unknownCount,
        totalCount: evaluatedRequirements.length,
        fitVerdict
      },
      requirements: evaluatedRequirements,
      actionableNextSteps,
      disclaimer: 'AI-assisted preliminary evaluation. Verify all requirements with the official issuing authority.'
    };

    return { data: result, isLiveBackend: false };
  }

  /**
   * Action Plan: POST /api/plan/generate
   */
  async generateActionPlan(
    opportunityTitle: string,
    opportunityDeadline: string,
    requiredDocuments: string[],
    unresolvedCount = 0
  ): Promise<{ data: ActionPlan; isLiveBackend: boolean }> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(`${API_BASE_URL}/plan/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opportunity_title: opportunityTitle,
          deadline: opportunityDeadline,
          required_documents: requiredDocuments,
          unresolved_count: unresolvedCount
        }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const json = await response.json();
        return { data: json, isLiveBackend: true };
      }
    } catch {
      // Backend not running; fallback to deterministic action plan generator
    }

    // Deterministic Action Plan
    const checklistItems: ActionPlanItem[] = requiredDocuments.map((doc, idx) => ({
      id: `doc-${idx}`,
      category: 'document',
      title: doc,
      description: `Collect original and self-attested scanned PDF/JPG copy.`,
      completed: false,
      priority: idx === 0 ? 'high' : 'medium'
    }));

    checklistItems.push({
      id: 'app-submit',
      category: 'application',
      title: 'Submit Online Application Form',
      description: `Complete all mandatory fields and review preview before final submission.`,
      completed: false,
      priority: 'high'
    });

    checklistItems.push({
      id: 'app-verify',
      category: 'verification',
      title: 'Institutional Nodal Officer Verification',
      description: `Notify college office / Dean to endorse your application status electronically.`,
      completed: false,
      priority: 'medium'
    });

    const actionPlan: ActionPlan = {
      opportunityTitle,
      deadline: opportunityDeadline,
      milestones: [
        {
          id: 'm-1',
          title: 'Document Assembly & Scans',
          deadline: '7 days before closing',
          completed: false,
          notes: 'Gather all marksheets, income certificates, and ID proof.'
        },
        {
          id: 'm-2',
          title: 'Portal Draft & Review',
          deadline: '3 days before closing',
          completed: false,
          notes: 'Double-check spelling of name, bank account IFSC, and AISHE college code.'
        },
        {
          id: 'm-3',
          title: 'Final Submission & Acknowledgement',
          deadline: opportunityDeadline,
          completed: false,
          notes: 'Download PDF acknowledgement slip with application reference number.'
        }
      ],
      checklist: checklistItems,
      tips: [
        'Always keep both digital PDF (under 2MB) and physical hard copies ready.',
        'Ensure the name on your bank passbook matches your Aadhaar card exactly.',
        'Do not wait until the final 6 hours before deadline to avoid server overload.'
      ]
    };

    return { data: actionPlan, isLiveBackend: false };
  }
}

export const sangamApi = new SangamApiService();

