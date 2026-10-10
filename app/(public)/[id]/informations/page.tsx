import React, { Suspense } from "react"
import Loading from "./loading"

interface InformationsParams {
  params: Promise<{
    id: string
  }>
}

export default function Informations({ params }: InformationsParams): React.JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <InformationsContent params={params} />
    </Suspense>
  )
}

async function InformationsContent({ params }: InformationsParams): Promise<React.JSX.Element> {
  const { id } = await params

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <p className="text-2xl font-bold">ID: {id}</p>
    </div>
  )
}
