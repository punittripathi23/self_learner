// src/lib/testGenerator.js

export function generatePrompt(formData) {
  const { topic, difficulty, questionCount, questionType, extraInstructions } =
    formData;

  // Basic prompt structure
  let prompt = `Generate a ${difficulty}-level mock test on the topic "${topic}".\n\n`;

  prompt += `Include exactly ${questionCount} ${questionType} questions.\n`;

  // Add specific structure rules based on question type
  if (questionType === "multiple choice") {
    prompt += `Each question should include 4 options labeled A, B, C, and D.\n`;
    prompt += `Clearly mention the correct answer after each question.\n`;
  } else if (questionType === "true/false") {
    prompt += `Each question should have only two options: True or False.\n`;
    prompt += `Clearly indicate the correct answer.\n`;
  } else if (questionType === "short answer") {
    prompt += `Each question should require a short descriptive answer.\n`;
  }

  // Add optional user customization
  if (extraInstructions && extraInstructions.trim().length > 0) {
    prompt += `\nFollow these additional instructions carefully:\n"${extraInstructions}"\n`;
  }

  // Define the output format
  prompt += `
Format your output as JSON with the following structure:
[
  {
    "stem": "Question text",
    "options": ["A", "B", "C", "D"],  // Omit for short/true-false questions
    "answer": "Correct answer text",
    "hint": "Optional hint if applicable"
  }
]
`;

  return prompt.trim();
}
