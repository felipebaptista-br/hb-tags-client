"use client"

import { REGEXP_ONLY_DIGITS } from "input-otp"
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { verifyEmail } from "@/lib/api/auth"
import { errorMessage } from "@/lib/api/errors"
import { safeNext } from "@/lib/auth/next"
import { setToken } from "@/lib/auth/session"

export default function VerificarEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-zinc-950">
          <Spinner className="size-14 text-white" />
        </div>
      }
    >
      <VerificarEmailForm />
    </Suspense>
  )
}

function VerificarEmailForm() {
  const router = useRouter()
  const search = useSearchParams()
  const email = (search.get("email") ?? "").trim().toLowerCase()
  const next = safeNext(search.get("next"))
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!email) {
      setError("Informe o e-mail pelo cadastro.")
      return
    }
    if (code.length !== 6) {
      setError("Digite o código de 6 dígitos.")
      return
    }
    setError("")
    setPending(true)
    try {
      const result = await verifyEmail({ email, code })
      setToken(result.token)
      toast.add({
        type: "success",
        description: "E-mail confirmado.",
        priority: "high",
      })
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
            <CardTitle>Confirmar e-mail</CardTitle>
            <CardDescription>
              Digite o código enviado para {email || "seu e-mail"}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              {error ? <FieldError>{error}</FieldError> : null}
              <Field className="w-fit">
                <FieldLabel htmlFor="code">Código</FieldLabel>
                <InputOTP
                  id="code"
                  maxLength={6}
                  value={code}
                  onChange={setCode}
                  pattern={REGEXP_ONLY_DIGITS}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Confirmando…" : "Confirmar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </AuthShell>
  )
}
