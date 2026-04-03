const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

/**
 * Gets a diagnosis prediction from the Gemini AI based on symptoms.
 * @param {string} symptoms
 * @returns {Promise<Array>} Array of possible conditions
 */
async function getDiagnosisFromAI(symptoms) {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error('Gemini API key is not configured.');
    }

    // Scale number of conditions based on symptom count
    const symptomList = symptoms.split(/[,،\n]+/).map(s => s.trim()).filter(Boolean);
    const conditionCount = symptomList.length === 1 ? 1 : symptomList.length === 2 ? 2 : 3;

    const prompt = `You are an expert AI medical assistant. A patient has reported the following symptom(s): "${symptoms}".

Identify exactly ${conditionCount} most likely medical condition(s) that directly match these symptom(s).
Rules:
- Only return conditions strongly related to the given symptom(s). Do NOT suggest unrelated conditions.
- "probability" is a number from 0 to 100 (no % symbol).
- "next_steps" must be a single short sentence, 10-15 words max (e.g. "Get a PCR test and consult a physician.").

Respond STRICTLY as a JSON array. No markdown, no extra text.
[
  {
    "name": "Condition Name",
    "probability": 85,
    "next_steps": "Short action step here."
  }
]`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json'
            }
        });

        // Safely extract text — response.text may be a getter or plain string
        const rawText = typeof response.text === 'function' ? response.text() : response.text;

        console.log('[AI Service] Raw response:', rawText?.slice(0, 300));

        if (!rawText) {
            throw new Error('Empty response received from Gemini API.');
        }

        // Strip <think>...</think> blocks (emitted by thinking models) and markdown fences
        let cleanedText = rawText
            .replace(/<think>[\s\S]*?<\/think>/gi, '')
            .replace(/```json/gi, '')
            .replace(/```/g, '')
            .trim();

        // Regex fallback: extract the first JSON array even if there's surrounding text
        const jsonMatch = cleanedText.match(/\[[\s\S]*\]/);
        if (!jsonMatch) {
            console.error('[AI Service] No JSON array found in response:', cleanedText);
            throw new Error('AI response did not contain a valid JSON array.');
        }

        const conditions = JSON.parse(jsonMatch[0]);

        // Return only as many conditions as requested based on symptom count
        return conditions.slice(0, conditionCount);
    } catch (error) {
        // Log the real error — not a generic message — so issues are diagnosable
        console.error('[AI Service] Error:', error.message || error);
        if (error.message?.includes('AI response') || error.message?.includes('Empty response')) {
            throw error;
        }
        throw new Error(`Failed to generate diagnosis from AI service. Reason: ${error.message}`);
    }
}

module.exports = {
    getDiagnosisFromAI
};
