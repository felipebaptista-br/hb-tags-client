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
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { register } from "@/lib/api/auth"
import { errorMessage } from "@/lib/api/errors"
import { safeNext } from "@/lib/auth/next"

export default function CadastrarPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-zinc-950">
          <Spinner className="size-14 text-white" />
        </div>
      }
    >
      <CadastrarForm />
    </Suspense>
  )
}

function CadastrarForm() {
  const router = useRouter()
  const search = useSearchParams()
  const next = safeNext(search.get("next"))
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!consent) {
      setError("Marque o aceite para continuar.")
      return
    }
    setError("")
    setPending(true)
    try {
      const body: {
        name: string
        email: string
        password: string
        consent: boolean
        phone?: string
      } = {
        name: name.trim(),
        email: email.trim(),
        password,
        consent: true,
      }
      const phoneTrim = phone.trim()
      if (phoneTrim) body.phone = phoneTrim
      await register(body)
      toast.add({
        type: "success",
        description: "Conta criada. Confirme o código enviado ao e-mail.",
        priority: "high",
      })
      const q = new URLSearchParams({
        email: email.trim().toLowerCase(),
        next,
      })
      router.push(`/verificar-email?${q.toString()}`)
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
            <CardTitle>Criar conta</CardTitle>
            <CardDescription>
              Cadastro do responsável. Quem usa a pulseira é informado na ativação.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              {error ? <FieldError>{error}</FieldError> : null}
              <Field>
                <FieldLabel htmlFor="name">Nome</FieldLabel>
                <Input
                  id="name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </Field>
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
                <FieldLabel htmlFor="phone">Telefone (opcional)</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+5511999999999"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Senha</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  minLength={8}
                  required
                />
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="consent"
                  checked={consent}
                  onCheckedChange={(checked) => setConsent(checked === true)}
                />
                <FieldLabel htmlFor="consent">
                  Aceito os termos e a política de privacidade.
                </FieldLabel>
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Cadastrando…" : "Cadastrar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={<a href={`/entrar?next=${encodeURIComponent(next)}`} />}
            >
              Já tenho conta
            </Button>
          </CardFooter>
        </form>
      </Card>
    </AuthShell>
  )
}
