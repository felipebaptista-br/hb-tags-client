import React, { Suspense } from "react"

import { StatusScreen } from "@/components/public/status-screen"
import { Spinner } from "@/components/ui/spinner"

interface SuspendedParams {
  params: Promise<{
    id: string
  }>
}

export default function Suspended({ params }: SuspendedParams): React.JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <SuspendedContent params={params} />
    </Suspense>
  )
}

async function SuspendedContent({ params }: SuspendedParams): Promise<React.JSX.Element> {
  const { id } = await params
  return (
    <StatusScreen
      title="Pulseira suspensa"
      description="Esta pulseira foi suspensa pelo responsável e não exibe informações públicas."
      detail={`Referência: ${id}`}
    />
  )
}

function Loading(): React.JSX.Element {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-zinc-950">
      <Spinner className="size-14 text-white" />
    </div>
  )
}
