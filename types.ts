// FIX: Using a type-only import for React attributes to create a more robust type definition for the custom element `iconify-icon`.
// This avoids potential module load-order problems associated with a full `import 'react'`.
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

// FIX: Moved SpeechRecognition-related interfaces into `declare global` to make them globally available.
// This resolves the "Cannot find name 'SpeechRecognition'" error and, by ensuring this type definition file is processed correctly,
// it also resolves the widespread "Property 'iconify-icon' does not exist on type 'JSX.IntrinsicElements'" errors.
declare global {
  // Add types for the non-standard SpeechRecognition API to avoid TypeScript errors.
  interface SpeechRecognition extends EventTarget {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      onresult: (event: any) => void;
      onerror: (event: any) => void;
      onend: (() => void) | null;
      onstart: (() => void) | null;
      start: () => void;
      stop: () => void;
      abort: () => void;
  }

  interface SpeechRecognitionStatic {
      new(): SpeechRecognition;
  }

  // Augment the Window interface with SpeechRecognition properties.
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
  }

  namespace JSX {
    interface IntrinsicElements {
      // FIX: Replaced the simplified 'iconify-icon' type with a more robust version that extends React's HTML attributes.
      // This provides full attribute support for the custom element and resolves JSX compilation errors.
      'iconify-icon': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        icon: string;
      };
    }
  }
}

export type Language = 'en' | 'kr';
export type Theme = 'light' | 'dark';

export enum Screen {
  START,
  PROFILE,
  // FIX: Added TRIAGE and EMERGENCY screen enums to resolve compilation errors.
  TRIAGE,
  EMERGENCY,
  CHIEF_COMPLAINT,
  SYMPTOM_STRUCTURE,
  ASSOCIATED_SYMPTOMS,
  HISTORY,
  SPECIAL_CONTEXT,
  GOALS,
  REVIEW,
  SUMMARY,
  NEXT_STEPS,
}

export interface PatientData {
  name?: string;
  dob_year?: number;
  sex_at_birth?: 'Male' | 'Female' | 'Intersex' | 'Prefer not to say';
}

export interface VisitData {
  chief_complaint_text: string;
  body_area: string[];
  symptom_type: string[];
  onset: string;
  pattern: 'Constant' | 'Intermittent' | '';
  severity: number;
  location: string;
  radiation: string;
  aggravating: string[];
  relieving: string[];
  associated_symptoms: string[];
}

export interface HistoryData {
  medications: string[];
  allergies: string[];
  past_medical_history: string[];
  recent_procedures: boolean;
}

export interface SpecialContextData {
  pregnancy_status: 'Yes' | 'No' | 'Unsure' | 'Not applicable';
  is_pediatric: boolean;
  mental_health_self_harm: boolean;
  travel_exposure: string;
}

export interface PreferencesData {
  goals: string[];
  clinic_language_pref: 'Yes' | 'No' | 'Doesn’t matter';
  time_pref: 'Today' | 'This week' | 'Next week';
}

export interface FormData {
  patient: PatientData;
  visit: VisitData;
  history: HistoryData;
  context: SpecialContextData;
  preferences: PreferencesData;
  consent: boolean;
  // FIX: Added triage_flags property to support the triage screen data.
  triage_flags?: string[];
}

export interface Summary {
  en: string;
  ko: string;
}

export interface Hospital {
  dutyName: string; // Hospital Name
  dutyAddr: string; // Address
  dutyTel1: string; // Phone number
  distance: number; // Distance in meters
}

// FIX: Added ConsultationRecord interface to fix import error in RecordsScreen.tsx
export interface ConsultationRecord {
  id: string;
  created_at: string;
  summary_en: string;
}

export type Tab = 'home' | 'consult' | 'hospitals' | 'translator' | 'settings';

// FIX: Add empty export to ensure file is treated as a module, which is required for `declare global` to work correctly.
export {};