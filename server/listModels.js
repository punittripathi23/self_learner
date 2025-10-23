import axios from "axios";

const GEMINI_API_KEY = "AIzaSyBjUU2-mHIRShpvFsIQgP_63ImiWk_BQ58"; // Replace with your API key

async function listModels() {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`;
  try {
    const res = await axios.get(endpoint);
    console.log("Available models:", res.data.models || res.data);
  } catch (err) {
    console.error("Error listing models:", err.response?.data || err.message);
  }
}

listModels();
