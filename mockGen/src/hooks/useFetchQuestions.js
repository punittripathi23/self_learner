import { useState, useMemo } from "react";

/**
 * Custom hook to manage the quiz state (current question, answers, etc.)
 * @param {Array} questions - The full array of questions from the backend.
 */
export function useFetchQuestions(questions = []) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Store answers in an object, e.g., { 0: "Answer A", 1: "Answer C" }
  const [userAnswers, setUserAnswers] = useState({});

  // Memoize the current question object to avoid recalculating
  const currentQuestion = useMemo(() => {
    return questions[currentQuestionIndex];
  }, [questions, currentQuestionIndex]);

  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  // Function to handle selecting an answer
  const handleSelectAnswer = (option) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: option, // Store the answer by its index
    }));
  };

  // Function to move to the next question
  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Get the user's selected answer for the *current* question
  const selectedAnswer = userAnswers[currentQuestionIndex] || null;

  return {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswer, // The answer selected for this question
    userAnswers, // All answers for submission
    isLastQuestion,
    handleSelectAnswer,
    handleNextQuestion,
  };
}
