import { useEffect, useRef } from 'react'

function AsciiConverter({ imageData, onConvert, charAmount, brightness }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!imageData) return

    const img = new Image()
    img.src = imageData

    img.onload = () => {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')

      const targetWidth = charAmount
      const aspectRatio = img.height / img.width
      const targetHeight = Math.round(targetWidth * aspectRatio)

      canvas.width = targetWidth
      canvas.height = targetHeight

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      const pixelData = ctx.getImageData(0, 0, targetWidth, targetHeight)
      const pixels = pixelData.data

      const asciiArt = convertToAscii(pixels, targetWidth, targetHeight)

      if (onConvert) onConvert(asciiArt)
    }

    function convertToAscii(pixels, width, height) {
      const asciiChars = '@%#*+=-:. '
      let output = ''

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4
          const r = pixels[i]
          const g = pixels[i + 1]
          const b = pixels[i + 2]

          const pixelBrightness = (r + g + b) / 3
          const adjusted = Math.min(255, Math.max(0, pixelBrightness * brightness))
          const charChoiceIndex = Math.floor((adjusted / 255) * (asciiChars.length - 1))

          output += asciiChars[charChoiceIndex]
        }
        output += '\n'
      }
      return output
    }
  }, [imageData, onConvert, charAmount, brightness])

  return (
    <div style={{ display: 'none' }}>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default AsciiConverter
