import React from "react";

export default function TopicsPage({ topics, onTopicSelect }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Choose a Topic</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => onTopicSelect(topic)}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
