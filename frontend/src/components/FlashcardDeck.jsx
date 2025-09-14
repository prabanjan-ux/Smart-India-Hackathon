import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";

export default function FlashcardDeck({ cards, onBack }) {
  const [page, setPage] = useState(0);

  useEffect(() => setPage(0), [cards]);

  if (!cards || cards.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-6">
        <h2 className="text-2xl font-bold text-red-800 mb-4">No flashcards found.</h2>
        <button onClick={onBack} className="px-6 py-2 bg-red-600 text-white rounded">
          Back
        </button>
      </div>
    );
  }

  const cardsPerPage = 3;
  const start = page * cardsPerPage;
  const end = start + cardsPerPage;
  const current = cards.slice(start, end);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 gap-6 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Flashcards</h1>

      <div className="flex flex-wrap gap-6 justify-center">
        {current.map((c, i) => (
          <Flashcard key={start + i} front={c.front} back={c.back} />
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={() => page > 0 && setPage(page - 1)}
          disabled={page === 0}
          className="px-4 py-2 bg-green-700 text-white rounded disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={() => end < cards.length && setPage(page + 1)}
          disabled={end >= cards.length}
          className="px-4 py-2 bg-green-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <button
        onClick={onBack}
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Back to Topics
      </button>
    </div>
  );
}
