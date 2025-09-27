import React from 'react';
import { STRINGS } from '../../constants';
import { Language } from '../../types';

interface Props {
  onNext: () => void;
  onBack?: () => void;
  lang: Language;
  nextDisabled?: boolean;
  nextLabel?: string;
}

const NavButtons: React.FC<Props> = ({
  onNext,
  onBack,
  lang,
  nextDisabled = false,
  nextLabel,
}) => {
  return (
    <div className={`mt-8 flex ${onBack ? 'justify-between' : 'justify-end'} items-center`}>
      {onBack && (
        <button
          onClick={onBack}
          className="text-[var(--muted-foreground)] font-bold py-2 px-4 rounded-lg hover:bg-[var(--secondary)] transition text-[0.875rem]"
        >
          {STRINGS.back[lang]}
        </button>
      )}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="bg-[var(--primary)] text-[var(--primary-foreground)] font-bold py-2 px-4 rounded-lg hover:opacity-90 transition disabled:bg-[var(--muted)] disabled:text-[var(--muted-foreground)] disabled:cursor-not-allowed text-[0.875rem]"
      >
        {nextLabel || STRINGS.continue[lang]}
      </button>
    </div>
  );
};

export default NavButtons;