import { apiFetch } from "@/lib/api/client"

export function register(body: {
  name: string
  email: string
  password: string
  consent: boolean
  phone?: string
}): Promise<{ id: string; email: string }> {
  return apiFetch("/api/auth/register", { body, auth: false })
}

export function verifyEmail(body: { email: string; code: string }): Promise<{ token: string }> {
  return apiFetch("/api/auth/verify-email", { body, auth: false })
}

export function login(body: { email: string; password: string }): Promise<{ token: string }> {
  return apiFetch("/api/auth/login", { body, auth: false })
}

export function requestPasswordChange(): Promise<void> {
  return apiFetch("/api/auth/password/change-request", { method: "POST" })
}

export function changePassword(body: {
  code: string
  current_password: string
  new_password: string
}): Promise<void> {
  return apiFetch("/api/auth/password/change", { body })
}
