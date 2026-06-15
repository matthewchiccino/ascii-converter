import './settings.css'

function Settings({ charAmount, setCharAmount, brightness, setBrightness }) {
  return (
    <div className="settings-card card">
      <h2 className="card-title">Settings</h2>

      <div className="setting-group">
        <div className="setting-label-row">
          <label htmlFor="char-amount">Detail</label>
          <span className="setting-value">{charAmount} chars</span>
        </div>
        <input
          id="char-amount"
          type="range"
          className="range-slider"
          min="5"
          max="200"
          step="1"
          value={charAmount}
          onChange={(e) => setCharAmount(parseInt(e.target.value))}
        />
        <p className="setting-hint">Higher values produce more detailed output</p>
      </div>

      <div className="setting-group">
        <div className="setting-label-row">
          <label htmlFor="brightness">Brightness</label>
          <span className="setting-value">{brightness.toFixed(1)}×</span>
        </div>
        <input
          id="brightness"
          type="range"
          className="range-slider"
          min="0.1"
          max="2"
          step="0.1"
          value={brightness}
          onChange={(e) => setBrightness(parseFloat(e.target.value))}
        />
        <p className="setting-hint">Adjust light and dark contrast</p>
      </div>
    </div>
  )
}

export default Settings
