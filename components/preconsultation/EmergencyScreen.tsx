import React from 'react';
import { Language } from '../../types';
import { STRINGS } from '../../constants';
import Header from '../common/Header';

interface Props {
  lang: Language;
  onEnd: () => void;
}

const EmergencyScreen: React.FC<Props> = ({ lang, onEnd }) => {
  return (
    <div className="animate-fade-in text-center px-6 py-4 bg-[var(--danger-secondary)] border-l-4 border-[var(--danger)]">
      <Header title={STRINGS.emergencyTitle[lang]} subtitle={STRINGS.emergencyMessage[lang]} />
      
      <div className="mt-8 space-y-4">
        <a href="https://www.google.com/maps/search/emergency+room" target="_blank" rel="noopener noreferrer" className="block w-full bg-[var(--danger)] text-[var(--danger-foreground)] font-bold py-3 px-4 rounded-lg hover:opacity-90 transition text-[0.875rem]">
          {STRINGS.seeER[lang]}
        </a>
        <a href="tel:119" className="block w-full bg-[var(--danger)] text-[var(--danger-foreground)] font-bold py-3 px-4 rounded-lg hover:opacity-90 transition text-[0.875rem]">
          {STRINGS.call119[lang]}
        </a>
        <button
          onClick={onEnd}
          className="w-full bg-[var(--secondary)] text-[var(--secondary-foreground)] font-bold py-3 px-4 rounded-lg hover:bg-[var(--border)] transition mt-2 text-[0.875rem]"
        >
          {STRINGS.end[lang]}
        </button>
      </div>
    </div>
  );
};

export default EmergencyScreen;