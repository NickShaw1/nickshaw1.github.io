import { useState, useId } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [state,   setState]   = useState<FormState>('idle')
  const [errors,  setErrors]  = useState<Record<string, string>>({})
  const id = useId()

  const nameId    = `${id}-name`
  const emailId   = `${id}-email`
  const messageId = `${id}-message`
  const nameErrId    = `${nameId}-err`
  const emailErrId   = `${emailId}-err`
  const messageErrId = `${messageId}-err`

  function validate(fd: FormData): Record<string, string> {
    const errs: Record<string, string> = {}
    if (!fd.get('name'))    errs['name']    = 'Name is required.'
    if (!fd.get('email'))   errs['email']   = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(fd.get('email'))))
      errs['email'] = 'Please enter a valid email address.'
    if (!fd.get('message')) errs['message'] = 'Message is required.'
    return errs
  }

  function clearIfValid(field: string, value: string) {
    if (!errors[field]) return
    const valid =
      field === 'email'
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        : value.trim().length > 0
    if (valid) setErrors((prev) => { const next = { ...prev }; delete next[field]; return next })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd  = new FormData(e.currentTarget)
    const errs = validate(fd)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setState('submitting')

    const formspreeId = import.meta.env.VITE_FORMSPREE_ID
    if (!formspreeId) {
      setState('error')
      return
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  const inputClass = (field: string) => `
    w-full bg-bg-elevated border rounded px-4 py-3
    font-display text-[15px] text-text-primary placeholder:text-text-muted
    focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
    transition-colors duration-150
    ${errors[field] ? 'border-red-500/70' : 'border-bg-border hover:border-text-muted/40'}
  `

  if (state === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col gap-4 py-8 px-6 border border-accent/30 rounded-card bg-accent/5"
      >
        <CheckCircle size={28} className="text-accent" />
        <div>
          <p className="font-mono text-[11px] tracking-widest uppercase text-accent mb-2">
            Message sent
          </p>
          <p className="text-text-primary text-[15px] leading-relaxed">
            Thanks for getting in touch. I'll get back to you soon.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5"
      aria-label="Contact form"
    >
      {/* Name */}
      <div>
        <label htmlFor={nameId} className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-1.5">
          Name
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          autoComplete="name"
          required
          className={inputClass('name')}
          placeholder="Your name"
          aria-describedby={errors['name'] ? nameErrId : undefined}
          aria-invalid={!!errors['name']}
          onChange={(e) => clearIfValid('name', e.target.value)}
        />
        {errors['name'] && (
          <p id={nameErrId} role="alert" className="mt-1.5 font-mono text-[11px] text-red-400">
            {errors['name']}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor={emailId} className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-1.5">
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass('email')}
          placeholder="your@email.com"
          aria-describedby={errors['email'] ? emailErrId : undefined}
          aria-invalid={!!errors['email']}
          onChange={(e) => clearIfValid('email', e.target.value)}
        />
        {errors['email'] && (
          <p id={emailErrId} role="alert" className="mt-1.5 font-mono text-[11px] text-red-400">
            {errors['email']}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor={messageId} className="block font-mono text-[10px] tracking-widest uppercase text-text-muted mb-1.5">
          Message
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={5}
          required
          className={`${inputClass('message')} resize-none`}
          placeholder="What would you like to say?"
          aria-describedby={errors['message'] ? messageErrId : undefined}
          aria-invalid={!!errors['message']}
          onChange={(e) => clearIfValid('message', e.target.value)}
        />
        {errors['message'] && (
          <p id={messageErrId} role="alert" className="mt-1.5 font-mono text-[11px] text-red-400">
            {errors['message']}
          </p>
        )}
      </div>

      {/* Network error */}
      {state === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 px-4 py-3 border border-red-500/30 rounded-card bg-red-500/5"
        >
          <AlertCircle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
          <p className="font-mono text-[11px] text-red-400 leading-relaxed">
            Something went wrong. Please try again.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="
          w-full sm:w-auto
          border border-accent text-text-primary bg-accent/10
          font-mono text-[12px] tracking-widest uppercase
          px-4 py-2 rounded-pill
          hover:bg-accent/20
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-150
          active:scale-[0.97]
        "
      >
        {state === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
