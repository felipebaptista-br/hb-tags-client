import { MessageCircle, PawPrint, UserRound } from "lucide-react"

import { BuyLink } from "@/components/landing/buy-link"
import { MomentsCarousel } from "@/components/landing/moments-carousel"
import { Kicker, revealDelay, revealItemClass, Section, SectionTitle } from "@/components/landing/section"
import { cn } from "cn"
import { productCatalog } from "@/lib/product"

const softCard =
  "rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition duration-300 hover:shadow-md motion-reduce:transition-none"

const nav = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#para-quem", label: "Para quem" },
  { href: "#privacidade", label: "Privacidade" },
  { href: "#comprar", label: "Preço" },
  { href: "#perguntas", label: "Perguntas" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-[#f6f1e8]/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-3 sm:px-8">
        <a href="#topo" className="shrink-0 text-sm font-semibold text-stone-900">
          HB Tags
        </a>
        <nav aria-label="Seções" className="order-last flex w-full flex-wrap gap-x-4 gap-y-2 md:order-none md:w-auto md:gap-5">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="py-1 text-sm text-stone-600 hover:text-[#1f4d45]">
              {item.label}
            </a>
          ))}
        </nav>
        <BuyLink className="h-10 w-auto shrink-0 px-4 text-sm" />
      </div>
    </header>
  )
}

export function Hero() {
  return (
    <Section entrance="load" className="pt-12 sm:pt-20">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="flex flex-col items-start gap-6">
          <Kicker>Pulseira com QR</Kicker>
          <h1 className="max-w-xl text-balance text-4xl font-semibold tracking-tight text-stone-900 sm:text-6xl sm:leading-[1.05]">
            Tranquilidade no pulso.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-stone-600">
            Qualquer pessoa escaneia o QR com o celular e vê como ajudar. Sem app e sem login.
          </p>
          <p className="max-w-xl text-base leading-7 text-stone-500">
            Quem compra nem sempre é quem usa. Pode ser para você, para um familiar ou para um pet.
          </p>
          <BuyLink />
        </div>
        <Bracelet />
      </div>
    </Section>
  )
}

function Bracelet() {
  const cells = [
    [1, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0],
    [1, 0, 1, 1, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0],
    [1, 1, 0, 1, 1, 1, 1],
  ]

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[#e7efe9]" />
      <div className="pointer-events-none absolute inset-16 rounded-full bg-[#f3eadf]" />
      <div className="pointer-events-none absolute top-8 right-6 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-700 shadow-sm">
        Como ajudar
      </div>
      <div className="pointer-events-none absolute bottom-14 left-4 rounded-full border border-stone-200 bg-white px-3 py-1 text-xs text-stone-700 shadow-sm sm:left-6">
        Ligar agora
      </div>
      <svg viewBox="0 0 360 360" className="relative w-full" role="img" aria-label="Pulseira com QR code iluminado">
        <rect x="48" y="128" width="264" height="104" rx="52" fill="#ffffff" stroke="#1f4d45" strokeWidth="8" />
        <rect x="70" y="146" width="36" height="68" rx="8" fill="none" stroke="#c4a484" strokeWidth="3" />
        <rect x="148" y="150" width="64" height="60" rx="6" fill="#f6f1e8" stroke="#1f4d45" strokeWidth="1.5" />
        {cells.map((row, y) =>
          row.map((on, x) =>
            on ? (
              <rect
                key={`${x}-${y}`}
                x={152 + x * 8}
                y={154 + y * 7.4}
                width="6"
                height="5.6"
                rx="1"
                fill="#1f4d45"
              />
            ) : null
          )
        )}
      </svg>
    </div>
  )
}

export function Problem() {
  return (
    <Section labelledBy="problema-titulo">
      <div className="max-w-2xl">
        <Kicker>A situação</Kicker>
        <SectionTitle id="problema-titulo">Quando alguém precisa ajudar</SectionTitle>
        <p className="mt-4 text-lg leading-8 text-stone-600">
          A pulseira não substitui o cuidado. Ela coloca a informação certa na mão de quem está perto.
        </p>
      </div>
      <MomentsCarousel />
    </Section>
  )
}

const steps = [
  {
    title: "Comprar",
    text: "Você escolhe a pulseira. A categoria fica para a ativação.",
  },
  {
    title: "Receber",
    text: "A pulseira chega na sua casa, pronta para usar.",
  },
  {
    title: "Ativar",
    text: "Você cadastra contatos, cuidados e o que quem ajuda precisa saber.",
  },
  {
    title: "Ajudar",
    text: "Qualquer pessoa escaneia o QR e segue as orientações.",
  },
]

