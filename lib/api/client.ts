import { getToken } from "@/lib/auth/session"
import { ApiError, type ApiErrorBody } from "@/lib/api/types"

export function apiBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")
  if (!base) {
    throw new Error("NEXT_PUBLIC_API_URL is not set")
  }
  return base
}

type ApiFetchOptions = {
  method?: string
  body?: unknown
  token?: string | null
  auth?: boolean
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  }
  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json"
  }
  const token = options.auth === false ? null : (options.token ?? getToken())
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(`${apiBaseUrl()}${path}`, {
    method: options.method ?? (options.body !== undefined ? "POST" : "GET"),
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  })

  if (res.status === 204) {
    return undefined as T
  }

  const text = await res.text()
  let data: unknown = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = null
    }
  }

  if (!res.ok) {
    const code =
      data && typeof data === "object" && "error" in data
        ? String((data as ApiErrorBody).error)
        : "internal"
    throw new ApiError(res.status, code)
  }

  return data as T
}
