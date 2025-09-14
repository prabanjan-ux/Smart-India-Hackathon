import React from "react";
import TopicsPage from "../components/TopicsPage";
import { flashcardData } from "../data/flashcardData";
import { useNavigate } from "react-router-dom";

export default function FlashCardPage() {
  const navigate = useNavigate();
  return (
    <TopicsPage
      topics={Object.keys(flashcardData)}
      onTopicSelect={(topic) => navigate(`/deck/${encodeURIComponent(topic)}`)}
    />
  );
}
