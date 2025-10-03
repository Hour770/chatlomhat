"use client";

import { useState } from "react";

interface MathResponse {
  solution: string;
  loading: boolean;
  error?: string;
}

export default function MathSolver() {
  const [problem, setProblem] = useState("");
  const [response, setResponse] = useState<MathResponse>({ solution: "", loading: false });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const solveProblem = async () => {
    if (!problem.trim() && !imageFile) {
      alert("Please enter a math problem or upload an image");
      return;
    }

    setResponse({ solution: "", loading: true });

    try {
      const formData = new FormData();
      
      if (imageFile) {
        formData.append("image", imageFile);
        formData.append("prompt", problem || "Solve this math problem shown in the image");
      } else {
        formData.append("prompt", problem);
      }

      const res = await fetch("http://localhost:5002/solve", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to solve problem");
      }

      const data = await res.json();
      setResponse({ 
        solution: data.solution || "No solution received", 
        loading: false 
      });
    } catch (error) {
      setResponse({ 
        solution: "", 
        loading: false, 
        error: error instanceof Error ? error.message : "An error occurred" 
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Math Problem Solver
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Enter your math problem below or upload an image of the problem, and I'll help you solve it step by step.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="problem" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Math Problem (Type your problem or describe what you need help with)
          </label>
          <textarea
            id="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Example: Solve for x: 2x + 5 = 13"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload Image (Optional)
          </label>
          <div className="flex items-center space-x-4">
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
            />
            {imagePreview && (
              <button
                onClick={removeImage}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
              >
                Remove
              </button>
            )}
          </div>
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Uploaded problem"
                className="max-w-full h-auto max-h-64 rounded-lg border border-gray-300 dark:border-gray-600"
              />
            </div>
          )}
        </div>

        <button
          onClick={solveProblem}
          disabled={response.loading}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            response.loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          } text-white`}
        >
          {response.loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Solving...
            </div>
          ) : (
            "Solve Problem"
          )}
        </button>
      </div>

      {response.error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">
            <strong>Error:</strong> {response.error}
          </p>
        </div>
      )}

      {response.solution && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
            Solution:
          </h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <div className="text-gray-800 dark:text-gray-200 leading-relaxed space-y-3">
              {response.solution.split('\n').map((line: string, index: number) => (
                <div key={index}>
                  {line.trim() ? (
                    <p className="text-base leading-relaxed">{line}</p>
                  ) : (
                    <div className="h-3"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
