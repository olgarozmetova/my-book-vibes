import { useEffect, useRef } from "react";
import { gsap } from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"

gsap.registerPlugin(DrawSVGPlugin)

/**
 * Hand-drawn underline that draws itself under a word.
 * Place it inside an element with `relative inline-block`; it stretches to that
 * element's width and sits just below its text.
 *
 * The path starts invisible (`opacity-0`), so nothing flashes before React hydrates.
 * With "reduce motion" enabled it simply appears, already drawn.
 */
export default function HeroUnderline() {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return

    const mm = gsap.matchMedia()

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({ delay: 0.6 })
      timeline
        .fromTo(path, { drawSVG: "0%" }, { drawSVG: "100%", duration: 1, ease: "power2.inOut" }, 0)
        // Fade in at the very start so the round cap of an empty stroke never shows as a dot.
        .fromTo(path, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: "none" }, 0)
    })

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(path, { opacity: 1 })
    })

    return () => mm.revert()
  }, [])

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      className="pointer-events-none absolute bottom-[-0.08em] left-0 h-[0.3em] w-full text-coral"
    >
      <path
        ref={pathRef}
        d="M2 8 C 30 2, 60 11, 100 6 S 170 3, 198 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="opacity-0"
      />
    </svg>
  )
}
