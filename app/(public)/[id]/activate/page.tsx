import React, { Suspense } from "react"
import Loading from "./loading"

interface ActivateParams {
  params: Promise<{
    id: string
  }>
}

export default function Activate({ params }: ActivateParams): React.JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <ActivateContent params={params} />
    </Suspense>
  )
}

async function ActivateContent({ params }: ActivateParams): Promise<React.JSX.Element> {
  const { id } = await params

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <p className="text-2xl font-bold">ID: {id}</p>
    </div>
  )
}
