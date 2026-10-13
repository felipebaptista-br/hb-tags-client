"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Kicker, Section, SectionTitle } from "@/components/landing/section"
import { productCatalog } from "@/lib/product"

const questions = [
  {
    value: "quem-escaneia",
    question: "Quem pode escanear o QR?",
    answer: "Qualquer pessoa com um celular. Não precisa de conta nem conhecer a HB Tags.",
  },
  {
    value: "app",
    question: "Precisa instalar um aplicativo?",
    answer: "Não. O QR abre uma página no navegador.",
  },
  {
    value: "internet",
    question: "Funciona sem internet no celular de quem escaneia?",
    answer: "Não. Quem escaneia precisa de conexão para abrir a tela de emergência.",
  },
  {
    value: "perdida",
    question: "E se a pulseira for perdida?",
    answer: "Dá para desativar. A tela deixa de aparecer para quem escanear.",
  },
  {
    value: "atualizar",
    question: "Como atualizo os dados?",
    answer: "O responsável altera o cadastro quando quiser. Não precisa trocar a pulseira.",
  },
  {
    value: "dados",
    question: "Como ficam meus dados?",
    answer:
      "Você escolhe o que fica visível. Os dados são protegidos conforme a LGPD. Nenhum dado de saúde é pedido na compra.",
  },
  {
    value: "uma-pessoa",
    question: "Serve para mais de uma pessoa?",
    answer: "Cada pulseira é de uma pessoa ou de um pet.",
  },
  {
    value: "frete",
    question: "Qual o prazo e o frete?",
    answer: productCatalog.shipping,
  },
]

export function Faq() {
  return (
    <Section id="perguntas" labelledBy="perguntas-titulo">
      <Kicker>Dúvidas</Kicker>
      <SectionTitle id="perguntas-titulo">Perguntas frequentes</SectionTitle>
      <Accordion className="mt-10 border-t border-cyan-400/20">
        {questions.map((item) => (
          <AccordionItem key={item.value} value={item.value} className="border-cyan-400/20">
            <AccordionTrigger className="text-base text-zinc-100 hover:text-cyan-100 hover:no-underline **:data-[slot=accordion-trigger-icon]:text-cyan-200">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="leading-7 text-zinc-300">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}
