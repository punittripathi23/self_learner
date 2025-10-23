// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Ajv from "ajv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("⚠️ GEMINI_API_KEY not set in .env file");
  process.exit(1);
}

// Create Gemini client
const client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// ---------- JSON Schema for validation ----------
// NOTE: The model is consistently returning an ARRAY of questions.
// This schema is updated to expect the top-level structure to be that array.
const testSchema = {
  type: "array", // <-- CORRECTED: Root type is now 'array'
  items: {
    // <-- Defines the structure of each item (question) in the array
    type: "object",
    properties: {
      // The model's output shows: "stem", "options", and "answer".
      // We remove required fields the model is NOT generating (like 'id', 'type').
      // If you later want 'id' and 'type', you must update your prompt to demand them.
      stem: { type: "string" },
      options: { type: "array", items: { type: "string" } },
      answer: {}, // Retained generic type
      hint: { type: "string" }, // Added 'hint' based on your prompt structure // Removed fields like 'explanation', 'marks', 'suggestedTimeSec' // as they are not present in the model's current output/prompt
    }, // CORRECTED: Required fields now only include what the model is guaranteed to generate
    required: ["stem", "answer", "options"],
    additionalProperties: false,
  },
  minItems: 1, // Must have at least one question
};

const ajv = new Ajv({ allErrors: true, strict: false });
const validateTest = ajv.compile(testSchema);

// Utility: Extract JSON from text (Updated to better handle markdown fences)
function extractJsonFromText(text) {
  if (!text || typeof text !== "string") return null; // 1. Clean the text: remove markdown fences and surrounding whitespace

  let cleanText = text.trim(); // Check for and remove common markdown fences
  const jsonFenceStart = "```json";
  const jsonFenceEnd = "```";

  if (cleanText.startsWith(jsonFenceStart)) {
    cleanText = cleanText.substring(jsonFenceStart.length).trim();
  }
  if (cleanText.endsWith(jsonFenceEnd)) {
    cleanText = cleanText
      .substring(0, cleanText.length - jsonFenceEnd.length)
      .trim();
  } // 2. Attempt standard JSON parsing (covers clean text and text cleaned of fences)
  try {
    return JSON.parse(cleanText);
  } catch (e) {
    // 3. Fallback: Use regex to extract the first full object or array and try parsing it
    const arrMatch = cleanText.match(/\[[\s\S]*\]/);
    if (arrMatch) {
      try {
        return JSON.parse(arrMatch[0]);
      } catch {}
    }
    const objMatch = cleanText.match(/\{[\s\S]*\}/);
    if (objMatch) {
      try {
        return JSON.parse(objMatch[0]);
      } catch {}
    }
  }
  return null;
}

// API route
app.post("/api/generate-test", async (req, res) => {
  console.log("/api/generate-test called");
  console.log("received body:", req.body);

  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res
        .status(400)
        .json({ success: false, error: "prompt is required" });
    } // Gemini request

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash", // The system instruction is kept strict, but we are now compensating for the model's
      // tendency to include the markdown fences in the 'extractJsonFromText' function.
      systemInstruction:
        "You are a JSON generation engine. Your ONLY response must be a single JSON array of questions that strictly adheres to the requested structure. DO NOT include any explanatory text, markdown formatting (like ```json), or conversational language. JUST the JSON array.",

      contents: [{ role: "user", parts: [{ text: prompt }] }],
      input: prompt,
      config: {
        temperature: 0.2,
        maxOutputTokens: 20000,
      },
    });

    console.log("Gemini response:", response);

    let modelText = response?.text || null;
    console.log("Model text:", modelText);
    if (!modelText) {
      modelText = response?.text || JSON.stringify(response);
    }

    const parsed = extractJsonFromText(modelText);

    if (!parsed) {
      // Added detailed logging to help diagnose if parsing failed due to corruption
      console.error("JSON Parsing Failed. Raw Text:", modelText);
      return res.status(200).json({
        success: false,
        message: "No JSON found or JSON was corrupted in model output",
        rawOutput: modelText,
        fullResponse: response,
      });
    }

    const valid = validateTest(parsed);
    if (!valid) {
      // Log the validation errors! This is the most crucial step for debugging.
      console.error("Schema Validation Failed. Errors:", validateTest.errors);
      return res.status(200).json({
        success: false,
        message: "Parsed JSON did not match expected schema",
        validationErrors: validateTest.errors,
        parsed,
      });
    }

    return res.status(200).json({ success: true, test: parsed });
  } catch (err) {
    console.error("Error in /api/generate-test:", err);
    res
      .status(500)
      .json({ success: false, error: "internal server error", details: err });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
