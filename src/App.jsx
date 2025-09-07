"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Home from "./sections/Home"
import About from "./sections/About"
import Projects from "./sections/Projects"
import Skills from "./sections/Skills"
import Contact from "./sections/Contact"
import SectionIndicator from "./components/SectionIndicator"
import VoiceQnAModal from "./components/VoiceQnAModal"
import { ThemeProvider } from "./contexts/ThemeContext"
import "./index.css"

function App() {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false)

  useEffect(() => {
    if (isVoiceModalOpen) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }
    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [isVoiceModalOpen])

  return (
    <ThemeProvider>
      <div className="App">
        <Navbar />
        <Home onOpenVoiceModal={() => setIsVoiceModalOpen(true)} />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <SectionIndicator />
        {isVoiceModalOpen && <VoiceQnAModal onClose={() => setIsVoiceModalOpen(false)} />}
      </div>
    </ThemeProvider>
  )
}

export default App
