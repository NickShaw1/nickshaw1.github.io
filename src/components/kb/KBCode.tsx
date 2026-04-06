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
    <div className="relative my-6 code-block-wrapper">
      {language && (
        <span className="absolute top-3 left-4 font-mono text-[10px] tracking-widest uppercase text-text-muted select-none">
          {language}
        </span>
      )}

      <button
        onClick={handleCopy}
        aria-label="Copy code to clipboard"
        className="code-copy-btn"
        style={{ top: language ? '0.5rem' : '0.5rem' }}
      >
        {copied
          ? <Check size={13} />
          : <Copy size={13} />
        }
      </button>

      <pre className={language ? 'pt-8' : ''} style={{
        background: '#111111',
        border: '1px solid #222222',
        borderRadius: '8px',
        padding: language ? '2rem 1.25rem 1.25rem' : '1.25rem',
        overflowX: 'auto',
        margin: 0,
        fontSize: '0.8125rem',
        lineHeight: 1.7,
        position: 'relative',
      }}>
        <code
          ref={codeRef}
          style={{
            fontFamily: '"Space Mono", "Courier New", Courier, monospace',
            fontSize: 'inherit',
            background: 'transparent',
            border: 'none',
            padding: 0,
            color: '#F0EDE6',
            whiteSpace: 'pre',
          }}
        >
          {children.trimStart()}
        </code>
      </pre>
    </div>
  )
}
