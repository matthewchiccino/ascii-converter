import React, { useEffect, useRef, useState } from 'react'
//  - useEffect: runs side effects in function components, like data fetching or DOM manipulation.
//  - useRef: lets you create a mutable object that persists across renders (commonly used to access DOM elements).
//  - useState: lets you add React state to function components.

function AsciiConverter({ imageData, onConvert, charAmount, brightness }) {
  // useRef to get a reference to the <canvas> DOM element.
  // This allows us to draw and manipulate the image pixels via the Canvas API.
  const canvasRef = useRef(null)

  // useState to store the ASCII art string generated from the image.
  // React will re-render the component when ascii state changes.
  const [ascii, setAscii] = useState('')

  useEffect(() => {
    if (!imageData) return

    // Create a new HTMLImageElement instance programmatically.
    // This is a DOM API to load an image from a URL or data URI
    const img = new Image()
    img.src = imageData

    img.onload = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      const targetWidth = charAmount // 👈 You can change this
      const aspectRatio = img.height / img.width
      const targetHeight = Math.round(targetWidth * aspectRatio)

      canvas.width = targetWidth
      canvas.height = targetHeight

      // Draw image to canvas
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      // Get pixel data
      const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight)
      const pixels = imageData.data

      
      const asciiArt = convertToAscii(pixels, targetWidth, targetHeight)

      // Save result
      setAscii(asciiArt)
      if (onConvert) onConvert(asciiArt) // 👈 PUSH IT UP TO Display
    }

    function convertToAscii(pixels, width, height){
        // loop through each row then column
        // for each pixel, average/b/g to map character
        // return full string with line breaks

        const asciiChars = '@%#=:*. ' // Dark → light
        //const asciiChars = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^` '
        let output = ''

        for (let y = 0; y < height; y++){
            for (let x = 0; x < width; x++){
                const i = (y * width + x) * 4
                const r = pixels[i]
                const g = pixels[i + 1]
                const b = pixels[i + 2]

                const brightness = (r + g + b) / 3 // some number between 0 and 225
                // divide by 225 to normalize our value between 0 and 1, 0 being darkest
                const charChoiceIndex = Math.floor((brightness / 255) * (asciiChars.length - 1))

                output+=asciiChars[charChoiceIndex]
            }
            output += '\n'
        }
        console.log(output)
        return output
    }
  }, [imageData, onConvert, charAmount, brightness])

  return (
    <div style={{ display: 'none' }}>
      {/* You can remove this if Display is rendering the output */}
      <canvas ref={canvasRef} />
    </div>
  )
}

export default AsciiConverter
