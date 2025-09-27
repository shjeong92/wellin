
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

const ChiefComplaintScreen: React.FC<Props> = ({ setScreen, lang, formData, updateFormData }) => {
  
  const updateVisitData = (field: keyof VisitData, value: any) => {
    updateFormData({ visit: { ...formData.visit, [field]: value } });
  };
  
  const handleMultiSelect = (field: 'body_area' | 'symptom_type', value: string) => {
    const currentSelection = formData.visit[field];
    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter(item => item !== value)
      : [...currentSelection, value];
    updateVisitData(field, newSelection);
  };
  
  const isNextDisabled = !formData.visit.chief_complaint_text && formData.visit.body_area.length === 0 && formData.visit.symptom_type.length === 0;

  return (
    <div className="animate-fade-in">
      <ProgressBar current={3} total={9} />
      <Header title={STRINGS.complaintTitle[lang]} />

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700">{STRINGS.complaintFreeText[lang]}</label>
          <textarea
            value={formData.visit.chief_complaint_text}
            onChange={(e) => updateVisitData('chief_complaint_text', e.target.value)}
            rows={2}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-[0.875rem]"
          />
        </div>

        <div>
            <h3 className="text-sm font-medium text-slate-700 mb-2">{STRINGS.bodyArea[lang]}</h3>
            <div className="flex flex-wrap gap-2">
                {STRINGS.bodyAreas.map(area => (
                    <button key={area.en} onClick={() => handleMultiSelect('body_area', area.en)} className={`px-3 py-1.5 text-[0.875rem] rounded-full border transition ${formData.visit.body_area.includes(area.en) ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
                        {area[lang]}
                    </button>
                ))}
            </div>
        </div>

        <div>
            <h3 className="text-sm font-medium text-slate-700 mb-2">{STRINGS.symptomType[lang]}</h3>
            <div className="flex flex-wrap gap-2">
                {STRINGS.symptomTypes.map(type => (
                    <button key={type.en} onClick={() => handleMultiSelect('symptom_type', type.en)} className={`px-3 py-1.5 text-[0.875rem] rounded-full border transition ${formData.visit.symptom_type.includes(type.en) ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
                        {type[lang]}
                    </button>
                ))}
            </div>
        </div>
      </div>
      
      <NavButtons
        onBack={() => setScreen(Screen.TRIAGE)}
        onNext={() => setScreen(Screen.SYMPTOM_STRUCTURE)}
        lang={lang}
        nextDisabled={isNextDisabled}
      />
    </div>
  );
};

export default ChiefComplaintScreen;