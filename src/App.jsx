import { useState } from 'react'
import './App.css'

import Upload from './sections/Upload.jsx'
import Display from './sections/Display.jsx'
import Settings from './sections/Settings.jsx'

function App() {
  const [imageData, setImageData] = useState(null) // ← this will hold the image

  return (
    <>
      <div className="body">
        <div className="upload-section">
          <Upload onUpload={setImageData}/> {/* Pass the setter function as a prop */}
        </div>
        <div className="display-section">   {/* Pass imageData to Display */}
          <Display imageData={imageData} />
        </div>
        <div className="settings-section">
          <Settings />
        </div>
      </div>
    </>
  )
}

export default App
