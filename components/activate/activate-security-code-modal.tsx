"use client"
import React from "react"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
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
import { Field, FieldLabel } from "../ui/field"
import { toast } from "@/components/ui/toast"

export default function ActivateSecurityCodeModal(): React.JSX.Element {
  const [showModal, setShowModal] = React.useState<boolean>(true)
  const [securityCode, setSecurityCode] = React.useState<string>("")
  // => Código estático de segurança temporário
  const code: string = "FXRYEI"

  React.useEffect(() => {
    setShowModal(true)
  }, [])

  const handleConfirm = () => {
    if (securityCode === code) {
      setShowModal(false)
    } else {
      toast.add({
        type: "error",
        description: "Código de segurança inválido",
        priority: "high",
      })
      setSecurityCode("")
    }
  }

  return (
    <AlertDialog open={showModal} onOpenChange={setShowModal}>
      <AlertDialogTrigger />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Para realizar ativação, você precisa inserir o código de segurança
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-5">
            <p>
              O código de segurança pode ser encontrado no seu email de ativação.
            </p>
            <Field className="w-fit">
              <FieldLabel htmlFor="security-code">
                Digite o código de segurança
              </FieldLabel>
              <InputOTP
                id="security-code"
                maxLength={6}
                value={securityCode}
                onChange={(value) => setSecurityCode(value.toUpperCase())}
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
                </InputOTPGroup>
              </InputOTP>
            </Field>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleConfirm}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}