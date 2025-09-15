import React, { useState } from "react";
import Sidebar from '../components/Sidebar';
import StudHeader from '../components/StudHeader';

// Mock User Data
const user = {
  name: "Ruchikesha",
  ecoPoints: 1250,
  challengesDone: 28,
  badges: 7,
  streak: 14,
  rank: 3,
  avatar: "https://api.dicebear.com/8.x/initials/svg?seed=Ruchikesha",
};

// Dashboard Cards
function DashboardCards({ user }) {
  return (
    <div>
      <h2 className="font-bold text-2xl mb-4 text-center lg:text-left">Your Eco-Progress</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-xl text-center">
          <p className="text-3xl font-bold text-green-600">{user.ecoPoints}</p>
          <p className="text-sm text-gray-600">Eco-Points 🌱</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-xl text-center">
          <p className="text-3xl font-bold text-blue-600">{user.challengesDone}</p>
          <p className="text-sm text-gray-600">Challenges Done ✅</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-xl text-center">
          <p className="text-3xl font-bold text-yellow-600">{user.badges}</p>
          <p className="text-sm text-gray-600">Badges Earned 🏆</p>
        </div>
        <div className="bg-red-50 p-4 rounded-xl text-center">
          <p className="text-3xl font-bold text-red-600">{user.streak}</p>
          <p className="text-sm text-gray-600">Day Streak 🔥</p>
        </div>
      </div>
      <p className="text-right text-gray-500 text-sm mt-4">
        Current Rank: <span className="font-semibold text-green-700">#{user.rank}</span>
      </p>
    </div>
  );
}

// Quick Start Panel
function QuickStart() {
  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">Quick Start</h2>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800">Next Challenge: Tree Guardians</h3>
          <p className="text-sm text-gray-600">Find and report on a tree in your local park. (+75 EP)</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800">Featured Game: Recycle Sort-Off</h3>
          <p className="text-sm text-gray-600">Test your waste sorting skills and earn (+50 EP)!</p>
        </div>
      </div>
    </div>
  );
}

// Dashboard Layout
function DashboardContent({ user }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 py-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <DashboardCards user={user} />
        </div>
      </div>
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <QuickStart />
        </div>
      </div>
    </div>
  );
}

export default function StudentDash() {
  // activeTab state here just for sidebar highlight
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      <Sidebar activeTab={activeTab} onNavClick={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <StudHeader user={user} activeTab={activeTab} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <DashboardContent user={user} />
        </main>
      </div>
    </div>
  );
}
