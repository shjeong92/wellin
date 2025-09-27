import { FormData, Summary } from "../types";

export const generateSummaries = async (formData: FormData): Promise<Summary> => {
  try {
    const response = await fetch('/api/generate-summaries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.en && data.ko) {
      return data;
    } else {
      throw new Error("Invalid summary format received from API");
    }

  } catch (error) {
    console.error("Error generating summaries:", error);
    // Fallback to a simple narrative format if API fails
    return {
      en: `The patient is presenting for ${formData.visit.chief_complaint_text}. (Summary generation failed, this is a fallback.)`,
      ko: `환자는 ${formData.visit.chief_complaint_text} 증상으로 내원했습니다. (요약 생성 실패, 대체 텍스트입니다.)`
    };
  }
};

export const translateText = async (textToTranslate: string): Promise<{en: string, ko: string}> => {
    try {
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ textToTranslate }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.en && data.ko) {
            return data;
        } else {
            throw new Error("Invalid translation format received from API");
        }

    } catch (error) {
        console.error("Error translating text:", error);
        // Fallback
        return {
            en: 'Translation failed.',
            ko: '번역 실패.'
        };
    }
};