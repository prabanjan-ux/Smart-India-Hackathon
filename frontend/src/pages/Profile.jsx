import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    grade: '',
    school: '',
  });

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const timer = setTimeout(() => {
      const mockProfile = {
        id: 'u1',
        name: 'Vikram Reddy',
        email: 'vikram@school.edu',
        grade: '8th',
        school: 'Delhi Public School',
        avatar: '👦🏽',
        ecoPoints: 490,
        level: 5,
        joinDate: '2023-06-15',
        badges: [
          { id: 'b1', name: 'Eco Warrior', icon: '🌿', description: 'Completed 10 environmental games', dateEarned: '2023-07-20' },
          { id: 'b2', name: 'Quiz Master', icon: '🧠', description: 'Scored 100% in 5 different quizzes', dateEarned: '2023-08-05' },
          { id: 'b3', name: 'Tree Hugger', icon: '🌳', description: 'Planted 5 virtual trees', dateEarned: '2023-08-15' },
          { id: 'b4', name: 'Water Saver', icon: '💧', description: 'Completed all water conservation challenges', dateEarned: '2023-09-01' },
          { id: 'b5', name: 'Energy Expert', icon: '⚡', description: 'Mastered all energy conservation games', dateEarned: '2023-09-10' },
        ],
        achievements: [
          { id: 'a1', title: 'Game Explorer', description: 'Play all types of eco games', progress: 4, total: 5, completed: false },
          { id: 'a2', title: 'Knowledge Seeker', description: 'Complete 20 eco quizzes', progress: 14, total: 20, completed: false },
          { id: 'a3', title: 'Eco Influencer', description: 'Reach level 10', progress: 5, total: 10, completed: false },
          { id: 'a4', title: 'Badge Collector', description: 'Earn 10 different badges', progress: 5, total: 10, completed: false },
          { id: 'a5', title: 'Daily Learner', description: 'Log in for 30 consecutive days', progress: 30, total: 30, completed: true },
        ],
        stats: { gamesPlayed: 45, gamesWon: 38, questsCompleted: 12, treesPlanted: 5, co2Saved: 120 }
      };

      setProfile(mockProfile);
      setEditForm({
        name: mockProfile.name,
        email: mockProfile.email,
        grade: mockProfile.grade,
        school: mockProfile.school,
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleSaveProfile = () => {
    if (profile) {
      setProfile({ ...profile, ...editForm });
      setIsEditing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-primary"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-eco-dark">Profile Not Found</h2>
          <p className="text-gray-600 mt-2">Unable to load your profile information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="w-24 h-24 rounded-full bg-eco-primary bg-opacity-20 flex items-center justify-center text-5xl mb-4 md:mb-0 md:mr-6">{profile.avatar}</div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h1 className="text-2xl font-bold text-eco-dark">{profile.name}</h1>
                  <p className="text-gray-600">{profile.email}</p>
                  <div className="flex flex-wrap justify-center md:justify-start mt-2 space-x-2">
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{profile.grade} Grade</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{profile.school}</span>
                    <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">Joined {profile.joinDate}</span>
                  </div>
                </div>
                {!isEditing && (
                  <button onClick={() => setIsEditing(true)} className="mt-4 md:mt-0 px-4 py-2 bg-eco-primary text-white rounded-md hover:bg-eco-secondary transition-colors">
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input type="text" id="name" name="name" value={editForm.name} onChange={handleEditFormChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-primary" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input type="email" id="email" name="email" value={editForm.email} onChange={handleEditFormChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-primary" />
                    </div>
                    <div>
                      <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                      <select id="grade" name="grade" value={editForm.grade} onChange={handleEditFormChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-primary">
                        <option value="6th">6th Grade</option>
                        <option value="7th">7th Grade</option>
                        <option value="8th">8th Grade</option>
                        <option value="9th">9th Grade</option>
                        <option value="10th">10th Grade</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">School</label>
                      <input type="text" id="school" name="school" value={editForm.school} onChange={handleEditFormChange} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-primary" />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">Cancel</button>
                    <button onClick={handleSaveProfile} className="px-4 py-2 bg-eco-primary text-white rounded-md hover:bg-eco-secondary transition-colors">Save Changes</button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-eco-primary bg-opacity-10 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-eco-primary">{profile.ecoPoints}</div>
                    <div className="text-sm text-gray-600">Eco Points</div>
                  </div>
                  <div className="bg-eco-primary bg-opacity-10 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-eco-primary">{profile.level}</div>
                    <div className="text-sm text-gray-600">Level</div>
                  </div>
                  <div className="bg-eco-primary bg-opacity-10 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-eco-primary">{profile.badges.length}</div>
                    <div className="text-sm text-gray-600">Badges</div>
                  </div>
                  <div className="bg-eco-primary bg-opacity-10 p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-eco-primary">{profile.achievements.filter(a => a.completed).length}/{profile.achievements.length}</div>
                    <div className="text-sm text-gray-600">Achievements</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs and content logic remains exactly the same */}
        {/* ...copy the rest of the JSX from your TSX version here without changes... */}
      </div>
    </div>
  );
};

export default Profile;
