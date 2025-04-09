'use client';

import { useState } from 'react';
import '../app/globals.css';

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    orientation: '',
    essay: '',
    traits: '',
  });

  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [sentiment, setSentiment] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      age: parseInt(formData.age),
      gender: formData.gender,
      orientation: formData.orientation,
      essay: formData.essay,
      traits: formData.traits.split(',').map((trait) => trait.trim()),
    };

    try {
      const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Backend error');

      const data = await response.json();
      setMatchScore(data.match_score);
      setSentiment(data.sentiment);
    } catch (error) {
      console.error(error);
      alert('Prediction failed. Make sure the backend is running.');
    }
  };

  return (
    <div className="relative w-full max-w-xl p-6 bg-gradient-to-br from-pink-50 via-white to-pink-100 shadow-xl rounded-2xl mt-10 border border-pink-200 font-sans text-gray-800">
      <div className="absolute top-0 left-0 bg-pink-500 text-white px-4 py-1 text-xs font-semibold rounded-br-xl shadow">
        💕 Cupid Certified
      </div>

      <h2 className="text-2xl font-bold mb-4 text-pink-600">Quick Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          placeholder="Your age"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          required
        >
          <option value="">Select gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="nonbinary">Nonbinary</option>
        </select>

        <select
          name="orientation"
          value={formData.orientation}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          required
        >
          <option value="">Orientation</option>
          <option value="straight">Straight</option>
          <option value="gay">Gay</option>
          <option value="bisexual">Bisexual</option>
        </select>

        <textarea
          name="essay"
          value={formData.essay}
          onChange={handleChange}
          placeholder="Write your dating bio..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />

        <input
          name="traits"
          value={formData.traits}
          onChange={handleChange}
          placeholder="Comma-separated traits (e.g. adventurous, kind, funny)"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
        />

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold text-lg transition"
        >
          💘 Start the Vibe Quiz
        </button>
      </form>

      {matchScore !== null && (
        <div className="mt-6 text-lg text-gray-700">
          <p>Match Score: <strong>{matchScore}%</strong></p>
          <p>
            Sentiment: <strong>
              {sentiment === 'positive' ? '😊' : sentiment === 'neutral' ? '😐' : '😞'}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
}
