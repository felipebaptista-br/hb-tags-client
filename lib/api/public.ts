import { apiFetch } from "@/lib/api/client"
import type { CategoriesResponse, PublicTag, ResolveResponse } from "@/lib/api/types"

export function resolveTag(id: string): Promise<ResolveResponse> {
  return apiFetch(`/api/tags/${encodeURIComponent(id)}/resolve`, { auth: false })
}

export function getPublicTag(id: string): Promise<PublicTag> {
  return apiFetch(`/api/public/tags/${encodeURIComponent(id)}`, { auth: false })
}

export function listCategories(): Promise<CategoriesResponse> {
  return apiFetch("/api/categories", { auth: false })
}
