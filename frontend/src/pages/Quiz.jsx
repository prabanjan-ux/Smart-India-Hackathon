import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import useSound from "use-sound";
import wrongSound from "../assets/sounds/wrong.mp3"
import correctSound from "../assets/sounds/correct.mp3";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Quiz.css";

// 20 Questions
const allQuestions = [
  {
    category: "🌳 Forest",
    question: "Which district in Punjab faces the most deforestation?",
    options: ["Ludhiana", "Pathankot", "Amritsar", "Hoshiarpur"],
    answer: 3,
    explanation:
      "Hoshiarpur has seen significant deforestation due to development.",
  },
  {
    category: "💧 Water",
    question: "What is the main cause of groundwater depletion in Punjab?",
    options: ["Rainfall", "Over-irrigation", "Industrial waste", "Floods"],
    answer: 1,
    explanation: "Over-irrigation for crops has led to groundwater depletion.",
  },
  {
    category: "🏭 Pollution",
    question: "Which practice causes severe winter air pollution in Punjab?",
    options: [
      "Vehicle smoke",
      "Stubble burning",
      "Plastic waste",
      "Brick kilns",
    ],
    answer: 1,
    explanation: "Stubble burning is the major cause of winter smog in Punjab.",
  },
  {
    category: "🏗️ Man-made",
    question: "Which city in Punjab faces high industrial pollution?",
    options: ["Patiala", "Ludhiana", "Bathinda", "Ferozepur"],
    answer: 1,
    explanation:
      "Ludhiana is highly polluted due to textile and dye industries.",
  },
  {
    category: "💧 Water",
    question: "Which river in Punjab is most polluted?",
    options: ["Sutlej", "Beas", "Ravi", "Ghaggar"],
    answer: 0,
    explanation: "Sutlej river is heavily polluted by industrial effluents.",
  },
  {
    category: "🌳 Forest",
    question: "Forests in Punjab mainly exist in?",
    options: ["Plains", "Hills", "Urban areas", "Desert"],
    answer: 1,
    explanation: "Punjab's forests are mostly in the Shivalik hills region.",
  },
  {
    category: "🏭 Pollution",
    question: "Which gas causes smog in Punjab winters?",
    options: [
      "Carbon dioxide",
      "Sulphur dioxide",
      "Nitrogen oxides",
      "Methane",
    ],
    answer: 2,
    explanation: "Nitrogen oxides mix with other gases to cause smog.",
  },
  {
    category: "🏗️ Man-made",
    question: "What is a major man-made problem in Punjab cities?",
    options: ["Overpopulation", "Illegal mining", "Sandstorms", "Landslides"],
    answer: 1,
    explanation: "Illegal sand mining is a big issue in Punjab rivers.",
  },
  {
    category: "💧 Water",
    question: "Why is Punjab's water table falling rapidly?",
    options: [
      "Overuse of tube wells",
      "Less rainfall",
      "Industrial demand",
      "Climate change",
    ],
    answer: 0,
    explanation: "Excess use of tube wells for paddy is the main reason.",
  },
  {
    category: "🌳 Forest",
    question: "Which project aims at increasing green cover in Punjab?",
    options: [
      "Mission Green Punjab",
      "Van Mahotsav",
      "Eco Punjab",
      "Harit Bharat",
    ],
    answer: 0,
    explanation: "Mission Green Punjab focuses on afforestation.",
  },
  {
    category: "🌳 Forest",
    question: "Which forest in Punjab is protected?",
    options: [
      "Abohar Wildlife Sanctuary",
      "Harike Wetland",
      "Chandigarh Forest",
      "Patiala Reserve",
    ],
    answer: 0,
    explanation: "Abohar Wildlife Sanctuary is protected.",
  },
  {
    category: "💧 Water",
    question: "Which water conservation technique is used in Punjab?",
    options: ["Rainwater harvesting", "Dams", "Desalination", "None"],
    answer: 0,
    explanation: "Rainwater harvesting is widely encouraged.",
  },
  {
    category: "🏭 Pollution",
    question: "Main source of industrial pollution in Ludhiana?",
    options: ["Textiles", "Sugar mills", "Cement", "Electronics"],
    answer: 0,
    explanation: "Textile industries pollute air and water.",
  },
  {
    category: "🏗️ Man-made",
    question: "Major traffic problem in Punjab cities?",
    options: ["Congestion", "Accidents", "Noise", "All"],
    answer: 3,
    explanation:
      "Traffic congestion, accidents, and noise are all major issues.",
  },
  {
    category: "💧 Water",
    question: "Which groundwater contaminant is common in Punjab?",
    options: ["Nitrate", "Lead", "Mercury", "Arsenic"],
    answer: 0,
    explanation: "Nitrate contamination is prevalent due to fertilizers.",
  },
  {
    category: "🌳 Forest",
    question: "Punjab's forest cover percentage?",
    options: ["3%", "6%", "12%", "20%"],
    answer: 1,
    explanation: "Forest cover is around 6% of total area.",
  },
  {
    category: "🏭 Pollution",
    question: "Main cause of winter smog in Punjab?",
    options: ["Stubble burning", "Vehicle emissions", "Factories", "None"],
    answer: 0,
    explanation: "Stubble burning contributes heavily to winter smog.",
  },
  {
    category: "🏗️ Man-made",
    question: "Which city has high urbanization?",
    options: ["Amritsar", "Ludhiana", "Patiala", "Bathinda"],
    answer: 1,
    explanation: "Ludhiana is highly urbanized and industrialized.",
  },
  {
    category: "💧 Water",
    question: "Which is a major water body in Punjab?",
    options: ["Sutlej", "Ganga", "Yamuna", "Brahmaputra"],
    answer: 0,
    explanation: "Sutlej is the main river flowing through Punjab.",
  },
  {
    category: "🌳 Forest",
    question: "Which is a biodiversity hotspot in Punjab?",
    options: ["Shivalik Hills", "Punjab Plains", "Chandigarh Area", "None"],
    answer: 0,
    explanation: "Shivalik Hills host most biodiversity.",
  },
];

