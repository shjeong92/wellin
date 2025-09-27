import React from 'react';
import { Screen, Language, FormData, SpecialContextData } from '../../types';
import { STRINGS } from '../../constants';
import NavButtons from '../common/NavButtons';
import ProgressBar from '../common/ProgressBar';

interface Props {
  setScreen: (screen: Screen) => void;
  lang: Language;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const SpecialContextScreen: React.FC<Props> = ({ setScreen, lang, formData, updateFormData }) => {
  const updateContextData = (field: keyof SpecialContextData, value: any) => {
    updateFormData({ context: { ...formData.context, [field]: value } });
  };

  const buttonClass = (selected: boolean) => 
    `px-4 py-2 text-[0.875rem] rounded-md border transition ${selected ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--secondary)] border-[var(--border)] text-[var(--secondary-foreground)] hover:border-[var(--primary)]'}`;
  const choiceButtonClass = (selected: boolean) => 
    `flex-1 px-4 py-2 text-[0.875rem] rounded-md border transition ${selected ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--secondary)] border-[var(--border)] text-[var(--secondary-foreground)] hover:border-[var(--primary)]'}`;


  return (
    <div className="animate-fade-in px-6 py-4">
      <ProgressBar current={6} total={7} />

      <div className="space-y-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">{STRINGS.pregnancy[lang]}</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {STRINGS.pregnancyOptions[lang].map((option, index) => (
              <button
                key={option}
                onClick={() => updateContextData('pregnancy_status', STRINGS.pregnancyOptions.en[index] as SpecialContextData['pregnancy_status'])}
                className={buttonClass(formData.context.pregnancy_status === STRINGS.pregnancyOptions.en[index])}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        {formData.visit.symptom_type.includes('Anxiety') && (
            <div>
            <label className="block text-sm font-medium text-[var(--foreground)]">{STRINGS.selfHarm[lang]}</label>
            <div className="flex gap-2 mt-2">
                {STRINGS.selfHarmOptions[lang].map((option, index) => (
                <button
                    key={option}
                    onClick={() => updateContextData('mental_health_self_harm', STRINGS.selfHarmOptions.en[index] === 'Yes')}
                    className={choiceButtonClass(
                        (formData.context.mental_health_self_harm && STRINGS.selfHarmOptions.en[index] === 'Yes') || (!formData.context.mental_health_self_harm && STRINGS.selfHarmOptions.en[index] === 'No')
                    )}
                >
                    {option}
                </button>
                ))}
            </div>
            {formData.context.mental_health_self_harm && (
                <p className="mt-2 text-[0.875rem] text-[var(--danger)] bg-[var(--danger-secondary)] p-2 rounded-md">If you are in crisis, please contact a crisis hotline or seek emergency services immediately.</p>
            )}
            </div>
        )}
      </div>

      <NavButtons
        onNext={() => setScreen(Screen.GOALS)}
        lang={lang}
      />
    </div>
  );
};

export default SpecialContextScreen;