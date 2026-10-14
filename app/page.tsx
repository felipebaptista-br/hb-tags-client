import { Faq } from "@/components/landing/faq"
import { Purchase } from "@/components/landing/purchase"
import {
  Audiences,
  FinalCta,
  Footer,
  Header,
  Hero,
  HowItWorks,
  Privacy,
  Problem,
  ProductDetails,
} from "@/components/landing/sections"

export default function Home() {
  return (
    <div id="topo" className="min-h-svh flex-1 overflow-x-clip bg-[#f6f1e8] text-stone-900">
      <Header />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Audiences />
        <Privacy />
        <ProductDetails />
        <Purchase />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  )
}
