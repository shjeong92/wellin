import React from 'react';
import { Screen, Language, FormData } from '../types';
import { STRINGS } from '../constants';
import Header from './common/Header';
import ProgressBar from './common/ProgressBar';

interface Props {
  setScreen: (screen: Screen) => void;
  lang: Language;
  formData: FormData;
}

// Fix: Pass `lang` as a prop to `ReviewItem` and use it.
const ReviewItem: React.FC<{label: string, value: string | string[] | number | undefined | boolean, screen: Screen, onEdit: (screen: Screen) => void, lang: Language}> = ({label, value, screen, onEdit, lang}) => {
    const displayValue = Array.isArray(value) ? value.join(', ') : (value?.toString() || (lang === 'en' ? 'Not provided' : '제공 안 함'));
    
    return (
        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-[0.875rem] font-medium text-slate-500">{label}</dt>
            <dd className="mt-1 text-[0.875rem] text-slate-900 sm:mt-0 sm:col-span-2 flex justify-between items-start">
                <span>{displayValue}</span>
                <button onClick={() => onEdit(screen)} className="text-blue-600 hover:text-blue-800 text-[0.875rem] font-medium">{STRINGS.edit[lang]}</button>
            </dd>
        </div>
    );
}


const ReviewScreen: React.FC<Props> = ({ setScreen, lang, formData }) => {
  return (
    <div className="animate-fade-in">
      <ProgressBar current={9} total={9} />
      <Header title={STRINGS.reviewTitle[lang]} subtitle={STRINGS.reviewPrompt[lang]} />

      <div className="border-t border-slate-200">
        <dl className="divide-y divide-slate-200">
          <ReviewItem lang={lang} label={STRINGS.complaintTitle[lang]} value={formData.visit.chief_complaint_text} screen={Screen.CHIEF_COMPLAINT} onEdit={setScreen} />
          <ReviewItem lang={lang} label={STRINGS.symptomStructureTitle[lang]} value={`Severity: ${formData.visit.severity}/10, Onset: ${formData.visit.onset}`} screen={Screen.SYMPTOM_STRUCTURE} onEdit={setScreen} />
          <ReviewItem lang={lang} label={STRINGS.assocSymptomsTitle[lang]} value={formData.visit.associated_symptoms} screen={Screen.ASSOCIATED_SYMPTOMS} onEdit={setScreen} />
          <ReviewItem lang={lang} label={STRINGS.historyTitle[lang]} value={`Meds: ${formData.history.medications.length}, Allergies: ${formData.history.allergies.length}, PMHx: ${formData.history.past_medical_history.length}`} screen={Screen.HISTORY} onEdit={setScreen} />
          <ReviewItem lang={lang} label={STRINGS.goalsTitle[lang]} value={formData.preferences.goals} screen={Screen.GOALS} onEdit={setScreen} />
        </dl>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => setScreen(Screen.SUMMARY)}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          {STRINGS.looksGood[lang]}
        </button>
      </div>
    </div>
  );
};

export default ReviewScreen;