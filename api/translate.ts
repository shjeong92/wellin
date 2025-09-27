import { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

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
    const { textToTranslate } = req.body;

    if (!textToTranslate) {
      return res.status(400).json({ error: 'Text to translate is required' });
    }

    const prompt = `Translate the following text into both English and Korean. The original language could be either. Provide the response as a JSON object with keys "en" and "ko". Text: "${textToTranslate}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING, description: 'English translation.' },
              ko: { type: Type.STRING, description: 'Korean translation.' },
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
      throw new Error("Invalid translation format received from API");
    }

  } catch (error) {
    console.error("Error translating text with Gemini:", error);

    // Fallback response
    return res.status(200).json({
      en: 'Translation failed.',
      ko: '번역 실패.'
    });
  }
}