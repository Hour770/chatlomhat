"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MathSolver from "../components/MathSolver";
import ExerciseGenerator from "../components/ExerciseGenerator";

export default function Home() {
  const [activeTab, setActiveTab] = useState<'solver' | 'exercise'>('solver');

  // 
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              ChatLomhat Math Helper
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Your AI-powered math assistant for solving problems and generating practice exercises
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
              <button
                onClick={() => setActiveTab('solver')}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  activeTab === 'solver'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
                }`}
              >
                Math Solver
              </button>
              <button
                onClick={() => setActiveTab('exercise')}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  activeTab === 'exercise'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
                }`}
              >
                Exercise Generator
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
            {activeTab === 'solver' ? <MathSolver /> : <ExerciseGenerator />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
