'use client'

import { useEffect, useState, useRef } from 'react'

/*
  WordScatter — the signature visual element.

  Scatters 10 words across a container with random positions,
  rotations, and sizes — BUT with collision detection so no
  two words ever overlap.

  HOW COLLISION DETECTION WORKS:
  1. We create a hidden "measuring" span for each word to find out
     how wide and tall it will be at its assigned font size.
  2. We try to place each word at a random position.
  3. Before accepting that position, we check if its bounding box
     (invisible rectangle) overlaps with any already-placed word.
  4. If it overlaps, we try a new random position (up to 100 attempts).
  5. A padding buffer is added around each word so they don't even
     get close to touching.
*/

function hashWord(word, idx) {
  let hash = 0
  const str = word + String(idx)
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// Check if two rectangles overlap
function boxesOverlap(a, b) {
  return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom)
}

export default function WordScatter({ words }) {
  const containerRef = useRef(null)
  const [positions, setPositions] = useState([])

  useEffect(() => {
    if (!containerRef.current || words.length === 0) return

    const container = containerRef.current
    const containerWidth = container.offsetWidth
    const containerHeight = container.offsetHeight
    const isMobile = containerWidth < 500

    // Size assignments for visual variety
    const sizeConfigs = [
      { fontSize: isMobile ? 20 : 28, weight: 'bold' },
      { fontSize: isMobile ? 17 : 22, weight: 'normal' },
      { fontSize: isMobile ? 23 : 32, weight: 'bold' },
      { fontSize: isMobile ? 15 : 18, weight: 'normal' },
      { fontSize: isMobile ? 19 : 26, weight: 'normal' },
      { fontSize: isMobile ? 22 : 30, weight: 'bold' },
      { fontSize: isMobile ? 16 : 20, weight: 'normal' },
      { fontSize: isMobile ? 21 : 28, weight: 'normal' },
      { fontSize: isMobile ? 18 : 24, weight: 'bold' },
      { fontSize: isMobile ? 17 : 22, weight: 'normal' },
    ]

    // Step 1: Measure each word's dimensions using a hidden span
    const measurements = words.map((word, i) => {
      const config = sizeConfigs[i % sizeConfigs.length]
      const measurer = document.createElement('span')
      measurer.style.cssText = `
        position: absolute; visibility: hidden; white-space: nowrap;
        font-family: 'Special Elite', 'Courier Prime', monospace;
        font-size: ${config.fontSize}px;
        font-weight: ${config.weight};
      `
      measurer.textContent = word
      document.body.appendChild(measurer)
      const width = measurer.offsetWidth
      const height = measurer.offsetHeight
      document.body.removeChild(measurer)
      return { word, width, height, ...config }
    })

    // Step 2: Place words with collision detection
    const PADDING = isMobile ? 12 : 18  // Buffer space between words (pixels)
    const placed = []  // Array of bounding boxes that are already occupied

    const results = measurements.map((item, i) => {
      const hash = hashWord(item.word, i)
      let bestPos = null
      const maxAttempts = 150

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        // Generate a candidate position
        const r1 = seededRandom(hash + attempt * 7)
        const r2 = seededRandom(hash + attempt * 13 + 1)
        const r3 = seededRandom(hash + attempt * 3 + 2)

        const x = r1 * (containerWidth - item.width - 20) + 10
        const y = r2 * (containerHeight - item.height - 20) + 10
        const rotation = (r3 - 0.5) * 10

        // Build the bounding box for this candidate (with padding)
        const candidate = {
          left: x - PADDING,
          top: y - PADDING,
          right: x + item.width + PADDING,
          bottom: y + item.height + PADDING,
        }

        // Check against all already-placed words
        const hasCollision = placed.some(box => boxesOverlap(candidate, box))

        if (!hasCollision) {
          bestPos = { x, y, rotation }
          placed.push(candidate)
          break
        }
      }

      // Fallback: if we couldn't find a spot after all attempts,
      // place it anyway (shouldn't happen with 10 words)
      if (!bestPos) {
        const r1 = seededRandom(hash)
        const r2 = seededRandom(hash + 1)
        bestPos = {
          x: r1 * (containerWidth - item.width - 20) + 10,
          y: r2 * (containerHeight - item.height - 20) + 10,
          rotation: 0,
        }
      }

      return {
        word: item.word,
        left: bestPos.x,
        top: bestPos.y,
        rotation: bestPos.rotation,
        fontSize: item.fontSize,
        fontWeight: item.weight,
      }
    })

    setPositions(results)
  }, [words])

  return (
    <div
      className="word-scatter"
      ref={containerRef}
      style={{ minHeight: '360px' }}
    >
      {positions.map((item, i) => (
        <span
          key={i}
          className="word-scatter-item"
          style={{
            left: `${item.left}px`,
            top: `${item.top}px`,
            fontSize: `${item.fontSize}px`,
            fontWeight: item.fontWeight,
            transform: `rotate(${item.rotation}deg)`,
          }}
        >
          {item.word}
        </span>
      ))}
    </div>
  )
}
