
import React from 'react';
import { Screen, Language, FormData, PreferencesData } from '../types';
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

const GoalsScreen: React.FC<Props> = ({ setScreen, lang, formData, updateFormData }) => {
  const updatePrefsData = (field: keyof PreferencesData, value: any) => {
    updateFormData({ preferences: { ...formData.preferences, [field]: value } });
  };
  
  const handleGoalToggle = (goal: string) => {
    const currentGoals = formData.preferences.goals;
    const newGoals = currentGoals.includes(goal)
      ? currentGoals.filter(item => item !== goal)
      : [...currentGoals, goal];
    updatePrefsData('goals', newGoals);
  };

  return (
    <div className="animate-fade-in">
      <ProgressBar current={8} total={9} />
      <Header title={STRINGS.goalsTitle[lang]} />

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">{STRINGS.goalsPrompt[lang]}</label>
          <div className="space-y-2">
            {STRINGS.goalOptions.map(goal => (
              <label key={goal.en} className="flex items-center space-x-3 cursor-pointer p-3 bg-slate-50 rounded-lg hover:bg-slate-100 border border-transparent has-[:checked]:bg-blue-50 has-[:checked]:border-blue-200">
                <input
                  type="checkbox"
                  checked={formData.preferences.goals.includes(goal.en)}
                  onChange={() => handleGoalToggle(goal.en)}
                  className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                />
                <span className="text-slate-700">{goal[lang]}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">{STRINGS.clinicLang[lang]}</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {STRINGS.clinicLangOptions[lang].map((option, index) => (
              <button
                key={option}
                onClick={() => updatePrefsData('clinic_language_pref', STRINGS.clinicLangOptions.en[index] as PreferencesData['clinic_language_pref'])}
                className={`px-4 py-2 text-sm rounded-md border transition ${formData.preferences.clinic_language_pref === STRINGS.clinicLangOptions.en[index] ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-slate-100 border-slate-200 text-slate-700'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">{STRINGS.timePref[lang]}</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {STRINGS.timePrefOptions[lang].map((option, index) => (
              <button
                key={option}
                onClick={() => updatePrefsData('time_pref', STRINGS.timePrefOptions.en[index] as PreferencesData['time_pref'])}
                className={`px-4 py-2 text-sm rounded-md border transition ${formData.preferences.time_pref === STRINGS.timePrefOptions.en[index] ? 'bg-blue-100 border-blue-500 text-blue-800' : 'bg-slate-100 border-slate-200 text-slate-700'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <NavButtons
        onBack={() => setScreen(Screen.SPECIAL_CONTEXT)}
        onNext={() => setScreen(Screen.REVIEW)}
        lang={lang}
        nextLabel={STRINGS.reviewTitle[lang]}
        nextDisabled={formData.preferences.goals.length === 0}
      />
    </div>
  );
};

export default GoalsScreen;
