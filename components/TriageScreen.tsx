
import React, { useState } from 'react';
import { Screen, Language, FormData } from '../types';
import { STRINGS } from '../constants';
import Header from './common/Header';
import NavButtons from './common/NavButtons';
import ProgressBar from './common/ProgressBar';

interface Props {
  setScreen: (screen: Screen) => void;
  lang: Language;
  updateFormData: (data: Partial<FormData>) => void;
}

const TriageScreen: React.FC<Props> = ({ setScreen, lang, updateFormData }) => {
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);

  const handleToggle = (flag: string) => {
    setSelectedFlags(prev =>
      prev.includes(flag) ? prev.filter(f => f !== flag) : [...prev, flag]
    );
  };

  const handleNext = () => {
    updateFormData({ triage_flags: selectedFlags });
    if (selectedFlags.length > 0) {
      setScreen(Screen.EMERGENCY);
    } else {
      setScreen(Screen.CHIEF_COMPLAINT);
    }
  };

  return (
    <div className="animate-fade-in">
      <ProgressBar current={2} total={9} />
      <Header title={STRINGS.triageTitle[lang]} subtitle={STRINGS.triagePrompt[lang]} />
      
      <div className="space-y-3">
        {STRINGS.triageFlags.map((flag, index) => (
          <label key={index} className="flex items-center space-x-3 cursor-pointer p-3 bg-slate-50 rounded-lg hover:bg-slate-100 border border-transparent has-[:checked]:bg-red-50 has-[:checked]:border-red-200">
            <input
              type="checkbox"
              checked={selectedFlags.includes(flag.en)}
              onChange={() => handleToggle(flag.en)}
              className="h-5 w-5 rounded text-red-600 focus:ring-red-500 border-slate-300"
            />
            <span className="text-slate-700">{flag[lang]}</span>
          </label>
        ))}
      </div>
      
      <NavButtons
        onBack={() => setScreen(Screen.PROFILE)}
        onNext={handleNext}
        lang={lang}
      />
    </div>
  );
};

export default TriageScreen;
