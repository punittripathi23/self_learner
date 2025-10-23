import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MockTestGenerator from "../pages/MockTestGenerator";
import MockTestPage from "../pages/MockTestPage";
import ResultAnalysis from "../pages/ResultAnalysis";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mocktest" element={<MockTestGenerator />} />
            <Route path="/mocktestpage" element={<MockTestPage />} />
            <Route path="/analysis" element={<ResultAnalysis />} />
        </Routes>
    );
}
