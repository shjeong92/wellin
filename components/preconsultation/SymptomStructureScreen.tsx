// FIX: Removed a stray file marker from the top of this file that was causing a critical syntax error.
// FIX: Import types.ts for side-effects to ensure global JSX namespace augmentations are loaded before any other modules.
import '../../types';
import React, { useState, useEffect } from 'react';
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

const SymptomStructureScreen: React.FC<Props> = ({ setScreen, lang, formData, updateFormData }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // When the component loads, parse the existing onset data to populate the UI
  useEffect(() => {
    if (formData.visit.onset) {
      const parts = formData.visit.onset.split(', ');
      // Check if the first part is a valid date format
      if (parts[0] && /^\d{4}-\d{2}-\d{2}$/.test(parts[0])) {
        setSelectedDate(parts[0]);
        if (parts.length > 1 && STRINGS.timeOfDayOptions.some(t => t.id === parts[1])) {
          setSelectedTime(parts[1]);
        }
      } else if (STRINGS.timeOfDayOptions.some(t => t.id === parts[0])) {
        // Handle case where only time was previously selected
        setSelectedTime(parts[0]);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When date or time selection changes, update the main formData
  useEffect(() => {
    // Combine date and time, filtering out empty values.
    const combinedOnset = [selectedDate, selectedTime].filter(Boolean).join(', ');

    // Only call the update function if the calculated onset value is different
    // from the one already in the state. This prevents an infinite loop that would
    // otherwise be caused by including formData.visit in the dependency array.
    if (formData.visit.onset !== combinedOnset) {
        updateFormData({
            visit: {
                ...formData.visit,
                onset: combinedOnset,
            },
        });
    }
  // Add formData.visit and updateFormData to the dependency array to prevent stale state.
  }, [selectedDate, selectedTime, formData.visit, updateFormData]);


  const updateVisitData = (field: keyof VisitData, value: any) => {
    updateFormData({ visit: { ...formData.visit, [field]: value } });
  };
  
  const inputStyles = "mt-1 block w-full px-3 py-2 bg-[var(--card-background)] border border-[var(--input)] rounded-md shadow-sm placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--ring)] focus:border-[var(--ring)] sm:text-[0.875rem] text-[var(--foreground)]";
  const buttonClass = (selected: boolean) => 
    `flex-1 px-3 py-2 text-[0.875rem] rounded-md border transition ${selected ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--secondary)] border-[var(--border)] text-[var(--secondary-foreground)] hover:border-[var(--primary)]'}`;
  
  const timeOptionButtonClass = (selected: boolean) => 
    `p-4 rounded-lg border-2 text-center transition ${selected ? 'bg-[var(--primary)] bg-opacity-10 border-[var(--primary)]' : 'bg-[var(--card-background)] border-[var(--border)] hover:border-[var(--input)]'}`;


  return (
    <div className="animate-fade-in px-6 py-4">
      <ProgressBar current={3} total={7} />
      
      <div className="space-y-6 mt-6">
        {/* Onset Date and Time Picker */}
        <div>
          <h3 className="block text-lg font-bold text-[var(--foreground)] mb-4">{STRINGS.onset[lang]}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]">{STRINGS.selectDate[lang]}</label>
              
              <div className="relative mt-1">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className={`w-full px-3 py-2 bg-[var(--card-background)] border border-[var(--input)] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[var(--ring)] ${selectedDate ? 'text-[var(--foreground)]' : 'text-[var(--muted-foreground)]'}`}
                  aria-label={STRINGS.pickADate[lang]}
                />
              </div>

            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)]">{STRINGS.timeOfDay[lang]}</label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {STRINGS.timeOfDayOptions.map(time => (
                  <button key={time.id} onClick={() => setSelectedTime(time.id)} className={timeOptionButtonClass(selectedTime === time.id)}>
                    <p className="font-semibold text-[var(--foreground)]">{time[lang].label}</p>
                    <p className="text-sm text-[var(--muted-foreground)]">{time[lang].range}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">{STRINGS.pattern[lang]}</label>
           <div className="flex gap-2 mt-2">
            {STRINGS.patternOptions[lang].map((option, index) => (
              <button key={option} onClick={() => updateVisitData('pattern', STRINGS.patternOptions.en[index] as 'Constant' | 'Intermittent')} className={buttonClass(formData.visit.pattern === STRINGS.patternOptions.en[index])}>
                {option}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">{STRINGS.severity[lang]}</label>
          <div className="flex items-center gap-4 mt-1">
            <input
              type="range"
              min="0"
              max="10"
              value={formData.visit.severity}
              onChange={(e) => updateVisitData('severity', parseInt(e.target.value))}
              className="w-full h-2 bg-[var(--secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
            />
            <span className="font-bold text-[var(--primary)] w-8 text-center">{formData.visit.severity}</span>
          </div>
          <p className="text-[0.75rem] text-[var(--muted-foreground)]">{STRINGS.severityDesc[lang]}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">{STRINGS.location[lang]}</label>
          <input
            type="text"
            value={formData.visit.location}
            onChange={(e) => updateVisitData('location', e.target.value)}
            className={inputStyles}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)]">{STRINGS.radiation[lang]}</label>
          <input
            type="text"
            value={formData.visit.radiation}
            onChange={(e) => updateVisitData('radiation', e.target.value)}
            className={inputStyles}
          />
        </div>
      </div>
      
      <NavButtons
        onNext={() => setScreen(Screen.ASSOCIATED_SYMPTOMS)}
        lang={lang}
      />
    </div>
  );
};

export default SymptomStructureScreen;