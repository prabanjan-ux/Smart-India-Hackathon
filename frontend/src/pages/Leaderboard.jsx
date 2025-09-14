import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState('weekly');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockStudents = [
        { id: 's1', name: 'Aditya Sharma', avatar: '👦🏽', grade: '8th', ecoPoints: 450, badges: 5 },
        { id: 's2', name: 'Priya Patel', avatar: '👧🏽', grade: '8th', ecoPoints: 520, badges: 6 },
        { id: 's3', name: 'Rahul Gupta', avatar: '👦🏽', grade: '7th', ecoPoints: 380, badges: 4 },
        { id: 's4', name: 'Neha Singh', avatar: '👧🏽', grade: '7th', ecoPoints: 410, badges: 5 },
        { id: 's5', name: 'Vikram Reddy', avatar: '👦🏽', grade: '8th', ecoPoints: 490, badges: 5 },
        { id: 's6', name: 'Ananya Desai', avatar: '👧🏽', grade: '6th', ecoPoints: 350, badges: 3 },
        { id: 's7', name: 'Rohan Kapoor', avatar: '👦🏽', grade: '7th', ecoPoints: 420, badges: 4 },
        { id: 's8', name: 'Meera Joshi', avatar: '👧🏽', grade: '8th', ecoPoints: 480, badges: 5 },
        { id: 's9', name: 'Arjun Kumar', avatar: '👦🏽', grade: '6th', ecoPoints: 320, badges: 3 },
        { id: 's10', name: 'Kavya Sharma', avatar: '👧🏽', grade: '7th', ecoPoints: 400, badges: 4 },
      ];

      const sortedStudents = [...mockStudents].sort((a, b) => b.ecoPoints - a.ecoPoints);
      sortedStudents.forEach((student, index) => {
        student.rank = index + 1;
      });

      setStudents(sortedStudents);
      setCurrentUser(sortedStudents.find(s => s.id === 's5') || null);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeFrame]);

  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
    setLoading(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-eco-dark mb-2">Eco Champions Leaderboard</h1>
        <p className="text-gray-600 mb-6">See who's making the biggest environmental impact!</p>

        <div className="flex space-x-2 mb-8">
          <button
            onClick={() => handleTimeFrameChange('weekly')}
            className={`px-4 py-2 rounded-md ${timeFrame === 'weekly' ? 'bg-eco-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            This Week
          </button>
          <button
            onClick={() => handleTimeFrameChange('monthly')}
            className={`px-4 py-2 rounded-md ${timeFrame === 'monthly' ? 'bg-eco-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            This Month
          </button>
          <button
            onClick={() => handleTimeFrameChange('allTime')}
            className={`px-4 py-2 rounded-md ${timeFrame === 'allTime' ? 'bg-eco-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            All Time
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-primary"></div>
          </div>
        ) : (
          <>
            {/* Top 3 students */}
            <div className="flex flex-col md:flex-row justify-center items-end space-y-6 md:space-y-0 md:space-x-8 mb-12">
              {students[1] && (
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-4xl">{students[1].avatar}</div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold border-2 border-white">2</div>
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="font-medium">{students[1].name}</h3>
                    <p className="text-eco-primary font-bold">{students[1].ecoPoints} pts</p>
                  </div>
                </div>
              )}
              {students[0] && (
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-5xl">{students[0].avatar}</div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-2xl font-bold border-2 border-white">1</div>
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="font-medium">{students[0].name}</h3>
                    <p className="text-eco-primary font-bold">{students[0].ecoPoints} pts</p>
                  </div>
                </div>
              )}
              {students[2] && (
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-4xl">{students[2].avatar}</div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold border-2 border-white">3</div>
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="font-medium">{students[2].name}</h3>
                    <p className="text-eco-primary font-bold">{students[2].ecoPoints} pts</p>
                  </div>
                </div>
              )}
            </div>

            {/* Leaderboard table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eco Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Badges</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id} className={`${currentUser?.id === student.id ? 'bg-green-50' : ''} ${student.rank && student.rank <= 3 ? 'font-medium' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {student.rank === 1 && <span className="text-yellow-500 mr-1">🏆</span>}
                          {student.rank === 2 && <span className="text-gray-400 mr-1">🥈</span>}
                          {student.rank === 3 && <span className="text-amber-700 mr-1">🥉</span>}
                          <span>{student.rank}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">{student.avatar}</div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {student.name}
                              {currentUser?.id === student.id && (
                                <span className="ml-2 text-xs bg-eco-primary text-white px-2 py-0.5 rounded-full">You</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.grade}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">{student.ecoPoints}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex">
                          {Array.from({ length: student.badges }).map((_, i) => (
                            <svg key={i} className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {currentUser && (
              <div className="mt-8 bg-eco-primary bg-opacity-10 rounded-lg p-6">
                <h2 className="text-xl font-bold text-eco-dark mb-4">Your Stats</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Current Rank</div>
                    <div className="text-3xl font-bold text-eco-dark">{currentUser.rank}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Eco Points</div>
                    <div className="text-3xl font-bold text-eco-primary">{currentUser.ecoPoints}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Badges Earned</div>
                    <div className="text-3xl font-bold text-eco-dark">{currentUser.badges}</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    {currentUser.rank === 1
                      ? "Congratulations! You're at the top of the leaderboard!"
                      : `You need ${students[0].ecoPoints - currentUser.ecoPoints} more points to reach the top spot!`}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
