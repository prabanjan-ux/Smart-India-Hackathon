import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import StudentDash from "./pages/StudentDash";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Quiz from "./pages/Quiz";
import DragAndDrop from "./pages/games/DragAndDrop";
import MemoryMatch from "./pages/games/MemoryMatch";
import WordPuzzle from "./pages/games/WordPuzzle";
import FlashCardPage from "./pages/FlashCardPage";
import Deck from "./pages/Deck";
import Games from "./pages/GameLayout";
import TeacherDashboard from "./pages/TeacherDashboard";
import CreateGame from "./pages/CreateGame";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/studentdashboard" element={<StudentDash />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/draganddrop" element={<DragAndDrop />} />  
        <Route path="/memorymatch" element={<MemoryMatch />} />
        <Route path="/wordpuzzle" element={<WordPuzzle />} />
        <Route path="/learntopics" element={<FlashCardPage />} />
        <Route path="/deck/:topic" element={<Deck />} />
        <Route path="/games" element={<Games />} />
        <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        <Route path="/creategame" element={<CreateGame />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
