import React, { Suspense } from "react"
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
    <div className="w-screen h-screen flex items-center justify-center">
      <p className="text-2xl font-bold">ID: {id}</p>
    </div>
  )
}
