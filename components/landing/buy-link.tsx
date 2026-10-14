"use client"

import { Button } from "@/components/ui/button"
import { cn } from "cn"

export const buyButtonClass =
  "h-12 w-full rounded-full bg-[#1f4d45] px-8 text-base font-semibold normal-case tracking-normal text-white hover:bg-[#173c36] sm:w-auto"

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
