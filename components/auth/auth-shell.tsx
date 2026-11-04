"use client"

import { useEffect, useState } from "react"

import { Switch } from "@/components/ui/switch"

const themeKey = "theme"

export function AuthShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const enabled = localStorage.getItem(themeKey) === "dark"
    setDark(enabled)
    document.documentElement.classList.toggle("dark", enabled)
  }, [])

  function setTheme(checked: boolean) {
    setDark(checked)
    document.documentElement.classList.toggle("dark", checked)
    localStorage.setItem(themeKey, checked ? "dark" : "light")
  }

  return (
    <>
      <header className="flex items-center justify-between p-6">
        <a href="/" className="text-sm font-semibold">
          HB Tags
        </a>
        <Switch aria-label="Tema escuro" checked={dark} onCheckedChange={setTheme} />
      </header>
      <main className="flex justify-center p-6">{children}</main>
    </>
  )
}
