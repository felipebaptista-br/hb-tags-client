"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import ActivateSecurityCodeModal from "@/components/activate/activate-security-code-modal"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { toast } from "@/components/ui/toast"
import { elderlyFields, visibilityCopy } from "@/lib/activate/elderly"
import { buildProfileData } from "@/lib/activate/profile"
import { listCategories } from "@/lib/api/public"
import { activateTag } from "@/lib/api/tags"
import { errorMessage } from "@/lib/api/errors"
import type { Category } from "@/lib/api/types"
import { getToken } from "@/lib/auth/session"

const displayName = elderlyFields.find((field) => field.key === "identity.display_name")
const ageRange = elderlyFields.find((field) => field.key === "identity.age_range")
const allergies = elderlyFields.find((field) => field.key === "health.allergies")
const contacts = elderlyFields.find((field) => field.key === "contacts")

const themeKey = "theme"

export function ActivateForm({ id }: { id: string }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [codeOpen, setCodeOpen] = useState(true)
  const [accessCode, setAccessCode] = useState("")
  const [codeConfirmed, setCodeConfirmed] = useState(false)
  const [dark, setDark] = useState(false)
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [categorySlug, setCategorySlug] = useState("elderly")
  const [called, setCalled] = useState("")
  const [age, setAge] = useState("")
  const [allergy, setAllergy] = useState("")
  const [extraNote, setExtraNote] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")

  useEffect(() => {
    const enabled = localStorage.getItem(themeKey) === "dark"
    setDark(enabled)
    document.documentElement.classList.toggle("dark", enabled)
  }, [])

  useEffect(() => {
    if (!getToken()) {
      router.replace(`/entrar?next=${encodeURIComponent(`/${id}/activate`)}`)
      return
    }
    setReady(true)
    listCategories()
      .then((res) => {
        setCategories(res.categories)
        if (res.categories.length > 0) {
          const preferred =
            res.categories.find((c) => c.slug === "elderly") ?? res.categories[0]
          setCategorySlug(preferred.slug)
        }
      })
      .catch(() => {
        toast.add({
          type: "error",
          description: "Não foi possível carregar as categorias.",
          priority: "high",
        })
      })
  }, [id, router])

  function setTheme(checked: boolean) {
    setDark(checked)
    document.documentElement.classList.toggle("dark", checked)
    localStorage.setItem(themeKey, checked ? "dark" : "light")
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!codeConfirmed || accessCode.length !== 8) {
      setCodeOpen(true)
      setError("Confirme o código de acesso da pulseira.")
      return
    }
    const missing =
      !called.trim() ||
      !contactName.trim() ||
      !contactPhone.trim() ||
      (categorySlug === "elderly" && !age)
    if (missing) {
      setError("Preencha os campos obrigatórios do perfil de quem usa a pulseira.")
      return
    }
    setError("")
    setPending(true)
    try {
      await activateTag(id, {
        access_code: accessCode,
        category_slug: categorySlug,
        profile_data: buildProfileData({
          categorySlug,
          displayName: called,
          age,
          allergy,
          contactName,
          contactPhone,
          extraNote,
        }),
      })
      toast.add({
        type: "success",
        description: "Pulseira ativada.",
        priority: "high",
      })
      router.push("/conta/pulseiras")
    } catch (err) {
      const message = errorMessage(err)
      setError(message)
      toast.add({ type: "error", description: message, priority: "high" })
    } finally {
      setPending(false)
    }
  }

  if (!ready) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-zinc-950">
        <p className="text-white">Carregando…</p>
      </div>
    )
  }

  return (
    <>
      <ActivateSecurityCodeModal
        open={false}
        onOpenChange={setCodeOpen}
        value={accessCode}
        onChange={setAccessCode}
        onConfirmed={() => {
          setCodeConfirmed(true)
          setCodeOpen(false)
        }}
      />
      <header className="flex items-center justify-between p-6">
        <p>HB Tags</p>
        <Switch aria-label="Tema escuro" checked={dark} onCheckedChange={setTheme} />
      </header>
      <main className="flex justify-center p-6">
        <Card className="w-full max-w-md">
          <form onSubmit={submit}>
            <CardHeader>
              <CardTitle>Ativar pulseira</CardTitle>
              <CardDescription>
                Dados de quem usa a pulseira. Sua conta já está autenticada.
                {codeConfirmed ? ` Código informado: ${accessCode}` : null}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                {error ? <FieldError>{error}</FieldError> : null}
                <Field>
                  <FieldLabel htmlFor="category">Categoria</FieldLabel>
                  <Select
                    value={categorySlug}
                    items={Object.fromEntries(categories.map((c) => [c.slug, c.name]))}
                    onValueChange={(value) => setCategorySlug(value ?? categorySlug)}
                  >
                    <SelectTrigger id="category" className="w-full">
                      <SelectValue placeholder="Escolha" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="called">
                    {displayName?.label ?? "Como chamar"}
                  </FieldLabel>
                  <Input
                    id="called"
                    value={called}
                    maxLength={displayName?.maxLength}
                    onChange={(event) => setCalled(event.target.value)}
                  />
                  <FieldDescription>
                    {displayName ? visibilityCopy[displayName.visibility] : null}
                  </FieldDescription>
                </Field>
                {categorySlug === "elderly" ? (
                  <>
                    <Field>
                      <FieldLabel htmlFor="age">{ageRange?.label}</FieldLabel>
                      <Select
                        value={age}
                        items={Object.fromEntries(
                          (ageRange?.options ?? []).map((option) => [
                            option.value,
                            option.label,
                          ])
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
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="allergy">{allergies?.label}</FieldLabel>
                      <Input
                        id="allergy"
                        value={allergy}
                        onChange={(event) => setAllergy(event.target.value)}
                      />
                    </Field>
                  </>
                ) : (
                  <Field>
                    <FieldLabel htmlFor="extra">
                      {categorySlug === "pet" ? "Observações" : "Como ajudar"}
                    </FieldLabel>
                    <Input
                      id="extra"
                      value={extraNote}
                      onChange={(event) => setExtraNote(event.target.value)}
                    />
                  </Field>
                )}
                <Field>
                  <FieldLabel htmlFor="contact-name">
                    {contacts?.label ?? "Contato"}
                  </FieldLabel>
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
                    placeholder="Telefone (+55…)"
                    onChange={(event) => setContactPhone(event.target.value)}
                  />
                </Field>
                {!codeConfirmed ? (
                  <Button type="button" variant="outline" onClick={() => setCodeOpen(true)}>
                    Informar código de acesso
                  </Button>
                ) : null}
              </FieldGroup>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="mt-5 w-full" disabled={pending}>
                {pending ? "Ativando…" : "Ativar pulseira"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </>
  )
}
