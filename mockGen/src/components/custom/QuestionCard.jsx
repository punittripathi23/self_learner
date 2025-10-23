import React from 'react';

/**
 * Displays a single question and its options.
 * @param {Object} question - The question object { stem, options }
 * @param {string} selectedAnswer - The user's currently selected answer
 * @param {function} onSelectAnswer - Callback to run when an option is clicked
 */
function QuestionCard({ question, selectedAnswer, onSelectAnswer }) {
    if (!question) {
        return <div>Loading question...</div>;
    }

    const { stem, options = [] } = question;

    // Helper to get the correct option letter (A, B, C, D)
    const getOptionLetter = (index) => String.fromCharCode(65 + index);

    return (
        <div className="p-6 md:p-8 bg-white shadow-lg rounded-xl border border-gray-200">
            {/* Question Stem */}
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
                {stem}
            </h2>

            {/* Options List */}
            <div className="space-y-3">
                {options.map((option, index) => {
                    const isSelected = selectedAnswer === option;

                    // Determine button styling based on selection
                    const buttonClass = isSelected
                        ? "bg-indigo-600 text-white border-indigo-600 ring-2 ring-indigo-300" // Selected state
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"; // Default state

                    return (
                        <button
                            key={index}
                            onClick={() => onSelectAnswer(option)}
                            className={`w-full text-left p-4 rounded-lg border-2 font-medium transition-all duration-200 ease-in-out flex items-center ${buttonClass}`}
                        >
                            <span className="mr-3 font-bold">{getOptionLetter(index)}.</span>
                            <span>{option}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default QuestionCard;