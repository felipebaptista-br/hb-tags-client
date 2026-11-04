import { apiFetch } from "@/lib/api/client"
import type { OwnerTag } from "@/lib/api/types"

export function listMyTags(): Promise<{ tags: OwnerTag[] }> {
  return apiFetch("/api/me/tags")
}

export function getMyTag(id: string): Promise<OwnerTag> {
  return apiFetch(`/api/me/tags/${encodeURIComponent(id)}`)
}

export function activateTag(
  id: string,
  body: {
    access_code: string
    category_slug: string
    profile_data: Record<string, unknown>
  }
): Promise<{ id: string; status: string }> {
  return apiFetch(`/api/me/tags/${encodeURIComponent(id)}/activate`, { body })
}

export function patchMyTag(
  id: string,
  body: {
    category_slug?: string
    profile_data?: Record<string, unknown>
  }
): Promise<OwnerTag> {
  return apiFetch(`/api/me/tags/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body,
  })
}

export function suspendMyTag(id: string): Promise<{ id: string; status: string }> {
  return apiFetch(`/api/me/tags/${encodeURIComponent(id)}/suspend`, { method: "POST" })
}
