const { GoogleGenerativeAI } = require("@google/generative-ai");

// Type definitions
type GenerativeModel = any; // Since we're using require, we'll use a simple type
type APIResponse = {
  success: boolean;
  message: string;
};

// Initialize the Google Generative AI with the API key
const API_KEY = "AIzaSyAMRzQ1mGLy2llCaHQH-VEIpqPElvntJi4";
let genAI: any;
let model: GenerativeModel;

try {
  if (!API_KEY) {
    throw new Error("Gemini API key not found");
  }
  
  genAI = new GoogleGenerativeAI(API_KEY);
  // Use the beta version model name as specified in the API documentation
  model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
} catch (error) {
  console.error("Error initializing Gemini API:", error);
}

let currentEnglishThought: string | null = null;

const api = {
  async testGeminiAPI(): Promise<APIResponse> {
    try {
      if (!model) {
        throw new Error("Gemini model not initialized");
      }
  
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: "Hello, please respond with 'API is working' if you receive this message." }] }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 10,
        },
      });
  
      const response = result.response.text().trim();
      return {
        success: true,
        message: `API Test Successful. Response: ${response}`
      };
    } catch (error) {
      return {
        success: false,
        message: `API Test Failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  },

  async generatePhilosophicalThought(): Promise<string> {
    try {
      if (!model) {
        throw new Error("Gemini model not initialized");
      }
  
      const prompt = `Create a wisdom quote about life, knowledge, or human nature. Example:
"True wisdom comes from understanding our limitations; real growth happens when we face our fears; and lasting peace emerges when we accept what we cannot change."

Requirements:
- Direct, clear statements about life truths
- No metaphors or flowery language
- Three connected wisdom statements
- Focus on practical wisdom
- 25-35 words
- Return only the quote`;
  
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.9,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 150,
        },
      });
  
      if (!result || !result.response) {
        throw new Error("No response from Gemini API");
      }
  
      const text = result.response.text();
      if (!text) {
        throw new Error("Empty response from Gemini API");
      }
  
      const thought = text.replace(/^["']|["']$/g, "").trim();
      currentEnglishThought = thought;
      return thought;
    } catch (error) {
      throw new Error(`Failed to generate philosophical thought: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  },

  async generateArabicPhilosophicalThought(): Promise<string> {
    try {
      if (!model) {
        throw new Error("Gemini model not initialized");
      }
  
      // Ensure we have an English thought to translate
      if (!currentEnglishThought) {
        await this.generatePhilosophicalThought();
      }
      
      // At this point currentEnglishThought is guaranteed to be a string
      const englishThought = currentEnglishThought!;
  
      const prompt = `Translate this quote to Modern Standard Arabic (الفصحى) like this example:
English: "True wisdom comes from understanding our limitations; real growth happens when we face our fears; and lasting peace emerges when we accept what we cannot change."
Arabic: "الحكمة الحقيقية تأتي من فهم حدودنا؛ والنمو الحقيقي يحدث عندما نواجه مخاوفنا؛ والسلام الدائم يظهر عندما نتقبل ما لا نستطيع تغييره."

Now translate this quote:
"${englishThought}"

Requirements:
- Use clear Modern Standard Arabic (الفصحى)
- Keep the direct, straightforward style
- Use semicolons (؛) to separate ideas
- Maintain the practical wisdom
- Return only the Arabic translation`;
  
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        },
      });
  
      if (!result || !result.response) {
        throw new Error("No response from Gemini API");
      }
  
      const text = result.response.text();
      if (!text) {
        throw new Error("Empty response from Gemini API");
      }
  
      return text.replace(/^["']|["']$/g, "").replace(/\*\*/g, "").trim();
    } catch (error) {
      throw new Error(`Failed to generate Arabic philosophical thought: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
};

module.exports = api;