import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import StudHeader from "../components/StudHeader";

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState("weekly");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mockStudents = [
        { id: "s1", name: "Aditya Sharma", avatar: "👦🏽", grade: "8th", ecoPoints: 450, badges: 5 },
        { id: "s2", name: "Priya Patel", avatar: "👧🏽", grade: "8th", ecoPoints: 520, badges: 6 },
        { id: "s3", name: "Rahul Gupta", avatar: "👦🏽", grade: "7th", ecoPoints: 380, badges: 4 },
        { id: "s4", name: "Neha Singh", avatar: "👧🏽", grade: "7th", ecoPoints: 410, badges: 5 },
        { id: "s5", name: "Vikram Reddy", avatar: "👦🏽", grade: "8th", ecoPoints: 490, badges: 5 },
        { id: "s6", name: "Ananya Desai", avatar: "👧🏽", grade: "6th", ecoPoints: 350, badges: 3 },
        { id: "s7", name: "Rohan Kapoor", avatar: "👦🏽", grade: "7th", ecoPoints: 420, badges: 4 },
        { id: "s8", name: "Meera Joshi", avatar: "👧🏽", grade: "8th", ecoPoints: 480, badges: 5 },
        { id: "s9", name: "Arjun Kumar", avatar: "👦🏽", grade: "6th", ecoPoints: 320, badges: 3 },
        { id: "s10", name: "Kavya Sharma", avatar: "👧🏽", grade: "7th", ecoPoints: 400, badges: 4 },
      ];

      const sortedStudents = [...mockStudents].sort((a, b) => b.ecoPoints - a.ecoPoints);
      sortedStudents.forEach((s, i) => (s.rank = i + 1));

      setStudents(sortedStudents);
      setCurrentUser(sortedStudents.find((s) => s.id === "s5") || null);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeFrame]);

  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
    setLoading(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ===== Sidebar ===== */}
      <Sidebar />

      {/* ===== Main Section ===== */}
      <div className="flex-1 flex flex-col">
        <StudHeader
          user={currentUser || { name: "Vikram Reddy", ecoPoints: 490 }}
          activeTab="Leaderboard"
        />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-eco-dark mb-2">
              Eco Champions Leaderboard
            </h1>
            <p className="text-gray-600 mb-6">
              See who's making the biggest environmental impact!
            </p>

            {/* Time Filter Buttons */}
            <div className="flex space-x-2 mb-8">
              {["weekly", "monthly", "allTime"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => handleTimeFrameChange(tf)}
                  className={`px-4 py-2 rounded-md ${
                    timeFrame === tf
                      ? "bg-eco-primary text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {tf === "weekly"
                    ? "This Week"
                    : tf === "monthly"
                    ? "This Month"
                    : "All Time"}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-primary"></div>
              </div>
            ) : (
              <>
                {/* Top 3 students */}
                <div className="flex flex-col md:flex-row justify-center items-end space-y-6 md:space-y-0 md:space-x-8 mb-12">
                  {students.slice(0, 3).map((s, idx) => (
                    <div key={s.id} className="flex flex-col items-center">
                      <div className="relative">
                        <div
                          className={`rounded-full flex items-center justify-center ${
                            idx === 0 ? "w-24 h-24 text-5xl" : "w-20 h-20 text-4xl"
                          } bg-gray-100`}
                        >
                          {s.avatar}
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-xl font-bold border-2 border-white">
                          {idx + 1}
                        </div>
                      </div>
                      <div className="mt-3 text-center">
                        <h3 className="font-medium">{s.name}</h3>
                        <p className="text-eco-primary font-bold">{s.ecoPoints} pts</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Leaderboard Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {["Rank", "Student", "Grade", "Eco Points", "Badges"].map((h) => (
                          <th
                            key={h}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((s) => (
                        <tr
                          key={s.id}
                          className={`${currentUser?.id === s.id ? "bg-green-50" : ""} ${
                            s.rank <= 3 ? "font-medium" : ""
                          }`}
                        >
                          <td className="px-6 py-4">{s.rank}</td>
                          <td className="px-6 py-4 flex items-center">
                            <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-full text-xl">
                              {s.avatar}
                            </div>
                            <span className="ml-3">
                              {s.name}
                              {currentUser?.id === s.id && (
                                <span className="ml-2 text-xs bg-eco-primary text-white px-2 py-0.5 rounded-full">
                                  You
                                </span>
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-4">{s.grade}</td>
                          <td className="px-6 py-4 font-medium">{s.ecoPoints}</td>
                          <td className="px-6 py-4">
                            {"⭐".repeat(s.badges)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Leaderboard;
