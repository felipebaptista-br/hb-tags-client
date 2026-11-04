import React, { Suspense } from "react"

import { StatusScreen } from "@/components/public/status-screen"
import { Spinner } from "@/components/ui/spinner"

interface LostParams {
  params: Promise<{
    id: string
  }>
}

export default function Lost({ params }: LostParams): React.JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <LostContent params={params} />
    </Suspense>
  )
}

async function LostContent({ params }: LostParams): Promise<React.JSX.Element> {
  const { id } = await params
  return (
    <StatusScreen
      title="Pulseira marcada como perdida"
      description="Esta pulseira está sinalizada como perdida. Se você a encontrou, entre em contato com a HB Tags."
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
