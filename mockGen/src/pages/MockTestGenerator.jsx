import React, { useState } from "react";
import { generateMockTest } from "../lib/openaiClient";
import { generatePrompt } from "../lib/testGenerator";
import { useNavigate } from "react-router-dom";

export default function MockTestGenerator() {
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [questionCount, setQuestionCount] = useState("");
    const [questionType, setQuestionType] = useState("");
    const [extraInstructions, setExtraInstructions] = useState("");
    const [isLoading, setIsLoading] = useState(false); // New loading state
    const [error, setError] = useState(null); // New error message state
    const navigate = useNavigate();

    const handleGenerate = async () => {
        setError(null);
        setIsLoading(true);

        const prompt = generatePrompt({
            topic,
            difficulty,
            questionCount,
            questionType,
            extraInstructions,
        });
       
       
       
       
       

        try {
            const result = await generateMockTest(prompt); // Renamed from data to result for clarity

            if (result.success === true && result.test) {
                // SUCCESS: Navigate with the clean test object (result.test)
                navigate("/mocktestpage", { state: { mockTestData: result.test } });
            } else {
                // FAILURE: Backend returned success: false (validation failed)
                const errorMsg = result.message || "Failed to generate test due to an unknown formatting error.";

                // FIX: Updated logging to check for 'parsed' and 'validationErrors' instead of just 'rawOutput'
                console.error("Validation Failed. Debug Info:", {
                    message: result.message,
                    validationErrors: result.validationErrors, // Check validation errors array
                    parsedData: result.parsed, // The partially parsed object that failed validation
                    rawOutput: result.rawOutput // Still log if it exists, otherwise it will be undefined
                });

                // Display user-friendly error
                setError(errorMsg);
            }
        } catch (error) {
            console.error("Error generating mock test:", error);
            setError(`Network Error: ${error.message}. Please check the backend connection.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">
                    Enter your Requirements
                </h1>

                {/* Display Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {/* Form */}
                <form className="space-y-5">
                    {/* Topic */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Topic / Subject</label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="Enter the topic for the mock test"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Difficulty */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Difficulty</label>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            disabled={isLoading}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    {/* Number of questions */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Number of Questions</label>
                        <input
                            type="number"
                            value={questionCount}
                            onChange={(e) => setQuestionCount(e.target.value)}
                            min="1"
                            max="100"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Question type */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Question Type</label>
                        <select
                            value={questionType}
                            onChange={(e) => setQuestionType(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            disabled={isLoading}
                        >
                            <option value="multiple choice">Multiple Choice</option>
                            <option value="short answer">Short Answer</option>
                            <option value="true/false">True/False</option>
                        </select>
                    </div>

                    {/* Extra instructions */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Extra Instructions (Optional)</label>
                        <textarea
                            value={extraInstructions}
                            onChange={(e) => setExtraInstructions(e.target.value)}
                            rows={3}
                            placeholder="Any special instructions for generating the test?"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            disabled={isLoading}
                        />
                    </div>

                    {/* Generate button */}
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleGenerate}
                            disabled={isLoading}
                            className={`px-6 py-3 font-semibold rounded-lg shadow transition duration-200 
                                ${isLoading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
                        >
                            {isLoading ? 'Generating Test...' : 'Generate Test'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
