import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

const COMMANDS = [
  { prompt: '$ npm run build',                   result: '✓  built in 1.23s' },
  { prompt: '$ npx playwright test',             result: '✓  247 passed · 0 failed · 1.8s' },
  { prompt: '$ grep -r "TODO" ./src',            result: 'no results (suspiciously clean)' },
  { prompt: '$ git log --oneline -1',            result: '"fix: final fix for real this time"' },
  { prompt: '$ npx playwright test --grep @smoke', result: '✓  32 passed · 0 failed · 0.6s' },
  { prompt: '$ echo "ship it"',                  result: 'ship it' },
]

const TYPING_SPEED  = 38   // ms per character
const PAUSE_AFTER   = 1800 // ms to show full line before cycling
const CURSOR_BLINK  = 530  // ms cursor blink interval

export default function TerminalStrip() {
  const reduced             = useReducedMotion()
  const [cmdIdx,  setCmdIdx]  = useState(0)
  const [typed,   setTyped]   = useState('')
  const [phase,   setPhase]   = useState<'typing' | 'result' | 'pause'>('typing')
  const [cursor,  setCursor]  = useState(true)

  const cmd = COMMANDS[cmdIdx]!

  // Static version for reduced motion
  useEffect(() => {
    if (reduced) return
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (typed.length < cmd.prompt.length) {
        timeout = setTimeout(
          () => setTyped(cmd.prompt.slice(0, typed.length + 1)),
          TYPING_SPEED,
        )
      } else {
        timeout = setTimeout(() => setPhase('result'), 300)
      }
    } else if (phase === 'result') {
      timeout = setTimeout(() => setPhase('pause'), 400)
    } else {
      timeout = setTimeout(() => {
        setTyped('')
        setPhase('typing')
        setCmdIdx((i) => (i + 1) % COMMANDS.length)
      }, PAUSE_AFTER)
    }

    return () => clearTimeout(timeout)
  }, [phase, typed, cmd, reduced])

  // Cursor blink
  useEffect(() => {
    if (reduced) return
    const id = setInterval(() => setCursor((c) => !c), CURSOR_BLINK)
    return () => clearInterval(id)
  }, [reduced])

  return (
    <section
      aria-label="Test suite status"
      className="w-full bg-bg-surface border-y border-bg-border overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-4">
        <div className="font-mono text-[13px] flex items-center gap-x-4 overflow-hidden min-w-0">

          {reduced ? (
            // Static for prefers-reduced-motion
            <>
              <span className="text-accent">{COMMANDS[0]!.prompt}</span>
              <span className="text-text-secondary">{COMMANDS[0]!.result}</span>
            </>
          ) : (
            <>
              <span className="text-accent whitespace-nowrap">
                {typed}
                <span
                  aria-hidden="true"
                  className={`inline-block w-[2px] h-[1em] bg-accent align-middle ml-[1px] transition-opacity duration-75 ${cursor ? 'opacity-100' : 'opacity-0'}`}
                />
              </span>
              {phase !== 'typing' && (
                <span className="text-text-secondary truncate min-w-0">
                  {cmd.result}
                </span>
              )}
            </>
          )}

        </div>
      </div>
    </section>
  )
}
