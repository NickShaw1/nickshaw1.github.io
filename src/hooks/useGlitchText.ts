import { useState, useRef, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'

export function useGlitchText(original: string) {
  const [display, setDisplay] = useState(original)
  const rafRef  = useRef<number | null>(null)
  const iterRef = useRef(0)

  const cancel = () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
  }

  const start = useCallback(() => {
    cancel()
    iterRef.current = 0
    const totalFrames = original.length * 4

    const tick = () => {
      iterRef.current++
      const progress = iterRef.current / totalFrames

      setDisplay(
        original
          .split('')
          .map((char, i) => {
            if (char === '.') return char
            const resolved = i / original.length < progress
            return resolved
              ? original[i]
              : CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (iterRef.current < totalFrames) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(original)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [original])

  const reset = useCallback(() => {
    cancel()
    setDisplay(original)
  }, [original])

  return { display, start, reset }
}
