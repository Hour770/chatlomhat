"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, isAuthenticated, signOut, isLoading } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <img src="/logo.png" alt="ChatLomhat Logo" />
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                ChatLomhat
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-6">
              <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                About
              </Link>
              <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
                Help
              </Link>
            </nav>

            {/* Auth Section */}
            {!isLoading && (
              <div className="flex items-center space-x-3 ml-4">
                {isAuthenticated && user ? (
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 bg-blue-50 dark:bg-gray-700 px-3 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-700 dark:text-gray-200 hidden sm:inline">
                        {user.name}
                      </span>
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* User Dropdown Menu */}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-800 dark:text-white">{user.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                        <Link
                          href="/history"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => setShowUserMenu(false)}
                        >
                          View History
                        </Link>
                        <button
                          onClick={() => {
                            signOut();
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors px-3 py-2"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
