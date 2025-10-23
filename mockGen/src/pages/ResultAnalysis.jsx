import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function ResultAnalysis() {
  const location = useLocation();
  // Get the questions and answers passed from the quiz page
  const { questions, userAnswers } = location.state || {};

  // Simple check if data is missing (e.g., user refreshed the page)
  if (!questions || !userAnswers) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">No results to display.</h1>
        <p className="mt-4">Please take a test first.</p>
        <Link
          to="/mocktest"
          className="mt-6 inline-block px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-500"
        >
          Generate a Test
        </Link>
      </div>
    );
  }

  // --- Simple Result Calculation Logic ---
  let score = 0;
  questions.forEach((q, index) => {
    // Check if the user's answer matches the correct answer
    if (q.answer === userAnswers[index]) {
      score++;
    }
  });
  const total = questions.length;
  const percentage = ((score / total) * 100).toFixed(2);
  // ----------------------------------------

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-10">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 text-center">
        Test Results
      </h1>

      <div className="text-center p-6 bg-gray-50 rounded-lg mb-8">
        <p className="text-2xl font-semibold text-gray-800">Your Score:</p>
        <p className="text-6xl font-bold text-indigo-600 my-2">
          {score} / {total}
        </p>
        <p className="text-3xl font-semibold text-purple-600">
          ({percentage}%)
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Review Your Answers:</h2>
      <div className="space-y-6">
        {questions.map((q, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = q.answer === userAnswer;

          return (
            <div key={index} className={`p-4 rounded-lg border-2 ${isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
              <p className="font-bold text-lg mb-2">Q{index + 1}: {q.stem}</p>
              <p className="text-sm">Your Answer: <span className="font-semibold">{userAnswer || "No Answer"}</span></p>
              {!isCorrect && (
                <p className="text-sm text-green-700">Correct Answer: <span className="font-semibold">{q.answer}</span></p>
              )}
            </div>
          );
        })}
      </div>

      <Link
        to="/mocktest"
        className="mt-10 w-full text-center block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-500"
      >
        Take Another Test
      </Link>
    </div>
  );
}