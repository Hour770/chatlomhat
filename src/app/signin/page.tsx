"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { requestOtp, verifyOtp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setIsLoading(true);

    if (step === "email") {
      if (!email) {
        setError("Please enter your email.");
        setIsLoading(false);
        return;
      }

      const result = await requestOtp(email);

      if (result.success) {
        setStep("otp");
        setInfo("We have sent a login code to your email. Please check your inbox.");
        if (result.devCode) {
          // Useful for local testing
          console.log("Dev OTP code:", result.devCode);
        }
      } else {
        setError(result.error || "Failed to send OTP.");
      }
    } else {
      if (!otp) {
        setError("Please enter the OTP code.");
        setIsLoading(false);
        return;
      }

      const result = await verifyOtp(email, otp);

      if (result.success) {
        router.push("/");
      } else {
        setError(result.error || "OTP verification failed.");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <img src="/logo.png" alt="ChatLomhat Logo" className="w-10 h-10" />
              </div>
              <span className="text-2xl font-bold text-gray-800 dark:text-white">
                ChatLomhat
              </span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Sign in to restore your history and data
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                placeholder="your@email.com"
                disabled={isLoading}
              />
            </div>
            {step === "otp" && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  OTP Code
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  placeholder="Enter the code from your email"
                  disabled={isLoading}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {step === "email" ? "Sending code..." : "Verifying..."}
                </span>
              ) : (
                step === "email" ? "Send OTP" : "Verify OTP"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Continue without account */}
          <div className="mt-4 text-center">
            <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm">
              Continue without an account
            </Link>
          </div>
        </div>

        {/* Info */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Creating an account is optional. Your data is stored locally in cookies.
        </p>
      </div>
    </div>
  );
}
