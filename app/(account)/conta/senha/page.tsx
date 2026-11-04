"use client"

import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useState } from "react"

import { AccountShell } from "@/components/account/account-shell"
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { toast } from "@/components/ui/toast"
import { changePassword, requestPasswordChange } from "@/lib/api/auth"
import { errorMessage } from "@/lib/api/errors"

export default function ContaSenhaPage() {
  const [code, setCode] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)
  const [requested, setRequested] = useState(false)

  async function requestCode() {
    setPending(true)
    setError("")
    try {
      await requestPasswordChange()
      setRequested(true)
      toast.add({
        type: "success",
        description: "Código enviado ao seu e-mail.",
        priority: "high",
      })
    } catch (err) {
      const message = errorMessage(err)
      setError(message)
      toast.add({ type: "error", description: message, priority: "high" })
    } finally {
      setPending(false)
    }
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (code.length !== 6) {
      setError("Digite o código de 6 dígitos.")
      return
    }
    setPending(true)
    setError("")
    try {
      await changePassword({
        code,
        current_password: currentPassword,
        new_password: newPassword,
      })
      toast.add({
        type: "success",
        description: "Senha alterada.",
        priority: "high",
      })
      setCode("")
      setCurrentPassword("")
      setNewPassword("")
      setRequested(false)
    } catch (err) {
      const message = errorMessage(err)
      setError(message)
      toast.add({ type: "error", description: message, priority: "high" })
    } finally {
      setPending(false)
    }
  }

  return (
    <AccountShell>
      <Card>
        <form onSubmit={submit}>
          <CardHeader>
            <CardTitle>Alterar senha</CardTitle>
            <CardDescription>
              Enviamos um código por e-mail. Informe também a senha atual.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              {error ? <FieldError>{error}</FieldError> : null}
              <Button type="button" variant="outline" onClick={requestCode} disabled={pending}>
                {requested ? "Reenviar código" : "Enviar código"}
              </Button>
              <Field className="w-fit">
                <FieldLabel htmlFor="code">Código</FieldLabel>
                <InputOTP
                  id="code"
                  maxLength={6}
                  value={code}
                  onChange={setCode}
                  pattern={REGEXP_ONLY_DIGITS}
                  inputMode="numeric"
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
              <Field>
                <FieldLabel htmlFor="current">Senha atual</FieldLabel>
                <Input
                  id="current"
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="next">Nova senha</FieldLabel>
                <Input
                  id="next"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  minLength={8}
                  required
                />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={pending}>
              Salvar senha
            </Button>
          </CardFooter>
        </form>
      </Card>
    </AccountShell>
  )
}
