
import React, { useState } from 'react';
import { Screen, Language, FormData } from '../../types';
import { STRINGS } from '../../constants';
import NavButtons from '../common/NavButtons';
import ProgressBar from '../common/ProgressBar';

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
    <div className="animate-fade-in px-6 py-4">
      <ProgressBar current={2} total={9} />
      <p className="mt-1 text-[var(--muted-foreground)] mb-6">{STRINGS.triagePrompt[lang]}</p>
      
      <div className="space-y-3">
        {STRINGS.triageFlags.map((flag, index) => (
          <label key={index} className="flex items-center space-x-3 cursor-pointer p-3 bg-[var(--muted)] rounded-lg hover:bg-[var(--secondary)] border border-transparent has-[:checked]:bg-[var(--danger-secondary)] has-[:checked]:border-[var(--danger)]">
            <input
              type="checkbox"
              checked={selectedFlags.includes(flag.en)}
              onChange={() => handleToggle(flag.en)}
              className="h-5 w-5 rounded text-[var(--danger)] bg-[var(--secondary)] border-[var(--input)] focus:ring-[var(--danger)]"
            />
            <span className="text-[var(--foreground)] text-[0.875rem]">{flag[lang]}</span>
          </label>
        ))}
      </div>
      
      <NavButtons
        onNext={handleNext}
        lang={lang}
      />
    </div>
  );
};

export default TriageScreen;