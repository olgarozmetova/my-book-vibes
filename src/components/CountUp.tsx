import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface Props {
  /** Final number. It is also what the HTML contains, so it is what shows without JavaScript. */
  to: number
  /** Seconds to wait before counting (to line up with other hero animations). */
  delay?: number
}

/**
 * Number that counts up from 0 to `to` when the page loads.
 * With "reduce motion" enabled it keeps the final number and does not animate.
 * Screen readers read the final number only, never the intermediate ones.
 */
export default function CountUp({ to, delay = 0.6 }: Props) {
  const numberRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = numberRef.current
    if (!element) return

    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const counter = { value: 0 }
      const tween = gsap.fromTo(
        counter,
        { value: 0 },
        {
          value: to,
          duration: 1.6,
          delay,
          ease: "power2.out",
          onUpdate: () => {
            element.textContent = String(Math.round(counter.value))
          },
        },
      )
      // Show 0 right away while waiting for the delay.
      element.textContent = "0"

      return () => {
        tween.kill()
        element.textContent = String(to)
      }
    })

    return () => mm.revert()
  }, [to, delay])

  return (
    <>
      <span className="sr-only">{to}</span>
      <span ref={numberRef} aria-hidden="true" className="tabular-nums">
        {to}
      </span>
    </>
  )
}
