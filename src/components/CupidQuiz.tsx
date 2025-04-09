'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SwipeCards from './SwipeCards';
import '../app/globals.css';

const SentimentChart = dynamic(() => import('@/components/SentimentChart'), { ssr: false });

export type Profile = {
  name: string;
  image: string;
  match: string;
  sentiment: string;
  reason: string;
  traits: string[];
};

const quizQuestions = [
  { label: "How old are you?", name: "age", type: "slider", min: 18, max: 60 },
  { label: "How tall are you? (in cm)", name: "height", type: "slider", min: 140, max: 210 },
  { label: "How would you describe your body type?", name: "body_type", type: "select", options: ["slim", "average", "fit", "curvy", "full-figured"] },
  { label: "What best describes your eating habits?", name: "diet", type: "select", options: ["anything", "vegetarian", "vegan", "kosher", "halal"] },
  { label: "Do you smoke?", name: "smokes", type: "select", options: ["no", "sometimes", "yes"] },
  { label: "What’s your current relationship status?", name: "orientation", type: "select", options: ["single", "seeing someone", "open relationship"] },
  { label: "How do you identify your gender?", name: "sex", type: "select", options: ["female", "male", "nonbinary"] }
];

const vibeProfiles: Record<'Creative' | 'Adventurous' | 'Logical' | 'Tech-Savvy' | 'Introvert' | 'Romantic', string[]> = {
  "Creative": ["artistic", "imaginative", "design-oriented"],
  "Adventurous": ["adventurous", "explorer", "outgoing"],
  "Logical": ["logical", "analytical", "problem-solver"],
  "Tech-Savvy": ["techie", "innovative", "problem-solver"],
  "Introvert": ["introverted", "calm", "reflective"],
  "Romantic": ["romantic", "sentimental", "passionate"],
};

export default function CupidQuiz() {
  const [step, setStep] = useState(1);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string | number>>({});
  const [results, setResults] = useState<any[]>([]);
  const [showSwipes, setShowSwipes] = useState(false);
  const [likes, setLikes] = useState<any[]>([]);

  const [userTraits, setUserTraits] = useState<string[]>([]); // Store user's selected traits

  const handleVibeChange = (vibe: string) => {
    const validVibe = vibe as 'Creative' | 'Adventurous' | 'Logical' | 'Tech-Savvy' | 'Introvert' | 'Romantic';
    setUserTraits(vibeProfiles[validVibe] || []);
  };

  const handleQuizChange = (name: string, value: string | number) => {
    setQuizAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const renderInputField = (q: any) => {
    if (q.type === 'slider') {
      return (
        <>
          <input
            type="range"
            min={q.min}
            max={q.max}
            value={quizAnswers[q.name] || q.min}
            onChange={(e) => handleQuizChange(q.name, Number(e.target.value))}
            className="w-full accent-pink-500"
          />
          <div className="text-sm text-center text-gray-600 mt-1">
            {quizAnswers[q.name] || q.min}
          </div>
        </>
      );
    }
    if (q.type === 'select') {
      return (
        <select
          value={quizAnswers[q.name] || ''}
          onChange={(e) => handleQuizChange(q.name, e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-xl mt-1"
        >
          <option value="">-- Select --</option>
          {q.options.map((opt: string) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }
    return null;
  };

  useEffect(() => {
    const fetchMockProfiles = async () => {
      try {
        const response = await fetch('http://localhost:8000/mock-profiles');
        if (!response.ok) {
          throw new Error('Failed to fetch profiles');
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching mock profiles:', error);
      }
    };

    fetchMockProfiles();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: quizAnswers.age || 25,
          gender: quizAnswers.sex || 'female',
          orientation: quizAnswers.orientation || 'straight',
          essay: quizAnswers.fun + ' ' + quizAnswers.weekend,
          traits: userTraits, // Pass user traits here directly
        }),
      });

      if (!res.ok) throw new Error('Failed to fetch match data');

      const data = await res.json();
      setResults(data.profiles);  // Display the updated profiles with match data
      setStep(5); // Move to the result page
      setShowSwipes(true); // Enable swiping after quiz
    } catch (error) {
      console.error(error);
      alert('Failed to fetch match data from the backend.');
    }
  };

  const handleSwipe = (direction: string, profile: Profile) => {
    if (direction === 'right') {
      setLikes((prevLikes) => [...prevLikes, profile]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 text-gray-800 font-sans p-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6 space-y-6">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-pink-600">🎯 Build Your Vibe</h1>

        {step === 1 && (
          <div>
            <label className="font-semibold">What do you do for fun?</label>
            <textarea
              value={quizAnswers.fun || ''}
              onChange={(e) => handleQuizChange('fun', e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-xl mt-2"
            />
            <button
              onClick={() => setStep(2)}
              className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg text-lg transition"
            >
              Next
            </button>
          </div>
        )}

{step === 2 && (
  <div>
    <label>Describe your ideal weekend</label>
    <textarea
      value={quizAnswers.weekend || ''}
      onChange={(e) => handleQuizChange('weekend', e.target.value)}
      rows={3}
      className="w-full p-3 border border-gray-300 rounded-xl mt-2"
    />
    <button
      onClick={() => setStep(3)} // Proceed to the next step
      className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg text-lg transition"
    >
      Next
    </button>
  </div>
)}


{step === 3 && (
  <div>
    <label className="font-semibold">Pick a vibe profile (optional)</label>
    <select
      value={userTraits.join(", ")}
      onChange={(e) => handleVibeChange(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-xl mt-2"
    >
      <option value="Creative">Creative</option>
      <option value="Adventurous">Adventurous</option>
      <option value="Logical">Logical</option>
      <option value="Tech-Savvy">Tech-Savvy</option>
      <option value="Introvert">Introvert</option>
      <option value="Romantic">Romantic</option>
    </select>

    <button
      onClick={() => setStep(4)} // Proceed to the next step after selection
      className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg text-lg transition"
    >
      Next Step
    </button>
  </div>
)}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-pink-500">📝 Quick Cupid Quiz</h2>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold">{quizQuestions[quizIndex].label}</label>
                {renderInputField(quizQuestions[quizIndex])}
              </div>
              <button
                onClick={() => {
                  if (quizIndex < quizQuestions.length - 1) {
                    setQuizIndex(quizIndex + 1);
                  } else {
                    handleSubmit(); // Submit answers after the last question
                  }
                }}
                className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg text-lg transition"
              >
                {quizIndex < quizQuestions.length - 1 ? 'Next' : '💖 Get Match Insights'}
              </button>
            </div>
          </div>
        )}

        {step === 5 && showSwipes && (
          <div>
            <h2 className="text-xl font-bold mb-4 text-pink-500">Your Matches</h2>
            <SwipeCards
              profiles={results} // Display the profiles returned by the backend, which includes match data
              onSwipe={handleSwipe}
            />
          </div>
        )}
      </div>
    </div>
  );
}
