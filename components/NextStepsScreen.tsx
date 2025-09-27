
import React from 'react';
import { Language } from '../types';
import { STRINGS } from '../constants';
import Header from './common/Header';

interface Props {
  lang: Language;
  onHome: () => void;
}

const NextStepsScreen: React.FC<Props> = ({ lang, onHome }) => {
  return (
    <div className="animate-fade-in text-center">
      <Header title={STRINGS.nextStepsTitle[lang]} />
      
      <div className="mt-8 space-y-4">
        <button className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition">
          {STRINGS.findClinics[lang]}
        </button>
        {/* FIX: Removed button that referenced non-existent STRINGS.askQuestions, which caused a compilation error. */}
        <button
          onClick={onHome}
          className="w-full bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-lg hover:bg-slate-300 transition mt-2"
        >
          {STRINGS.home[lang]}
        </button>
      </div>
    </div>
  );
};

export default NextStepsScreen;
