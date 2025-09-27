
import React from 'react';
import { Language } from '../types';
import { STRINGS } from '../constants';
import Header from './common/Header';

interface Props {
  lang: Language;
  onEnd: () => void;
}

const EmergencyScreen: React.FC<Props> = ({ lang, onEnd }) => {
  return (
    <div className="animate-fade-in text-center p-4 bg-red-50 border-l-4 border-red-500">
      <Header title={STRINGS.emergencyTitle[lang]} subtitle={STRINGS.emergencyMessage[lang]} />
      
      <div className="mt-8 space-y-4">
        <a href="https://www.google.com/maps/search/emergency+room" target="_blank" rel="noopener noreferrer" className="block w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition">
          {STRINGS.seeER[lang]}
        </a>
        <a href="tel:119" className="block w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition">
          {STRINGS.call119[lang]}
        </a>
        <button
          onClick={onEnd}
          className="w-full bg-slate-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-600 transition mt-2"
        >
          {STRINGS.end[lang]}
        </button>
      </div>
    </div>
  );
};

export default EmergencyScreen;
