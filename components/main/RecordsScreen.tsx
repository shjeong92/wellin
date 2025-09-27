// FIX: Import types.ts for side-effects to ensure global JSX namespace augmentations are loaded before any other modules.
import React, { useState, useEffect } from 'react';
import '../../types';
import { Language, ConsultationRecord } from '../../types';
import { STRINGS } from '../../constants';
import { supabase } from '../../services/supabaseClient';

interface Props {
  lang: Language;
}

const RecordsScreen: React.FC<Props> = ({ lang }) => {
  const [records, setRecords] = useState<ConsultationRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('consultations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching records:', error);
        } else if (data) {
          setRecords(data as ConsultationRecord[]);
        }
      }
      setLoading(false);
    };

    fetchRecords();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="px-6 py-4">
        <div className="mt-16 text-center text-[var(--muted-foreground)] flex flex-col items-center justify-center">
          <iconify-icon icon="lucide:folder-x" className="text-[3.75rem] mb-4" />
          <p>{STRINGS.recordsEmpty[lang]}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-4 space-y-3">
      {records.map(record => (
        <div key={record.id} className="bg-[var(--muted)] p-4 rounded-lg border border-[var(--border)]">
          <p className="text-sm text-[var(--muted-foreground)] font-medium">
            {new Date(record.created_at).toLocaleDateString(lang === 'kr' ? 'ko-KR' : 'en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p className="text-[var(--foreground)] mt-1 text-[0.875rem] truncate">
            {record.summary_en}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RecordsScreen;