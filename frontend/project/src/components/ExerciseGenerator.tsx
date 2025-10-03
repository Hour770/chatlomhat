"use client";

import { useState } from "react";

interface Exercise {
  problem: string;
  answer: string;
  showAnswer?: boolean;
}

interface GeneratorResponse {
  exercises: Exercise[];
  loading: boolean;
  error?: string;
}

export default function ExerciseGenerator() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [numProblems, setNumProblems] = useState(5);
  const [response, setResponse] = useState<GeneratorResponse>({ exercises: [], loading: false });

  const generateExercises = async () => {
    if (!topic.trim()) return;

    setResponse({ exercises: [], loading: true });
    
    try {
      const res = await fetch('http://localhost:5002/generate-exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          difficulty,
          numProblems
        })
      });

      const data = await res.json();
      
      if (data.success) {
        setResponse({ exercises: data.exercises, loading: false });
      } else {
        setResponse({ 
          exercises: [], 
          loading: false, 
          error: data.error || 'Failed to generate exercises' 
        });
      }
    } catch (error) {
      setResponse({ 
        exercises: [], 
        loading: false, 
        error: 'Error: Could not generate exercises. Make sure the backend is running.' 
      });
    }
  };

  const toggleAnswer = (index: number) => {
    setResponse(prev => ({
      ...prev,
      exercises: prev.exercises.map((exercise, i) => 
        i === index 
          ? { ...exercise, showAnswer: !exercise.showAnswer }
          : exercise
      )
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Practice Exercise Generator</h2>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topic:
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., algebra, calculus, geometry"
            className="w-full p-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty:
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Problems:
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={numProblems}
              onChange={(e) => setNumProblems(parseInt(e.target.value) || 5)}
              className="w-full p-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <button
          onClick={generateExercises}
          disabled={!topic.trim() || response.loading}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 font-semibold"
        >
          {response.loading ? 'Generating...' : 'Generate Practice Problems'}
        </button>
      </div>

      {response.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600">
            <strong>Error:</strong> {response.error}
          </p>
        </div>
      )}

      {response.exercises.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Practice Problems:</h3>
          {response.exercises.map((exercise, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-md border">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-800">Problem {index + 1}:</h4>
                <button
                  onClick={() => toggleAnswer(index)}
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  {exercise.showAnswer ? 'Hide Answer' : 'Show Answer'}
                </button>
              </div>
              
              <p className="text-gray-700 mb-2">{exercise.problem}</p>
              
              {exercise.showAnswer && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                  <strong className="text-green-800">Answer:</strong>
                  <div className="mt-2 text-green-700">
                    {exercise.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}