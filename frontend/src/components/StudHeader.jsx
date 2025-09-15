import React from "react";

const StudHeader = ({ user = { name: "", ecoPoints: 0 }, activeTab }) => (
  <header className="bg-white border-b border-gray-200">
    <div className="px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800 capitalize">
        {typeof activeTab === "string" ? activeTab.replace("-", " & ") : ""}
      </h1>

      <div className="flex items-center gap-4">
        <div className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded-lg flex items-center gap-2">
          <span>{user.ecoPoints} Eco-Points</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg">
          {user.name ? user.name.charAt(0) : "?"}
        </div>
      </div>
    </div>
  </header>
);

export default StudHeader;   // ✅ required
