"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

import { AuthShell } from "@/components/auth/auth-shell"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { login } from "@/lib/api/auth"
import { errorMessage } from "@/lib/api/errors"
import { safeNext } from "@/lib/auth/next"
import { setToken } from "@/lib/auth/session"

export default function EntrarPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-zinc-950">
          <Spinner className="size-14 text-white" />
        </div>
      }
    >
      <EntrarForm />
    </Suspense>
  )
}

function EntrarForm() {
  const router = useRouter()
  const search = useSearchParams()
  const next = safeNext(search.get("next"))
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setError("")
    setPending(true)
    try {
      const result = await login({ email: email.trim(), password })
      setToken(result.token)
      router.push(next)
    } catch (err) {
      const message = errorMessage(err)
      setError(message)
      toast.add({ type: "error", description: message, priority: "high" })
    } finally {
      setPending(false)
    }
  }

  return (
    <AuthShell>
      <Card className="w-full max-w-md">
        <form onSubmit={submit}>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>Acesse a conta do responsável pela pulseira.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              {error ? <FieldError>{error}</FieldError> : null}
              <Field>
                <FieldLabel htmlFor="email">E-mail</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Senha</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Entrando…" : "Entrar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={
                <a
                  href={`/cadastrar?next=${encodeURIComponent(next)}`}
                />
              }
            >
              Criar conta
            </Button>
          </CardFooter>
        </form>
      </Card>
    </AuthShell>
  )
}
