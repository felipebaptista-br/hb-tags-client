"use client"

import { useEffect, useState } from "react"

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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { elderlyFields, visibilityCopy } from "@/lib/activate/elderly"

const displayName = elderlyFields.find((field) => field.key === "identity.display_name")
const ageRange = elderlyFields.find((field) => field.key === "identity.age_range")
const allergies = elderlyFields.find((field) => field.key === "health.allergies")
const contacts = elderlyFields.find((field) => field.key === "contacts")

const themeKey = "theme"

export function ActivateForm({ id }: { id: string }) {
  const [dark, setDark] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")
  const [guardianName, setGuardianName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [consent, setConsent] = useState(false)
  const [called, setCalled] = useState("")
  const [age, setAge] = useState("")
  const [allergy, setAllergy] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")

  useEffect(() => {
    const enabled = localStorage.getItem(themeKey) === "dark"
    setDark(enabled)
    document.documentElement.classList.toggle("dark", enabled)
  }, [])

  function setTheme(checked: boolean) {
    setDark(checked)
    document.documentElement.classList.toggle("dark", checked)
    localStorage.setItem(themeKey, checked ? "dark" : "light")
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const missing =
      !guardianName.trim() ||
      !email.includes("@") ||
      !phone.trim() ||
      !consent ||
      !called.trim() ||
      !age ||
      !allergy.trim() ||
      !contactName.trim() ||
      !contactPhone.trim()
    if (missing) {
      setError("Preencha os campos obrigatórios e marque o aceite.")
      return
    }
    setError("")
    setDone(true)
  }

  return (
    <>
      <header className="flex items-center justify-between p-6">
        <p>HB Tags</p>
        <Switch
          aria-label="Tema escuro"
          checked={dark}
          onCheckedChange={setTheme}
        />
      </header>
      <main className="flex justify-center p-6">
        <Card className="w-full max-w-md">
          {done ? (
            <>
              <CardHeader>
                <CardTitle>Pronto</CardTitle>
                <CardDescription>
                  A pulseira deste exemplo foi ativada. Nada foi enviado.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{called.trim()}</p>
                <p>Referência: {id}</p>
              </CardContent>
            </>
          ) : (
            <form onSubmit={submit}>
              <CardHeader>
                <CardTitle>Ativar pulseira</CardTitle>
                <CardDescription>Exemplo para idosos. Nada é enviado.</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                    {error ? <FieldError>{error}</FieldError> : null}
                    <Field>
                      <FieldLabel htmlFor="guardian-name">Nome</FieldLabel>
                      <Input
                        id="guardian-name"
                        value={guardianName}
                        autoComplete="name"
                        onChange={(event) => setGuardianName(event.target.value)}
                      />
                      <FieldDescription>Quem cuida dos dados.</FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="guardian-email">E-mail</FieldLabel>
                      <Input
                        id="guardian-email"
                        type="email"
                        value={email}
                        autoComplete="email"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="guardian-phone">Telefone</FieldLabel>
                      <Input
                        id="guardian-phone"
                        type="tel"
                        value={phone}
                        autoComplete="tel"
                        onChange={(event) => setPhone(event.target.value)}
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
                    <Field>
                      <FieldLabel htmlFor="called">{displayName?.label}</FieldLabel>
                      <Input
                        id="called"
                        value={called}
                        maxLength={displayName?.maxLength}
                        onChange={(event) => setCalled(event.target.value)}
                      />
                      <FieldDescription>
                        {displayName ? visibilityCopy[displayName.visibility] : null}
                        {displayName?.hint ? `. ${displayName.hint}` : null}
                      </FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="age">{ageRange?.label}</FieldLabel>
                      <Select
                        value={age}
                        items={Object.fromEntries(
                          (ageRange?.options ?? []).map((option) => [option.value, option.label])
                        )}
                        onValueChange={(value) => setAge(value ?? "")}
                      >
                        <SelectTrigger id="age" className="w-full">
                          <SelectValue placeholder="Escolha" />
                        </SelectTrigger>
                        <SelectContent>
                          {ageRange?.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldDescription>
                        {ageRange ? visibilityCopy[ageRange.visibility] : null}
                      </FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="allergy">{allergies?.label}</FieldLabel>
                      <Input
                        id="allergy"
                        value={allergy}
                        onChange={(event) => setAllergy(event.target.value)}
                      />
                      <FieldDescription>
                        {allergies ? visibilityCopy[allergies.visibility] : null}
                        {allergies?.hint ? `. ${allergies.hint}` : null}
                      </FieldDescription>
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="contact-name">{contacts?.label}</FieldLabel>
                      <Input
                        id="contact-name"
                        value={contactName}
                        placeholder="Nome"
                        onChange={(event) => setContactName(event.target.value)}
                      />
                      <Input
                        id="contact-phone"
                        type="tel"
                        value={contactPhone}
                        placeholder="Telefone"
                        onChange={(event) => setContactPhone(event.target.value)}
                      />
                      <FieldDescription>
                        {contacts ? visibilityCopy[contacts.visibility] : null}
                        {contacts?.hint ? `. ${contacts.hint}` : null}
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="mt-5">Ativar pulseira</Button>
              </CardFooter>
            </form>
          )}
        </Card>
      </main>
    </>
  )
}
