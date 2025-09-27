
import React from 'react';
import { Screen, Language, FormData, VisitData } from '../../types';
import { STRINGS } from '../../constants';
import NavButtons from '../common/NavButtons';
import ProgressBar from '../common/ProgressBar';

interface Props {
  setScreen: (screen: Screen) => void;
  lang: Language;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const ChiefComplaintScreen: React.FC<Props> = ({ setScreen, lang, formData, updateFormData }) => {
  
  const updateVisitData = (field: keyof VisitData, value: any) => {
    updateFormData({ visit: { ...formData.visit, [field]: value } });
  };
  
  const handleMultiSelect = (field: 'body_area' | 'symptom_type', value: string) => {
    const currentSelection = formData.visit[field] as string[];
    const newSelection = currentSelection.includes(value)
      ? currentSelection.filter(item => item !== value)
      : [...currentSelection, value];
    updateVisitData(field, newSelection);
  };
  
  const isNextDisabled = !formData.visit.chief_complaint_text && formData.visit.body_area.length === 0 && formData.visit.symptom_type.length === 0;

  const buttonClass = (selected: boolean) => 
    `px-3 py-1.5 text-[0.875rem] rounded-full border transition ${selected ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--secondary)] border-[var(--border)] text-[var(--secondary-foreground)] hover:border-[var(--primary)]'}`;


  return (
    <div className="animate-fade-in px-6 py-4">
      <ProgressBar current={2} total={7} />

      <div className="space-y-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">{STRINGS.complaintFreeText[lang]}</label>
          <textarea
            value={formData.visit.chief_complaint_text}
            onChange={(e) => updateVisitData('chief_complaint_text', e.target.value)}
            rows={2}
            className="mt-1 block w-full px-3 py-2 bg-[var(--card-background)] border border-[var(--input)] rounded-md shadow-sm placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)] focus:border-[var(--ring)] sm:text-[0.875rem] text-[var(--foreground)]"
          />
        </div>

        <div>
            <h3 className="text-sm font-medium text-[var(--foreground)] mb-2">{STRINGS.bodyArea[lang]}</h3>
            <div className="flex flex-wrap gap-2">
                {STRINGS.bodyAreas.map(area => (
                    <button key={area.en} onClick={() => handleMultiSelect('body_area', area.en)} className={buttonClass(formData.visit.body_area.includes(area.en))}>
                        {area[lang]}
                    </button>
                ))}
            </div>
        </div>

        <div>
            <h3 className="text-sm font-medium text-[var(--foreground)] mb-2">{STRINGS.symptomType[lang]}</h3>
            <div className="flex flex-wrap gap-2">
                {STRINGS.symptomTypes.map(type => (
                    <button key={type.en} onClick={() => handleMultiSelect('symptom_type', type.en)} className={buttonClass(formData.visit.symptom_type.includes(type.en))}>
                        {type[lang]}
                    </button>
                ))}
            </div>
        </div>
      </div>
      
      <NavButtons
        onNext={() => setScreen(Screen.SYMPTOM_STRUCTURE)}
        lang={lang}
        nextDisabled={isNextDisabled}
      />
    </div>
  );
};

export default ChiefComplaintScreen;