"use client"

import { useEffect, useState } from "react"
import { MessageCircle, PawPrint, UserRound } from "lucide-react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

const moments = [
  {
    title: "Na rua, sem o caminho de casa",
    text: "Um idoso se desorienta. Quem encontra liga para a família e lê o que fazer.",
    icon: UserRound,
    wash: "bg-[#e7efe9]",
  },
  {
    title: "Longe de casa",
    text: "Um pet se perde. Quem acha vê o contato do tutor e devolve com segurança.",
    icon: PawPrint,
    wash: "bg-[#f3eadf]",
  },
  {
    title: "Sem conseguir explicar",
    text: "Uma pessoa autista entra em crise e não consegue dizer o que precisa. Quem está perto lê como se aproximar e o que evitar.",
    icon: MessageCircle,
    wash: "bg-[#fbf8f3]",
  },
]

export function MomentsCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setSelected(api.selectedScrollSnap())
    onSelect()
    api.on("select", onSelect)
    return () => {
      api.off("select", onSelect)
    }
  }, [api])

  useEffect(() => {
    if (!api || paused) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => api.scrollNext(), 4500)
    return () => window.clearInterval(timer)
  }, [api, paused])

  return (
    <div
      className="mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {moments.map((moment, index) => {
            const Icon = moment.icon
            return (
              <CarouselItem key={moment.title}>
                <article className={`flex min-h-64 flex-col justify-between rounded-3xl p-8 sm:min-h-72 sm:p-12 ${moment.wash}`}>
                  <div className="flex items-center justify-between">
                    <span className="flex size-14 items-center justify-center rounded-full bg-white text-[#1f4d45] shadow-sm">
                      <Icon aria-hidden="true" className="size-6" />
                    </span>
                    <p className="text-sm font-medium text-[#1f4d45]">0{index + 1}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-stone-900 sm:text-3xl">{moment.title}</h3>
                    <p className="mt-3 max-w-2xl text-lg leading-8 text-stone-600">{moment.text}</p>
                  </div>
                </article>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <div className="mt-6 flex items-center justify-center gap-3">
          <CarouselPrevious className="static inset-auto my-0 translate-none" />
          {moments.map((moment, index) => (
            <button
              key={moment.title}
              type="button"
              aria-label={`Ir para a situação ${index + 1}`}
              aria-current={selected === index}
              className={`size-2.5 rounded-full ${selected === index ? "bg-[#1f4d45]" : "bg-stone-300"}`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
          <CarouselNext className="static inset-auto my-0 translate-none" />
        </div>
      </Carousel>
    </div>
  )
}
