// FIX: Import types.ts for side-effects to ensure global JSX namespace augmentations are loaded before any other modules.
import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../../types';
import { Language } from '../../types';
import { STRINGS } from '../../constants';
import { translateText } from '../../services/geminiService';

// SpeechRecognition API - access via window
// FIX: Renamed constant to avoid name collision with the SpeechRecognition interface type.
const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

const TranslatorScreen: React.FC<{ lang: Language }> = ({ lang }) => {
    const [isListening, setIsListening] = useState(false);
    const [finalTranscribedText, setFinalTranscribedText] = useState('');
    const [interimTranscribedText, setInterimTranscribedText] = useState('');
    const [englishTranslation, setEnglishTranslation] = useState('');
    const [koreanTranslation, setKoreanTranslation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isRecognitionReady, setIsRecognitionReady] = useState(false);
    const [speechLang, setSpeechLang] = useState<Language>('en');

    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const wasListening = useRef(false);

    const handleTranslate = useCallback(async () => {
        const textToTranslate = (finalTranscribedText + ' ' + interimTranscribedText).trim();
        if (!textToTranslate) return;

        setIsLoading(true);
        setError('');
        setEnglishTranslation('');
        setKoreanTranslation('');
        
        try {
            const result = await translateText(textToTranslate);
            setEnglishTranslation(result.en);
            setKoreanTranslation(result.ko);
        } catch (e) {
            setError('Translation failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [finalTranscribedText, interimTranscribedText]);

    // Setup Speech Recognition
    useEffect(() => {
        if (!SpeechRecognitionAPI) {
            setError('Speech recognition not supported by this browser.');
            setIsRecognitionReady(false);
            return;
        }

        try {
            const recognition = new SpeechRecognitionAPI();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = speechLang === 'kr' ? 'ko-KR' : 'en-US';
            
            recognition.onstart = () => {
                setIsListening(true);
            };

            // FIX: Replaced the onresult handler with a more robust implementation.
            // This version rebuilds the entire transcript from the cumulative `event.results` list each time,
            // which is more reliable across different languages and browser implementations than appending partial results.
            recognition.onresult = (event) => {
                let finalTranscript = '';
                let interimTranscript = '';

                for (let i = 0; i < event.results.length; i++) {
                    const transcriptPart = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcriptPart;
                    } else {
                        interimTranscript += transcriptPart;
                    }
                }
                
                setFinalTranscribedText(finalTranscript);
                setInterimTranscribedText(interimTranscript);
            };

            recognition.onerror = (event) => {
                if (event.error === 'not-allowed') {
                    setError('Microphone access denied. Please enable it in your browser settings.');
                } else if (event.error === 'language-not-supported') {
                    setError(`The selected language (${speechLang}) is not supported by your browser.`);
                } else {
                    setError(`Error: ${event.error}`);
                }
                setIsListening(false);
            };
            
            recognition.onend = () => {
                setIsListening(false);
            };
            
            recognitionRef.current = recognition;
            setIsRecognitionReady(true);
            setError(''); 
        } catch(e) {
            console.error('Failed to initialize Speech Recognition:', e);
            setError('Failed to initialize speech recognition. This feature might be unsupported or blocked by your browser.');
            setIsRecognitionReady(false);
        }


        return () => {
            recognitionRef.current?.abort();
        };
    }, [speechLang]);
    
    // Effect to trigger translation when listening stops
    useEffect(() => {
        if (wasListening.current && !isListening) {
            handleTranslate();
        }
        wasListening.current = isListening;
    }, [isListening, handleTranslate]);
    
    const handleToggleListening = () => {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        if (isListening) {
            recognition.stop();
        } else {
            setFinalTranscribedText('');
            setInterimTranscribedText('');
            setEnglishTranslation('');
            setKoreanTranslation('');
            setError('');
            try {
                recognition.start();
            } catch(e) {
                setError('Could not start listening. Please try again.');
            }
        }
    };
    
    const buttonClass = (selected: boolean) => 
        `flex-1 px-4 py-2 text-[0.875rem] rounded-md border transition disabled:opacity-50 ${selected ? 'bg-[var(--primary)] border-[var(--primary)] text-[var(--primary-foreground)]' : 'bg-[var(--secondary)] border-[var(--border)] text-[var(--secondary-foreground)] hover:border-[var(--primary)]'}`;


    return (
        <div className="px-6 py-4 flex flex-col h-full">
            <div className="flex-grow space-y-4">
                {/* Language Selector */}
                <div className="flex justify-center gap-2 mb-4">
                    <button
                        onClick={() => setSpeechLang('en')}
                        disabled={isListening}
                        className={buttonClass(speechLang === 'en')}
                    >
                        Speak English
                    </button>
                    <button
                        onClick={() => setSpeechLang('kr')}
                        disabled={isListening}
                        className={buttonClass(speechLang === 'kr')}
                    >
                        Speak Korean
                    </button>
                </div>
                {/* Spoken Text Area */}
                <div>
                    <h3 className="font-semibold text-[var(--foreground)] mb-2">{STRINGS.spokenText[lang]} ({speechLang === 'en' ? 'English' : 'Korean'})</h3>
                    <div className="min-h-[120px] p-3 bg-[var(--muted)] rounded-lg text-[var(--foreground)]">
                        {finalTranscribedText || interimTranscribedText ? (
                            <>
                                <span>{finalTranscribedText}</span>
                                <span className="text-[var(--muted-foreground)]">{interimTranscribedText}</span>
                            </>
                        ) : (
                            <span className="text-[var(--muted-foreground)]">Your spoken text will appear here...</span>
                        )}
                    </div>
                </div>
                {/* Translation Area */}
                <div>
                    <h3 className="font-semibold text-[var(--foreground)] mb-2">{STRINGS.translation[lang]}</h3>
                    <div className="min-h-[120px] p-3 bg-[var(--muted)] rounded-lg text-[var(--foreground)] space-y-2">
                        {isLoading ? (
                            <p className="text-[var(--muted-foreground)]">{STRINGS.translating[lang]}</p>
                        ) : (
                            <>
                                <p><span className="font-bold text-[0.8125rem] text-[var(--muted-foreground)]">EN:</span> {englishTranslation}</p>
                                <p><span className="font-bold text-[0.8125rem] text-[var(--muted-foreground)]">KR:</span> {koreanTranslation}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {error && <p className="text-center text-[var(--danger)] my-2 text-sm">{error}</p>}

            {/* Controls Area */}
            <div className="flex flex-col items-center justify-center py-6">
                <div className="relative flex items-center justify-center h-20 w-20">
                    {isListening && (
                        <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></div>
                    )}
                    <button
                        onClick={handleToggleListening}
                        disabled={!isRecognitionReady}
                        aria-label={isListening ? STRINGS.stopListening[lang] : STRINGS.startListening[lang]}
                        className={`relative w-20 h-20 font-bold rounded-full hover:opacity-90 transition flex items-center justify-center shadow-lg ${isListening ? 'bg-[var(--danger)] text-[var(--danger-foreground)]' : 'bg-[var(--primary)] text-[var(--primary-foreground)]'} disabled:bg-[var(--muted)] disabled:text-[var(--muted-foreground)] disabled:cursor-not-allowed`}
                    >
                        <iconify-icon icon={isListening ? 'lucide:square' : 'lucide:mic'} className="text-3xl" />
                    </button>
                </div>
                {isListening && (
                    <p className="text-[var(--muted-foreground)] mt-4">{STRINGS.listening[lang]}</p>
                )}
            </div>
        </div>
    );
};

export default TranslatorScreen;