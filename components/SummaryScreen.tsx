
import React, { useEffect, useState } from 'react';
import { Screen, Language, FormData, Summary } from '../types';
import { STRINGS } from '../constants';
import Header from './common/Header';
import { generateSummaries } from '../services/geminiService';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-slate-600">{STRINGS.summaryGenerating[lang]}</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <Header title={STRINGS.summaryTitle[lang]} />
      
      <div>
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-4" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('ko')}
              className={`${activeTab === 'ko' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-[0.875rem]`}
            >
              {STRINGS.summaryTabKo[lang]}
            </button>
            <button
              onClick={() => setActiveTab('en')}
              className={`${activeTab === 'en' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-3 px-1 border-b-2 font-medium text-[0.875rem]`}
            >
              {STRINGS.summaryTabEn[lang]}
            </button>
          </nav>
        </div>
        
        <div className="mt-4 p-4 bg-slate-50 rounded-lg min-h-[200px] whitespace-pre-wrap text-[0.875rem] text-slate-800">
          {summary && summary[activeTab]}
        </div>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 bg-blue-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          {copied ? STRINGS.copied[lang] : STRINGS.copy[lang]}
        </button>
        <button className="flex-1 bg-slate-200 text-slate-800 font-bold py-2.5 px-4 rounded-lg hover:bg-slate-300 transition">
          {STRINGS.savePdf[lang]}
        </button>
      </div>
      
      <div className="mt-8 text-center">
        <button
            onClick={() => setScreen(Screen.NEXT_STEPS)}
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition"
        >
            {STRINGS.continue[lang]}
        </button>
      </div>
    </div>
  );
};

export default SummaryScreen;