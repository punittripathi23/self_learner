import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Optional: for hamburger icon (install lucide-react)

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { path: "/", label: "Home" },
       { path: "/mocktest", label: "Mock Test Generator" },
        { path: "/analysis", label: "Result Analysis" },
    ];

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
                {/* Logo / Brand */}
                <NavLink
                    to="/"
                    className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                >
                    MockTestApp
                </NavLink>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-6">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-base font-medium transition-colors ${isActive
                                    ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                                    : "text-gray-700 hover:text-indigo-500"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <nav className="md:hidden bg-white border-t border-gray-100 flex flex-col items-center space-y-3 py-4 shadow-sm">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `text-base font-medium transition-colors ${isActive
                                    ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                                    : "text-gray-700 hover:text-indigo-500"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
            )}
        </header>
    );
}

export default Header;
