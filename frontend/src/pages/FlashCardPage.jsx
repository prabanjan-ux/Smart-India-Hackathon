import React from "react";
import TopicsPage from "../components/TopicsPage";
import { flashcardData } from "../data/flashcardData";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import StudHeader from "../components/StudHeader";

export default function FlashCardPage() {
  const navigate = useNavigate();

  // Example user info – you can replace this with actual user state
  const user = { name: "Vikram Reddy", ecoPoints: 490 };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ===== Sidebar ===== */}
      <Sidebar />

      {/* ===== Main Section ===== */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <StudHeader user={user} activeTab="Flash Cards" />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <TopicsPage
            topics={Object.keys(flashcardData)}
            onTopicSelect={(topic) =>
              navigate(`/deck/${encodeURIComponent(topic)}`)
            }
          />
        </main>
      </div>
    </div>
  );
}
