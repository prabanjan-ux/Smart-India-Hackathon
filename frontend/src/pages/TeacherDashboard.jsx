import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * @typedef {Object} Student
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} grade
 * @property {number} ecoPoints
 * @property {number} completedGames
 * @property {string} lastActive
 */

/**
 * @typedef {Object} Game
 * @property {string} id
 * @property {string} title
 * @property {string} type
 * @property {string} difficulty
 * @property {number} plays
 * @property {number} avgScore
 * @property {string} dateCreated
 */

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]); // Array of Student
  const [games, setGames] = useState([]); // Array of Game
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with your real API endpoints
    Promise.all([
      fetch("/api/students").then((res) => res.json()),
      fetch("/api/games").then((res) => res.json()),
    ])
      .then(([studentsData, gamesData]) => {
        setStudents(studentsData);
        setGames(gamesData);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter games based on search term
  const filteredGames = games.filter(
    (game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics for overview
  const totalStudents = students.length;
  const totalGames = games.length;
  const totalGamePlays = games.reduce((sum, game) => sum + game.plays, 0);
  const avgEcoPoints =
    totalStudents > 0
      ? Math.round(
          students.reduce((sum, student) => sum + student.ecoPoints, 0) /
            totalStudents
        )
      : 0;

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      <h1 className="text-4xl font-extrabold text-eco-dark mb-8 flex items-center gap-3">
        <span className="inline-block bg-eco-primary text-white rounded-full p-2 shadow-lg animate-bounce">
          👩‍🏫
        </span>
        Teacher Dashboard
      </h1>

      {/* Overview + Quick Actions */}
      <div className="mb-8 flex flex-col md:flex-row gap-6">
        {/* Overview Card */}
        <div className="bg-gradient-to-br from-eco-primary via-eco-accent to-green-400 rounded-xl shadow-2xl p-6 border border-eco-primary flex-1 text-white">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span className="animate-spin">📊</span> Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/20 rounded-lg p-4 text-center shadow-md">
              <div className="text-3xl font-extrabold">{totalStudents}</div>
              <div className="font-medium">Students</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center shadow-md">
              <div className="text-3xl font-extrabold">{totalGames}</div>
              <div className="font-medium">Games</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center shadow-md">
              <div className="text-3xl font-extrabold">{totalGamePlays}</div>
              <div className="font-medium">Total Plays</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 text-center shadow-md">
              <div className="text-3xl font-extrabold">{avgEcoPoints}</div>
              <div className="font-medium">Avg Eco-Points</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-2xl p-6 border border-eco-primary w-full md:w-64 flex flex-col justify-between">
          <h2 className="text-xl font-bold mb-4 text-eco-primary flex items-center gap-2">
            <span className="animate-pulse">⚡</span> Quick Actions
          </h2>
          <div className="flex flex-col gap-3">
            <button
              className="btn btn-primary flex items-center gap-2"
              onClick={() => navigate("/teacher/create-game")}
            >
              🎮 Create New Game
            </button>
            <button
              className="btn btn-outline-primary flex items-center gap-2"
              onClick={() => navigate("/teacher/games")}
            >
              🗂️ Manage Games
            </button>
            <button
              className="btn btn-outline-primary flex items-center gap-2"
              onClick={() => navigate("/teacher/students")}
            >
              👥 View Students
            </button>
            <button className="btn btn-outline-success flex items-center gap-2">
              📢 Send Announcement
            </button>
          </div>
        </div>
      </div>

      {/* Tabs for Students & Games */}
      <div className="mb-8">
        <div className="flex gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded-md font-semibold border transition-all duration-300 ${
              activeTab === "overview"
                ? "bg-eco-primary text-white scale-105 shadow-lg"
                : "bg-white text-eco-primary hover:bg-eco-primary hover:text-white"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            📊 Overview
          </button>
          <button
            className={`px-4 py-2 rounded-md font-semibold border transition-all duration-300 ${
              activeTab === "students"
                ? "bg-eco-primary text-white scale-105 shadow-lg"
                : "bg-white text-eco-primary hover:bg-eco-primary hover:text-white"
            }`}
            onClick={() => setActiveTab("students")}
          >
            👥 Students
          </button>
          <button
            className={`px-4 py-2 rounded-md font-semibold border transition-all duration-300 ${
              activeTab === "games"
                ? "bg-eco-primary text-white scale-105 shadow-lg"
                : "bg-white text-eco-primary hover:bg-eco-primary hover:text-white"
            }`}
            onClick={() => setActiveTab("games")}
          >
            🎮 Games
          </button>
        </div>

        <input
          type="text"
          className="form-input w-full mb-4 border-eco-primary focus:ring-eco-primary focus:border-eco-primary transition-all duration-300"
          placeholder="Search students/games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Overview Content */}
        {activeTab === "overview" && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-eco-primary animate-fade-in">
            <h2 className="text-lg font-bold mb-4 text-eco-primary">
              🕒 Recent Activity
            </h2>
            <ul className="divide-y divide-gray-200">
              {students.slice(0, 2).map((student) => (
                <li
                  key={student.id}
                  className="py-2 flex justify-between items-center"
                >
                  <span className="font-medium">👤 {student.name}</span>
                  <span className="text-sm text-gray-500">
                    Last Active: {student.lastActive}
                  </span>
                </li>
              ))}
            </ul>
            <ul className="divide-y divide-gray-200 mt-4">
              {games.slice(0, 2).map((game) => (
                <li
                  key={game.id}
                  className="py-2 flex justify-between items-center"
                >
                  <span className="font-medium">🎮 {game.title}</span>
                  <span className="text-sm text-gray-500">
                    Plays: {game.plays}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Students Tab */}
        {activeTab === "students" && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-eco-primary animate-fade-in">
            <h2 className="text-lg font-bold mb-4 text-eco-primary">
              👥 Student List
            </h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Grade</th>
                  <th className="px-4 py-2">Eco-Points</th>
                  <th className="px-4 py-2">Completed Games</th>
                  <th className="px-4 py-2">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-eco-secondary/10 transition-all"
                  >
                    <td className="px-4 py-2 font-medium">👤 {student.name}</td>
                    <td className="px-4 py-2">{student.email}</td>
                    <td className="px-4 py-2">{student.grade}</td>
                    <td className="px-4 py-2">{student.ecoPoints}</td>
                    <td className="px-4 py-2">{student.completedGames}</td>
                    <td className="px-4 py-2">{student.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Games Tab */}
        {activeTab === "games" && (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-eco-primary animate-fade-in">
            <h2 className="text-lg font-bold mb-4 text-eco-primary">
              🎮 Game Management
            </h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Difficulty</th>
                  <th className="px-4 py-2">Plays</th>
                  <th className="px-4 py-2">Avg Score</th>
                  <th className="px-4 py-2">Date Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredGames.map((game) => (
                  <tr
                    key={game.id}
                    className="hover:bg-eco-accent/10 transition-all"
                  >
                    <td className="px-4 py-2 font-medium">🎮 {game.title}</td>
                    <td className="px-4 py-2">{game.type}</td>
                    <td className="px-4 py-2">{game.difficulty}</td>
                    <td className="px-4 py-2">{game.plays}</td>
                    <td className="px-4 py-2">{game.avgScore}</td>
                    <td className="px-4 py-2">{game.dateCreated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Extra Features */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-eco-primary via-eco-accent to-green-400 rounded-xl shadow-2xl p-6 border border-eco-primary text-white animate-fade-in">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            📢 Announcements
          </h2>
          <ul className="list-disc pl-6">
            <li>
              Next EcoChamps event:{" "}
              <span className="font-semibold">Sep 20, 2025</span>
            </li>
            <li>
              Leaderboard reset:{" "}
              <span className="font-semibold">Oct 1, 2025</span>
            </li>
            <li>
              New game type <span className="font-semibold">coming soon!</span>
            </li>
          </ul>
        </div>
        <div className="bg-gradient-to-br from-green-400 via-eco-accent to-eco-primary rounded-xl shadow-2xl p-6 border border-eco-primary text-white animate-fade-in">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            💡 Tips for Teachers
          </h2>
          <ul className="list-disc pl-6">
            <li>Encourage students to complete daily challenges</li>
            <li>Review eco-points and reward top performers</li>
            <li>Suggest new games for the platform</li>
          </ul>
        </div>
      </div>

      {/* Teacher Challenge Submission (placeholder) */}
      <div className="mt-12 flex justify-center">
        <div className="w-full max-w-2xl">
          {/* <SubmitChallenge /> */}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
