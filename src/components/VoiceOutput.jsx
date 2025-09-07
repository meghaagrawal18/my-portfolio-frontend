"use client"

import { useEffect } from "react"

const VoiceOutput = ({ text }) => {
  useEffect(() => {
    if (!text) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [text])

  return text ? (
    <p className="voice-output-text">
      Answer: {text}
      <style jsx>{`
        .voice-output-text {
          color: var(--text-primary);
          font-size: 1.1rem;
          margin-top: 1.5rem;
          line-height: 1.6;
        }
      `}</style>
    </p>
  ) : null
}

export default VoiceOutput
