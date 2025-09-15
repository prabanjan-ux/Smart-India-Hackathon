import React from "react";
import { Link } from "react-router-dom";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "🏠", path: "/studentdashboard" },
  { id: "games", label: "Games", icon: "🎯", path: "/games" },
  { id: "leaderboard", label: "Leaderboard", icon: "🏆", path: "/leaderboard" },
  { id: "profile", label: "Profile & Rewards", icon: "👤", path: "/profile" },
  { id: "learn", label: "Learn", icon: "📚", path: "/learntopics" },
];

export default function SideNav({ activeTab, onNavClick }) {
  return (
    <nav className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col min-h-screen">
      <div className="flex items-center space-x-2 p-2 mb-6">
        <span className="text-3xl">🌿</span>
        <h1 className="text-2xl font-bold text-green-600">EcoChamps</h1>
      </div>
      <ul className="space-y-2 flex-1">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link
              to={item.path}
              onClick={() => onNavClick(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === item.id
                  ? "bg-green-500 text-white"
                  : "text-gray-700 hover:bg-green-50"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
