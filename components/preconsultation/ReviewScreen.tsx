import React from 'react';
import { Screen, Language, FormData } from '../../types';
import { STRINGS } from '../../constants';
import ProgressBar from '../common/ProgressBar';

interface Props {
  setScreen: (screen: Screen) => void;
  lang: Language;
  formData: FormData;
}

const ReviewItem: React.FC<{label: string, value: string | string[] | number | undefined | boolean, screen: Screen, onEdit: (screen: Screen) => void, lang: Language}> = ({label, value, screen, onEdit, lang}) => {
    const displayValue = Array.isArray(value) && value.length > 0 ? value.join(', ') : (value ? value.toString() : (lang === 'en' ? 'Not provided' : '제공 안 함'));
    
    return (
        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-[0.875rem] font-medium text-[var(--muted-foreground)]">{label}</dt>
            <dd className="mt-1 text-[0.875rem] text-[var(--foreground)] sm:mt-0 sm:col-span-2 flex justify-between items-start">
                <span className="flex-1 pr-4">{displayValue}</span>
                <button onClick={() => onEdit(screen)} className="text-[var(--primary)] hover:opacity-80 text-[0.875rem] font-medium">{STRINGS.edit[lang]}</button>
            </dd>
        </div>
    );
}


const ReviewScreen: React.FC<Props> = ({ setScreen, lang, formData }) => {
  return (
    <div className="animate-fade-in px-6 py-4">
      <ProgressBar current={7} total={7} />
      <p className="text-[var(--muted-foreground)] my-4">{STRINGS.reviewPrompt[lang]}</p>

      <div className="border-t border-[var(--border)]">
        <dl className="divide-y divide-[var(--border)]">
          <ReviewItem lang={lang} label={STRINGS.complaintFreeText[lang]} value={formData.visit.chief_complaint_text} screen={Screen.CHIEF_COMPLAINT} onEdit={setScreen} />
          <ReviewItem lang={lang} label={STRINGS.symptomStructureTitle[lang]} value={`Severity: ${formData.visit.severity}/10, Onset: ${formData.visit.onset}`} screen={Screen.SYMPTOM_STRUCTURE} onEdit={setScreen} />
          <ReviewItem lang={lang} label={STRINGS.assocSymptomsTitle[lang]} value={formData.visit.associated_symptoms} screen={Screen.ASSOCIATED_SYMPTOMS} onEdit={setScreen} />
          <ReviewItem lang={lang} label={STRINGS.historyTitle[lang]} value={`Meds: ${formData.history.medications.join(', ') || 'None'}, Allergies: ${formData.history.allergies.join(', ') || 'None'}, PMHx: ${formData.history.past_medical_history.join(', ') || 'None'}`} screen={Screen.HISTORY} onEdit={setScreen} />
          <ReviewItem lang={lang} label={STRINGS.goalsTitle[lang]} value={formData.preferences.goals} screen={Screen.GOALS} onEdit={setScreen} />
        </dl>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => setScreen(Screen.SUMMARY)}
          className="bg-[var(--primary)] text-[var(--primary-foreground)] font-bold py-3 px-6 rounded-lg hover:opacity-90 transition text-[0.875rem]"
        >
          {STRINGS.looksGood[lang]}
        </button>
      </div>
    </div>
  );
};

export default ReviewScreen;