import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Reading light: a warm glow that follows the mouse behind the Hero.
 * Place it inside a container with `data-hero` and `relative isolate`; it listens
 * for the mouse over that container.
 */
export default function HeroGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const hero = glow?.closest<HTMLElement>("[data-hero]");
    if (!glow || !hero) return

    // Only with a mouse (not on touch screens) and without "reduce motion" enabled.
    const mm = gsap.matchMedia()
    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        mouse: "(hover: hover) and (pointer: fine)",
      },
      (context) => {
        const { motion, mouse } = context.conditions as { motion: boolean; mouse: boolean };
        if (!motion || !mouse) return;

        // The light lags slightly behind the cursor, as if it had weight, instead of sticking to it.
        const moveX = gsap.quickTo(glow, "x", { duration: 0.8, ease: "power3" });
        const moveY = gsap.quickTo(glow, "y", { duration: 0.8, ease: "power3" });

        const local = (event: PointerEvent) => {
          const box = hero.getBoundingClientRect()
          return { x: event.clientX - box.left, y: event.clientY - box.top };
        };

        const onEnter = (event: PointerEvent) => {
          // Appears right under the cursor instead of travelling in from the corner.
          gsap.set(glow, local(event));
          gsap.to(glow, { opacity: 1, duration: 0.6 });
        };
        const onMove = (event: PointerEvent) => {
          const { x, y } = local(event)
          moveX(x)
          moveY(y)
        };
        const onLeave = () => {
          gsap.to(glow, { opacity: 0, duration: 0.8 })
        };

        hero.addEventListener("pointerenter", onEnter)
        hero.addEventListener("pointermove", onMove)
        hero.addEventListener("pointerleave", onLeave)

        return () => {
          hero.removeEventListener("pointerenter", onEnter)
          hero.removeEventListener("pointermove", onMove)
          hero.removeEventListener("pointerleave", onLeave)
          gsap.set(glow, { opacity: 0 })
        }
      },
    )

    return () => mm.revert()
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 -z-10 size-136 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
      style={{
        background:
          "radial-gradient(closest-side, rgba(255, 150, 60, 0.18), rgba(255, 87, 51, 0.07) 55%, transparent 100%)",
      }}
    />
  )
}
