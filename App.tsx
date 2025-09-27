// FIX: Import React before types.ts to ensure the global JSX namespace is available for augmentation. This resolves errors with custom elements like 'iconify-icon'.
import React, { useState, useEffect } from 'react';
import './types';
import TabNavigator from './components/layout/TabNavigator';
import { Tab, Language, Theme } from './types';
import HomeScreen from './components/main/HomeScreen';
import HospitalSearchScreen from './components/main/HospitalSearchScreen';
import PreConsultationFlow from './components/preconsultation/PreConsultationFlow';
import AppBar from './components/layout/AppBar';
import { STRINGS } from './constants';
import TranslatorScreen from './components/main/TranslatorScreen';
import SettingsScreen from './components/main/SettingsScreen';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('light');
  const [consultationId, setConsultationId] = useState(1);

  // Theme management effects
  useEffect(() => {
    const savedTheme = localStorage.getItem('wellin-theme') as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('wellin-theme', theme);
  }, [theme]);

  const handleStartConsult = () => {
    // Incrementing the key will force React to create a new instance of the
    // PreConsultationFlow component, effectively resetting its state for a new session.
    setConsultationId(id => id + 1);
    setActiveTab('consult');
  };
  
  const handleFlowComplete = (nextTab: Tab = 'home') => {
    setActiveTab(nextTab); 
  }

  const renderAppBar = () => {
    // The Pre-consultation flow and Home screen manage their own headers.
    if (activeTab === 'consult') return null;
    if (activeTab === 'home') return <header className="h-14" />;

    let title = '';
    let onBackHandler: (() => void) | undefined = undefined;
    
    switch (activeTab) {
      case 'hospitals':
        title = STRINGS.tabHospitalSearch[lang];
        break;
      case 'translator':
        title = STRINGS.translatorTitle[lang];
        onBackHandler = () => setActiveTab('home');
        break;
      case 'settings':
        title = STRINGS.settingsTitle[lang];
        break;
    }

    return <AppBar title={title} onBack={onBackHandler} />;
  };

  // Show tabs on all screens except the full-screen translator.
  const showTabs = activeTab !== 'translator';

  return (
    <div className="bg-[var(--muted)] h-screen font-sans flex flex-col">
      <div className="w-full max-w-lg mx-auto relative bg-[var(--card-background)] shadow-lg flex flex-col flex-grow">
        {renderAppBar()}
        <main className={`flex-grow overflow-y-auto ${showTabs ? 'pb-20' : ''}`}>
          {/* 
            Each main screen is kept mounted but hidden with CSS to preserve its state.
            This is crucial for the pre-consultation flow, so users don't lose their
            progress if they switch to another tab.
          */}
          <div style={{ display: activeTab === 'home' ? 'block' : 'none' }} className="h-full">
            <HomeScreen lang={lang} onStartConsult={handleStartConsult} setActiveTab={setActiveTab} />
          </div>
          <div style={{ display: activeTab === 'consult' ? 'block' : 'none' }} className="h-full">
            <PreConsultationFlow key={consultationId} lang={lang} setLang={setLang} onComplete={handleFlowComplete} />
          </div>
          <div style={{ display: activeTab === 'hospitals' ? 'block' : 'none' }} className="h-full">
            <HospitalSearchScreen lang={lang} />
          </div>
          <div style={{ display: activeTab === 'translator' ? 'block' : 'none' }} className="h-full">
            <TranslatorScreen lang={lang} />
          </div>
          <div style={{ display: activeTab === 'settings' ? 'block' : 'none' }} className="h-full">
            <SettingsScreen lang={lang} theme={theme} setTheme={setTheme} />
          </div>
        </main>
      </div>
      {showTabs && (
        <TabNavigator activeTab={activeTab} setActiveTab={setActiveTab} lang={lang} />
      )}
    </div>
  );
};

export default App;