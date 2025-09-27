import { FormData } from "./types";

export const STRINGS = {
  welcomeTitle: { en: "Welcome to Wellin 👋", kr: "Wellin에 오신 것을 환영합니다 👋" },
  wellinSubtitle: { en: "Your medical companion in Korea", kr: "한국에서의 당신의 의료 동반자" },
  welcomeBody1: { en: "I’ll help you prepare for your visit. I’ll ask a few questions and generate a summary you can share with a clinic.", kr: "빠른 문진을 도와드립니다. 몇 가지 질문 후 병원에 전달 가능한 요약을 만들어 드려요." },
  consent: { en: "I agree to use Wellin for pre‑consultation and data processing.", kr: "Wellin의 문진 및 데이터 처리를 동의합니다." },
  start: { en: "Start", kr: "시작" },
  cancel: { en: "Cancel", kr: "취소" },
  continue: { en: "Continue", kr: "계속" },
  back: { en: "Back", kr: "뒤로" },
  
  profileTitle: { en: "Language & Patient Profile", kr: "언어 및 환자 프로필" },
  name: { en: "Name (optional)", kr: "이름 (선택 사항)" },
  dobYear: { en: "Year of birth (YYYY)", kr: "출생 연도 (YYYY)" },
  sexAtBirth: { en: "Sex at birth", kr: "출생 시 성별" },
  sexOptions: {
      en: ["Male", "Female", "Intersex", "Prefer not to say"],
      kr: ["남성", "여성", "간성", "응답 안 함"]
  },
  
  complaintTitle: { en: "What brings you in today?", kr: "오늘 어떤 증상으로 오셨나요?" },
  complaintFreeText: { en: "Describe your main concern in a sentence.", kr: "주요 증상을 한 문장으로 설명해주세요." },
  bodyArea: { en: "Body Area", kr: "신체 부위" },
  symptomType: { en: "Symptom Type", kr: "증상 유형" },

  bodyAreas: [
    { en: "Head/Neck", kr: "머리/목" }, { en: "Chest", kr: "가슴" }, { en: "Abdomen", kr: "복부" },
    { en: "Back", kr: "등" }, { en: "Arm/Leg", kr: "팔/다리" }, { en: "Skin", kr: "피부" },
    { en: "General", kr: "전신" }, { en: "Other", kr: "기타" },
  ],
  symptomTypes: [
    { en: "Pain", kr: "통증" }, { en: "Cough", kr: "기침" }, { en: "Fever", kr: "발열" },
    { en: "Rash", kr: "발진" }, { en: "Nausea", kr: "메스꺼움" }, { en: "Diarrhea", kr: "설사" },
    { en: "Anxiety", kr: "불안" }, { en: "Medication refill", kr: "약 재처방" }, { en: "Other", kr: "기타" },
  ],

  symptomStructureTitle: { en: "Symptom Details", kr: "증상 상세 정보" },
  onset: { en: "When did it start?", kr: "언제 시작되었나요?" },
  onsetPlaceholder: { en: "e.g., 3 days ago, this morning", kr: "예: 3일 전, 오늘 아침" },
  selectDate: { en: "Select Date", kr: "날짜 선택" },
  pickADate: { en: "Pick a date", kr: "날짜를 선택하세요" },
  timeOfDay: { en: "Time of Day", kr: "시간대" },
  timeOfDayOptions: [
    { id: 'Morning', en: { label: 'Morning', range: '6:00 - 12:00' }, kr: { label: '오전', range: '6:00 - 12:00' } },
    { id: 'Afternoon', en: { label: 'Afternoon', range: '12:00 - 18:00' }, kr: { label: '오후', range: '12:00 - 18:00' } },
    { id: 'Evening', en: { label: 'Evening', range: '18:00 - 22:00' }, kr: { label: '저녁', range: '18:00 - 22:00' } },
    { id: 'Night', en: { label: 'Night', range: '22:00 - 6:00' }, kr: { label: '밤', range: '22:00 - 6:00' } },
  ],
  pattern: { en: "Is it constant or does it come and go?", kr: "지속적인가요, 아니면 있다가 없다가 하나요?" },
  patternOptions: { en: ["Constant", "Intermittent"], kr: ["지속적", "간헐적"] },
  severity: { en: "Severity (0-10)", kr: "심각도 (0-10점)" },
  severityDesc: { en: "0: no pain, 10: worst imaginable", kr: "0: 통증 없음, 10: 상상할 수 있는 최악의 통증" },
  location: { en: "Where is it?", kr: "어디가 아픈가요?" },
  radiation: { en: "Does it spread anywhere?", kr: "다른 곳으로 퍼지나요?" },
  
  assocSymptomsTitle: { en: "Associated Symptoms", kr: "동반 증상" },
  assocSymptomsPrompt: { en: "Any of these related symptoms?", kr: "관련된 증상이 있나요?" },
  respiratorySymptoms: [
      { en: "Sore throat", kr: "인후통" }, { en: "Runny nose", kr: "콧물" }, { en: "Wheezing", kr: "쌕쌕거림" },
      { en: "Chest tightness", kr: "가슴 답답함" }, { en: "Exposure to COVID/flu", kr: "코로나/독감 접촉" }
  ],
  giSymptoms: [
      { en: "Vomiting", kr: "구토" }, { en: "Blood in stool", kr: "혈변" }, { en: "Constipation", kr: "변비" },
      { en: "Recent travel", kr: "최근 해외여행" }, { en: "Suspicious food", kr: "의심스러운 음식 섭취" }
  ],
  
  historyTitle: { en: "Medical History", kr: "병력" },
  meds: { en: "Current Medications", kr: "현재 복용 중인 약" },
  medsPlaceholder: { en: "e.g., None, Tylenol", kr: "예: 없음, 타이레놀" },
  allergies: { en: "Drug Allergies", kr: "약물 알레르기" },
  allergiesPlaceholder: { en: "e.g., None, Penicillin", kr: "예: 없음, 페니실린" },
  pmhx: { en: "Past Medical History", kr: "과거 병력" },
  pmhxPlaceholder: { en: "e.g., None, Hypertension", kr: "예: 없음, 고혈압" },
  
  contextTitle: { en: "Special Context", kr: "특이사항" },
  pregnancy: { en: "Pregnancy Status", kr: "임신 여부" },
  pregnancyOptions: { en: ["Yes", "No", "Unsure", "Not applicable"], kr: ["예", "아니오", "불확실", "해당 없음"] },
  selfHarm: { en: "Are you having thoughts of self-harm?", kr: "자해 충동이 있나요?" },
  selfHarmOptions: { en: ["Yes", "No"], kr: ["예", "아니오"] },
  
  goalsTitle: { en: "Goals & Preferences", kr: "방문 목적 및 선호사항" },
  goalsPrompt: { en: "What do you want to achieve today?", kr: "오늘 방문의 목적은 무엇인가요?" },
  goalOptions: [
    { en: "Diagnosis/Advice", kr: "진단/상담" }, { en: "Test (X-ray, lab)", kr: "검사 (엑스레이, 혈액검사)" },
    { en: "Treatment/Medication", kr: "치료/약 처방" }, { en: "Referral letter", kr: "소견서" },
    { en: "Medical certificate", kr: "진단서" }, { en: "Other", kr: "기타" },
  ],
  clinicLang: { en: "Do you prefer English-speaking staff?", kr: "영어 가능 직원을 선호하시나요?" },
  clinicLangOptions: { en: ["Yes", "No", "Doesn’t matter"], kr: ["예", "아니오", "상관 없음"] },
  timePref: { en: "When would you like to visit?", kr: "언제 방문하고 싶으신가요?" },
  timePrefOptions: { en: ["Today", "This week", "Next week"], kr: ["오늘", "이번 주", "다음 주"] },

  reviewTitle: { en: "Review Your Information", kr: "정보 검토" },
  reviewPrompt: { en: "Please check your answers. You can edit any section.", kr: "답변을 확인해주세요. 각 항목을 수정할 수 있습니다." },
  edit: { en: "Edit", kr: "수정" },
  looksGood: { en: "Looks good, Generate Summary", kr: "내용 확인, 요약 생성" },

  summaryTitle: { en: "Consultation Summary", kr: "문진 요약" },
  summaryGenerating: { en: "Generating your summary with AI...", kr: "AI로 요약을 생성 중입니다..." },
  summaryTabKo: { en: "For Clinic (Korean)", kr: "병원 제출용 (한국어)" },
  summaryTabEn: { en: "For You (English)", kr: "본인 확인용 (영어)" },
  copy: { en: "Copy", kr: "복사" },
  copied: { en: "Copied!", kr: "복사됨!" },
  savePdf: { en: "Save as PDF", kr: "PDF로 저장" },
  
  nextStepsTitle: { en: "Next Steps", kr: "다음 단계" },
  findClinics: { en: "Find nearby clinics", kr: "주변 병원 찾기" },
  home: { en: "Home", kr: "처음으로" },

  // FIX: Added missing strings for Triage and Emergency screens to resolve compilation errors.
  triageTitle: { en: "Urgent Check", kr: "긴급 확인" },
  triagePrompt: { en: "Are you experiencing any of the following? This helps us direct you to the right care.", kr: "다음 중 해당하는 증상이 있나요? 적절한 치료를 받을 수 있도록 도와드립니다." },
  triageFlags: [
    { en: "Severe, uncontrolled bleeding", kr: "심각하고 멈추지 않는 출혈" },
    { en: "Severe difficulty breathing", kr: "심각한 호흡 곤란" },
    { en: "Sudden chest pain or pressure", kr: "갑작스러운 가슴 통증 또는 압박감" },
    { en: "Loss of consciousness or fainting", kr: "의식 소실 또는 실신" },
    { en: "Signs of a stroke (e.g., face drooping, arm weakness, speech difficulty)", kr: "뇌졸중 징후 (예: 얼굴 처짐, 팔 힘 빠짐, 언어 장애)" },
  ],
  emergencyTitle: { en: "Seek Immediate Help", kr: "즉시 도움 요청" },
  emergencyMessage: { en: "Based on your symptoms, please seek emergency care immediately. This tool is not for medical emergencies.", kr: "증상에 따라 즉시 응급 치료를 받으시기 바랍니다. 이 도구는 응급 상황을 위한 것이 아닙니다." },
  seeER: { en: "Find Emergency Rooms Near You", kr: "가까운 응급실 찾기" },
  call119: { en: "Call 119", kr: "119에 전화하기" },
  end: { en: "End Pre-consultation", kr: "문진 종료" },

  // New/Updated Strings for IA and new UI
  tabHome: { en: "Home", kr: "홈" },
  tabPreConsultation: { en: "Consult", kr: "문진" },
  tabHospitalSearch: { en: "Hospitals", kr: "병원" },
  
  homeEmergencyTitle: { en: "Emergency?", kr: "응급상황인가요?" },
  emergencySubtitle: { en: "Use these quick actions without sign-in.", kr: "로그인 없이 빠른 기능을 사용하세요." },
  erNearYou: { en: "ER near you", kr: "가까운 응급실" },
  call119Short: { en: "119", kr: "119" },

  homeStartConsult: { en: "Start pre-consultation", kr: "문진 시작하기" },
  findHospitals: { en: "Find hospitals", kr: "병원 찾기" },
  translator: { en: "Translator", kr: "번역기" },
  
  hospitalSearchTitle: { en: "Hospitals", kr: "병원" },
  hospitalSearchPlaceholder: { en: "Search by specialty, location...", kr: "진료과, 지역으로 검색..." },

  // Translator Strings
  tabTranslator: { en: "Translator", kr: "번역기" },
  translatorTitle: { en: "Live Translator", kr: "실시간 번역기" },
  startListening: { en: "Start Listening", kr: "듣기 시작" },
  stopListening: { en: "Stop & Translate", kr: "중지 및 번역" },
  listening: { en: "Listening...", kr: "듣는 중..." },
  translating: { en: "Translating...", kr: "번역 중..." },
  spokenText: { en: "Spoken Text", kr: "음성 텍스트" },
  translation: { en: "Translation", kr: "번역" },
  
  // Settings
  tabSettings: { en: "Settings", kr: "설정" },
  settingsTitle: { en: "Settings", kr: "설정" },
  themeSetting: { en: "Theme", kr: "테마" },
  lightTheme: { en: "Light", kr: "라이트" },
  darkTheme: { en: "Dark", kr: "다크" },
  
  // FIX: Added missing strings for authentication and records screens.
  signInBody: { en: "Sign in to save your history.", kr: "기록을 저장하려면 로그인하세요." },
  signInGoogle: { en: "Sign in with Google", kr: "Google 계정으로 로그인" },
  recordsEmpty: { en: "No past consultation records found.", kr: "과거 문진 기록이 없습니다." },
  profileSignOut: { en: "Sign Out", kr: "로그아웃" },
};

export const initialFormData: FormData = {
  patient: {},
  visit: {
    chief_complaint_text: '',
    body_area: [],
    symptom_type: [],
    onset: '',
    pattern: '',
    severity: 5,
    location: '',
    radiation: '',
    aggravating: [],
    relieving: [],
    associated_symptoms: [],
  },
  history: {
    medications: [],
    allergies: [],
    past_medical_history: [],
    recent_procedures: false,
  },
  context: {
    pregnancy_status: 'Not applicable',
    is_pediatric: false,
    mental_health_self_harm: false,
    travel_exposure: '',
  },
  preferences: {
    goals: [],
    clinic_language_pref: 'Doesn’t matter',
    time_pref: 'Today',
  },
  consent: false,
};