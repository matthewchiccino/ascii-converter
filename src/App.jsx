import { useState } from 'react'
import './App.css'

import Upload from './sections/Upload.jsx'
import Display from './sections/Display.jsx'
import Settings from './sections/Settings.jsx'

function App() {
  const [imageData, setImageData] = useState(null)
  const [charAmount, setCharAmount] = useState(40)
  const [brightness, setBrightness] = useState(1)
  const [buttonText, setButtonText] = useState('Copy')

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">ASCII Art Converter</h1>
        <p className="app-subtitle">Turn any image into text art</p>
      </header>

      <main className="app-main">
        <aside className="app-sidebar">
          <Upload onUpload={setImageData} />
          <Settings
            charAmount={charAmount}
            setCharAmount={setCharAmount}
            brightness={brightness}
            setBrightness={setBrightness}
          />
        </aside>

        <section className="app-display">
          <Display
            imageData={imageData}
            charAmount={charAmount}
            brightness={brightness}
            buttonText={buttonText}
            setButtonText={setButtonText}
          />
        </section>
      </main>
    </div>
  )
}

export default App
