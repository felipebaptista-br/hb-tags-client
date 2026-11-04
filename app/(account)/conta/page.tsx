"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ContaIndexPage() {
  const router = useRouter()
  useEffect(() => {
    router.replace("/conta/pulseiras")
  }, [router])
  return null
}
