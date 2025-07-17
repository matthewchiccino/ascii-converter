import { useState, useEffect } from 'react'
import './App.css'

import Upload from './sections/Upload.jsx'
import Display from './sections/Display.jsx'
import Settings from './sections/Settings.jsx'

function App() {
  const [imageData, setImageData] = useState(null) // ← this will hold the image
  const [charAmount, setCharAmount] = useState(40)
  const [brightness, setBrightness] = useState(1)
  const [buttonText, setButtonText] = useState('Copy');

  useEffect(() => {
    console.log('Character Amount changed:', charAmount)
  }, [charAmount])

  useEffect(() => {
    console.log('Brightness changed:', brightness)
  }, [brightness])

  return (
    <>
      <div className="body">
        <div className="upload-section">
          <Upload onUpload={setImageData}/> {/* Pass the setter function as a prop */}
        </div>
        <div className="display-section">   {/* Pass imageData to Display */}
          <Display imageData={imageData} charAmount={charAmount} brightness={brightness} buttonText={buttonText} setButtonText={setButtonText}/>
        </div>
        <div className="settings-section">
          <Settings
            charAmount={charAmount}
            setCharAmount={setCharAmount}
            brightness={brightness}
            setBrightness={setBrightness}
          />
        </div>
      </div>
    </>
  )
}

export default App
