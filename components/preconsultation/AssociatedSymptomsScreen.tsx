
import React from 'react';
import { Screen, Language, FormData } from '../../types';
import { STRINGS } from '../../constants';
import NavButtons from '../common/NavButtons';
import ProgressBar from '../common/ProgressBar';

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
    if (chiefSymptoms.some(s => ['Cough', 'Fever', 'Chest', 'Head/Neck'].includes(s))) {
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
    <div className="animate-fade-in px-6 py-4">
      <ProgressBar current={4} total={7} />
      <p className="mt-1 text-[var(--muted-foreground)] mb-6">{STRINGS.assocSymptomsPrompt[lang]}</p>
      
      {symptomList.length > 0 ? (
        <div className="space-y-3">
          {symptomList.map((symptom) => (
            <label key={symptom.en} className="flex items-center space-x-3 cursor-pointer p-3 bg-[var(--muted)] rounded-lg hover:bg-[var(--secondary)] border border-transparent has-[:checked]:bg-[var(--primary)] has-[:checked]:bg-opacity-20 has-[:checked]:border-[var(--primary)]">
              <input
                type="checkbox"
                checked={formData.visit.associated_symptoms.includes(symptom.en)}
                onChange={() => handleToggle(symptom.en)}
                className="h-5 w-5 rounded text-[var(--primary)] bg-[var(--secondary)] border-[var(--input)] focus:ring-[var(--ring)]"
              />
              <span className="text-[var(--foreground)] text-[0.875rem]">{symptom[lang]}</span>
            </label>
          ))}
        </div>
      ) : (
        <p className="text-[var(--muted-foreground)] text-center italic">No specific associated symptoms for your selection. You can continue.</p>
      )}
      
      <NavButtons
        onNext={() => setScreen(Screen.HISTORY)}
        lang={lang}
      />
    </div>
  );
};

export default AssociatedSymptomsScreen;