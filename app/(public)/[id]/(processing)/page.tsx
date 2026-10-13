import React, { Suspense } from "react"
import { Spinner } from "@/components/ui/spinner"
import { redirect } from "next/navigation"

interface TagIdProcessingParams {
  params: Promise<{
    id: string
  }>
}

export default function TagIdProcessing({ params }: TagIdProcessingParams): React.JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <TagIdProcessingContent params={params} />
    </Suspense>
  )
}

export async function TagIdProcessingContent({ params }: TagIdProcessingParams): Promise<React.JSX.Element> {
  const { id } = await params
  await new Promise(resolve => setTimeout(resolve, 3000))
  redirect(`/${id}/activate`)
}

function Loading(): React.JSX.Element {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-zinc-950">
      <Spinner className="size-14 text-white" />
    </div>
  )
}