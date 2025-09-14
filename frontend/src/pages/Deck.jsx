import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { flashcardData } from "../data/flashcardData";
import FlashcardDeck from "../components/FlashcardDeck";

export default function Deck() {
  const { topic } = useParams();
  const navigate = useNavigate();
  return (
    <FlashcardDeck
      cards={flashcardData[decodeURIComponent(topic)]}
      onBack={() => navigate("/learntopics")}
    />
  );
}
