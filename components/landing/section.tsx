import type { ReactNode } from "react"
import { cn } from "cn"

const entranceClass = {
  view: "animate-landing-rise motion-reduce:animate-none [animation-timeline:view()] [animation-range:entry_0%_cover_34%]",
  load: "animate-landing-rise motion-reduce:animate-none",
  none: "",
} as const

export function Section({
  id,
  children,
  className,
  labelledBy,
  entrance = "view",
}: {
  id?: string
  children: ReactNode
  className?: string
  labelledBy?: string
  entrance?: keyof typeof entranceClass
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("scroll-mt-28 px-5 py-16 sm:px-8 sm:py-24", entranceClass[entrance], className)}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

export function revealDelay(index: number): { animationDelay: string } {
  return { animationDelay: `${index * 90}ms` }
}

export const revealItemClass =
  "animate-landing-rise motion-reduce:animate-none [animation-timeline:view()] [animation-range:entry_0%_cover_28%]"

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="font-[family-name:var(--font-geist-sans)] text-xs font-medium tracking-[0.22em] text-cyan-300 uppercase">
      {children}
    </p>
  )
}

export function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="font-[family-name:var(--font-geist-sans)] text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl"
    >
      {children}
    </h2>
  )
}
