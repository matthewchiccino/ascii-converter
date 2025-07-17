import { useState} from 'react'
import './upload.css'

const sampleImages = [
  'sample1.webp',
  'sample2.jpg',
  'sample3.jpg'
];

function Upload({ onUpload }) {
  // holds the base64-encoded image string onces uploaded
  // image is the variable, which starts as null
  // setImage is a function to update the value
  const [image, setImage] = useState(null); // use reacts useState react hook which lets us remember values between renders
  const [showSamples, setShowSamples] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // grab the first file
    if (file && file.type.startsWith('image/')) { // only continue if its a real image file
      const reader = new FileReader(); // helpful api
      reader.onloadend = () => {
        setImage(reader.result); // update our component state with image
        onUpload(reader.result); // send to parent or Display (App.jsx). this is actually running setImage(reader.result) in App.jsx
        setShowSamples(false); // hide sample images
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSampleSelect = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      onUpload(reader.result);
      setShowSamples(false);
    };
    reader.readAsDataURL(blob);
  
  };

  return (
    <div>
      <h3>Upload image</h3>
      <div className="upload-container">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <img src={image} alt="Uploaded Preview" style={{ maxWidth: '200px', marginTop: '1rem' }} />}
      </div>

      <button
        className="toggle-button"
        onClick={() => setShowSamples(!showSamples)}
      >
        {showSamples ? 'Hide Sample Images ▲' : 'Choose from Sample Images ▼'}
      </button>

      {showSamples && (
        <div className="sample-gallery">
          {sampleImages.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Sample ${index + 1}`}
              className="sample-thumbnail"
              onClick={() => handleSampleSelect(url)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Upload
