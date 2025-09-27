import React from 'react';
import { STRINGS } from '../../constants';
import { Language } from '../../types';
import { supabase } from '../../services/supabaseClient';

interface Props {
  lang: Language;
}

const SignInScreen: React.FC<Props> = ({ lang }) => {
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <div className="px-6 py-4 text-center">
      <p className="mt-1 text-[var(--muted-foreground)]">{STRINGS.signInBody[lang]}</p>
      <div className="mt-8">
        <button
          onClick={handleSignIn}
          className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] font-bold py-3 px-4 rounded-lg hover:opacity-90 transition flex items-center justify-center text-[0.875rem]"
        >
          {/* Dummy Google Icon */}
          <svg className="w-4 h-4 mr-2" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
            <path fill="#1976D2" d="M43.611 20.083L43.595 20H24v8h11.303a12.04 12.04 0 0 1-11.303 8L24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12l5.657 5.657C30.158 18.846 27.059 20 24 20v.083z"></path>
          </svg>
          {STRINGS.signInGoogle[lang]}
        </button>
      </div>
    </div>
  );
};

export default SignInScreen;