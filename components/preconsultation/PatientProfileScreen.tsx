
import React from 'react';
import { Screen, Language, FormData, PatientData } from '../../types';
import { STRINGS } from '../../constants';
import NavButtons from '../common/NavButtons';
import ProgressBar from '../common/ProgressBar';

interface Props {
  setScreen: (screen: Screen) => void;
  lang: Language;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const PatientProfileScreen: React.FC<Props> = ({ setScreen, lang, formData, updateFormData }) => {
  
  const handleUpdate = (field: keyof PatientData, value: any) => {
    updateFormData({ patient: { ...formData.patient, [field]: value } });
  };

  const inputStyles = "mt-1 block w-full px-3 py-2 bg-[var(--card-background)] border border-[var(--input)] rounded-md shadow-sm placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)] focus:border-[var(--ring)] sm:text-[0.875rem] text-[var(--foreground)]";

  return (
    <div className="animate-fade-in px-6 py-4">
      <ProgressBar current={1} total={7} />
      
      <div className="space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">{STRINGS.name[lang]}</label>
          <input
            type="text"
            value={formData.patient.name || ''}
            onChange={(e) => handleUpdate('name', e.target.value)}
            className={inputStyles}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">{STRINGS.dobYear[lang]}</label>
          <input
            type="number"
            value={formData.patient.dob_year || ''}
            onChange={(e) => handleUpdate('dob_year', parseInt(e.target.value) || undefined)}
            placeholder="YYYY"
            className={inputStyles}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">{STRINGS.sexAtBirth[lang]}</label>
          <select
            value={formData.patient.sex_at_birth || ''}
            onChange={(e) => handleUpdate('sex_at_birth', e.target.value)}
            className={inputStyles}
          >
            <option value="" disabled></option>
            {STRINGS.sexOptions[lang].map((option, index) => (
              <option key={option} value={STRINGS.sexOptions.en[index]}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      
      <NavButtons
        onNext={() => setScreen(Screen.CHIEF_COMPLAINT)}
        lang={lang}
      />
    </div>
  );
};

export default PatientProfileScreen;