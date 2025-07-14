import { useState} from 'react'
import './upload.css'

function Upload({ onUpload }) {
  // holds the base64-encoded image string onces uploaded
  // image is the variable, which starts as null
  // setImage is a function to update the value
  const [image, setImage] = useState(null); // use reacts useState react hook which lets us remember values between renders

   const handleImageUpload = (event) => {
    const file = event.target.files[0]; // grab the first file
    if (file && file.type.startsWith('image/')) { // only continue if its a real image file
      const reader = new FileReader(); // helpful api
      reader.onloadend = () => {
        setImage(reader.result); // update our component state with image
        onUpload(reader.result); // send to parent or Display (App.jsx). this is actually running setImage(reader.result) in App.jsx
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h3>Upload image section</h3>

      {/* Add your upload UI here */}
      <p>This is where users will upload their images.</p>
      <div className="upload-container">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <img src={image} alt="Uploaded Preview" style={{ maxWidth: '300px', marginTop: '1rem' }} />}
      </div>
    </div>
  )
}

export default Upload
