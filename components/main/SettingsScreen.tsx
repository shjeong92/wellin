// FIX: Import types.ts for side-effects to ensure global JSX namespace augmentations are loaded before any other modules.
import React from 'react';
import '../../types';
import { Language, Theme } from '../../types';
import { STRINGS } from '../../constants';

interface Props {
  lang: Language;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const SettingsScreen: React.FC<Props> = ({ lang, theme, setTheme }) => {
  const buttonClass = (selected: boolean) =>
    `flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--secondary)] focus:ring-[var(--primary)] ${
      selected
        ? 'bg-[var(--primary)] text-[var(--primary-foreground)] shadow'
        : 'bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--border)]'
    }`;

  return (
    <div className="px-6 py-4">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
            {STRINGS.themeSetting[lang]}
          </label>
          <div className="flex items-center space-x-2 p-1 bg-[var(--secondary)] rounded-lg">
            <button
              onClick={() => setTheme('light')}
              className={buttonClass(theme === 'light')}
              aria-pressed={theme === 'light'}
            >
              <div className="flex items-center justify-center gap-2">
                <iconify-icon icon="lucide:sun" />
                <span>{STRINGS.lightTheme[lang]}</span>
              </div>
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={buttonClass(theme === 'dark')}
              aria-pressed={theme === 'dark'}
            >
              <div className="flex items-center justify-center gap-2">
                <iconify-icon icon="lucide:moon" />
                <span>{STRINGS.darkTheme[lang]}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;