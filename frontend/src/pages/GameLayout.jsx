import React from 'react';
import Sidebar from '../components/Sidebar';
import StudHeader from '../components/StudHeader';
import { Link } from 'react-router-dom';

const games = [
  {
    id: 'eco-word-puzzle',
    title: 'Eco Word Puzzle',
    description: 'Test your environmental vocabulary with our word puzzle challenges.',
    route: '/wordpuzzle'        // ✅ match App.jsx
  },
  {
    id: 'drag-and-drop',
    title: 'Waste Sorting (Drag & Drop)',
    description: 'Learn proper waste segregation through our drag and drop game.',
    route: '/draganddrop'
  },
  {
    id: 'memory-match',
    title: 'Memory Match',
    description: 'Match environmental concepts and facts in this classic memory game.',
    route: '/memorymatch'
  },
  {
    id: 'bubble-game',
    title: 'Bubble Game',
    description: 'Pop the bubbles to answer eco-questions and improve your knowledge.',
    route: '/bubblegame' // add this if route exists
  },
];

export default function Games() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeTab="games" onNavClick={() => {}} />
      <div className="flex-1 flex flex-col">
        <StudHeader />
        <main className="flex-1 px-8 py-10">
          <h2 className="text-3xl font-bold text-green-700 text-center mb-10">Featured Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {games.map(game => (
              <div key={game.id} className="bg-white rounded-xl shadow-md p-8 w-[300px] flex flex-col items-center">
                <h3 className="text-xl font-bold text-green-700 mb-3 text-center">{game.title}</h3>
                <p className="text-gray-600 text-center mb-6">{game.description}</p>
                <Link to={game.route}>
                  <button className="bg-green-500 text-white font-semibold px-6 py-2 rounded hover:bg-green-600 transition-colors">
                    Play Now
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
