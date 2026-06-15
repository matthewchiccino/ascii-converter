import { useState } from 'react'
import AsciiConverter from './AsciiConverter.jsx'
import './display.css'

function Display({ imageData, charAmount, brightness, buttonText, setButtonText }) {
  const [asciiString, setAsciiString] = useState(null)

  const handleCopy = () => {
    if (!asciiString) return
    navigator.clipboard.writeText(asciiString).then(() => {
      setButtonText('Copied!')
      setTimeout(() => setButtonText('Copy'), 2000)
    })
  }

  if (!imageData) {
    return (
      <div className="display-card card">
        <h2 className="card-title">Output</h2>
        <div className="display-empty">
          <span className="display-empty-icon">▤</span>
          <p>Upload an image to see ASCII art here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="display-card card">
      <div className="display-header">
        <h2 className="card-title">Output</h2>
        <button className="btn btn-secondary" onClick={handleCopy} disabled={!asciiString}>
          {buttonText}
        </button>
      </div>
      <AsciiConverter
        imageData={imageData}
        onConvert={setAsciiString}
        charAmount={charAmount}
        brightness={brightness}
      />
      <div className="ascii-art-container">
        <pre className="ascii-art-content">{asciiString}</pre>
      </div>
    </div>
  )
}

export default Display
