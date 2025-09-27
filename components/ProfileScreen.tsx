
import React from 'react';
import { Screen, Language, FormData, PatientData } from '../types';
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

const ProfileScreen: React.FC<Props> = ({ setScreen, lang, formData, updateFormData }) => {
  
  const handleUpdate = (field: keyof PatientData, value: any) => {
    updateFormData({ patient: { ...formData.patient, [field]: value } });
  };

  return (
    <div className="animate-fade-in">
      <ProgressBar current={1} total={9} />
      <Header title={STRINGS.profileTitle[lang]} />
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">{STRINGS.name[lang]}</label>
          <input
            type="text"
            value={formData.patient.name || ''}
            onChange={(e) => handleUpdate('name', e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-[0.875rem]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">{STRINGS.dobYear[lang]}</label>
          <input
            type="number"
            value={formData.patient.dob_year || ''}
            onChange={(e) => handleUpdate('dob_year', parseInt(e.target.value))}
            placeholder="YYYY"
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-[0.875rem]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">{STRINGS.sexAtBirth[lang]}</label>
          <select
            value={formData.patient.sex_at_birth || ''}
            onChange={(e) => handleUpdate('sex_at_birth', e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-[0.875rem]"
          >
            <option value="" disabled></option>
            {STRINGS.sexOptions[lang].map((option, index) => (
              <option key={option} value={STRINGS.sexOptions.en[index]}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      
      <NavButtons
        onBack={() => setScreen(Screen.START)}
        onNext={() => setScreen(Screen.TRIAGE)}
        lang={lang}
      />
    </div>
  );
};

export default ProfileScreen;