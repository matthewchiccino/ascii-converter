import { useState } from 'react'
import AsciiConverter from './AsciiConverter.jsx'
import './display.css'

function Display({ imageData }) {

  if (!imageData) return <p>No image uploaded yet</p>
  const [asciiString, setAsciiString] = useState(null) // ← this will ascii string
  const [buttonText, setButtonText] = useState('Copy');

  const handleCopy = () => {
    navigator.clipboard.writeText(asciiString).then(() => {
    setButtonText('Copied!');
  });
  };

  return (
    <div>
      <h3>Display Section</h3>
      {/* we have access to the imageData prop because it is passed down from app.jsx */}
      <AsciiConverter imageData = {imageData} onConvert={setAsciiString}/>
      <p>ASCII Output:</p>
      <pre style={{ fontFamily: 'monospace', fontSize: '6px', lineHeight: '6px' }}>
        {asciiString}
      </pre>
      <button onClick={handleCopy}>{buttonText}</button>
    </div>
  )
}

export default Display
