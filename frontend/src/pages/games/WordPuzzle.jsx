import React, { useEffect, useRef, useState } from "react";

const puzzles = [
  {
    topic: "Water & Earth",
    words: [
      { word: "GLACIER", clue: "A large, slow-moving body of ice.", startX: 4, startY: 0, orientation: "across", explanation: "Glaciers are the largest reservoirs of fresh water on Earth." },
      { word: "EROSION", clue: "The process of soil being worn away by wind or water.", startX: 0, startY: 0, orientation: "down", explanation: "Erosion is a natural process that shapes landscapes, but can be accelerated by human activities like deforestation." },
      { word: "FOSSIL", clue: "The preserved remains of a plant or animal from long ago.", startX: 0, startY: 5, orientation: "across", explanation: "Fossils provide key evidence about the history of life on Earth and show how species have evolved." },
      { word: "WETLAND", clue: "An area of land covered in water, like a swamp or marsh.", startX: 6, startY: 1, orientation: "down", explanation: "Wetlands are vital for biodiversity and act as natural filters for pollutants." },
      { word: "AQUIFER", clue: "An underground layer of rock that holds water.", startX: 0, startY: 9, orientation: "across", explanation: "Aquifers are a major source of groundwater, which is an essential resource for drinking and agriculture." },
      { word: "GEOTHERMAL", clue: "Energy from the natural heat inside the Earth.", startX: 10, startY: 2, orientation: "down", explanation: "Geothermal energy is a renewable and sustainable power source that uses the heat from the Earth's core." }
    ]
  },
  // ✅ Add the rest of your puzzle objects here (Conservation, Flora & Fauna, etc.)
];

const gridSize = 12;

