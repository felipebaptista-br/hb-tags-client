import React, { Suspense } from "react"
import { redirect } from "next/navigation"

import { Spinner } from "@/components/ui/spinner"
import { resolveTag } from "@/lib/api/public"
import type { ResolveAction } from "@/lib/api/types"

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

export async function TagIdProcessingContent({
  params,
}: TagIdProcessingParams): Promise<React.JSX.Element> {
  const { id } = await params
  let action: ResolveAction = "not_found"
  try {
    const result = await resolveTag(id)
    action = result.action
  } catch {
    action = "not_found"
  }
  redirect(destinationFor(action, id))
}

function destinationFor(action: ResolveAction, id: string): string {
  switch (action) {
    case "activate":
      return `/${id}/activate`
    case "informations":
      return `/${id}/informations`
    case "suspended":
      return `/${id}/suspended`
    case "lost":
      return `/${id}/lost`
    default:
      return `/${id}/not-found`
  }
}

function Loading(): React.JSX.Element {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-zinc-950">
      <Spinner className="size-14 text-white" />
    </div>
  )
}
