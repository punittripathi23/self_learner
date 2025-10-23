import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFetchQuestions } from "../hooks/useFetchQuestions"; // Import your hook
import { useTimer } from "../hooks/useTimer"; // Import your hook
import QuestionCard from "../components/custom/QuestionCard"; // Import your component
import Timer from "../components/common/Timer"; // Import your component
import { ArrowRight, CheckCircle } from "lucide-react";

export default function MockTestPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const mockTestData = location.state?.mockTestData || null;

    // --- 1. Handle Missing Data ---
    if (!mockTestData) {
        return (
            <div className="p-10 min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="bg-white p-6 rounded-lg shadow-xl text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-4">
                        Test Data Missing
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Could not load the test. Please try generating it again.
                    </p>
                    <button
                        onClick={() => navigate("/mocktest")}
                        className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition"
                    >
                        Go to Generator
                    </button>
                </div>
            </div>
        );
    }

    // --- 2. Extract Questions (Same logic as before) ---
    let questions = [];
    if (Array.isArray(mockTestData)) {
        questions = mockTestData;
    } else if (mockTestData && typeof mockTestData === "object") {
        questions = Array.isArray(mockTestData.questions) ? mockTestData.questions : [];
    }

    // --- 3. Initialize Hooks ---

    // This function will be called to end the quiz
    const handleSubmitQuiz = (answers) => {
        // Navigate to the results page, passing the questions and the user's answers
        navigate("/analysis", { state: { questions: questions, userAnswers: answers } });
    };

    // Initialize the quiz state hook
    const {
        currentQuestion,
        currentQuestionIndex,
        totalQuestions,
        selectedAnswer,
        userAnswers,
        isLastQuestion,
        handleSelectAnswer,
        handleNextQuestion,
    } = useFetchQuestions(questions);

    // Initialize the timer hook (e.g., 10 minutes = 600 seconds)
    const { formattedTime } = useTimer(600, () => {
        // This callback runs when time is up
        handleSubmitQuiz(userAnswers);
    });

    // --- 4. Render the Interactive Quiz ---
    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-10">
            <div className="max-w-3xl mx-auto">
                {/* Header: Timer and Progress */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-indigo-700">
                        Mock Test
                    </h1>
                    <Timer formattedTime={formattedTime} />
                </div>

                {/* Progress Bar (Simple) */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                    <div
                        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                    ></div>
                </div>
                <p className="text-center text-gray-600 mb-4 font-semibold">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                </p>

                {/* Question Card Component */}
                <QuestionCard
                    question={currentQuestion}
                    selectedAnswer={selectedAnswer}
                    onSelectAnswer={handleSelectAnswer}
                />

                {/* Controls: Next / Submit */}
                <div className="flex justify-end mt-8">
                    {!isLastQuestion ? (
                        // NEXT Button
                        <button
                            onClick={handleNextQuestion}
                            disabled={!selectedAnswer} // Disable if no answer is selected
                            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Next
                            <ArrowRight size={20} className="inline-block ml-2" />
                        </button>
                    ) : (
                        // SUBMIT Button
                        <button
                            onClick={() => handleSubmitQuiz(userAnswers)}
                            disabled={!selectedAnswer} // Disable if no answer is selected
                            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            Submit Test
                            <CheckCircle size={20} className="inline-block ml-2" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
