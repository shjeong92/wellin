
import React from 'react';
import { Screen, Language, FormData, VisitData } from '../types';
import { STRINGS } from '../constants';
import Header from './common/Header';
import NavButtons from './common/NavButtons';
import ProgressBar from './common/ProgressBar';

interface Props {
  setScreen: (screen: Screen) => void;
  lang: Language;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const AssociatedSymptomsScreen: React.FC<Props> = ({ setScreen, lang, formData, updateFormData }) => {

  const handleToggle = (symptom: string) => {
    const currentSymptoms = formData.visit.associated_symptoms;
    const newSymptoms = currentSymptoms.includes(symptom)
      ? currentSymptoms.filter(item => item !== symptom)
      : [...currentSymptoms, symptom];
    updateFormData({ visit: { ...formData.visit, associated_symptoms: newSymptoms } });
  };

  const getRelevantSymptomList = () => {
    const chiefSymptoms = [...formData.visit.symptom_type, ...formData.visit.body_area];
    let symptoms: { en: string; kr: string; }[] = [];
    if (chiefSymptoms.some(s => ['Cough', 'Fever', 'Chest'].includes(s))) {
        symptoms = [...symptoms, ...STRINGS.respiratorySymptoms];
    }
    if (chiefSymptoms.some(s => ['Nausea', 'Diarrhea', 'Abdomen'].includes(s))) {
        symptoms = [...symptoms, ...STRINGS.giSymptoms];
    }
    // Remove duplicates
    return symptoms.filter((s, index, self) => index === self.findIndex((t) => (t.en === s.en)));
  };

  const symptomList = getRelevantSymptomList();

  return (
    <div className="animate-fade-in">
      <ProgressBar current={5} total={9} />
      <Header title={STRINGS.assocSymptomsTitle[lang]} subtitle={STRINGS.assocSymptomsPrompt[lang]} />
      
      {symptomList.length > 0 ? (
        <div className="space-y-3">
          {symptomList.map((symptom) => (
            <label key={symptom.en} className="flex items-center space-x-3 cursor-pointer p-3 bg-slate-50 rounded-lg hover:bg-slate-100 border border-transparent has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200">
              <input
                type="checkbox"
                checked={formData.visit.associated_symptoms.includes(symptom.en)}
                onChange={() => handleToggle(symptom.en)}
                className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span className="text-slate-700">{symptom[lang]}</span>
            </label>
          ))}
        </div>
      ) : (
        <p className="text-slate-500 text-center italic">No specific associated symptoms for your selection. You can continue.</p>
      )}
      
      <NavButtons
        onBack={() => setScreen(Screen.SYMPTOM_STRUCTURE)}
        onNext={() => setScreen(Screen.HISTORY)}
        lang={lang}
      />
    </div>
  );
};

export default AssociatedSymptomsScreen;
