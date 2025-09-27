import React from 'react';
import { Screen, Language, FormData, PreferencesData } from '../../types';
import { STRINGS } from '../../constants';
import NavButtons from '../common/NavButtons';
import ProgressBar from '../common/ProgressBar';

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
  
  const buttonClass = (selected: boolean) => 
    `px-4 py-2 text-[0.875rem] rounded-md border transition ${selected ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--secondary)] border-[var(--border)] text-[var(--secondary-foreground)] hover:border-[var(--primary)]'}`;


  return (
    <div className="animate-fade-in px-6 py-4">
      <ProgressBar current={7} total={7} />

      <div className="space-y-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">{STRINGS.goalsPrompt[lang]}</label>
          <div className="space-y-2">
            {STRINGS.goalOptions.map(goal => (
              <label key={goal.en} className="flex items-center space-x-3 cursor-pointer p-3 bg-[var(--muted)] rounded-lg hover:bg-[var(--secondary)] border border-transparent has-[:checked]:bg-[var(--primary)] has-[:checked]:bg-opacity-20 has-[:checked]:border-[var(--primary)]">
                <input
                  type="checkbox"
                  checked={formData.preferences.goals.includes(goal.en)}
                  onChange={() => handleGoalToggle(goal.en)}
                  className="h-5 w-5 rounded text-[var(--primary)] bg-[var(--secondary)] border-[var(--input)] focus:ring-[var(--ring)]"
                />
                <span className="text-[var(--foreground)] text-[0.875rem]">{goal[lang]}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">{STRINGS.clinicLang[lang]}</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {STRINGS.clinicLangOptions[lang].map((option, index) => (
              <button
                key={option}
                onClick={() => updatePrefsData('clinic_language_pref', STRINGS.clinicLangOptions.en[index] as PreferencesData['clinic_language_pref'])}
                className={buttonClass(formData.preferences.clinic_language_pref === STRINGS.clinicLangOptions.en[index])}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">{STRINGS.timePref[lang]}</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {STRINGS.timePrefOptions[lang].map((option, index) => (
              <button
                key={option}
                onClick={() => updatePrefsData('time_pref', STRINGS.timePrefOptions.en[index] as PreferencesData['time_pref'])}
                className={buttonClass(formData.preferences.time_pref === STRINGS.timePrefOptions.en[index])}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <NavButtons
        onNext={() => setScreen(Screen.REVIEW)}
        lang={lang}
        nextLabel={STRINGS.reviewTitle[lang]}
        nextDisabled={formData.preferences.goals.length === 0}
      />
    </div>
  );
};

export default GoalsScreen;