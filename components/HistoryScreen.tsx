
import React from 'react';
import { Screen, Language, FormData, HistoryData } from '../types';
import { STRINGS } from '../constants';
import Header from './common/Header';
import NavButtons from './common/NavButtons';
import ProgressBar from './common/ProgressBar';

interface Props {
  setScreen: (screen: Screen) => void;
  lang: Language;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

// A helper component to handle text input that becomes a list of strings (tags)
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
            <label className="block text-sm font-medium text-slate-700">{label}</label>
            <div className="mt-1 flex flex-wrap gap-2 p-2 border border-slate-300 rounded-md">
                {value.map(tag => (
                    <span key={tag} className="flex items-center gap-1 bg-blue-100 text-blue-800 text-[0.875rem] font-medium px-2.5 py-0.5 rounded-full">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="text-blue-500 hover:text-blue-700">&times;</button>
                    </span>
                ))}
                <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-grow bg-transparent focus:outline-none sm:text-[0.875rem]"
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
    <div className="animate-fade-in">
      <ProgressBar current={6} total={9} />
      <Header title={STRINGS.historyTitle[lang]} />
      
      <div className="space-y-4">
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
        onBack={() => setScreen(Screen.ASSOCIATED_SYMPTOMS)}
        onNext={() => setScreen(Screen.SPECIAL_CONTEXT)}
        lang={lang}
      />
    </div>
  );
};

export default HistoryScreen;