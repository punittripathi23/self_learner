import React from "react";
import {Link } from "react-router-dom";
function Home() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <section className="text-center">
                <h1 className="text-4xl font-bold text-indigo-600 mb-4">
                    Welcome to MockTestApp
                </h1>
                <p className="text-lg text-purple-700 mb-6">
                    Your one-stop solution for generating mock tests, practicing questions,
                    and analyzing results. Perfect for school, college, and competitive exams.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/mocktest"
                        className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-500 transition"
                    >
                        Generate Mock Test
                    </Link>
                    <Link
                        to="/analysis"
                        className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 transition"
                    >
                        View Results
                    </Link>
                </div>
            </section>

            <section className="mt-16">
                <h2 className="text-2xl font-bold mb-4">Why MockTestApp?</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 bg-white shadow rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Custom Tests</h3>
                        <p>Create tests based on your class, subject, and difficulty level.</p>
                    </div>
                    <div className="p-6 bg-white shadow rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Live Timer</h3>
                        <p>Practice under real exam conditions with a live countdown timer.</p>
                    </div>
                    <div className="p-6 bg-white shadow rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Result Analysis</h3>
                        <p>Get detailed analysis with charts and performance breakdowns.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
