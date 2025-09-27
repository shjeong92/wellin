import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const generateSummaryPrompt = (formData: any): string => {
  return `
Based on the following patient data, generate a concise medical summary in both English and Korean.
The summary should be written in natural, narrative language, like a patient explaining their situation to a doctor.
Avoid using key-value pairs, brackets like [], or bullet points. Structure the summary into a few clear paragraphs.
The Korean summary is for the clinic (professional tone), and the English summary is for the user (clear, simple language).
Ensure the summaries accurately reflect all provided data. Do not add any information not present in the data.

**Patient Data:**
${JSON.stringify(formData, null, 2)}

---

Return the response as a single JSON object with two keys: "en" for the English summary and "ko" for the Korean summary.
The JSON object should be the only thing in your response.
Example: { "en": "The patient presents with...", "ko": "환자는 ... 증상으로 내원하였습니다." }
`;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { formData } = req.body;

    if (!formData) {
      return res.status(400).json({ error: 'Form data is required' });
    }

    const prompt = generateSummaryPrompt(formData);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              en: {
                type: Type.STRING,
                description: 'The English summary in narrative form.'
              },
              ko: {
                type: Type.STRING,
                description: 'The Korean summary in narrative form.'
              },
            },
            required: ['en', 'ko'],
          },
      }
    });

    const text = response.text.trim();
    const parsed = JSON.parse(text);

    if (parsed && parsed.en && parsed.ko) {
      return res.status(200).json(parsed);
    } else {
      throw new Error("Invalid summary format received from API");
    }

  } catch (error) {
    console.error("Error generating summaries with Gemini:", error);

    // Fallback response
    return res.status(200).json({
      en: `The patient is presenting for medical consultation. (Summary generation failed, this is a fallback.)`,
      ko: `환자는 의료 상담을 위해 내원했습니다. (요약 생성 실패, 대체 텍스트입니다.)`
    });
  }
}