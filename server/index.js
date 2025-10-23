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

// REMOVED: const PORT = process.env.PORT || 3000; (Vercel handles this)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("⚠️ GEMINI_API_KEY not set in .env file");
  // In a serverless environment, you can't process.exit(1)
  // We'll let it fail on the API call instead, which is better for logging.
}

// Create Gemini client
// Check for API key at startup
let client;
if (GEMINI_API_KEY) {
  client = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
} else {
  console.error("GEMINI_API_KEY is not set. API will fail.");
}

// ---------- JSON Schema for validation ----------
const testSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      stem: { type: "string" },
      options: { type: "array", items: { type: "string" } },
      answer: {},
      hint: { type: "string" },
    },
    required: ["stem", "answer", "options"],
    additionalProperties: false,
  },
  minItems: 1,
};

const ajv = new Ajv({ allErrors: true, strict: false });
const validateTest = ajv.compile(testSchema);

// Utility: Extract JSON from text
function extractJsonFromText(text) {
  if (!text || typeof text !== "string") return null;

  let cleanText = text.trim();
  const jsonFenceStart = "```json";
  const jsonFenceEnd = "```";

  if (cleanText.startsWith(jsonFenceStart)) {
    cleanText = cleanText.substring(jsonFenceStart.length).trim();
  }
  if (cleanText.endsWith(jsonFenceEnd)) {
    cleanText = cleanText
      .substring(0, cleanText.length - jsonFenceEnd.length)
      .trim();
  }
  try {
    return JSON.parse(cleanText);
  } catch (e) {
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

// ---------- API ROUTES ----------

// ADDED: Health check route
app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Your API route
app.post("/api/generate-test", async (req, res) => {
  console.log("/api/generate-test called");
  console.log("received body:", req.body);

  // Check for client again in case it failed to initialize
  if (!client) {
    console.error("API call failed: GEMINI_API_KEY is not configured.");
    return res
      .status(500)
      .json({
        success: false,
        error: "Server is not configured with API key.",
      });
  }

  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res
        .status(400)
        .json({ success: false, error: "prompt is required" });
    }

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      systemInstruction:
        "You are a JSON generation engine. Your ONLY response must be a single JSON array of questions that strictly adheres to the requested structure. DO NOT include any explanatory text, markdown formatting (like ```json), or conversational language. JUST the JSON array.",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      // 'input' is not a valid parameter for generateContent, 'contents' is
      // input: prompt,
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

// REMOVED: app.listen()
// app.listen(PORT, () => {
//   console.log(`✅ Server running on http://localhost:${PORT}`);
// });

// ADDED: Export the app for Vercel
export default app;
