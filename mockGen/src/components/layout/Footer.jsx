import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-16">
            <div className="max-w-6xl mx-auto px-6 py-8">
                {/* Top section */}
                <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* About */}
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-3">MockTestApp</h2>
                        <p className="text-sm">
                            Create mock tests, practice effectively, and analyze your results — all in one place.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="hover:text-indigo-400 transition">Home</a>
                            </li>
                            <li>
                                <a href="/mocktest" className="hover:text-indigo-400 transition">Mock Test</a>
                            </li>
                            <li>
                                <a href="/analysis" className="hover:text-indigo-400 transition">Results</a>
                            </li>
                            <li>
                                <a href="/about" className="hover:text-indigo-400 transition">About</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact / Social */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Connect</h3>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <a href="#" aria-label="Twitter" className="hover:text-indigo-400 transition">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" aria-label="Facebook" className="hover:text-indigo-400 transition">
                                <i className="fab fa-facebook"></i>
                            </a>
                            <a href="#" aria-label="Instagram" className="hover:text-indigo-400 transition">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" aria-label="LinkedIn" className="hover:text-indigo-400 transition">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
                    © {new Date().getFullYear()} MockTestApp. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
