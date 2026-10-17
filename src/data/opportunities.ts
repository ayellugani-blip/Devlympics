import type { Opportunity } from '../types';

export const SAMPLE_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'National Merit Scholarship for Higher Education (Central Sector Scheme)',
    organization: 'Ministry of Education & National Scholarship Portal (NSP)',
    category: 'Scholarship',
    description: `Official Notice (MHRD/HE/2026/04): Applications are invited through the National Scholarship Portal (NSP) from meritorious college and university students belonging to families with an annual gross household income not exceeding INR 4,50,000. Eligible applicants must have scored in the 80th percentile of their respective Higher Secondary Examination (Class 12) board and be enrolled in a recognized regular degree programme in India. Renewal of award is subject to 50% minimum aggregate marks and 75% verified classroom attendance.`,
    simplifiedDescription: `A government financial support program for college students. If you scored in the top 20% (above 80th percentile) in your Class 12 board exams and your family's annual income is below ₹4.5 Lakhs, you receive ₹12,000 per year for 3 years of college and ₹20,000 per year for Master's degrees.`,
    deadline: '2026-11-30',
    deadlineDaysRemaining: 44,
    eligibilityHighlights: [
      'Class 12th Board Score > 80th Percentile',
      'Annual family income under ₹4,50,000',
      'Enrolled in regular full-time Degree (UG/PG)',
      'Indian Citizen'
    ],
    detailedEligibility: [
      {
        id: 'crit-1-1',
        criterion: 'Class 12 marks in top 20th percentile (approx. 80%+ marks)',
        simpleExplanation: 'You must have completed Class 12 with a score that puts you in the top 20% of your board.',
        sourceQuote: 'Applicants must have scored in the 80th percentile of their respective Higher Secondary Examination',
        field: 'gpaOrMarks',
        operator: 'gte',
        targetValue: 80
      },
      {
        id: 'crit-1-2',
        criterion: 'Annual family income does not exceed ₹4,50,000',
        simpleExplanation: 'Total combined annual income of your parents/guardians must be ₹4,50,000 or lower.',
        sourceQuote: 'Families with an annual gross household income not exceeding INR 4,50,000',
        field: 'income',
        operator: 'lte',
        targetValue: 450000
      },
      {
        id: 'crit-1-3',
        criterion: 'Full-time regular degree enrolment',
        simpleExplanation: 'You must be enrolled in an offline, full-time Bachelor degree or equivalent programme.',
        sourceQuote: 'Enrolled in a recognized regular degree programme in India',
        field: 'enrollmentStatus',
        operator: 'in',
        targetValue: ['1st Year', '2nd Year', '3rd Year']
      }
    ],
    benefits: [
      '₹12,000 per annum for Undergraduate studies (Years 1-3)',
      '₹20,000 per annum for Postgraduate studies (Years 4-5)',
      'Direct Benefit Transfer (DBT) straight into bank account',
      'Tuition support and academic book allowance'
    ],
    requiredEducation: 'Undergraduate (1st / 2nd Year)',
    fieldOfStudy: ['Engineering', 'Science', 'Arts', 'Commerce', 'Medicine', 'Any General Degree'],
    location: 'All India',
    requiredDocuments: [
      'Class 12 Board Marksheet & Passing Certificate',
      'Family Income Certificate issued by competent Revenue Authority (Tehsildar / SDO)',
      'College Bonafide Student Certificate with AISHE Code',
      'Aadhaar Card linked to active Bank Account',
      'Recent Passport-sized Photograph'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'NSP Registration',
        instruction: 'Register on National Scholarship Portal (scholarships.gov.in) with Aadhaar and mobile number.'
      },
      {
        stepNumber: 2,
        title: 'Upload Certificates',
        instruction: 'Upload Class 12 marksheet, income proof, and college bonafide certificate.'
      },
      {
        stepNumber: 3,
        title: 'Institute Verification',
        instruction: 'Inform your college nodal officer to electronically verify your application before November 30.'
      }
    ],
    officialSourceUrl: 'https://scholarships.gov.in',
    unclearWarnings: [
      'Note: State-specific quota allocations for 2026 are subject to annual seat allocation updates by MHRD.'
    ],
    isDemonstration: true,
    tags: ['Government', 'Scholarship', 'Undergraduate', 'Merit-cum-Means']
  },
  {
    id: 'opp-2',
    title: 'Google Summer of Code (GSoC) 2026',
    organization: 'Google Open Source Programs Office',
    category: 'Internship',
    description: `Google Summer of Code is a global, online program focused on bringing new contributors into open source software development. GSoC Contributors work with an open source organization on a 12+ week programming project under the guidance of mentors. Eligible participants must be 18 years or older as of project registration, eligible to work in their country of residence, and not currently an active maintainer of the participating organization.`,
    simplifiedDescription: `A paid 12-week summer program where you contribute code to real-world open-source software under the personal guidance of professional software engineers. You work remotely from home and receive a generous international stipend upon meeting milestone evaluations.`,
    deadline: '2026-04-14',
    deadlineDaysRemaining: 179,
    eligibilityHighlights: [
      'Age 18+ at registration',
      'Beginner or intermediate in open-source software development',
      'Proficiency in Git and at least one programming language (Python, C++, JS, Rust, Go, etc.)',
      'Valid student or open-source newcomer status'
    ],
    detailedEligibility: [
      {
        id: 'crit-2-1',
        criterion: 'Must be 18 years or older',
        simpleExplanation: 'You must be an adult (at least 18 years old) by the project start date.',
        sourceQuote: 'Eligible participants must be 18 years or older as of project registration',
        field: 'age',
        operator: 'gte',
        targetValue: 18
      },
      {
        id: 'crit-2-2',
        criterion: 'Technical background or interest in software engineering',
        simpleExplanation: 'Must have basic familiarity with writing code and using version control like GitHub.',
        sourceQuote: 'Contributors work on a 12+ week programming project under the guidance of mentors',
        field: 'fieldOfStudy',
        operator: 'contains',
        targetValue: ['Computer Science', 'Information Technology', 'Software Engineering', 'Electronics', 'Mathematics', 'Any Engineering']
      }
    ],
    benefits: [
      'Stipend of $1,500 to $3,300 (adjusted for purchasing power parity in India, ~₹1,50,000 to ₹2,80,000)',
      '1-on-1 mentorship from senior open-source software architects',
      'Official Google Summer of Code Completion Certificate & digital badge',
      'High industry recognition on your resume and GitHub profile'
    ],
    requiredEducation: 'College Students & Open Source Beginners',
    fieldOfStudy: ['Computer Science', 'IT', 'Data Science', 'Engineering', 'Open to any tech enthusiast'],
    location: 'Remote / Work from Anywhere',
    requiredDocuments: [
      'Government Photo ID (Passport, National ID, or Driver’s License)',
      'Written Project Proposal adhering to organization guidelines',
      'GitHub / GitLab profile link with proof of code contributions',
      'Tax residency form (W-8BEN for non-US participants)'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Choose Organization',
        instruction: 'Browse accepted mentoring organizations (e.g. Apache, Linux Foundation, TensorFlow, Blender).'
      },
      {
        stepNumber: 2,
        title: 'Engage in Community',
        instruction: 'Introduce yourself in the project chat/mailing list and solve 1-2 beginner good-first-issues.'
      },
      {
        stepNumber: 3,
        title: 'Submit Proposal',
        instruction: 'Draft a detailed technical project plan with timeline milestones and submit on the GSoC portal.'
      }
    ],
    officialSourceUrl: 'https://summerofcode.withgoogle.com',
    unclearWarnings: [
      'Note: Stipend tier adjustments for the 2026 cycle are confirmed in February by Google Open Source.'
    ],
    isDemonstration: true,
    tags: ['Tech', 'Open Source', 'Remote', 'Stipend', 'Global']
  },
  {
    id: 'opp-3',
    title: 'Smart India Hackathon (SIH) 2026 — Student Hardware & Software Edition',
    organization: 'Ministry of Education Innovation Cell & AICTE',
    category: 'Hackathon',
    description: `Smart India Hackathon (SIH) is a premier nationwide initiative to provide students with a platform to solve pressing challenges faced by Ministries, Departments, Public Sector Undertakings (PSUs), and private industries. Teams must consist of 6 members from the same AICTE/UGC recognized higher education institution, with mandatory female representation of at least one member. Shortlisted teams participate in a 36-hour non-stop grand finale at nodal centres across India.`,
    simplifiedDescription: `India's largest national student hackathon. You form a team of 6 students from your college (must include at least 1 female teammate) to build practical technological solutions for real challenges posted by government ministries and top industries. Winning teams receive ₹1,00,000 cash per problem statement.`,
    deadline: '2026-09-20',
    deadlineDaysRemaining: 338,
    eligibilityHighlights: [
      'Enrolled in AICTE or UGC recognized college/university',
      'Team of exactly 6 students (all from same college)',
      'Mandatory at least 1 female member per team',
      'Official SPOC (Single Point of Contact) college approval'
    ],
    detailedEligibility: [
      {
        id: 'crit-3-1',
        criterion: 'Currently enrolled undergraduate or postgraduate student',
        simpleExplanation: 'You and your teammates must be active college students with valid student ID cards.',
        sourceQuote: 'Teams must consist of 6 members from the same AICTE/UGC recognized higher education institution',
        field: 'enrollmentStatus',
        operator: 'in',
        targetValue: ['1st Year', '2nd Year', '3rd Year', 'Final Year']
      },
      {
        id: 'crit-3-2',
        criterion: 'Team composition with female representation',
        simpleExplanation: 'Each team of 6 members must have at least one female participant.',
        sourceQuote: 'Mandatory female representation of at least one member',
        field: 'gender',
        operator: 'in',
        targetValue: ['Female', 'Any']
      }
    ],
    benefits: [
      '₹1,00,000 Cash Prize per winning problem statement',
      'Direct incubation support and potential pilot funding from government ministries',
      'Travel and accommodation allowance for Grand Finale nodal centres',
      'National recognition from Ministry of Education'
    ],
    requiredEducation: 'Undergraduate / Postgraduate (Engineering, Design, Management, Sciences)',
    fieldOfStudy: ['Engineering', 'Technology', 'Computer Science', 'Design', 'Agriculture', 'Healthcare'],
    location: 'Hybrid (Collegiate Round) -> On-site Grand Finale Centers',
    requiredDocuments: [
      'College Bonafide Letter signed by Principal/Dean with official seal',
      'Valid Student Identity Cards for all 6 members',
      'Solution Idea PPT using the prescribed SIH 2026 template',
      'Declaration of Originality'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Internal College Hackathon',
        instruction: 'College SPOC organizes internal screening to nominate top teams.'
      },
      {
        stepNumber: 2,
        title: 'Idea Submission',
        instruction: 'Nominated teams upload problem statement selection and architecture pitch on sih.gov.in.'
      },
      {
        stepNumber: 3,
        title: 'Grand Finale Evaluation',
        instruction: 'Shortlisted teams travel to assigned nodal centres for the live 36-hour build.'
      }
    ],
    officialSourceUrl: 'https://sih.gov.in',
    unclearWarnings: [
      'Note: Problem statement release dates are scheduled for August 2026.'
    ],
    isDemonstration: true,
    tags: ['National', 'Hackathon', 'Team', 'Govt of India', 'Innovation']
  },
  {
    id: 'opp-4',
    title: 'Reliance Foundation Undergraduate Scholarship 2026',
    organization: 'Reliance Foundation',
    category: 'Scholarship',
    description: `The Reliance Foundation Undergraduate Scholarships support meritorious students from all corners of India to pursue undergraduate education in any stream. The program supports students who demonstrate both academic excellence and financial need, offering financial assistance of up to INR 2,00,000 over the duration of the degree along with leadership development programs. Annual family household income must be less than INR 15,00,000, with preference given to households under INR 2,50,000.`,
    simplifiedDescription: `A generous private scholarship that awards up to ₹2,00,000 over your degree to help you study without financial stress. Open to 1st year college students of ANY stream (Arts, Commerce, Science, Engineering) with family income under ₹15 Lakhs (priority given to families earning under ₹2.5 Lakhs).`,
    deadline: '2026-10-15',
    deadlineDaysRemaining: 363,
    eligibilityHighlights: [
      'Enrolled in 1st year of full-time undergraduate degree',
      'Minimum 60% aggregate in Class 12 board examination',
      'Household income under ₹15 Lakhs (preference under ₹2.5 Lakhs)',
      'Mandatory aptitude test participation'
    ],
    detailedEligibility: [
      {
        id: 'crit-4-1',
        criterion: '1st Year full-time degree student',
        simpleExplanation: 'You must have just joined your first year of college.',
        sourceQuote: 'Support meritorious students to pursue undergraduate education in any stream',
        field: 'enrollmentStatus',
        operator: 'in',
        targetValue: ['1st Year']
      },
      {
        id: 'crit-4-2',
        criterion: 'Class 12th marks minimum 60%',
        simpleExplanation: 'You must have scored at least 60% in your 12th board exams.',
        sourceQuote: 'Minimum 60% aggregate in Class 12 board examination',
        field: 'gpaOrMarks',
        operator: 'gte',
        targetValue: 60
      },
      {
        id: 'crit-4-3',
        criterion: 'Annual family income under ₹15,00,000',
        simpleExplanation: 'Your total household earnings must be below ₹15 Lakhs per year.',
        sourceQuote: 'Annual family household income must be less than INR 15,00,000',
        field: 'income',
        operator: 'lte',
        targetValue: 1500000
      }
    ],
    benefits: [
      'Scholarship grant of up to ₹2,00,000 over the full duration of undergraduate degree',
      'Access to exclusive leadership development workshops and personal mentorship',
      'Alumni networking opportunities with prominent industry leaders',
      'No bond or employment commitment required'
    ],
    requiredEducation: '1st Year Undergraduate Students (All Streams)',
    fieldOfStudy: ['Engineering', 'Arts', 'Commerce', 'Science', 'Law', 'Medicine', 'Any Discipline'],
    location: 'All India',
    requiredDocuments: [
      'Class 10 and Class 12 Marksheets',
      'Current College Admission Proof & Fee Receipt',
      'Official Family Income Certificate or latest ITR / Form 16',
      'Identity Proof (Aadhaar / Voter ID / Passport)'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Eligibility Quiz & Profile',
        instruction: 'Complete the 5-minute pre-qualification questionnaire on the official portal.'
      },
      {
        stepNumber: 2,
        title: 'Online Aptitude Test',
        instruction: 'Take a 60-minute proctored online test measuring verbal, numerical, and logical reasoning.'
      },
      {
        stepNumber: 3,
        title: 'Document Verification',
        instruction: 'Shortlisted candidates submit verified financial and academic certificates for final selection.'
      }
    ],
    officialSourceUrl: 'https://www.scholarships.reliancefoundation.org',
    unclearWarnings: [
      'Note: Aptitude test slots are scheduled between October and November.'
    ],
    isDemonstration: true,
    tags: ['Private Grant', 'Merit & Need', 'All Streams', 'Leadership']
  },
  {
    id: 'opp-5',
    title: 'Microsoft Learn Student Ambassadors & AI Skills Fellowship',
    organization: 'Microsoft Worldwide Education & Learn',
    category: 'Training',
    description: `The Microsoft Learn Student Ambassadors community is a global program for college and university students passionate about artificial intelligence, cloud computing, and peer-to-peer mentoring. Participants gain direct access to Microsoft 365, Visual Studio Enterprise subscriptions, Azure cloud credits ($150/month), free exam vouchers for Microsoft Certified Credentials (such as Azure AI Fundamentals AI-900), and exclusive mentorship from Microsoft Cloud Advocates.`,
    simplifiedDescription: `A free learning and leadership program for tech-curious college students. Microsoft provides you with $150/month in free Azure cloud credits, free official Microsoft certification exam vouchers, software licenses, and mentorship to help you build AI projects and teach tech to your college peers.`,
    deadline: '2026-11-15',
    deadlineDaysRemaining: 29,
    eligibilityHighlights: [
      'Age 16+ and enrolled in an accredited college or university',
      'No prerequisite degree: open to all branches and years',
      'Passion for technology and willingness to organize peer study groups',
      'Commitment to learn and share Microsoft technologies'
    ],
    detailedEligibility: [
      {
        id: 'crit-5-1',
        criterion: 'Enrolled in an accredited college or university',
        simpleExplanation: 'Must be actively studying in college or university.',
        sourceQuote: 'Enrolled in an accredited college or university',
        field: 'enrollmentStatus',
        operator: 'in',
        targetValue: ['1st Year', '2nd Year', '3rd Year', 'Final Year']
      },
      {
        id: 'crit-5-2',
        criterion: 'Minimum age 16 years',
        simpleExplanation: 'You must be at least 16 years of age at the time of application.',
        sourceQuote: 'Age 16+ as of application submission',
        field: 'age',
        operator: 'gte',
        targetValue: 16
      }
    ],
    benefits: [
      '$150/month in free Microsoft Azure cloud credits for development',
      'Free certification exam vouchers for Microsoft Certified Associate/Fundamentals exams',
      'Visual Studio Enterprise and LinkedIn Learning subscription',
      'Exclusive invitations to Microsoft Global Student Summits & MVP interactions'
    ],
    requiredEducation: 'College & University Students',
    fieldOfStudy: ['Open to all majors: Computer Science, Engineering, Business, Arts, Sciences'],
    location: 'Global / Virtual Community',
    requiredDocuments: [
      'Proof of Enrollment (College ID card or tuition payment receipt)',
      'Short 1-minute video explaining a technical concept or why you want to guide peers',
      'Active Microsoft Learn profile link'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Learn Profile Setup',
        instruction: 'Create a free Microsoft Learn account and complete at least one Cloud Skills module.'
      },
      {
        stepNumber: 2,
        title: 'Written & Video Application',
        instruction: 'Share how you have helped fellow students learn technology or how you plan to host a workshop.'
      },
      {
        stepNumber: 3,
        title: 'Quarterly Admission',
        instruction: 'Applications are reviewed quarterly, and acceptance emails are sent every 3 months.'
      }
    ],
    officialSourceUrl: 'https://studentambassadors.microsoft.com',
    unclearWarnings: [
      'Note: Video response upload is strictly limited to 60 seconds.'
    ],
    isDemonstration: true,
    tags: ['Tech Fellowship', 'Cloud & AI', 'Global', 'Certification Vouchers']
  },
  {
    id: 'opp-6',
    title: 'ISRO START (Space Science and Technology Awareness Training) 2026',
    organization: 'Indian Space Research Organisation (ISRO)',
    category: 'Training',
    description: `START (Space Science and Technology Awareness Training) is an introductory-level online training program in Space Science and Technology for undergraduate and postgraduate students. Conducted by the Space Science Programme Office (SSPO), ISRO HQ, the course covers domains including Planetary Exploration, Astronomy, Solar Physics, Heliophysics, Atmospheric Sciences, and Space Instrumentation. Eligible institutions must register as nodal centres, through which students are nominated.`,
    simplifiedDescription: `An official space science training course conducted directly by ISRO scientists. Designed for undergraduate and postgraduate students in physics, mathematics, and engineering, you learn planetary exploration, space weather, and satellite instrumentation without paying any fee, earning a verified ISRO training certificate.`,
    deadline: '2026-05-10',
    deadlineDaysRemaining: 205,
    eligibilityHighlights: [
      'UG or PG student in Physical Sciences or Engineering',
      'Minimum aggregate score of 65% or 6.5 CGPA in current degree',
      'Home institution must register as an ISRO Nodal Centre',
      '100% free of tuition or registration fees'
    ],
    detailedEligibility: [
      {
        id: 'crit-6-1',
        criterion: 'Undergraduate or postgraduate degree student',
        simpleExplanation: 'Must be actively pursuing B.Sc, B.Tech, M.Sc, or M.Tech.',
        sourceQuote: 'Undergraduate and postgraduate students in Physical Sciences or Technology',
        field: 'enrollmentStatus',
        operator: 'in',
        targetValue: ['2nd Year', '3rd Year', 'Final Year']
      },
      {
        id: 'crit-6-2',
        criterion: 'Academic performance of 65% / 6.5 CGPA',
        simpleExplanation: 'Your current college CGPA must be at least 6.5 out of 10 or 65% aggregate.',
        sourceQuote: 'Minimum aggregate score of 65% or 6.5 CGPA',
        field: 'gpaOrMarks',
        operator: 'gte',
        targetValue: 65
      }
    ],
    benefits: [
      'Verified ISRO Space Science Awareness Training Certificate upon course completion',
      'Direct live lectures and Q&A sessions with leading ISRO scientists and researchers',
      'Access to space exploration datasets and telemetry observation modules',
      'Opportunity to apply for advanced research internships at ISRO centres (ISAC, SAC, VSSC)'
    ],
    requiredEducation: 'Undergraduate (2nd/3rd/4th Year) & Postgraduate Students',
    fieldOfStudy: ['Physics', 'Electronics', 'Computer Science', 'Mechanical', 'Aerospace', 'Atmospheric Science'],
    location: 'Online via ISRO Antariksha Jigyasa Portal',
    requiredDocuments: [
      'Current Semester Marksheet / Grade Card',
      'College Bonafide Certificate with Nodal Centre Coordinator signature',
      'Valid Government Photo ID'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Institutional Nodal Centre Verification',
        instruction: 'Check if your university or college has registered on the ISRO Antariksha Jigyasa portal.'
      },
      {
        stepNumber: 2,
        title: 'Student Registration',
        instruction: 'Create an account, select your approved institution nodal centre, and upload your marksheet.'
      },
      {
        stepNumber: 3,
        title: 'Attend Live Sessions & Quiz',
        instruction: 'Complete the 3-week virtual lecture module and pass the online exit assessment (score ≥ 60%).'
      }
    ],
    officialSourceUrl: 'https://jigyasa.iirs.gov.in/start',
    unclearWarnings: [
      'Note: Individual registrations are not accepted if your college has not registered as an official Nodal Centre.'
    ],
    isDemonstration: true,
    tags: ['ISRO', 'Space Science', 'Free Certificate', 'Government Training']
  },
  {
    id: 'opp-7',
    title: 'Amazon Future Engineer Women in Tech Fellowship 2026',
    organization: 'Amazon India & Foundation For Excellence',
    category: 'Fellowship',
    description: `The Amazon Future Engineer (AFE) Scholarship program is aimed at empowering young women from economically vulnerable families who are pursuing a career in technology. Recipients receive financial assistance of INR 50,000 per year for four years of their B.Tech/B.E. course, a brand-new laptop, personalized mentorship from Amazon software development engineers, and priority access to an Amazon summer internship interview after their third year.`,
    simplifiedDescription: `A life-changing tech scholarship and career accelerator for women engineering students. You receive ₹50,000 per year for all 4 years of college, a free high-performance laptop, a dedicated Amazon software engineer as your personal mentor, and a fast-track interview for a paid internship at Amazon.`,
    deadline: '2026-12-15',
    deadlineDaysRemaining: 59,
    eligibilityHighlights: [
      'Identifies as female',
      'Enrolled in 1st year B.E./B.Tech in Computer Science, IT, AI, or related branch',
      'Family annual income less than ₹3,00,000 per annum',
      'Admission secured through state or national engineering entrance exam'
    ],
    detailedEligibility: [
      {
        id: 'crit-7-1',
        criterion: 'Identifies as female',
        simpleExplanation: 'This fellowship is exclusively for women students pursuing technical education.',
        sourceQuote: 'Empowering young women from economically vulnerable families',
        field: 'gender',
        operator: 'eq',
        targetValue: 'Female'
      },
      {
        id: 'crit-7-2',
        criterion: '1st Year B.E. / B.Tech in CS/IT or allied branch',
        simpleExplanation: 'Must have joined 1st year of engineering in Computer Science or related fields.',
        sourceQuote: 'Four years of their B.Tech/B.E. course in technology',
        field: 'enrollmentStatus',
        operator: 'in',
        targetValue: ['1st Year']
      },
      {
        id: 'crit-7-3',
        criterion: 'Family income under ₹3,00,000 per year',
        simpleExplanation: 'Combined household annual income must not exceed ₹3 Lakhs.',
        sourceQuote: 'Economically vulnerable families with income under INR 3,00,000 per annum',
        field: 'income',
        operator: 'lte',
        targetValue: 300000
      }
    ],
    benefits: [
      '₹50,000 financial support each year for all 4 years of B.Tech (Total ₹2,00,000)',
      'Brand-new high-spec laptop for coding and development',
      'One-on-one professional mentorship from Amazon software development engineers',
      'Guaranteed interview for a paid summer internship at Amazon Development Centres'
    ],
    requiredEducation: '1st Year Female B.Tech / B.E. Students',
    fieldOfStudy: ['Computer Science', 'Information Technology', 'AI & Machine Learning', 'Data Engineering'],
    location: 'All India',
    requiredDocuments: [
      'Class 12th Board Marksheet & Entrance Exam Rank Card (JEE / State CET)',
      'College Admission Letter & Tuition Fee Receipt',
      'Government Income Certificate or BPL Card / Ration Card',
      'Electricity Bill or Rent Agreement of Residence',
      'Bank Account Passbook / Cancelled Cheque'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Application & Income Verification',
        instruction: 'Submit online form with family financial evidence and entrance exam rank.'
      },
      {
        stepNumber: 2,
        title: 'Virtual Interview',
        instruction: 'Engage in a friendly 20-minute conversation regarding your goals and aspirations in software engineering.'
      },
      {
        stepNumber: 3,
        title: 'Award Onboarding',
        instruction: 'Receive scholarship disbursement, laptop delivery, and meet your Amazon mentor.'
      }
    ],
    officialSourceUrl: 'https://www.amazonfutureengineer.in',
    unclearWarnings: [
      'Note: Renewal each year requires passing all university examinations without active backlogs.'
    ],
    isDemonstration: true,
    tags: ['Women in Tech', 'Laptop Grant', 'Mentorship', 'Amazon', 'Full 4-Year Support']
  },
  {
    id: 'opp-8',
    title: 'TCS EnQuode & Innovate Student Tech Challenge 2026',
    organization: 'Tata Consultancy Services (TCS)',
    category: 'Competition',
    description: `TCS EnQuode is a flagship innovation and coding contest designed for undergraduate engineering students. The challenge tests analytical thinking, algorithm design, and real-world system architecture in sustainability and smart automation. Winners receive cash prizes from an aggregate pool of INR 3,00,000, recognition from TCS CTO office, and pre-placement interviews for Digital Cadre software developer positions.`,
    simplifiedDescription: `A premier coding and technological innovation challenge for 2nd, 3rd, and 4th year college students. Compete in solving real algorithmic and design challenges to win cash prizes up to ₹3,00,000 and fast-track your job placement with direct interviews for TCS Digital engineering roles.`,
    deadline: '2026-08-30',
    deadlineDaysRemaining: 317,
    eligibilityHighlights: [
      'Full-time B.Tech / B.E / MCA student graduating in 2026, 2027, or 2028',
      'Minimum academic aggregate of 60% or 6.0 CGPA',
      'Individual or team participation (up to 2 members)',
      'Indian university or college affiliation'
    ],
    detailedEligibility: [
      {
        id: 'crit-8-1',
        criterion: 'Enrolled in 2nd, 3rd, or Final Year B.Tech or MCA',
        simpleExplanation: 'Must be in your 2nd, 3rd, or 4th year of engineering/MCA.',
        sourceQuote: 'Undergraduate engineering students graduating in 2026, 2027, or 2028',
        field: 'enrollmentStatus',
        operator: 'in',
        targetValue: ['2nd Year', '3rd Year', 'Final Year']
      },
      {
        id: 'crit-8-2',
        criterion: 'Minimum academic marks of 60% / 6.0 CGPA',
        simpleExplanation: 'You should have maintained at least 60% or 6.0 CGPA across your semesters.',
        sourceQuote: 'Minimum academic aggregate of 60% or 6.0 CGPA',
        field: 'gpaOrMarks',
        operator: 'gte',
        targetValue: 60
      }
    ],
    benefits: [
      'Total cash prize pool of ₹3,00,000 for top 3 teams',
      'Direct Pre-Placement Interviews (PPI) for TCS Digital software engineering roles',
      'Certificates of Excellence signed by TCS Global Head of Innovation',
      'Networking with distinguished TCS Research and Innovation scientists'
    ],
    requiredEducation: 'Undergraduate / MCA Students (Years 2-4)',
    fieldOfStudy: ['Computer Science', 'Information Technology', 'Electrical', 'Electronics', 'All Engineering Branches'],
    location: 'Online Code Arena + Mumbai TCS Campus Finale',
    requiredDocuments: [
      'Valid College Identity Card',
      'Semester Marksheet up to latest completed term',
      'TCS NextStep Registration Portal Profile'
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Registration & Practice Arena',
        instruction: 'Register on TCS NextStep portal and practice algorithmic problems in the sandbox.'
      },
      {
        stepNumber: 2,
        title: 'Preliminary Online Round',
        instruction: 'Complete the 3-hour competitive programming and system design round.'
      },
      {
        stepNumber: 3,
        title: 'Grand Finale Hack & PPI',
        instruction: 'Top 50 teams present their prototypes to senior TCS architects and attend career interviews.'
      }
    ],
    officialSourceUrl: 'https://www.tcs.com/careers',
    unclearWarnings: [
      'Note: Pre-placement interview offers depend on candidate fulfilling basic TCS campus hiring criteria.'
    ],
    isDemonstration: true,
    tags: ['Coding Contest', 'Pre-Placement Interview', 'Cash Prize', 'TCS Digital']
  }
];

export const CATEGORIES = [
  'All',
  'Scholarship',
  'Internship',
  'Hackathon',
  'Competition',
  'Training',
  'Fellowship'
] as const;

export const EDUCATION_LEVELS = [
  'All Education Levels',
  'High School / Class 12',
  'Undergraduate (1st / 2nd Year)',
  'Undergraduate (3rd / 4th Year)',
  'Postgraduate / Master’s',
  'Open to All Learners'
] as const;
