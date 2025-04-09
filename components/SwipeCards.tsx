// src/components/SwipeCards.tsx

import TinderCard from 'react-tinder-card';

const profiles = [
  { name: 'Jane Doe', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'John Smith', img: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { name: 'Sasha Luna', img: 'https://randomuser.me/api/portraits/women/46.jpg' },
];

export default function SwipeCards() {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-4xl font-bold mb-6">💘 Cupid Swipe</h1>
      <div className="relative w-[300px] h-[400px]">
        {profiles.map((profile) => (
          <TinderCard
            key={profile.name}
            preventSwipe={['up', 'down']}
            className="absolute"
          >
            <div
              className="bg-white rounded-xl shadow-md w-[300px] h-[400px] flex flex-col items-center justify-end p-4"
              style={{ backgroundImage: `url(${profile.img})`, backgroundSize: 'cover' }}
            >
              <h3 className="text-white text-xl bg-black/50 px-2 py-1 rounded">{profile.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}
