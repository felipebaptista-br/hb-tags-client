import { ApiError } from "@/lib/api/types"

const messages: Record<string, string> = {
  unauthorized: "E-mail ou senha inválidos.",
  invalid_body: "Revise os campos e tente de novo.",
  invalid_code: "Código inválido ou expirado.",
  invalid_access_code: "Código de acesso da pulseira inválido.",
  email_taken: "Este e-mail já está cadastrado.",
  conflict: "Esta pulseira não pode ser alterada neste estado.",
  access_code_missing: "Esta pulseira ainda não tem código de acesso.",
  not_found: "Não encontrado.",
  rate_limited: "Muitas tentativas. Aguarde um momento.",
  internal: "Algo deu errado. Tente de novo.",
}

export function errorMessage(err: unknown): string {
  if (err instanceof ApiError) {
    return messages[err.code] ?? err.code
  }
  if (err instanceof Error) {
    return err.message
  }
  return messages.internal
}
