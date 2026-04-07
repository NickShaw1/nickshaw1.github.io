import { useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface KBCodeProps {
  language?: string
  children: string
}

export default function KBCode({ language, children }: KBCodeProps) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLElement>(null)

  const handleCopy = () => {
    const text = codeRef.current?.innerText ?? children
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="my-6 rounded-[10px] overflow-hidden border border-[#1e1e1e]">

      {/* ── Terminal header bar ── */}
      <div className="relative flex items-center h-9 px-3 bg-[#141414] border-b border-[#1e1e1e]">

        {/* Traffic-light dots */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>

        {/* Language label */}
        {language && (
          <span className="absolute left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest uppercase text-[#484848] select-none pointer-events-none">
            {language}
          </span>
        )}

        {/* Copy button */}
        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="
            ml-auto flex items-center gap-1
            px-2 py-0.5
            rounded-[4px]
            bg-white/5 border border-white/10
            text-[#666] font-mono text-[10px]
            transition-colors duration-150
            hover:text-[#0AFF9D] hover:bg-[#0AFF9D]/8 hover:border-[#0AFF9D]/20
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0AFF9D]
          "
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
        </button>
      </div>

      {/* ── Code body ── */}
      <pre
        style={{
          background: '#0d0d0d',
          margin: 0,
          padding: '1rem',
          overflowX: 'auto',
          fontSize: 'clamp(0.5625rem, 1.3vw, 0.6875rem)',
          lineHeight: 1.75,
        }}
      >
        <code
          ref={codeRef}
          style={{
            fontFamily: '"Space Mono", "Courier New", Courier, monospace',
            fontSize: 'inherit',
            background: 'transparent',
            border: 'none',
            padding: 0,
            color: '#e0ddd6',
            whiteSpace: language ? 'pre' : 'pre-wrap',
          }}
        >
          {children.trimStart()}
        </code>
      </pre>
    </div>
  )
}
