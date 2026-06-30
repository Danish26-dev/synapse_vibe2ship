import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const key = typeof process !== "undefined" ? process.env?.GEMINI_API_KEY : undefined;
    if (!key) {
      console.warn("⚠️ GEMINI_API_KEY environment variable is not defined. AI components will operate with simulated fallback logic.");
      // Return a placeholder or empty-key instance so compilation succeeds
      return new GoogleGenAI({ apiKey: "placeholder-gemini-key" });
    }
    aiInstance = new GoogleGenAI({ apiKey: key });
  }
  return aiInstance;
}
