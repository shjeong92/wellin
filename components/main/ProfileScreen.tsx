import React from 'react';
import { STRINGS } from '../../constants';
import { Language, Theme } from '../../types';
import { supabase } from '../../services/supabaseClient';
import { User } from '@supabase/supabase-js';

interface Props {
  lang: Language;
  theme: Theme;
  toggleTheme: () => void;
  user: User;
}

const ProfileScreen: React.FC<Props> = ({ lang, theme, toggleTheme, user }) => {

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  }

  const userName = user.user_metadata?.full_name || user.email;
  const userEmail = user.email;

  return (
    <div className="px-6 py-4">
      
      <div className="bg-[var(--muted)] p-4 rounded-lg">
        <p className="font-semibold text-[var(--foreground)]">{userName}</p>
        <p className="text-[0.875rem] text-[var(--muted-foreground)]">{userEmail}</p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between items-center p-4 bg-[var(--muted)] rounded-lg">
            <span className="text-[var(--foreground)] font-medium">
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </span>
            <button onClick={toggleTheme} className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors bg-[var(--secondary)]">
                <span className={`${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-[var(--card-background)] rounded-full transition-transform`} />
            </button>
        </div>

        <button
          onClick={handleSignOut}
          className="w-full bg-[var(--danger)] text-[var(--danger-foreground)] font-bold py-3 px-4 rounded-lg hover:opacity-90 transition text-[0.875rem]"
        >
          {STRINGS.profileSignOut[lang]}
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;