import React from "react"
import { Spinner } from "@/components/ui/spinner"

export default async function TagIdProcessing(): Promise<React.JSX.Element> {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-zinc-950">
      <Spinner className="size-14 text-white" />
    </div>
  )
}