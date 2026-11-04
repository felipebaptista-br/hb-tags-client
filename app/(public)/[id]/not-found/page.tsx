import React, { Suspense } from "react"

import { StatusScreen } from "@/components/public/status-screen"
import Loading from "./loading"

interface NotFoundParams {
  params: Promise<{
    id: string
  }>
}

export default function NotFound({ params }: NotFoundParams): React.JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <NotFoundContent params={params} />
    </Suspense>
  )
}

async function NotFoundContent({ params }: NotFoundParams): Promise<React.JSX.Element> {
  const { id } = await params
  return (
    <StatusScreen
      title="Pulseira não encontrada"
      description="Não localizamos esta identificação. Confira o QR ou o link."
      detail={`Referência: ${id}`}
    />
  )
}
