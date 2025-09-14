import React, { useState, useEffect } from 'react';

const DragAndDrop = ({ onComplete, onRequestHint }) => {
  const [zones, setZones] = useState([]);
  const [items, setItems] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hint, setHint] = useState('');

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const gameData = {
      zones: [
        { id: 'recyclable', title: 'Recyclable', items: [] },
        { id: 'organic', title: 'Organic Waste', items: [] },
        { id: 'electronic', title: 'Electronic Waste', items: [] },
        { id: 'hazardous', title: 'Hazardous Waste', items: [] },
      ],
      items: [
        { id: 'item1', text: 'Plastic Bottle', category: 'recyclable' },
        { id: 'item2', text: 'Newspaper', category: 'recyclable' },
        { id: 'item3', text: 'Glass Jar', category: 'recyclable' },
        { id: 'item4', text: 'Aluminum Can', category: 'recyclable' },
        { id: 'item5', text: 'Fruit Peels', category: 'organic' },
        { id: 'item6', text: 'Vegetable Scraps', category: 'organic' },
        { id: 'item7', text: 'Coffee Grounds', category: 'organic' },
        { id: 'item8', text: 'Old Smartphone', category: 'electronic' },
        { id: 'item9', text: 'Broken Headphones', category: 'electronic' },
        { id: 'item10', text: 'Used Batteries', category: 'hazardous' },
        { id: 'item11', text: 'Paint Cans', category: 'hazardous' },
        { id: 'item12', text: 'Light Bulbs', category: 'hazardous' },
      ],
      hints: {
        recyclable: 'Items that can be processed and turned into new products',
        organic: 'Natural materials that can decompose and become compost',
        electronic: 'Devices that use electricity and contain circuit boards',
        hazardous: 'Materials that are dangerous to dispose of in regular trash',
      },
    };

    setZones(gameData.zones);
    setItems(gameData.items);
    setMaxScore(gameData.items.length);
  }, []);

  useEffect(() => {
    if (gameStarted && !gameCompleted && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameCompleted) {
      handleGameEnd();
    }
  }, [timeLeft, gameStarted, gameCompleted]);

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, zoneId) => {
    e.preventDefault();
    if (!draggedItem) return;

    setItems(items.filter((item) => item.id !== draggedItem.id));

    setZones(
      zones.map((zone) => {
        if (zone.id === zoneId) {
          return { ...zone, items: [...zone.items, draggedItem] };
        }
        return zone;
      })
    );

    if (draggedItem.category === zoneId) {
      setScore((prev) => prev + 1);
    }

    if (items.length === 1) {
      setTimeout(() => handleGameEnd(), 500);
    }

    setDraggedItem(null);
  };

  const handleGameStart = () => setGameStarted(true);

  const handleGameEnd = () => {
    setGameCompleted(true);
    onComplete(score, maxScore);
  };

  const handleRequestHint = () => {
    onRequestHint();
    const hintData = {
      recyclable: 'Items that can be processed and turned into new products',
      organic: 'Natural materials that can decompose and become compost',
      electronic: 'Devices that use electricity and contain circuit boards',
      hazardous: 'Materials that are dangerous to dispose of in regular trash',
    };
    const categories = Object.keys(hintData);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    setHint(hintData[randomCategory]);
    setShowHint(true);
    setTimeout(() => setShowHint(false), 5000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-eco-dark mb-4">Waste Sorting Challenge</h2>
        <p className="text-gray-600 mb-6 text-center">
          Sort the waste items into their correct categories. Drag each item to the appropriate bin.
        </p>
        <button
          onClick={handleGameStart}
          className="px-6 py-3 bg-eco-primary text-white rounded-md hover:bg-eco-secondary transition-colors"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-eco-dark mb-4">Game Completed!</h2>
        <p className="text-xl mb-6">Your score: {score} out of {maxScore}</p>
        <div className="w-full max-w-md bg-gray-100 rounded-full h-4 mb-6">
          <div
            className="bg-eco-primary h-4 rounded-full"
            style={{ width: `${(score / maxScore) * 100}%` }}
          ></div>
        </div>
        <p className="text-gray-600 mb-6 text-center">
          {score === maxScore
            ? "Perfect! You've mastered waste sorting!"
            : score >= maxScore * 0.7
            ? "Great job! You're becoming an eco-expert!"
            : "Good effort! Keep learning about waste management."}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-medium">
          Score: {score}/{maxScore}
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-lg font-medium">
            Time: {formatTime(timeLeft)}
          </div>
          <button
            onClick={handleRequestHint}
            className="px-3 py-1 bg-eco-secondary text-white rounded-md hover:bg-eco-primary transition-colors"
          >
            Hint
          </button>
        </div>
      </div>

      {showHint && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">{hint}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Drop Zones */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-eco-dark">Waste Bins</h3>
          {zones.map((zone) => (
            <div
              key={zone.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, zone.id)}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[120px] bg-gray-50 hover:border-eco-primary transition-colors"
            >
              <h4 className="font-medium text-eco-dark mb-2">{zone.title}</h4>
              <div className="flex flex-wrap gap-2">
                {zone.items.map((item) => (
                  <div key={item.id} className="bg-eco-primary text-white px-3 py-1 rounded-md text-sm">
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Draggable Items */}
        <div>
          <h3 className="text-lg font-medium text-eco-dark mb-4">Items to Sort</h3>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item)}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md text-sm cursor-move transition-colors"
                >
                  {item.text}
                </div>
              ))}
              {items.length === 0 && <p className="text-gray-500 italic">All items sorted!</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DragAndDrop;
