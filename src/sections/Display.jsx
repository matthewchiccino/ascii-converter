import { useState } from 'react'
import AsciiConverter from './AsciiConverter.jsx'
import './display.css'

function Display({ imageData, charAmount, brightness, buttonText, setButtonText}) {

  if (!imageData) return <p>No image uploaded yet</p>
  const [asciiString, setAsciiString] = useState(null) // ← this will ascii string

  const handleCopy = () => {
    navigator.clipboard.writeText(asciiString).then(() => {
    setButtonText('Copied!');
  });
  };

  return (
    <div>
      <h3>Display Section</h3>
      {/* we have access to the imageData prop because it is passed down from app.jsx */}
      <AsciiConverter imageData = {imageData} onConvert={setAsciiString} charAmount={charAmount} brightness={brightness}/>
      <p>ASCII Output:</p>
      <div className="ascii-art-container">
        <pre className="ascii-art-content">
          {asciiString}
        </pre>
      </div>
      <button onClick={handleCopy}>{buttonText}</button>
    </div>
  )
}

export default Display
