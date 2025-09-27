import React from 'react';
import { Language } from '../../types';
import { STRINGS } from '../../constants';

interface Props {
  lang: Language;
  onHome: () => void;
  onFindClinics: () => void;
}

const NextStepsScreen: React.FC<Props> = ({ lang, onHome, onFindClinics }) => {
  return (
    <div className="animate-fade-in text-center px-6 py-4">
      
      <div className="mt-8 space-y-4">
        <button onClick={onFindClinics} className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] font-bold py-3 px-4 rounded-lg hover:opacity-90 transition text-[0.875rem]">
          {STRINGS.findClinics[lang]}
        </button>
        <button
          onClick={onHome}
          className="w-full bg-[var(--secondary)] text-[var(--secondary-foreground)] font-bold py-3 px-4 rounded-lg hover:bg-[var(--border)] transition mt-2 text-[0.875rem]"
        >
          {STRINGS.home[lang]}
        </button>
      </div>
    </div>
  );
};

export default NextStepsScreen;