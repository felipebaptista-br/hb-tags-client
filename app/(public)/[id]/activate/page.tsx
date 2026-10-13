import React, { Suspense } from "react"

import { ActivateForm } from "@/components/activate/activate-form"
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
  return <ActivateForm id={id} />
}
