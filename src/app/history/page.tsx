"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HistoryPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'solver' | 'exercise'>('solver');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Sign In Required
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Please sign in to view your history.
              </p>
              <Link
                href="/signin"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const solverHistory = user.solverHistory || [];
  const exerciseHistory = user.exerciseHistory || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Your History
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              View your past math problems and exercises
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
                Math Problems ({solverHistory.length})
              </button>
              <button
                onClick={() => setActiveTab('exercise')}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  activeTab === 'exercise'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-500'
                }`}
              >
                Exercises ({exerciseHistory.length})
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
            {activeTab === 'solver' ? (
              <div>
                {solverHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400">No math problems solved yet.</p>
                    <Link href="/" className="text-blue-500 hover:text-blue-600 mt-2 inline-block">
                      Solve your first problem
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {solverHistory.map((item) => (
                      <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-800 dark:text-white">
                            {item.question.substring(0, 100)}{item.question.length > 100 ? '...' : ''}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                          {item.answer.substring(0, 200)}{item.answer.length > 200 ? '...' : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {exerciseHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400">No exercises generated yet.</p>
                    <Link href="/" className="text-blue-500 hover:text-blue-600 mt-2 inline-block">
                      Generate your first exercise
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {exerciseHistory.map((item) => (
                      <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-gray-800 dark:text-white">{item.topic}</h3>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded">
                              {item.difficulty}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                            {new Date(item.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                          {item.exercises.substring(0, 200)}{item.exercises.length > 200 ? '...' : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
