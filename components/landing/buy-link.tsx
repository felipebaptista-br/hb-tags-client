"use client"

import { Button } from "@/components/ui/button"
import { cn } from "cn"

export const buyButtonClass =
  "h-12 w-full bg-cyan-300 px-8 text-base font-semibold normal-case tracking-normal text-slate-950 shadow-[0_0_32px_rgba(62,240,255,0.45)] hover:bg-cyan-200 sm:w-auto"

export function BuyLink({ className }: { className?: string }) {
  return (
    <Button
      nativeButton={false}
      render={<a href="#comprar" />}
      size="lg"
      className={cn(buyButtonClass, className)}
      onClick={(event) => {
        const target = document.querySelector("#comprar")
        if (!(target instanceof HTMLElement)) return
        event.preventDefault()
        target.scrollIntoView({ behavior: "smooth", block: "start" })
        history.replaceState(null, "", "#comprar")
      }}
    >
      Quero minha pulseira
    </Button>
  )
}
