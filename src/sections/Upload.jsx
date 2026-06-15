import { useState, useRef } from 'react'
import './upload.css'

const sampleImages = [
  'sample1.webp',
  'sample2.jpg',
  'sample3.jpg',
]

function Upload({ onUpload }) {
  const [image, setImage] = useState(null)
  const [showSamples, setShowSamples] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const processFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result)
      onUpload(reader.result)
      setShowSamples(false)
    }
    reader.readAsDataURL(file)
  }

  const handleImageUpload = (event) => {
    processFile(event.target.files[0])
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    processFile(event.dataTransfer.files[0])
  }

  const handleSampleSelect = async (url) => {
    const response = await fetch(url)
    const blob = await response.blob()
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result)
      onUpload(reader.result)
      setShowSamples(false)
    }
    reader.readAsDataURL(blob)
  }

  return (
    <div className="upload-card card">
      <h2 className="card-title">Upload</h2>

      <div
        className={`upload-dropzone ${isDragging ? 'upload-dropzone--active' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="upload-input-hidden"
        />
        {image ? (
          <img src={image} alt="Uploaded preview" className="upload-preview" />
        ) : (
          <div className="upload-placeholder">
            <span className="upload-icon">↑</span>
            <p>Drop an image here or click to browse</p>
            <span className="upload-formats">PNG, JPG, WEBP</span>
          </div>
        )}
      </div>

      <button
        className="btn btn-secondary btn-full"
        onClick={() => setShowSamples(!showSamples)}
      >
        {showSamples ? 'Hide samples' : 'Try a sample image'}
      </button>

      {showSamples && (
        <div className="sample-gallery">
          {sampleImages.map((url, index) => (
            <button
              key={index}
              className="sample-thumbnail-btn"
              onClick={() => handleSampleSelect(url)}
              aria-label={`Sample image ${index + 1}`}
            >
              <img
                src={url}
                alt={`Sample ${index + 1}`}
                className="sample-thumbnail"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Upload
