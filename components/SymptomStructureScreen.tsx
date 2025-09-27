
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

const SymptomStructureScreen: React.FC<Props> = ({ setScreen, lang, formData, updateFormData }) => {

  const updateVisitData = (field: keyof VisitData, value: any) => {
    updateFormData({ visit: { ...formData.visit, [field]: value } });
  };

  return (
    <div className="animate-fade-in">
      <ProgressBar current={4} total={9} />
      <Header title={STRINGS.symptomStructureTitle[lang]} />
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">{STRINGS.onset[lang]}</label>
          <input
            type="text"
            value={formData.visit.onset}
            onChange={(e) => updateVisitData('onset', e.target.value)}
            placeholder={STRINGS.onsetPlaceholder[lang]}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-[0.875rem]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">{STRINGS.pattern[lang]}</label>
           <div className="flex gap-2 mt-2">
            {STRINGS.patternOptions[lang].map((option, index) => (
              <button key={option} onClick={() => updateVisitData('pattern', STRINGS.patternOptions.en[index] as 'Constant' | 'Intermittent')} className={`flex-1 px-3 py-2 text-[0.875rem] rounded-md border transition ${formData.visit.pattern === STRINGS.patternOptions.en[index] ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-slate-100 border-slate-200 text-slate-700'}`}>
                {option}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">{STRINGS.severity[lang]}</label>
          <div className="flex items-center gap-4 mt-1">
            <input
              type="range"
              min="0"
              max="10"
              value={formData.visit.severity}
              onChange={(e) => updateVisitData('severity', parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <span className="font-bold text-blue-600 w-8 text-center">{formData.visit.severity}</span>
          </div>
          <p className="text-[0.75rem] text-slate-500">{STRINGS.severityDesc[lang]}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">{STRINGS.location[lang]}</label>
          <input
            type="text"
            value={formData.visit.location}
            onChange={(e) => updateVisitData('location', e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-[0.875rem]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">{STRINGS.radiation[lang]}</label>
          <input
            type="text"
            value={formData.visit.radiation}
            onChange={(e) => updateVisitData('radiation', e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-[0.875rem]"
          />
        </div>
      </div>
      
      <NavButtons
        onBack={() => setScreen(Screen.CHIEF_COMPLAINT)}
        onNext={() => setScreen(Screen.ASSOCIATED_SYMPTOMS)}
        lang={lang}
      />
    </div>
  );
};

export default SymptomStructureScreen;