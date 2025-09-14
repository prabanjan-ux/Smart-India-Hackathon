import React, { useState } from "react";

const Flashcard = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{ perspective: "1000px" }}
      className="w-80 h-52 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.7s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        className="relative w-full h-full"
      >
        {/* Front Side */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute w-full h-full bg-white rounded-2xl shadow-md flex items-center justify-center p-4"
        >
          <p className="text-green-800 font-semibold text-lg text-center">
            {front}
          </p>
        </div>

        {/* Back Side */}
        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="absolute w-full h-full bg-green-100 rounded-2xl shadow-md flex items-center justify-center p-4"
        >
          <p className="text-green-900 font-bold text-xl text-center">{back}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
