"use client"

import React from "react"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { toast } from "@/components/ui/toast"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  value: string
  onChange: (value: string) => void
  onConfirmed: () => void
}

export default function ActivateSecurityCodeModal({
  open,
  onOpenChange,
  value,
  onChange,
  onConfirmed,
}: Props): React.JSX.Element {
  const handleConfirm = () => {
    if (value.length !== 8) {
      toast.add({
        type: "error",
        description: "O código de acesso tem 8 caracteres.",
        priority: "high",
      })
      return
    }
    onConfirmed()
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Para ativar, informe o código de acesso da pulseira
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-5">
            <p>
              O código de 8 caracteres veio com a pulseira (impresso ou no lote do
              fornecedor). Não é a senha da sua conta.
            </p>
            <Field className="w-fit">
              <FieldLabel htmlFor="security-code">Código de acesso</FieldLabel>
              <InputOTP
                id="security-code"
                maxLength={8}
                value={value}
                onChange={(next) => onChange(next.toUpperCase())}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                inputMode="text"
                autoCapitalize="characters"
                autoComplete="one-time-code"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                  <InputOTPSlot index={6} />
                  <InputOTPSlot index={7} />
                </InputOTPGroup>
              </InputOTP>
            </Field>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleConfirm}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
