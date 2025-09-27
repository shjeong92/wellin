
import React from 'react';
import { Screen, Language, FormData, SpecialContextData } from '../types';
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

const SpecialContextScreen: React.FC<Props> = ({ setScreen, lang, formData, updateFormData }) => {
  const updateContextData = (field: keyof SpecialContextData, value: any) => {
    updateFormData({ context: { ...formData.context, [field]: value } });
  };

  return (
    <div className="animate-fade-in">
      <ProgressBar current={7} total={9} />
      <Header title={STRINGS.contextTitle[lang]} />

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">{STRINGS.pregnancy[lang]}</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {STRINGS.pregnancyOptions[lang].map((option, index) => (
              <button
                key={option}
                onClick={() => updateContextData('pregnancy_status', STRINGS.pregnancyOptions.en[index] as SpecialContextData['pregnancy_status'])}
                className={`px-4 py-2 text-[0.875rem] rounded-md border transition ${formData.context.pregnancy_status === STRINGS.pregnancyOptions.en[index] ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-slate-100 border-slate-200 text-slate-700'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        {formData.visit.symptom_type.includes('Anxiety') && (
            <div>
            <label className="block text-sm font-medium text-slate-700">{STRINGS.selfHarm[lang]}</label>
            <div className="flex gap-2 mt-2">
                {STRINGS.selfHarmOptions[lang].map((option, index) => (
                <button
                    key={option}
                    onClick={() => updateContextData('mental_health_self_harm', STRINGS.selfHarmOptions.en[index] === 'Yes')}
                    className={`flex-1 px-4 py-2 text-[0.875rem] rounded-md border transition ${
                        (formData.context.mental_health_self_harm && STRINGS.selfHarmOptions.en[index] === 'Yes') || (!formData.context.mental_health_self_harm && STRINGS.selfHarmOptions.en[index] === 'No')
                         ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-slate-100 border-slate-200 text-slate-700'}`}
                >
                    {option}
                </button>
                ))}
            </div>
            {formData.context.mental_health_self_harm && (
                <p className="mt-2 text-[0.875rem] text-red-600 bg-red-50 p-2 rounded-md">If you are in crisis, please contact a crisis hotline or seek emergency services immediately.</p>
            )}
            </div>
        )}
      </div>

      <NavButtons
        onBack={() => setScreen(Screen.HISTORY)}
        onNext={() => setScreen(Screen.GOALS)}
        lang={lang}
      />
    </div>
  );
};

export default SpecialContextScreen;