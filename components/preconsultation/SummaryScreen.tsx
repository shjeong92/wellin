import React, { useEffect, useState } from 'react';
import { Screen, Language, FormData, Summary } from '../../types';
import { STRINGS } from '../../constants';
import { generateSummaries } from '../../services/geminiService';

interface Props {
  setScreen: (screen: Screen) => void;
  lang: Language;
  formData: FormData;
  summary: Summary | null;
  setSummary: (summary: Summary) => void;
}

const SummaryScreen: React.FC<Props> = ({ setScreen, lang, formData, summary, setSummary }) => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ko' | 'en'>('ko');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!summary) {
        setLoading(true);
        const result = await generateSummaries(formData);
        setSummary(result);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [formData, summary, setSummary]);

  const handleCopy = () => {
    if (summary) {
      navigator.clipboard.writeText(summary[activeTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-8 animate-fade-in">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto"></div>
        <p className="mt-4 text-[var(--muted-foreground)]">{STRINGS.summaryGenerating[lang]}</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in px-6 py-4">
      
      <div>
        <div className="border-b border-[var(--border)]">
          <nav className="-mb-px flex space-x-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('ko')}
              className={`${activeTab === 'ko' ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-gray-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-[0.875rem]`}
            >
              {STRINGS.summaryTabKo[lang]}
            </button>
            <button
              onClick={() => setActiveTab('en')}
              className={`${activeTab === 'en' ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-gray-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-[0.875rem]`}
            >
              {STRINGS.summaryTabEn[lang]}
            </button>
          </nav>
        </div>
        
        <div className="mt-4 p-4 bg-[var(--muted)] rounded-lg min-h-[200px] whitespace-pre-wrap text-[0.875rem] text-[var(--foreground)]">
          {summary && summary[activeTab]}
        </div>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 bg-[var(--primary)] text-[var(--primary-foreground)] font-bold py-2.5 px-4 rounded-lg hover:opacity-90 transition text-[0.875rem]"
        >
          {copied ? STRINGS.copied[lang] : STRINGS.copy[lang]}
        </button>
        <button className="flex-1 bg-[var(--secondary)] text-[var(--secondary-foreground)] font-bold py-2.5 px-4 rounded-lg hover:bg-[var(--border)] transition text-[0.875rem]">
          {STRINGS.savePdf[lang]}
        </button>
      </div>
      
      <div className="mt-8 text-center">
        <button
            onClick={() => setScreen(Screen.NEXT_STEPS)}
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition text-[0.875rem]"
        >
            {STRINGS.continue[lang]}
        </button>
      </div>
    </div>
  );
};

export default SummaryScreen;
