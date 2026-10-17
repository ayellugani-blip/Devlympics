import type { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  findOpportunitiesCTA: string;
  checkEligibilityCTA: string;
  explainSimplyCTA: string;
  uploadNoticeCTA: string;
  askAssistantCTA: string;
  homeNav: string;
  exploreNav: string;
  eligibilityNav: string;
  uploadNav: string;
  assistantNav: string;
  howItWorksNav: string;
  searchPlaceholder: string;
  allCategories: string;
  satisfiedStatus: string;
  notSatisfiedStatus: string;
  unknownStatus: string;
  trustDisclaimer: string;
  demoNotice: string;
  viewDetails: string;
  checkEligibility: string;
  daysLeft: string;
  officialSource: string;
  originalNotice: string;
  simplifiedExplanation: string;
  requiredDocuments: string;
  importantDates: string;
  benefits: string;
  applicationSteps: string;
  unclearWarnings: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    tagline: 'Turning Opportunities into Accessible Possibilities',
    heroHeadline: "The right opportunity should be within everyone's reach.",
    heroSubheadline: 'Understand opportunities, discover what fits you, and take your next step with confidence. SANGAM makes complex requirements simple and accessible.',
    findOpportunitiesCTA: 'Find My Opportunities',
    checkEligibilityCTA: 'Check My Eligibility',
    explainSimplyCTA: 'Explain This Simply',
    uploadNoticeCTA: 'Upload & Simplify',
    askAssistantCTA: 'Ask SANGAM Assistant',
    homeNav: 'Home',
    exploreNav: 'Explore Opportunities',
    eligibilityNav: 'Eligibility Checker',
    uploadNav: 'Upload & Simplify',
    assistantNav: 'AI Assistant',
    howItWorksNav: 'How It Works',
    searchPlaceholder: 'Search scholarships, internships, hackathons, training...',
    allCategories: 'All Opportunities',
    satisfiedStatus: 'Satisfied',
    notSatisfiedStatus: 'Not satisfied',
    unknownStatus: 'Unknown',
    trustDisclaimer: 'AI-assisted preliminary evaluation. Verify all requirements with the official issuing authority.',
    demoNotice: 'Demonstration data verified against public criteria structures.',
    viewDetails: 'View Details',
    checkEligibility: 'Check Eligibility',
    daysLeft: 'days remaining',
    officialSource: 'Official Portal',
    originalNotice: 'Original Official Notice',
    simplifiedExplanation: 'SANGAM Plain-Language Simplification',
    requiredDocuments: 'Required Documents Checklist',
    importantDates: 'Key Timelines & Deadlines',
    benefits: 'Benefits & Financial Grants',
    applicationSteps: 'Step-by-Step Application Guide',
    unclearWarnings: 'Information Notice & Clarifications',
    step1Title: 'Discover',
    step1Desc: 'Find scholarships, internships, and hackathons or upload any circular to decode.',
    step2Title: 'Understand',
    step2Desc: 'Get clear, jargon-free explanations in plain language, your mother tongue, or voice.',
    step3Title: 'Take Action',
    step3Desc: 'Check your eligibility with 3 clear statuses and prepare your verified document checklist.'
  },
  hi: {
    tagline: 'अवसरों को सुलभ संभावनाओं में बदलना',
    heroHeadline: 'सही अवसर हर किसी की पहुंच में होना चाहिए।',
    heroSubheadline: 'अवसरों को समझें, जानें कि आपके लिए क्या उपयुक्त है, और विश्वास के साथ अपना अगला कदम उठाएं। संगम जटिल आवश्यकताओं को सरल और सुलभ बनाता है।',
    findOpportunitiesCTA: 'मेरे अवसर खोजें',
    checkEligibilityCTA: 'पात्रता जांचें',
    explainSimplyCTA: 'सरल भाषा में समझें',
    uploadNoticeCTA: 'अपलोड और सरलीकरण',
    askAssistantCTA: 'संगम सहायक से पूछें',
    homeNav: 'होम',
    exploreNav: 'अवसर देखें',
    eligibilityNav: 'पात्रता जांचकर्ता',
    uploadNav: 'अपलोड और सरल करें',
    assistantNav: 'AI सहायक',
    howItWorksNav: 'यह कैसे काम करता है',
    searchPlaceholder: 'छात्रवृत्ति, इंटर्नशिप, हैकाथॉन खोजें...',
    allCategories: 'सभी अवसर',
    satisfiedStatus: 'संतुष्ट (पात्र)',
    notSatisfiedStatus: 'असंतुष्ट (अपात्र)',
    unknownStatus: 'अज्ञात (जानकारी आवश्यक)',
    trustDisclaimer: 'AI-सहायता प्राप्त प्रारंभिक मूल्यांकन। हमेशा आधिकारिक प्राधिकरण से आवश्यकताओं की पुष्टि करें।',
    demoNotice: 'प्रदर्शन डेटा जो सार्वजनिक मानदंडों के अनुसार तैयार किया गया है।',
    viewDetails: 'विवरण देखें',
    checkEligibility: 'पात्रता जांचें',
    daysLeft: 'दिन शेष',
    officialSource: 'आधिकारिक पोर्टल',
    originalNotice: 'मूल आधिकारिक सूचना',
    simplifiedExplanation: 'संगम सरल भाषा सरलीकरण',
    requiredDocuments: 'आवश्यक दस्तावेजों की सूची',
    importantDates: 'महत्वपूर्ण तिथियां और समयसीमा',
    benefits: 'लाभ और वित्तीय सहायता',
    applicationSteps: 'चरणबद्ध आवेदन मार्गदर्शिका',
    unclearWarnings: 'सूचना और स्पष्टीकरण',
    step1Title: 'खोजें (Discover)',
    step1Desc: 'छात्रवृत्तियां और इंटर्नशिप खोजें या किसी भी नोटिस को डिकोड करने के लिए अपलोड करें।',
    step2Title: 'समझें (Understand)',
    step2Desc: 'अपनी भाषा में बिना किसी तकनीकी उलझन के स्पष्ट और सरल व्याख्या प्राप्त करें।',
    step3Title: 'कदम उठाएं (Take Action)',
    step3Desc: '3 स्पष्ट स्थितियों के साथ पात्रता जांचें और आवश्यक दस्तावेज तैयार करें।'
  },
  te: {
    tagline: 'అవకాశాలను అందుబాటులోకి తెచ్చే సాధనం',
    heroHeadline: 'సరైన అవకాశం ప్రతి ఒక్కరికీ అందుబాటులో ఉండాలి.',
    heroSubheadline: 'అవకాశాలను అర్థం చేసుకోండి, మీకు సరిపోయేదాన్ని కనుగొనండి మరియు ఆత్మవిశ్వాసంతో ముందడుగు వేయండి. సంగం సంక్లిష్ట సమాచారాన్ని సులభతరం చేస్తుంది.',
    findOpportunitiesCTA: 'నా అవకాశాలను కనుగొనండి',
    checkEligibilityCTA: 'నా అర్హతను తనిఖీ చేయండి',
    explainSimplyCTA: 'సరళంగా వివరించండి',
    uploadNoticeCTA: 'అప్‌లోడ్ & సరళీకరణ',
    askAssistantCTA: 'సంగం అసిస్టెంట్‌ని అడగండి',
    homeNav: 'హోమ్',
    exploreNav: 'అవకాశాలు అన్వేషించండి',
    eligibilityNav: 'అర్హత తనిఖీ',
    uploadNav: 'అప్‌లోడ్ & సరళీకరణ',
    assistantNav: 'AI అసిస్టెంట్',
    howItWorksNav: 'ఇది ఎలా పనిచేస్తుంది',
    searchPlaceholder: 'స్కాలర్‌షిప్‌లు, ఇంటర్న్‌షిప్‌లు, హ్యాకథాన్‌లు శోధించండి...',
    allCategories: 'అన్ని అవకాశాలు',
    satisfiedStatus: 'సంతృప్తికరమైనది (అర్హులు)',
    notSatisfiedStatus: 'సంతృప్తి చెందలేదు',
    unknownStatus: 'తెలియదు (మరింత సమాచారం కావాలి)',
    trustDisclaimer: 'AI-సహాయక ప్రాథమిక అంచనా. దయచేసి అధికారిక పోర్టల్‌లో ధృవీకరించండి.',
    demoNotice: 'పబ్లిక్ నిబంధనల ఆధారంగా రూపొందించబడిన డెమో డేటా.',
    viewDetails: 'వివరాలు చూడండి',
    checkEligibility: 'అర్హత తనిఖీ చేయండి',
    daysLeft: 'రోజులు మిగిలి ఉన్నాయి',
    officialSource: 'అధికారిక వెబ్‌సైట్',
    originalNotice: 'అసలు అధికారిక నోటీసు',
    simplifiedExplanation: 'సంగం సరళ వివరణ',
    requiredDocuments: 'అవసరమైన పత్రాల జాబితా',
    importantDates: 'ముఖ్యమైన తేదీలు',
    benefits: 'ప్రయోజనాలు మరియు ఉపకార వేతనం',
    applicationSteps: 'దరఖాస్తు విధానం',
    unclearWarnings: 'సమాచార నోటీసు & హెచ్చరికలు',
    step1Title: 'కనుగొనండి (Discover)',
    step1Desc: 'అవకాశాలను బ్రౌజ్ చేయండి లేదా వివరాలు తెలుసుకోవడానికి సర్క్యులర్‌ను అప్‌లోడ్ చేయండి.',
    step2Title: 'అర్థం చేసుకోండి (Understand)',
    step2Desc: 'క్లిష్టమైన నిబంధనలను సులభమైన తెలుగు మరియు సరళమైన భాషలో అర్థం చేసుకోండి.',
    step3Title: 'చర్య తీసుకోండి (Take Action)',
    step3Desc: 'మీ అర్హతను 3 స్పష్టమైన స్థితులతో పరిశీలించి డాక్యుమెంట్లు సిద్ధం చేసుకోండి.'
  },
  ta: {
    tagline: 'வாய்ப்புகளை எளிதில் அணுகக்கூடிய சாத்தியங்களாக மாற்றுதல்',
    heroHeadline: 'சரியான வாய்ப்பு அனைவருக்கும் எட்டக்கூடியதாக இருக்க வேண்டும்.',
    heroSubheadline: 'வாய்ப்புகளைப் புரிந்து கொள்ளுங்கள், உங்களுக்கு ஏற்றதைக் கண்டறியுங்கள், தன்னம்பிக்கையுடன் அடுத்த படியை எடுங்கள். சங்கம் கடினமான தகவல்களை எளிமையாக்குகிறது.',
    findOpportunitiesCTA: 'எனக்கான வாய்ப்புகளைக் கண்டறி',
    checkEligibilityCTA: 'தகுதியைச் சரிபார்க்கவும்',
    explainSimplyCTA: 'எளிமையாக விளக்குங்கள்',
    uploadNoticeCTA: 'பதிவேற்றி எளிமையாக்குங்கள்',
    askAssistantCTA: 'சங்கம் உதவியாளரிடம் கேளுங்கள்',
    homeNav: 'முகப்பு',
    exploreNav: 'வாய்ப்புகள்',
    eligibilityNav: 'தகுதி சரிபார்ப்பு',
    uploadNav: 'பதிவேற்றம்',
    assistantNav: 'AI உதவியாளர்',
    howItWorksNav: 'இது எவ்வாறு செயல்படுகிறது',
    searchPlaceholder: 'கல்வி உதவித்தொகை, பயிற்சிகள், போட்டிகளைத் தேடுங்கள்...',
    allCategories: 'அனைத்து வாய்ப்புகள்',
    satisfiedStatus: 'பூர்த்தி செய்யப்பட்டது (தகுதியானது)',
    notSatisfiedStatus: 'பூர்த்தியாகவில்லை',
    unknownStatus: 'தெரியவில்லை (கூடுதல் தகவல் தேவை)',
    trustDisclaimer: 'AI-உதவி ஆரம்ப மதிப்பீடு. அதிகாரப்பூர்வ தளத்தில் சரிபார்க்கவும்.',
    demoNotice: 'செயல்விளக்கத் தரவு.',
    viewDetails: 'விவரங்களைக் காண்க',
    checkEligibility: 'தகுதியைச் சரிபார்க்கவும்',
    daysLeft: 'நாட்கள் மீதமுள்ளன',
    officialSource: 'அதிகாரப்பூர்வ தளம்',
    originalNotice: 'அசல் அதிகாரப்பூர்வ அறிவிப்பு',
    simplifiedExplanation: 'சங்கம் எளிய விளக்கம்',
    requiredDocuments: 'தேவையான ஆவணங்கள்',
    importantDates: 'முக்கிய தேதிகள்',
    benefits: 'நன்மைகள் மற்றும் நிதி உதவி',
    applicationSteps: 'விண்ணப்பிக்கும் முறைகள்',
    unclearWarnings: 'தெளிவற்ற தகவல்கள் குறித்த எச்சரிக்கை',
    step1Title: 'கண்டறியுங்கள் (Discover)',
    step1Desc: 'வாய்ப்புகளைத் தேடுங்கள் அல்லது சுற்றறிக்கையைப் பதிவேற்றுங்கள்.',
    step2Title: 'புரிந்து கொள்ளுங்கள் (Understand)',
    step2Desc: 'உங்கள் தாய்மொழியில் தெளிவான விளக்கத்தைப் பெறுங்கள்.',
    step3Title: 'நடவடிக்கை எடுங்கள் (Take Action)',
    step3Desc: 'உங்கள் தகுதியை மதிப்பிட்டு அடுத்த படியைத் தொடங்குங்கள்.'
  },
  mr: {
    tagline: 'संधींना सुलभ शक्यतांमध्ये रूपांतरित करणे',
    heroHeadline: 'योग्य संधी प्रत्येकाच्या आवाक्यात असली पाहिजे.',
    heroSubheadline: 'संधी समजून घ्या, तुमच्यासाठी काय योग्य आहे ते शोधा आणि आत्मविश्वासाने पुढचे पाऊल टाका. संगम किचकट माहिती सोपी आणि सुलभ बनवतो.',
    findOpportunitiesCTA: 'माझ्यासाठी संधी शोधा',
    checkEligibilityCTA: 'पात्रता तपासा',
    explainSimplyCTA: 'सोप्या भाषेत समजून घ्या',
    uploadNoticeCTA: 'अपलोड आणि सोपे करा',
    askAssistantCTA: 'संगम सहाय्यकाला विचारा',
    homeNav: 'मुख्यपृष्ठ',
    exploreNav: 'संधी एक्सप्लोर करा',
    eligibilityNav: 'पात्रता तपासक',
    uploadNav: 'अपलोड आणि सोपे करा',
    assistantNav: 'AI सहाय्यक',
    howItWorksNav: 'हे कसे कार्य करते',
    searchPlaceholder: 'शिष्यवृत्ती, इंटर्नशिप, स्पर्धा शोधा...',
    allCategories: 'सर्व संधी',
    satisfiedStatus: 'पात्र (संतुष्ट)',
    notSatisfiedStatus: 'अपात्र (असंतुष्ट)',
    unknownStatus: 'माहिती उपलब्ध नाही',
    trustDisclaimer: 'AI-सहाय्यक प्राथमिक मूल्यमापन. अधिकृत पोर्टलवरून पडताळणी करा.',
    demoNotice: 'प्रात्यक्षिक डेटा.',
    viewDetails: 'तपशील पहा',
    checkEligibility: 'पात्रता तपासा',
    daysLeft: 'दिवस शिल्लक',
    officialSource: 'अधिकृत पोर्टल',
    originalNotice: 'मूळ अधिकृत सूचना',
    simplifiedExplanation: 'संगम सोपे स्पष्टीकरण',
    requiredDocuments: 'आवश्यक कागदपत्रे',
    importantDates: 'महत्वाच्या तारखा',
    benefits: 'फायदे आणि शिष्यवृत्ती',
    applicationSteps: 'अर्ज करण्याचे टप्पे',
    unclearWarnings: 'स्पष्टीकरण आणि सूचना',
    step1Title: 'शोधा (Discover)',
    step1Desc: 'संधी शोधा किंवा नोटीस अपलोड करून समजून घ्या.',
    step2Title: 'समजून घ्या (Understand)',
    step2Desc: 'सोप्या आणि स्पष्ट भाषेत सर्व नियम समजून घ्या.',
    step3Title: 'पुढील पाऊल (Take Action)',
    step3Desc: '३ स्पष्ट स्थितींसह पात्रता तपासा आणि अर्ज करा.'
  }
};
