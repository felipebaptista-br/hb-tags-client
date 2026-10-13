"use client"

import { Minus, Plus } from "lucide-react"
import { useState } from "react"

import { buyButtonClass } from "@/components/landing/buy-link"
import { Kicker, Section, SectionTitle } from "@/components/landing/section"
import { Button } from "@/components/ui/button"
import { productCatalog } from "@/lib/product"

const model = productCatalog.models[0]

export function Purchase() {
  const [quantity, setQuantity] = useState(1)
  const [closed, setClosed] = useState(false)

  return (
    <Section id="comprar" labelledBy="comprar-titulo">
      <div className="grid gap-10 border border-cyan-400/25 bg-[#10121c]/90 p-6 shadow-[0_0_48px_rgba(62,240,255,0.07)] transition duration-300 hover:border-cyan-300/60 hover:shadow-[0_0_40px_rgba(62,240,255,0.14)] sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <Kicker>Compra</Kicker>
          <SectionTitle id="comprar-titulo">Sua pulseira</SectionTitle>
          <p className="mt-4 text-5xl font-semibold tracking-tight text-cyan-200">{productCatalog.priceLabel}</p>
          <p className="mt-4 leading-7 text-zinc-300">
            Nenhum dado de saúde é pedido na compra. A categoria é escolhida na ativação.
          </p>
        </div>
        <form
          className="flex flex-col gap-8"
          onSubmit={(event) => {
            event.preventDefault()
            setClosed(true)
          }}
        >
          <div>
            <p className="text-sm font-medium text-zinc-200">Modelo</p>
            <div className="mt-3 border border-cyan-300 bg-cyan-300/10 p-4 shadow-[0_0_24px_rgba(62,240,255,0.16)]">
              <p className="font-semibold text-white">{model.name}</p>
              <p className="mt-1 text-sm text-zinc-400">{model.detail}</p>
            </div>
          </div>
          <div>
            <p id="quantidade-label" className="text-sm font-medium text-zinc-200">
              Quantidade
            </p>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                className="flex size-11 min-h-11 min-w-11 items-center justify-center border border-cyan-400/40 text-cyan-100 hover:border-cyan-300"
                aria-label="Diminuir quantidade"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              >
                <Minus className="size-4" />
              </button>
              <span aria-live="polite" aria-labelledby="quantidade-label" className="min-w-8 text-center text-lg text-white">
                {quantity}
              </span>
              <button
                type="button"
                className="flex size-11 min-h-11 min-w-11 items-center justify-center border border-cyan-400/40 text-cyan-100 hover:border-cyan-300"
                aria-label="Aumentar quantidade"
                onClick={() => setQuantity((current) => Math.min(9, current + 1))}
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>
          <div>
            <Button type="submit" size="lg" className={buyButtonClass}>
              Quero minha pulseira
            </Button>
            <p className="mt-3 text-sm leading-6 text-zinc-400">Preço e pagamento a confirmar.</p>
            {closed ? (
              <p role="status" className="mt-3 text-sm leading-6 text-cyan-100">
                A compra ainda não está aberta.
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </Section>
  )
}