// Category colors & images
const categoryBackgrounds = {
  "🌳 Forest": { color: "#a3e4a3", image: "/images/forest.jpg" },
  "💧 Water": { color: "#80cfff", image: "/images/water.jpg" },
  "🏭 Pollution": { color: "#d9c89b", image: "/images/pollution.jpg" },
  "🏗️ Man-made": { color: "#f0e68c", image: "/images/city.jpg" },
};

export default function Quiz() {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const [playWrong] = useSound(wrongSound);
  const [playCorrect] = useSound(correctSound);

  // Start Quiz and pick 10 random questions
  const startQuiz = () => {
    const shuffled = [...allQuestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    setQuizQuestions(shuffled);
    setCurrent(0);
    setScore(0);
    setWrongCount(0);
    setTimeLeft(15);
    setQuizCompleted(false);
    setSelectedOption(null);
  };

  useEffect(() => {
    startQuiz();
  }, []);

  useEffect(() => {
    if (quizCompleted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [current, quizCompleted]);

  const handleAnswer = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    const correct = quizQuestions[current].answer;
    if (index !== correct) {
      playWrong();
      setWrongCount((prev) => prev + 1);
    } else setScore((prev) => prev + 1);
    setTimeout(() => handleNext(), 1500);
  };

  const handleNext = () => {
    setSelectedOption(null);
    if (current < quizQuestions.length - 1) {
      setCurrent((c) => c + 1);
      setTimeLeft(15);
    } else {
      setQuizCompleted(true);
      playCorrect(); // applause only at end
    }
  };

  if (quizQuestions.length === 0) return <div>Loading...</div>;
  const currentQuestion = quizQuestions[current];
  const bg = categoryBackgrounds[currentQuestion.category];

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#eaf3e5",
      }}
    >
      <motion.img
        key={current}
        src={bg.image}
        alt="category"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        key={"overlay-" + current}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: bg.color,
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.8 }}
      />

      <motion.div
        style={{
          position: "relative",
          zIndex: 2,
          padding: 20,
          borderRadius: 15,
          width: 450,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          border: "4px solid #2e7d32",
          backgroundColor: bg.color,
          transition: "background-color 0.8s ease",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          style={{
            fontFamily: "'Pacifico', cursive",
            fontSize: 36,
            color: "#2e7d32",
            textAlign: "center",
            marginBottom: 15,
          }}
        >
          EcoChamps
        </h1>

        {!quizCompleted ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
                fontWeight: "bold",
                color: "#2e7d32",
              }}
            >
              <span>Eco Score: {score}</span>
              <span>{current + 1} / 10</span>
            </div>
            <div
              style={{
                marginBottom: 10,
                fontWeight: "bold",
                textAlign: "center",
                color: "#000",
              }}
            >
              {currentQuestion.category}
            </div>
            <div style={{ width: 50, height: 50, margin: "0 auto 15px" }}>
              <CircularProgressbar
                value={timeLeft}
                maxValue={15}
                text={`${timeLeft}s`}
                styles={buildStyles({
                  textSize: "28px",
                  pathColor: "#2e7d32",
                  textColor: "#2e7d32",
                  trailColor: "#ddd",
                })}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <h2 style={{ textAlign: "center", color: "#000" }}>
                  {currentQuestion.question}
                </h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginTop: 10,
                  }}
                >
                  {currentQuestion.options.map((opt, i) => (
                    <motion.div
                      key={i}
                      onClick={() => handleAnswer(i)}
                      style={{
                        padding: 12,
                        borderRadius: 10,
                        border: "2px solid #ccc",
                        fontWeight: "bold",
                        cursor: "pointer",
                        backgroundColor:
                          selectedOption === null
                            ? "#fff"
                            : i === currentQuestion.answer
                            ? "#4caf50"
                            : i === selectedOption
                            ? "#e53935"
                            : "#fff",
                        color:
                          selectedOption !== null &&
                          (i === currentQuestion.answer || i === selectedOption)
                            ? "#fff"
                            : "#000",
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {opt}
                    </motion.div>
                  ))}
                </div>
                {selectedOption !== null && (
                  <p
                    style={{
                      marginTop: 10,
                      textAlign: "center",
                      color: "#000",
                    }}
                  >
                    {currentQuestion.explanation}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <>
            <h2 style={{ textAlign: "center", color: "#000" }}>
              🎉 Congratulations!
            </h2>
            <p style={{ textAlign: "center", color: "#000" }}>
              Correct Answers: {score}
            </p>
            <p style={{ textAlign: "center", color: "#000" }}>
              Wrong Answers: {wrongCount}
            </p>
            <button
              onClick={startQuiz}
              style={{
                display: "block",
                margin: "20px auto 0",
                padding: "10px 20px",
                borderRadius: 20,
                border: "none",
                backgroundColor: "#2e7d32",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Play Again
            </button>
          </>
        )}
      </motion.div>

      {quizCompleted && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </div>
  );
}
