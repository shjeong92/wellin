// FIX: Import types.ts for side-effects to ensure global JSX namespace augmentations for custom elements are loaded before any other modules.
import React, { useState, useCallback } from 'react';
import '../../types';
import { Screen, Language, FormData, Summary, Tab } from '../../types';
import { initialFormData, STRINGS } from '../../constants';
import StartScreen from './StartScreen';
import PatientProfileScreen from './PatientProfileScreen';
import ChiefComplaintScreen from './ChiefComplaintScreen';
import SymptomStructureScreen from './SymptomStructureScreen';
import AssociatedSymptomsScreen from './AssociatedSymptomsScreen';
import HistoryScreen from './HistoryScreen';
import SpecialContextScreen from './SpecialContextScreen';
import GoalsScreen from './GoalsScreen';
import ReviewScreen from './ReviewScreen';
import SummaryScreen from './SummaryScreen';
import NextStepsScreen from './NextStepsScreen';
import AppBar from '../layout/AppBar';

interface PreConsultationFlowProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onComplete: (nextTab?: Tab) => void;
}

const getFlowScreenTitle = (screen: Screen, lang: Language): string => {
    switch(screen) {
        case Screen.PROFILE: return STRINGS.profileTitle[lang];
        case Screen.CHIEF_COMPLAINT: return STRINGS.complaintTitle[lang];
        case Screen.SYMPTOM_STRUCTURE: return STRINGS.symptomStructureTitle[lang];
        case Screen.ASSOCIATED_SYMPTOMS: return STRINGS.assocSymptomsTitle[lang];
        case Screen.HISTORY: return STRINGS.historyTitle[lang];
        case Screen.SPECIAL_CONTEXT: return STRINGS.contextTitle[lang];
        case Screen.GOALS: return STRINGS.goalsTitle[lang];
        case Screen.REVIEW: return STRINGS.reviewTitle[lang];
        case Screen.SUMMARY: return STRINGS.summaryTitle[lang];
        case Screen.NEXT_STEPS: return STRINGS.nextStepsTitle[lang];
        default: return ''; // No title for START
    }
}

const PreConsultationFlow: React.FC<PreConsultationFlowProps> = ({ lang, setLang, onComplete }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.START);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [generatedSummary, setGeneratedSummary] = useState<Summary | null>(null);

  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);
  
  const resetFlow = useCallback(() => {
    setFormData(initialFormData);
    setCurrentScreen(Screen.START);
    setGeneratedSummary(null);
    onComplete(); // Exit flow
  }, [onComplete]);

  const handleBack = () => {
    switch(currentScreen) {
        case Screen.PROFILE: setCurrentScreen(Screen.START); break;
        case Screen.CHIEF_COMPLAINT: setCurrentScreen(Screen.PROFILE); break;
        case Screen.SYMPTOM_STRUCTURE: setCurrentScreen(Screen.CHIEF_COMPLAINT); break;
        case Screen.ASSOCIATED_SYMPTOMS: setCurrentScreen(Screen.SYMPTOM_STRUCTURE); break;
        case Screen.HISTORY: setCurrentScreen(Screen.ASSOCIATED_SYMPTOMS); break;
        case Screen.SPECIAL_CONTEXT: setCurrentScreen(Screen.HISTORY); break;
        case Screen.GOALS: setCurrentScreen(Screen.SPECIAL_CONTEXT); break;
        case Screen.REVIEW: setCurrentScreen(Screen.GOALS); break;
        default: break;
    }
  }

  const renderScreen = () => {
    switch (currentScreen) {
        case Screen.START:
          return <StartScreen setScreen={setCurrentScreen} lang={lang} setLang={setLang} updateFormData={updateFormData} />;
        case Screen.PROFILE:
          return <PatientProfileScreen setScreen={setCurrentScreen} lang={lang} formData={formData} updateFormData={updateFormData} />;
        case Screen.CHIEF_COMPLAINT:
          return <ChiefComplaintScreen setScreen={setCurrentScreen} lang={lang} formData={formData} updateFormData={updateFormData} />;
        case Screen.SYMPTOM_STRUCTURE:
          return <SymptomStructureScreen setScreen={setCurrentScreen} lang={lang} formData={formData} updateFormData={updateFormData} />;
        case Screen.ASSOCIATED_SYMPTOMS:
          return <AssociatedSymptomsScreen setScreen={setCurrentScreen} lang={lang} formData={formData} updateFormData={updateFormData} />;
        case Screen.HISTORY:
          return <HistoryScreen setScreen={setCurrentScreen} lang={lang} formData={formData} updateFormData={updateFormData} />;
        case Screen.SPECIAL_CONTEXT:
          return <SpecialContextScreen setScreen={setCurrentScreen} lang={lang} formData={formData} updateFormData={updateFormData} />;
        case Screen.GOALS:
          return <GoalsScreen setScreen={setCurrentScreen} lang={lang} formData={formData} updateFormData={updateFormData} />;
        case Screen.REVIEW:
          return <ReviewScreen setScreen={setCurrentScreen} lang={lang} formData={formData} />;
        case Screen.SUMMARY:
          return <SummaryScreen setScreen={setCurrentScreen} lang={lang} formData={formData} summary={generatedSummary} setSummary={setGeneratedSummary} />;
        case Screen.NEXT_STEPS:
          return <NextStepsScreen lang={lang} onHome={() => onComplete('home')} onFindClinics={() => onComplete('hospitals')} />;
        default:
          return <StartScreen setScreen={setCurrentScreen} lang={lang} setLang={setLang} updateFormData={updateFormData} />;
      }
  };

  const title = getFlowScreenTitle(currentScreen, lang);
  const showAppBar = currentScreen !== Screen.START;
  const showBackButton = ![Screen.START, Screen.SUMMARY, Screen.NEXT_STEPS].includes(currentScreen);

  return (
    <>
      {showAppBar && <AppBar title={title} onBack={showBackButton ? handleBack : undefined} />}
      {renderScreen()}
    </>
  );
};

export default PreConsultationFlow;