// FIX: Import types.ts for side-effects to ensure global JSX namespace augmentations are loaded before any other modules.
import React from 'react';
import '../../types';
import { Language, Tab } from '../../types';
import { STRINGS } from '../../constants';

interface Props {
  lang: Language;
  onStartConsult: () => void;
  setActiveTab: (tab: Tab) => void;
}

const HomeScreen: React.FC<Props> = ({ lang, onStartConsult, setActiveTab }) => {
  return (
    <div className="px-6 py-4 flex flex-col h-full">
      <header className="text-center py-10">
        <h1 className="text-[3rem] font-bold text-[var(--foreground)] tracking-tighter">wellin</h1>
        <p className="text-[var(--muted-foreground)] mt-2">{STRINGS.wellinSubtitle[lang]}</p>
      </header>
      
      <main className="flex-grow space-y-3">
        <button 
          onClick={onStartConsult} 
          className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] font-bold py-4 px-4 rounded-xl hover:opacity-90 transition text-[0.875rem]"
        >
          {STRINGS.homeStartConsult[lang]}
        </button>

        <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setActiveTab('hospitals')} className="bg-[var(--card-background)] border border-[var(--border)] text-[var(--card-foreground)] font-semibold py-4 px-4 rounded-xl hover:bg-[var(--secondary)] transition flex flex-col items-center justify-center space-y-2 text-[0.875rem]">
                <iconify-icon icon="lucide:map-pin" className="text-[1.25rem] mb-1"></iconify-icon>
                <span>{STRINGS.findHospitals[lang]}</span>
            </button>
            <button onClick={() => setActiveTab('translator')} className="bg-[var(--card-background)] border border-[var(--border)] text-[var(--card-foreground)] font-semibold py-4 px-4 rounded-xl hover:bg-[var(--secondary)] transition flex flex-col items-center justify-center space-y-2 text-[0.875rem]">
                <iconify-icon icon="lucide:languages" className="text-[1.25rem] mb-1"></iconify-icon>
                <span>{STRINGS.translator[lang]}</span>
            </button>
        </div>

        <div className="p-4 bg-[var(--card-background)] border border-[var(--border)] rounded-xl mt-6">
          <h2 className="font-bold text-[var(--card-foreground)] text-[1.125rem]">{STRINGS.homeEmergencyTitle[lang]}</h2>
          <p className="text-[0.875rem] text-[var(--muted-foreground)] mb-3">{STRINGS.emergencySubtitle[lang]}</p>
          <div className="flex gap-3">
             <a href="https://www.google.com/maps/search/emergency+room" target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-[var(--secondary)] text-[var(--secondary-foreground)] font-semibold py-2.5 px-3 rounded-lg hover:bg-[var(--border)] transition text-[0.875rem] flex items-center justify-center gap-2">
                <iconify-icon icon="lucide:map-pin" className="text-[0.875rem]"></iconify-icon>
                {STRINGS.erNearYou[lang]}
            </a>
            <a href="tel:119" className="flex-1 text-center bg-[var(--secondary)] text-[var(--secondary-foreground)] font-semibold py-2.5 px-3 rounded-lg hover:bg-[var(--border)] transition text-[0.875rem] flex items-center justify-center gap-2">
                <iconify-icon icon="lucide:phone" className="text-[0.875rem]"></iconify-icon>
                {STRINGS.call119Short[lang]}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;