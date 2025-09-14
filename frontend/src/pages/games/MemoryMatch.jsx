import React, { useState, useEffect } from 'react';

const MemoryMatch = ({ onComplete }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Environmental species for the memory game
  const environmentalSpecies = [
    { name: 'Tiger', image: '🐯' },
    { name: 'Elephant', image: '🐘' },
    { name: 'Panda', image: '🐼' },
    { name: 'Turtle', image: '🐢' },
    { name: 'Whale', image: '🐋' },
    { name: 'Dolphin', image: '🐬' },
    { name: 'Koala', image: '🐨' },
    { name: 'Eagle', image: '🦅' },
  ];

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameStarted && !gameCompleted) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameStarted, gameCompleted]);

  const initializeGame = () => {
    const cardPairs = [...environmentalSpecies].sort(() => Math.random() - 0.5).slice(0, 8);

    // Duplicate each card to create pairs and shuffle
    const gameCards = [...cardPairs, ...cardPairs]
      .map((species, index) => ({
        id: index,
        name: species.name,
        image: species.image,
        flipped: false,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(gameCards);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setGameStarted(false);
    setGameCompleted(false);
    setTimeElapsed(0);
  };

  const handleCardClick = (id) => {
    if (!gameStarted) setGameStarted(true);
    if (gameCompleted || flippedCards.length >= 2) return;

    const clickedCard = cards.find(card => card.id === id);
    if (!clickedCard || clickedCard.flipped || clickedCard.matched) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    const updatedCards = cards.map(card =>
      card.id === id ? { ...card, flipped: true } : card
    );
    setCards(updatedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = updatedCards.find(card => card.id === firstId);
      const secondCard = updatedCards.find(card => card.id === secondId);

      if (firstCard && secondCard && firstCard.name === secondCard.name) {
        // Match found
        setTimeout(() => {
          const matchedCards = updatedCards.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, matched: true }
              : card
          );
          setCards(matchedCards);
          setFlippedCards([]);
          setMatchedPairs(prev => {
            const newMatchedPairs = prev + 1;
            if (newMatchedPairs === environmentalSpecies.length) {
              setGameCompleted(true);

              // Calculate score
              const maxMoves = environmentalSpecies.length * 3;
              const moveScore = Math.max(0, 50 - Math.floor((moves / maxMoves) * 50));
              const maxTime = 120;
              const timeScore = Math.max(0, 50 - Math.floor((timeElapsed / maxTime) * 50));
              const totalScore = moveScore + timeScore;
              onComplete(totalScore);
            }
            return newMatchedPairs;
          });
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = updatedCards.map(card =>
            card.id === firstId || card.id === secondId
              ? { ...card, flipped: false }
              : card
          );
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Endangered Species Memory Match</h2>
      <p className="mb-4">Match pairs of endangered species to complete the game. Remember their positions to make matches faster!</p>

      <div className="flex justify-between mb-4">
        <div><span className="font-bold">Moves:</span> {moves}</div>
        <div><span className="font-bold">Matched:</span> {matchedPairs}/{environmentalSpecies.length}</div>
        <div><span className="font-bold">Time:</span> {formatTime(timeElapsed)}</div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {cards.map(card => (
          <div
            key={card.id}
            className={`aspect-square flex items-center justify-center rounded-lg cursor-pointer text-4xl transition-all transform 
              ${card.flipped || card.matched ? 'rotate-0' : 'rotate-y-180'}
              ${card.matched ? 'bg-green-100' : card.flipped ? 'bg-blue-100' : 'bg-gray-300'}`}
            onClick={() => handleCardClick(card.id)}
          >
            {(card.flipped || card.matched) ? card.image : '❓'}
          </div>
        ))}
      </div>

      {gameCompleted && (
        <div className="text-center mb-4">
          <p className="text-xl font-bold text-green-600">Congratulations! You completed the game!</p>
          <p>You matched all pairs in {moves} moves and {formatTime(timeElapsed)}.</p>
        </div>
      )}

      <div className="flex justify-center">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={initializeGame}
        >
          {gameCompleted ? 'Play Again' : 'Restart Game'}
        </button>
      </div>
    </div>
  );
};

export default MemoryMatch;
