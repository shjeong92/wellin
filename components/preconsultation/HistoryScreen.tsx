
import React from 'react';
import { Screen, Language, FormData, HistoryData } from '../../types';
import { STRINGS } from '../../constants';
import NavButtons from '../common/NavButtons';
import ProgressBar from '../common/ProgressBar';

interface Props {
  setScreen: (screen: Screen) => void;
  lang: Language;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const TagInput: React.FC<{label: string, placeholder: string, value: string[], onChange: (value: string[]) => void}> = ({ label, placeholder, value, onChange }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = e.currentTarget.value.trim();
            if (newTag && !value.includes(newTag)) {
                onChange([...value, newTag]);
                e.currentTarget.value = '';
            }
        }
    };
    
    const removeTag = (tagToRemove: string) => {
        onChange(value.filter(tag => tag !== tagToRemove));
    };
    
    return (
        <div>
            <label className="block text-sm font-medium text-[var(--foreground)]">{label}</label>
            <div className="mt-1 flex flex-wrap gap-2 p-2 border border-[var(--input)] rounded-md bg-[var(--card-background)]">
                {value.map(tag => (
                    <span key={tag} className="flex items-center gap-1 bg-[var(--primary)] bg-opacity-20 text-[var(--primary)] text-[0.875rem] font-medium px-2.5 py-0.5 rounded-full">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="text-[var(--primary)] hover:opacity-75">&times;</button>
                    </span>
                ))}
                <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-grow bg-transparent focus:outline-none sm:text-[0.875rem] text-[var(--foreground)] placeholder-[var(--muted-foreground)]"
                />
            </div>
        </div>
    );
};


const HistoryScreen: React.FC<Props> = ({ setScreen, lang, formData, updateFormData }) => {

  const updateHistoryData = (field: keyof HistoryData, value: any) => {
    updateFormData({ history: { ...formData.history, [field]: value } });
  };
  
  return (
    <div className="animate-fade-in px-6 py-4">
      <ProgressBar current={5} total={7} />
      
      <div className="space-y-4 mt-6">
        <TagInput 
            label={STRINGS.meds[lang]}
            placeholder={STRINGS.medsPlaceholder[lang]}
            value={formData.history.medications}
            onChange={(val) => updateHistoryData('medications', val)}
        />
        <TagInput 
            label={STRINGS.allergies[lang]}
            placeholder={STRINGS.allergiesPlaceholder[lang]}
            value={formData.history.allergies}
            onChange={(val) => updateHistoryData('allergies', val)}
        />
        <TagInput 
            label={STRINGS.pmhx[lang]}
            placeholder={STRINGS.pmhxPlaceholder[lang]}
            value={formData.history.past_medical_history}
            onChange={(val) => updateHistoryData('past_medical_history', val)}
        />
      </div>
      
      <NavButtons
        onNext={() => setScreen(Screen.SPECIAL_CONTEXT)}
        lang={lang}
      />
    </div>
  );
};

export default HistoryScreen;