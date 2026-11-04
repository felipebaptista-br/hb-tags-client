export type ResolveAction =
  | "activate"
  | "informations"
  | "suspended"
  | "lost"
  | "not_found"

export type ResolveResponse = {
  action: ResolveAction
}

export type Category = {
  id: string
  slug: string
  name: string
  fields_schema: unknown
}

export type CategoriesResponse = {
  categories: Category[]
}

export type PublicTag = {
  id: string
  category: { slug: string; name: string }
  profile: Record<string, unknown>
}

export type OwnerTag = {
  id: string
  status: string
  batch: string | null
  url: string
  category?: { slug: string; name: string }
  profile?: Record<string, unknown>
  activated_at?: string
}

export type ApiErrorBody = {
  error: string
}

export class ApiError extends Error {
  code: string
  status: number

  constructor(status: number, code: string) {
    super(code)
    this.status = status
    this.code = code
  }
}
