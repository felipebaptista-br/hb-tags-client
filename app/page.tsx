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
    <div
      id="topo"
      className="min-h-svh flex-1 overflow-x-clip"
      style={{
        backgroundColor: "#070812",
        color: "#e7edf7",
        backgroundImage:
          "linear-gradient(rgba(62, 240, 255, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(62, 240, 255, 0.045) 1px, transparent 1px), radial-gradient(ellipse 70% 42% at 0% -10%, rgba(62, 240, 255, 0.16), transparent 52%), radial-gradient(ellipse 55% 36% at 100% 0%, rgba(192, 132, 252, 0.14), transparent 48%)",
        backgroundSize: "48px 48px, 48px 48px, auto, auto",
      }}
    >
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
