import React, { useState } from 'react';
import { Screen, Language, FormData } from '../../types';
import { STRINGS } from '../../constants';
import Header from '../common/Header';

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
    <div className="animate-fade-in px-6 py-4">
        <div className="flex justify-end mb-4">
            <button onClick={() => setLang('en')} className={`px-3 py-1 text-[0.875rem] rounded-l-md ${lang === 'en' ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--secondary)] text-[var(--secondary-foreground)]'}`}>EN</button>
            <button onClick={() => setLang('kr')} className={`px-3 py-1 text-[0.875rem] rounded-r-md ${lang === 'kr' ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--secondary)] text-[var(--secondary-foreground)]'}`}>KR</button>
        </div>
        <Header title={STRINGS.welcomeTitle[lang]} subtitle={STRINGS.welcomeBody1[lang]} />

      <div className="mt-8 space-y-6">
        <label className="flex items-center space-x-3 cursor-pointer p-3 bg-[var(--muted)] rounded-lg hover:bg-[var(--secondary)]">
          <input
            type="checkbox"
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
            className="h-5 w-5 rounded text-[var(--primary)] bg-[var(--secondary)] border-[var(--input)] focus:ring-[var(--ring)]"
          />
          <span className="text-[var(--foreground)] text-[0.875rem]">{STRINGS.consent[lang]}</span>
        </label>

        <button
          onClick={handleStart}
          disabled={!consentChecked}
          className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] font-bold py-3 px-4 rounded-lg hover:opacity-90 transition disabled:bg-[var(--muted)] disabled:text-[var(--muted-foreground)] disabled:cursor-not-allowed text-[0.875rem]"
        >
          {STRINGS.start[lang]}
        </button>
      </div>
    </div>
  );
};

export default StartScreen;