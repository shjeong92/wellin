
import React, { useState } from 'react';
import { Screen, Language, FormData } from '../types';
import { STRINGS } from '../constants';
import Header from './common/Header';

interface Props {
  setScreen: (screen: Screen) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  updateFormData: (data: Partial<FormData>) => void;
}

const StartScreen: React.FC<Props> = ({ setScreen, lang, setLang, updateFormData }) => {
  const [consentChecked, setConsentChecked] = useState(false);

  const handleStart = () => {
    if (consentChecked) {
      updateFormData({ consent: true });
      setScreen(Screen.PROFILE);
    }
  };

  return (
    <div className="animate-fade-in">
        <div className="flex justify-end mb-4">
            <button onClick={() => setLang('en')} className={`px-3 py-1 text-[0.875rem] rounded-l-md ${lang === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>EN</button>
            <button onClick={() => setLang('kr')} className={`px-3 py-1 text-[0.875rem] rounded-r-md ${lang === 'kr' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>KR</button>
        </div>
        <Header title={STRINGS.welcomeTitle[lang]} subtitle={STRINGS.welcomeBody1[lang]} />

      <div className="mt-8 space-y-6">
        <label className="flex items-center space-x-3 cursor-pointer p-3 bg-slate-50 rounded-lg hover:bg-slate-100">
          <input
            type="checkbox"
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
            className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
          />
          <span className="text-slate-700 text-[0.875rem]">{STRINGS.consent[lang]}</span>
        </label>

        <button
          onClick={handleStart}
          disabled={!consentChecked}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          {STRINGS.start[lang]}
        </button>
      </div>
    </div>
  );
};

export default StartScreen;