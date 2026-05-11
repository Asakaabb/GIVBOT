import React, { useState, useEffect } from 'react'


const FULL_TEXT = "Welcome to the Gender, Inclusion and Vulnerability Chatbot (GIVbot)"

const WelcomePage = () => {
  const [displayed, setDisplayed] = useState('')
  const [doneTyping, setDoneTyping] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < FULL_TEXT.length) {
        setDisplayed(FULL_TEXT.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setDoneTyping(true)
      }
    }, 38)
    return () => clearInterval(interval)
  }, [])

  return (
  <div className="giv-page">
    <div className="bg-logo"></div>
    <div className="welcome-card">
      <div className="title-wrap">
        <h1>{displayed}</h1>
      </div>
      <hr className="divider" />
      <p className={`fade-in ${doneTyping ? 'visible' : ''}`} style={{ transitionDelay: '0s' }}>
        We are committed to promoting gender equity, inclusivity, and providing
        support and access for vulnerable groups within the university community,
        across Ghana, and throughout Africa.
      </p>
      <p className={`fade-in ${doneTyping ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
        Our mission is to create an all-inclusive environment that supports
        quality education and equal opportunities for all.
      </p>
      <p className={`fade-in assist-text ${doneTyping ? 'visible' : ''}`} style={{ transitionDelay: '0.8s' }}>
        How may we assist you today?
      </p>
    </div>
  </div>
)
}

export default WelcomePage