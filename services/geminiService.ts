import { GoogleGenAI } from "@google/genai";
import { DocType } from "../types";

// ------------------------------------------------------------------
// 🤖 CORE SETTINGS 
// This is where we set up the connection to the Google AI Brain.
// ------------------------------------------------------------------

// 1. Get the Secret Password (API Key) from our environment file.
const apiKey = process.env.API_KEY;

// 2. Check if the key exists. If not, warn the console!
if (!apiKey) {
  console.error("🚫 API_KEY is missing! The brain needs a password.");
}

// 3. Initialize the AI Brain (Gemini) with our key.
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

/**
 * 👂 STEP 1: TRANSCRIBE AUDIO
 * This function listens to your voice recording and turns it into text.
 */
export const transcribeAudio = async (base64Audio: string, mimeType: string): Promise<string> => {
  try {
    // We ask Gemini to listen to the audio file.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // The smart, fast, FREE model!
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,    // What kind of audio is it? (mp3, wav)
              data: base64Audio      // The actual sound data
            }
          },
          {
            text: "Transcribe the following audio accurately. No extra talk, just the words you hear."
          }
        ]
      }
    });

    // We give back the text it heard.
    return response.text || "";
  } catch (error) {
    console.error("❌ Audio Transcription Failed:", error);
    throw new Error("Failed to transcribe audio.");
  }
};

/**
 * 📝 STEP 2: GENERATE OUTLINE
 * This function takes your requirements and plans the document structure.
 */
export const generateOutline = async (requirements: string, type: DocType): Promise<string> => {
  try {
    // Pick the right "System Instructions" based on what document we are making
    let systemInstruction = "";

    switch (type) {
      case 'PRD':
        systemInstruction = "Act as a Senior Product Manager. Create a detailed Product Requirements Document (PRD) structure.";
        break;
      case 'CLI':
        systemInstruction = "Act as a Developer Tools Engineer. Create a structured outline for a CLI reference.";
        break;
      case 'PROMPT':
        systemInstruction = "Act as an Expert Prompt Engineer. Create a structured outline for a System Prompt.";
        break;
      case 'ALL':
        systemInstruction = "Act as a CTO. Create a Master Plan covering Product, Tech, and AI components.";
        break;
      default:
        systemInstruction = "Create a structured document outline.";
    }

    const prompt = `
      ${systemInstruction}

      User's Idea:
      """
      ${requirements}
      """

      Goal:
      - Do not write the full document yet.
      - Just write the Outline (The Skeleton).
      - Use clean Markdown format.
    `;

    // Ask Gemini to create the plan.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    return response.text || "";
  } catch (error) {
    console.error("❌ Outline Generation Failed:", error);
    throw new Error("Failed to generate outline.");
  }
};

/**
 * ✍️ STEP 3: GENERATE FULL DOCUMENT
 * This function takes the Skeleton (Outline) and writes the full content.
 */
export const generateDocument = async (requirements: string, outline: string, type: DocType): Promise<string> => {
  try {
    const prompt = `
      You are an expert technical writer.

      Raw Requirements (Context):
      """
      ${requirements}
      """

      The Approved Plan (Outline):
      """
      ${outline}
      """
      
      Task:
      - Write the FULL document now based on the outline.
      - Be extremely detailed. 
      - Use professional Markdown.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    return response.text || "";
  } catch (error) {
    console.error("❌ Document Generation Failed:", error);
    throw new Error("Failed to generate document.");
  }
};

/**
 * 🕵️ STEP 4: VERIFY (THE AUDITOR)
 * This function checks the final document for mistakes.
 */
export const verifyDocument = async (content: string, type: DocType): Promise<string> => {
  try {
    const prompt = `
        You are an expert AI Auditor (The Quality Controller).
        Audit this document (Type: ${type}).
        
        Check for:
        - Logical holes?
        - Missing technical details?
        - Is it clear?
        - Any security risks?
  
        Output Format:
        Return a Markdown Report card:
        ## 🛡️ Audit Report
        ### 📊 Quality Score: [0-100]/100
        ### ✅ Strengths
        ### ⚠️ Critical Issues
        ### 💡 Recommendations
        
        The Document to Check:
        """
        ${content}
        """
      `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    return response.text || "";
  } catch (error) {
    console.error("❌ Document Verification Failed:", error);
    throw new Error("Failed to verify document.");
  }
};