export function HowItWorks() {
  return (
    <Section id="como-funciona" labelledBy="como-titulo">
      <Kicker>Passo a passo</Kicker>
      <SectionTitle id="como-titulo">Como funciona</SectionTitle>
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className={cn("relative", revealItemClass)} style={revealDelay(index + 1)}>
            {index < steps.length - 1 ? (
              <span className="absolute top-5 left-12 hidden h-px w-[calc(100%-1.5rem)] bg-stone-300 lg:block" />
            ) : null}
            <p className="relative flex size-10 items-center justify-center rounded-full bg-[#1f4d45] text-sm text-white">
              {index + 1}
            </p>
            <h3 className="mt-5 text-lg font-semibold text-stone-900">{step.title}</h3>
            <p className="mt-2 leading-7 text-stone-600">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

const audiences = [
  {
    icon: PawPrint,
    title: "Pets",
    fields: "Nome do pet, telefone do tutor, se foge com facilidade, cuidados e medicação.",
    example: "Alguém encontra o cachorro no parque, escaneia a pulseira e liga para você.",
  },
  {
    icon: UserRound,
    title: "Idosos",
    fields: "Nome, familiares, condições que o socorro precisa saber e como acalmar.",
    example: "Seu pai se perde no caminho de casa. Quem encontra avisa a família e segue a orientação.",
  },
  {
    icon: MessageCircle,
    title: "Neurodivergentes",
    fields: "Como a pessoa se comunica, o que evitar, o que ajuda a se regular e os contatos.",
    example: "Numa crise na escola ou na rua, quem está perto lê o que fazer em vez de adivinhar.",
  },
]

export function Audiences() {
  return (
    <Section id="para-quem" labelledBy="para-quem-titulo">
      <div className="max-w-2xl">
        <Kicker>Públicos</Kicker>
        <SectionTitle id="para-quem-titulo">Para quem é</SectionTitle>
        <p className="mt-4 text-lg leading-8 text-stone-600">
          A pulseira é a mesma para todos. Pet, idoso ou neurodivergente: a categoria é escolhida na ativação, depois da compra.
        </p>
      </div>
      <ul className="mt-12 grid gap-4 lg:grid-cols-3">
        {audiences.map((audience, index) => {
          const Icon = audience.icon
          return (
          <li
            key={audience.title}
            className={cn(softCard, revealItemClass)}
            style={revealDelay(index + 1)}
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-[#e7efe9]">
              <Icon aria-hidden="true" className="size-5 text-[#1f4d45]" />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-stone-900">{audience.title}</h3>
            <p className="mt-4 text-sm font-medium text-[#1f4d45]">O que cadastrar</p>
            <p className="mt-2 leading-7 text-stone-600">{audience.fields}</p>
            <p className="mt-4 text-sm font-medium text-[#1f4d45]">Exemplo</p>
            <p className="mt-2 leading-7 text-stone-600">{audience.example}</p>
          </li>
          )
        })}
      </ul>
    </Section>
  )
}

const privacyLevels = [
  {
    title: "Público",
    text: "Nome ou apelido, telefone para ligar e orientações de como ajudar.",
  },
  {
    title: "Com confirmação",
    text: "Alergias, condições críticas e detalhes que não precisam estar à primeira vista.",
  },
  {
    title: "Nunca aparece",
    text: "Documentos, endereço de casa e dados de pagamento.",
  },
]

export function Privacy() {
  return (
    <Section id="privacidade" labelledBy="privacidade-titulo">
      <div className="max-w-2xl">
        <Kicker>Controle</Kicker>
        <SectionTitle id="privacidade-titulo">Você decide o que aparece</SectionTitle>
        <p className="mt-4 text-lg leading-8 text-stone-600">
          O responsável escolhe o que fica na tela. Os dados são protegidos conforme a LGPD.
        </p>
      </div>
      <ul className="mt-12 grid gap-4 lg:grid-cols-3">
        {privacyLevels.map((level, index) => (
          <li
            key={level.title}
            className={cn(softCard, revealItemClass)}
            style={revealDelay(index + 1)}
          >
            <span aria-hidden="true" className="mb-4 block h-1.5 w-12 rounded-full bg-[#1f4d45]" />
            <h3 className="text-lg font-semibold text-stone-900">{level.title}</h3>
            <p className="mt-3 leading-7 text-stone-600">{level.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 max-w-2xl leading-7 text-stone-600">
        Cada acesso pode gerar um aviso ao responsável, se ele ativar essa opção.
      </p>
    </Section>
  )
}

const specs = [
  { label: "Material", value: productCatalog.material },
  { label: "Resistência à água", value: productCatalog.waterResistance },
  { label: "Cores e tamanhos", value: productCatalog.colorsAndSizes },
]

export function ProductDetails() {
  return (
    <Section id="detalhes" labelledBy="detalhes-titulo">
      <Kicker>Produto</Kicker>
      <SectionTitle id="detalhes-titulo">A pulseira</SectionTitle>
      <dl className="mt-12 divide-y divide-stone-200 border-y border-stone-200">
        {specs.map((spec) => (
          <div key={spec.label} className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:items-baseline">
            <dt className="text-sm text-stone-500">{spec.label}</dt>
            <dd className="text-lg text-stone-900">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

export function FinalCta() {
  return (
    <Section>
      <div className={cn(softCard, "relative overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-14")}>
        <div aria-hidden="true" className="pointer-events-none absolute -top-16 right-0 size-48 rounded-full bg-[#e7efe9]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 left-8 size-40 rounded-full bg-[#f3eadf]" />
        <div className="relative">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          Pronta para quando alguém precisar ajudar.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-stone-600">
          A pulseira fica. Os dados, você atualiza quando quiser.
        </p>
        <div className="mt-8 flex justify-center">
          <BuyLink />
        </div>
        </div>
      </div>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-stone-200 px-5 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-stone-900">
            HB Tags
          </p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-stone-600">
            Identificação e socorro por QR, sem app e sem login.
          </p>
        </div>
        <p className="text-sm leading-6 text-stone-600">
          Política de privacidade · Termos de uso · Contato
          <span className="mt-1 block text-stone-500">Textos em preparação.</span>
        </p>
      </div>
    </footer>
  )
}
