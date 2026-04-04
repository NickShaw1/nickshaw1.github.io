import { useState } from 'react'

type CalcOp = '+' | '-' | '×' | '÷' | null

function compute(a: string, op: CalcOp, b: string): string {
  const x = parseFloat(a), y = parseFloat(b)
  if (op === '+') return String(x + y)
  if (op === '-') return String(x - y)
  if (op === '×') return String(x * y)
  if (op === '÷') return y !== 0 ? String(x / y) : 'Error'
  return b
}

export default function CalculatorDemo() {
  const [display, setDisplay] = useState('0')
  const [stored,  setStored]  = useState('')
  const [op,      setOp]      = useState<CalcOp>(null)
  const [fresh,   setFresh]   = useState(false)

  function pressDigit(d: string) {
    setDisplay(prev => {
      if (fresh || prev === '0') { setFresh(false); return d }
      return prev.length < 9 ? prev + d : prev
    })
  }
  function pressDecimal() {
    setDisplay(prev => {
      if (fresh) { setFresh(false); return '0.' }
      return prev.includes('.') ? prev : prev + '.'
    })
  }
  function pressOp(next: CalcOp) {
    if (op && !fresh) {
      const result = compute(stored, op, display)
      setDisplay(result); setStored(result)
    } else {
      setStored(display)
    }
    setOp(next); setFresh(true)
  }
  function pressEqual() {
    if (!op) return
    setDisplay(compute(stored, op, display))
    setOp(null); setFresh(true)
  }
  function pressClear() { setDisplay('0'); setStored(''); setOp(null); setFresh(false) }

  const num = (label: string, action: () => void) => (
    <button onClick={action} className="h-10 rounded border border-bg-border text-text-secondary font-mono text-[13px] hover:border-accent/30 hover:text-text-primary transition-colors duration-150">
      {label}
    </button>
  )
  const oper = (label: string, action: () => void) => (
    <button onClick={action} className="h-10 rounded border border-accent/40 text-accent font-mono text-[13px] hover:bg-accent/10 transition-colors duration-150">
      {label}
    </button>
  )

  return (
    <div className="mb-5">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Live demo</p>
      <div className="bg-bg-surface border border-bg-border rounded-card p-4 max-w-[220px] mx-auto">
        <div className="bg-bg-base rounded px-3 py-2 mb-3 text-right font-mono text-xl text-text-primary truncate">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-1.5 mb-1.5">
          {num('C',  pressClear)}
          {num('⌫',  () => setDisplay(p => p.length > 1 ? p.slice(0, -1) : '0'))}
          {oper('÷', () => pressOp('÷'))}
          {oper('×', () => pressOp('×'))}
        </div>
        <div className="grid grid-cols-4 gap-1.5 mb-1.5">
          {num('7', () => pressDigit('7'))}
          {num('8', () => pressDigit('8'))}
          {num('9', () => pressDigit('9'))}
          {oper('−', () => pressOp('-'))}
        </div>
        <div className="grid grid-cols-4 gap-1.5 mb-1.5">
          {num('4', () => pressDigit('4'))}
          {num('5', () => pressDigit('5'))}
          {num('6', () => pressDigit('6'))}
          {oper('+', () => pressOp('+'))}
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {num('1', () => pressDigit('1'))}
          {num('2', () => pressDigit('2'))}
          {num('3', () => pressDigit('3'))}
          <button
            onClick={pressEqual}
            className="row-span-2 rounded border border-accent/40 text-accent font-mono text-[13px] hover:bg-accent/10 transition-colors duration-150"
          >
            =
          </button>
          <button
            onClick={() => pressDigit('0')}
            className="col-span-2 h-10 rounded border border-bg-border text-text-secondary font-mono text-[13px] hover:border-accent/30 hover:text-text-primary transition-colors duration-150"
          >
            0
          </button>
          {num('.', pressDecimal)}
        </div>
      </div>
    </div>
  )
}
