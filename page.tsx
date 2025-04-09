// app/page.tsx
import SwipeCards from '@/components/SwipeCards';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-pink-50">
      <h1 className="text-4xl font-bold text-pink-700 mb-6">💘 Cupid Matcher</h1>
      <SwipeCards />
    </main>
  );
}
