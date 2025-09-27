// FIX: Import types.ts for side-effects to ensure global JSX namespace augmentations for custom elements are loaded before any other modules.
import React from 'react';
import '../../types';

interface Props {
  title: string;
  onBack?: () => void;
  children?: React.ReactNode;
}

const AppBar: React.FC<Props> = ({ title, onBack, children }) => {
  return (
    <header className="flex-shrink-0 flex items-center h-14 px-4 bg-[var(--card-background)] border-b border-[var(--border)] sticky top-0 z-10">
      <div className="flex items-center flex-1">
        {onBack && (
          <button onClick={onBack} aria-label="Go back" className="mr-2 p-2 -ml-2 rounded-full hover:bg-[var(--secondary)] transition-colors">
            <iconify-icon icon="lucide:arrow-left" className="text-[1.25rem] text-[var(--foreground)]" />
          </button>
        )}
        <h1 className="text-lg font-bold text-[var(--foreground)] truncate">
          {title}
        </h1>
      </div>
      {children && <div className="ml-auto">{children}</div>}
    </header>
  );
};

export default AppBar;