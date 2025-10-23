// src/lib/geminiClient.js
// This file calls your backend endpoint

const BACKEND_BASE = import.meta.env.VITE_BACKEND_URL || ""; // e.g. http://localhost:3000

/**
 * Generate a mock test by calling your backend
 * @param {string} prompt - The test generation prompt
 * @param {string} model - The model to use (default: gemini-2.5-flash)
 */
export async function generateMockTest(
  prompt,
  model = "models/gemini-2.5-flash"
) {
  const url = `${BACKEND_BASE}/api/generate-test`;

  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, model }),
    });

    const data = await resp.json();

    if (!resp.ok) {
      throw new Error(data.error || "Backend returned an error");
    }

    return data; // { success: true, test: {...} } or debug info
  } catch (err) {
    console.error("generateMockTest (frontend) error:", err);
    throw err;
  }
}
