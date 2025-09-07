"use client"

import { useState } from "react"
import VoiceInput from "./VoiceInput"
import VoiceOutput from "./VoiceOutput"
import { questions } from "../data/questions" // Import the questions data

function VoiceQnA() {
  const [answer, setAnswer] = useState("")

  function getIntent(text) {
    const lowerText = text.toLowerCase()
    for (const questionPhrase in questions) {
      if (lowerText.includes(questionPhrase)) {
        return questions[questionPhrase]
      }
    }
    // Fallback for general keywords if no direct match
    if (lowerText.includes("skills") || lowerText.includes("ability") || lowerText.includes("experience")) {
      return questions["what are your skills"] || "I have various skills in web development."
    }
    if (lowerText.includes("name") || lowerText.includes("who are you")) {
      return questions["what is your name"] || "My name is Megha."
    }
    if (lowerText.includes("about") || lowerText.includes("yourself")) {
      return questions["tell me about yourself"] || "I am a software developer."
    }
    if (lowerText.includes("projects") || lowerText.includes("work")) {
      return questions["what projects have you done"] || "I have worked on several web projects."
    }
    if (lowerText.includes("contact") || lowerText.includes("reach")) {
      return questions["how can I contact you"] || "You can find my contact details on the contact page."
    }
    return "Sorry, I don't know the answer to that. Please try rephrasing your question."
  }

  const handleVoiceInput = (spokenText) => {
    const response = getIntent(spokenText)
    setAnswer(response)
  }

  return (
    <div className="voice-qna-container">
      <h1 className="voice-qna-title">🎤 Voice Q&A</h1>
      <p className="voice-qna-subtitle">Ask me anything about my portfolio!</p>
      <VoiceInput onResult={handleVoiceInput} />
      <VoiceOutput text={answer} />

      <style jsx>{`
        .voice-qna-container {
          padding: 2rem;
          text-align: center;
          background-color: var(--bg-secondary);
          border-radius: 16px;
          border: 1px solid var(--border-color);
          max-width: 600px;
          margin: 0 auto;
        }
        .voice-qna-title {
          color: var(--text-primary);
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .voice-qna-subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }
      `}</style>
    </div>
  )
}

export default VoiceQnA