export default function Puzzle() {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [grid, setGrid] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [message, setMessage] = useState(null);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [allPuzzlesCompleted, setAllPuzzlesCompleted] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);
  const [availableWords, setAvailableWords] = useState([]);
  const [explanationMessage, setExplanationMessage] = useState(null);

  useEffect(() => {
    if (!allPuzzlesCompleted) {
      initializePuzzle();
      startTimer();
    } else {
      stopTimer();
    }
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, [currentPuzzleIndex, allPuzzlesCompleted]);

  const startTimer = () => {
    clearInterval(timerRef.current);
    setTime(0);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const stopTimer = () => clearInterval(timerRef.current);

  const initializePuzzle = () => {
    const words = puzzles[currentPuzzleIndex].words;
    const newGrid = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(null)
    );
    let clueNumber = 1;

    setSelectedWord(null);
    setPuzzleSolved(false);
    setAvailableWords(words.map((w) => w.word.toUpperCase()).sort());

    const wordsWithClueNumbers = words.map((w) => ({ ...w }));

    wordsWithClueNumbers.forEach((wordObj, index) => {
      const word = wordObj.word.toUpperCase();
      const startX = wordObj.startX;
      const startY = wordObj.startY;

      for (let i = 0; i < word.length; i++) {
        const x = wordObj.orientation === "across" ? startX + i : startX;
        const y = wordObj.orientation === "down" ? startY + i : startY;

        if (!newGrid[y][x]) {
          newGrid[y][x] = {
            letter: word[i],
            wordIndex: index,
            correct: false,
            solved: false,
            clueNumber: null
          };
        }
        if (i === 0) {
          newGrid[y][x].clueNumber = clueNumber;
          wordObj.clueNumber = clueNumber;
        }
      }
      clueNumber++;
    });

    setGrid(newGrid);
  };

  const handleCellClick = (x, y) => {
    const cellData = grid[y][x];
    if (!cellData) return;

    let newSelectedWord = null;
    if (cellData.clueNumber) {
      newSelectedWord = puzzles[currentPuzzleIndex].words.find(
        (w) => w.clueNumber === cellData.clueNumber
      );
    } else {
      newSelectedWord = puzzles[currentPuzzleIndex].words.find(
        (w) =>
          (w.orientation === "across" &&
            y === w.startY &&
            x >= w.startX &&
            x < w.startX + w.word.length) ||
          (w.orientation === "down" &&
            x === w.startX &&
            y >= w.startY &&
            y < w.startY + w.word.length)
      );
    }

    if (
      selectedWord &&
      newSelectedWord &&
      selectedWord.word === newSelectedWord.word
    ) {
      setSelectedWord(null);
    } else {
      setSelectedWord(newSelectedWord);
    }
  };

  const handleWordOptionClick = (word) => {
    if (!selectedWord) {
      showMessage(
        "Please select a word on the puzzle first by clicking on a number.",
        true
      );
      return;
    }

    const correctWordObject = puzzles[currentPuzzleIndex].words.find(
      (w) => w.word.toUpperCase() === word
    );

    if (selectedWord.word.toUpperCase() === word) {
      const newGrid = [...grid];
      const startX = selectedWord.startX;
      const startY = selectedWord.startY;

      for (let i = 0; i < selectedWord.word.length; i++) {
        const x = selectedWord.orientation === "across" ? startX + i : startX;
        const y = selectedWord.orientation === "down" ? startY + i : startY;
        newGrid[y][x].solved = true;
      }

      setGrid(newGrid);
      setSelectedWord(null);
      setAvailableWords((prev) => prev.filter((w) => w !== word));
      setExplanationMessage(correctWordObject.explanation);

      if (availableWords.length === 1) {
        setPuzzleSolved(true);
        stopTimer();

        if (currentPuzzleIndex === puzzles.length - 1) {
          setAllPuzzlesCompleted(true);
        }
      }
    } else {
      showMessage("Incorrect answer, please select the right word for the clue!", true);
    }
  };

  const showMessage = (text, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage(null), 3000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const getDisplayedLetter = (x, y) =>
    grid[y][x] && grid[y][x].solved ? grid[y][x].letter : "";

  const handleNextPuzzle = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-4">
      <header className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-600 drop-shadow-lg">
          Environmental Word Puzzle
        </h1>
        <p className="mt-2 text-lg text-gray-700">
          Sharpen your mind while learning about the planet!
        </p>
      </header>

      <main className="w-full grid lg:grid-cols-3 gap-8">
        {/* Topics */}
        <div className="bg-white p-6 rounded-2xl shadow-lg h-full">
          <h2 className="text-xl font-bold mb-4 text-emerald-600">Topics</h2>
          <ul className="space-y-2">
            {puzzles.map((p, index) => (
              <li
                key={index}
                className={`p-3 rounded-lg transition-colors duration-200 ${
                  currentPuzzleIndex === index
                    ? "bg-emerald-600 text-white font-bold shadow-md"
                    : "cursor-not-allowed text-gray-500"
                }`}
              >
                {p.topic}
                {index < currentPuzzleIndex && (
                  <span className="ml-2 text-white">✓</span>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6 bg-gray-200 rounded-full px-4 py-2 font-bold text-lg text-gray-800 shadow-md text-center">
            Time: {formatTime(time)}
          </div>
        </div>

        {/* Puzzle Grid + Clues */}
        <div className="bg-white p-6 rounded-2xl shadow-lg lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Grid */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-emerald-600">The Puzzle</h2>
            <div className="grid grid-cols-12 grid-rows-12 gap-0.5 bg-gray-300 border-4 border-gray-300 rounded-lg w-full max-w-lg mx-auto aspect-square">
              {grid.map((row, y) =>
                row.map((cell, x) => (
                  <div
                    key={`${x}-${y}`}
                    className={`relative aspect-square flex items-center justify-center font-bold text-lg rounded-sm transition-colors duration-200
                      ${cell ? "bg-white cursor-pointer text-gray-900" : "bg-gray-100 cursor-default"}
                      ${
                        selectedWord &&
                        ((selectedWord.orientation === "across" &&
                          y === selectedWord.startY &&
                          x >= selectedWord.startX &&
                          x < selectedWord.startX + selectedWord.word.length) ||
                          (selectedWord.orientation === "down" &&
                            x === selectedWord.startX &&
                            y >= selectedWord.startY &&
                            y < selectedWord.startY + selectedWord.word.length))
                          ? "bg-blue-300 text-gray-900"
                          : ""
                      }
                      ${cell?.solved ? "bg-emerald-500 text-white" : ""}`}
                    onClick={() => handleCellClick(x, y)}
                  >
                    {cell && (
                      <>
                        {cell.clueNumber && (
                          <span className="absolute top-1 left-1 text-xs font-normal text-gray-400">
                            {cell.clueNumber}
                          </span>
                        )}
                        <span>{getDisplayedLetter(x, y)}</span>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Clues & Words */}
          <div className="mt-8 lg:mt-0">
            <h2 className="text-xl font-bold mb-4 text-emerald-600">Clues & Words</h2>
            {selectedWord && (
              <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-sm text-yellow-800 rounded-lg shadow-inner">
                <strong>Selected Clue:</strong> {selectedWord.clueNumber}.{" "}
                {selectedWord.clue}
              </div>
            )}

            {/* Across */}
            <h3 className="font-bold text-lg text-emerald-700">Across</h3>
            <ul className="mt-2 text-sm space-y-2">
              {puzzles[currentPuzzleIndex].words
                .filter((w) => w.orientation === "across")
                .map((word, i) => (
                  <li
                    key={i}
                    className={`cursor-pointer ${
                      selectedWord?.word === word.word
                        ? "text-emerald-500 font-bold"
                        : "hover:text-emerald-500"
                    }`}
                    onClick={() => setSelectedWord(word)}
                  >
                    <strong>{word.clueNumber}.</strong> {word.clue}
                  </li>
                ))}
            </ul>

            {/* Down */}
            <h3 className="font-bold text-lg text-emerald-700 mt-6">Down</h3>
            <ul className="mt-2 text-sm space-y-2">
              {puzzles[currentPuzzleIndex].words
                .filter((w) => w.orientation === "down")
                .map((word, i) => (
                  <li
                    key={i}
                    className={`cursor-pointer ${
                      selectedWord?.word === word.word
                        ? "text-emerald-500 font-bold"
                        : "hover:text-emerald-500"
                    }`}
                    onClick={() => setSelectedWord(word)}
                  >
                    <strong>{word.clueNumber}.</strong> {word.clue}
                  </li>
                ))}
            </ul>

            {/* Word Buttons */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select a word to fill the puzzle:
              </label>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {availableWords.map((word) => (
                  <button
                    key={word}
                    onClick={() => handleWordOptionClick(word)}
                    className="py-3 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all duration-300"
                    disabled={!selectedWord || puzzleSolved}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Messages */}
      {message && (
        <div
          className={`fixed bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-xl text-white text-center z-50
            ${message.isError ? "bg-red-500" : "bg-blue-500"}`}
        >
          {message.text}
        </div>
      )}

      {/* Explanation Modal */}
      {explanationMessage && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full text-center">
            <h3 className="text-2xl font-bold mb-4 text-emerald-600">
              Did you know?
            </h3>
            <p className="text-gray-800 text-lg">{explanationMessage}</p>
            <button
              onClick={() => setExplanationMessage(null)}
              className="mt-6 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {puzzleSolved && !allPuzzlesCompleted && (
        <div className="text-center mt-8">
          <button
            onClick={handleNextPuzzle}
            className="py-3 px-8 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold transition-colors shadow-lg"
          >
            Next Puzzle
          </button>
        </div>
      )}

      {allPuzzlesCompleted && (
        <div className="text-center mt-8 p-6 bg-emerald-600 rounded-2xl shadow-lg text-white">
          <h2 className="text-3xl font-extrabold">You Did It!</h2>
          <p className="text-xl mt-2">
            You have completed all the puzzles in {formatTime(time)}!
          </p>
          <div className="mt-4 inline-flex items-center space-x-2 bg-yellow-400 text-yellow-900 rounded-full px-6 py-3 font-semibold text-lg">
            <span className="text-4xl">🏆</span>
            <span>Puzzle Master Badge Unlocked!</span>
          </div>
        </div>
      )}

      <div className="text-center mt-8">
        <a
          href="/login"
          className="inline-block py-2 px-6 rounded-lg bg-gray-700 hover:bg-gray-800 text-white font-semibold transition-colors"
        >
          Return to Login
        </a>
      </div>
    </div>
  );
}
