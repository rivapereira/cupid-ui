// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">
        💖 Welcome to What is Connection?
      </h1>
      <p className="mb-6 text-gray-700 max-w-xl">
        This playful AI dating demo lets you explore compatibility and emotional tone through interactive questions and sentiment-based insights.
      </p>

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-pink-500">Quick Profile</h2>
        <p className="text-gray-600">
          Ready to find your vibe match? Let’s go!
        </p>

        <button
          onClick={() => router.push('/quiz')}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold transition"
        >
          💘 Start the Vibe Quiz
        </button>
      </div>
    </div>
  );
}
