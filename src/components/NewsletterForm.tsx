import { useEffect, useRef, useState, type SubmitEvent } from "react"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function NewsletterForm() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [email, setEmail] = useState("")
  const [invalid, setInvalid] = useState(false)
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    const focusNewsletter = () => {
      if (location.hash === "#boletin") inputRef.current?.focus()
    }
    focusNewsletter()
    window.addEventListener("hashchange", focusNewsletter)
    return () => window.removeEventListener("hashchange", focusNewsletter)
  }, [])

  function onSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const ok = emailPattern.test(email.trim());
    setInvalid(!ok)
    setJoined(ok)
    if (!ok) inputRef.current?.focus()
  }

  return (
    <form className="flex items-center gap-2" noValidate onSubmit={onSubmit}>
      <input
        ref={inputRef}
        type="email"
        name="email"
        value={email}
        placeholder="tu@correo.com"
        aria-label="Correo para el boletín"
        aria-invalid={invalid}
        required
        onChange={(event) => setEmail(event.target.value)}
        className="min-w-0 flex-1 border border-line bg-deep px-3 py-2 text-paper outline-none focus:border-coral focus:shadow-[0_0_0_3px_rgba(255,87,51,0.25)] aria-invalid:border-coral"
      />
      <button
        className="bg-coral px-3.5 py-2 text-xs font-semibold tracking-[0.08em] text-ink transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
        type="submit"
      >
        SUMARME
      </button>
      {joined && (
        <span
          className="grid size-5.5 animate-pop place-items-center rounded-full bg-gold text-sm font-bold text-gold-ink"
          aria-hidden="true"
        >
          ✓
        </span>
      )}
    </form>
  );
}
