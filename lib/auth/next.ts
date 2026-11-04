export function safeNext(value: string | null | undefined, fallback = "/conta/pulseiras"): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return fallback
  }
  return value
}
