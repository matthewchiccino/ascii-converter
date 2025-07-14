import { useState } from 'react'
import './settings.css'

function Settings() {

  const [charAmount, setCharAmount] = useState(100); // or whatever default
  const [brightness, setBrightness] = useState(1); // 1 = normal brightness

  return (
    <div>
      <h3>Settings Section</h3>
      {/* Add any controls/settings here */}
      <p>Controls and settings go here.</p>
      {/* Character Amount Slider */}
    <label>
      Character Amount: {charAmount}
      <input
        type="range"
        min="5"
        max="500"
        step="1"
        value={charAmount}
        onChange={(e) => setCharAmount(parseInt(e.target.value))}
      />
    </label>

    {/* Brightness Slider */}
    <label>
      Brightness: {brightness.toFixed(1)}
      <input
        type="range"
        min="0.1"
        max="2"
        step="0.1"
        value={brightness}
        onChange={(e) => setBrightness(parseFloat(e.target.value))}
      />
    </label>
    </div>
  )
}

export default Settings
