// src/components/SwipeCards.tsx
import TinderCard from 'react-tinder-card';
import { useState, useMemo } from 'react';
import { Profile } from './CupidQuiz';

type SwipeCardsProps = {
  profiles: Profile[];
  onSwipe: (direction: string, profile: Profile) => void;
};

export default function SwipeCards({ profiles, onSwipe }: SwipeCardsProps) {
  const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);
  const currentProfile = useMemo(() => profiles[currentIndex], [currentIndex, profiles]);

  const swiped = (dir: string, profile: Profile) => {
    console.log('You swiped: ', dir, profile.name);
    onSwipe(dir, profile);
    setCurrentIndex((prev) => prev - 1);
  };

  const outOfFrame = (name: string) => {
    console.log(name, 'left the screen');
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-xl font-bold text-pink-600 mb-4">💘 Swipe to Like</h2>

      <div className="relative w-[320px] h-[440px]">
        {profiles.map((profile, index) => (
          <TinderCard
            key={profile.name}
            onSwipe={(dir) => swiped(dir, profile)}
            onCardLeftScreen={() => outOfFrame(profile.name)}
            preventSwipe={['up', 'down']}
            swipeRequirementType="position"
            swipeThreshold={80}
            className="absolute"
          >
            <div
              className="w-[320px] h-[440px] rounded-2xl bg-cover bg-center shadow-lg flex flex-col justify-end text-white font-semibold p-4 transition-all"
              style={{
                backgroundImage: `url(${profile.image})`,
                zIndex: profiles.length - index,
              }}
            >
              <div className="bg-black/50 backdrop-blur p-3 rounded-xl space-y-1">
                <div className="text-lg">{profile.name}</div>
                <div className="text-sm">Match: {profile.match}</div>
                <div className="text-sm">Mood: {profile.sentiment}</div>
                <div className="text-xs italic">{profile.reason}</div>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      <div className="flex gap-6 mt-6">
        <button className="text-3xl px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">❌</button>
        <button className="text-3xl px-4 py-2 bg-pink-400 rounded-full hover:bg-pink-500 transition">💖</button>
      </div>
    </div>
  );
}
