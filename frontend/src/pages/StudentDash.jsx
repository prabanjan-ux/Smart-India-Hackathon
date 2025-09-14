import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  // Mock data - would come from API in real implementation
  const studentName = localStorage.getItem('userName') || 'Ruchikesha';
  const studentData = {
    name: studentName,
    ecoPoints: 0,
    level: 1,
    badges: [
      { id: 1, name: 'Tree Planter', icon: '🌳', description: 'Planted 5 trees' },
      { id: 2, name: 'Quiz Master', icon: '🧠', description: 'Completed 10 quizzes' },
      { id: 3, name: 'Waste Warrior', icon: '♻️', description: 'Segregated waste for 7 days' },
    ],
    recentActivities: [
      { id: 1, type: 'game', name: 'Climate Quiz', points: 50, date: '2023-09-10' },
      { id: 2, type: 'challenge', name: 'Plant a Tree', points: 100, date: '2023-09-08' },
      { id: 3, type: 'game', name: 'Eco Crossword', points: 30, date: '2023-09-05' },
    ],
    upcomingChallenges: [
      { id: 1, name: 'Beach Cleanup', deadline: '2023-09-20', points: 200 },
      { id: 2, name: 'Water Conservation Week', deadline: '2023-09-30', points: 300 },
    ],
  };

  const [ecoPoints, setEcoPoints] = useState(studentData.ecoPoints);
  const [badge, setBadge] = useState(undefined);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-8">
        <div className="flex-1 text-left">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Welcome, {studentData.name}!
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Continue your environmental journey today.
          </p>
        </div>
        <div className="flex-shrink-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-8 py-6 rounded-xl shadow-xl text-center min-w-[260px]">
          <h3 className="text-5xl font-extrabold text-white drop-shadow-lg mb-2">
            {ecoPoints} <span className="text-lg font-medium">Eco-Points</span>
          </h3>
          <p className="text-white font-medium text-lg">Level {studentData.level}</p>
          {badge && <div className="mt-2 text-yellow-300 font-semibold">New Badge: {badge}</div>}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="bg-green-600 text-white px-4 py-3">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
          </div>
          <div className="p-4 flex flex-col space-y-3">
            <Link
              to="/student/games"
              className="flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition-colors duration-300"
            >
              🎮 Play Games
            </Link>
            <Link
              to="/student/leaderboard"
              className="flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition-colors duration-300"
            >
              🏆 View Leaderboard
            </Link>
            <button
              onClick={() => alert('Daily challenge completed!')}
              className="flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition-colors duration-300"
            >
              ✅ Complete Daily Challenge
            </button>
            <button
              onClick={() => alert('Eco activity submitted!')}
              className="flex items-center justify-center px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition-colors duration-300"
            >
              ⬆️ Submit Eco Activity
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="bg-green-600 text-white px-4 py-3">
            <h2 className="text-xl font-semibold">Recent Activities</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {studentData.recentActivities.map((activity) => (
              <div key={activity.id} className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-400 text-white">
                    {activity.type === 'game' ? '🎮' : '🌍'}
                  </span>
                  <span className="font-medium">{activity.name}</span>
                  <span className="text-sm text-gray-500">{activity.date}</span>
                </div>
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                  +{activity.points} pts
                </span>
              </div>
            ))}
            <div className="p-4 text-center">
              <Link to="#" className="text-green-600 hover:text-green-400 font-medium">
                View All Activities
              </Link>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-lg shadow-lg flex flex-col">
          <div className="bg-green-600 text-white px-4 py-3">
            <h2 className="text-xl font-semibold">Your Badges</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
              {studentData.badges.map((badge) => (
                <div key={badge.id} className="text-center" title={badge.description}>
                  <div className="text-3xl">{badge.icon}</div>
                  <p className="text-sm mt-1">{badge.name}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-3">
              <Link to="#" className="text-green-600 hover:text-green-400 text-sm font-medium">
                View All Badges
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Challenges */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-600 text-white px-4 py-3">
            <h2 className="text-xl font-semibold">Upcoming Challenges</h2>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentData.upcomingChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="border border-green-200 rounded-lg p-4 flex flex-col justify-between"
              >
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">{challenge.name}</h5>
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                    {challenge.points} pts
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">Deadline: {challenge.deadline}</p>
                <button className="border border-green-600 text-green-600 rounded-md px-3 py-1 hover:bg-green-600 hover:text-white transition-colors">
                  Accept Challenge
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-600 text-white px-4 py-3">
            <h2 className="text-xl font-semibold">Your Environmental Impact</h2>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">5</div>
              <p className="text-sm mt-1">Trees Planted</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">12</div>
              <p className="text-sm mt-1">kg Waste Recycled</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">8</div>
              <p className="text-sm mt-1">Water Saved (liters)</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">3</div>
              <p className="text-sm mt-1">Community Activities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
