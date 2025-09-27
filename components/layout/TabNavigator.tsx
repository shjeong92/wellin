// FIX: Import types.ts for side-effects to ensure global JSX namespace augmentations are loaded before any other modules.
import React from 'react';
import '../../types';
import { Language, Tab } from '../../types';
import { STRINGS } from '../../constants';

interface Props {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  lang: Language;
}

const TabNavigator: React.FC<Props> = ({ activeTab, setActiveTab, lang }) => {
  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'home', label: STRINGS.tabHome[lang], icon: 'home' },
    { id: 'consult', label: STRINGS.tabPreConsultation[lang], icon: 'file-text' },
    { id: 'hospitals', label: STRINGS.tabHospitalSearch[lang], icon: 'map-pin' },
    { id: 'settings', label: STRINGS.tabSettings[lang], icon: 'settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-[var(--card-background)] border-t border-[var(--border)] shadow-upper z-10">
      <div className="flex justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center w-full pt-3 pb-2 text-[0.75rem] font-medium transition ${
              activeTab === tab.id ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)] hover:text-[var(--primary)]'
            }`}
          >
            <iconify-icon icon={`lucide:${tab.icon}`} className="mb-1 text-[1.25rem]" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigator;