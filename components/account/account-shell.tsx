"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { clearToken, getToken } from "@/lib/auth/session"

const themeKey = "theme"

export function AccountShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (!getToken()) {
      router.replace(`/entrar?next=${encodeURIComponent("/conta/pulseiras")}`)
      return
    }
    const enabled = localStorage.getItem(themeKey) === "dark"
    setDark(enabled)
    document.documentElement.classList.toggle("dark", enabled)
    setReady(true)
  }, [router])

  function setTheme(checked: boolean) {
    setDark(checked)
    document.documentElement.classList.toggle("dark", checked)
    localStorage.setItem(themeKey, checked ? "dark" : "light")
  }

  function logout() {
    clearToken()
    router.push("/entrar")
  }

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <p className="text-white">Carregando…</p>
      </div>
    )
  }

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b p-4">
        <a href="/" className="text-sm font-semibold">
          HB Tags
        </a>
        <nav className="flex flex-wrap items-center gap-2 text-sm">
          <Button variant="ghost" nativeButton={false} render={<a href="/conta/pulseiras" />}>
            Pulseiras
          </Button>
          <Button variant="ghost" nativeButton={false} render={<a href="/conta/senha" />}>
            Senha
          </Button>
          <Button variant="outline" onClick={logout}>
            Sair
          </Button>
          <Switch aria-label="Tema escuro" checked={dark} onCheckedChange={setTheme} />
        </nav>
      </header>
      <main className="mx-auto w-full max-w-3xl p-6">{children}</main>
    </>
  )
}
