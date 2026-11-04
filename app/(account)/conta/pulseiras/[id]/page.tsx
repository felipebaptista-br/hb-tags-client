"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { AccountShell } from "@/components/account/account-shell"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
import { toast } from "@/components/ui/toast"
import { errorMessage } from "@/lib/api/errors"
import { getMyTag, patchMyTag, suspendMyTag } from "@/lib/api/tags"
import type { OwnerTag } from "@/lib/api/types"

export default function ContaPulseiraDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const router = useRouter()
  const [tag, setTag] = useState<OwnerTag | null>(null)
  const [displayName, setDisplayName] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  useEffect(() => {
    getMyTag(id)
      .then((row) => {
        setTag(row)
        setDisplayName(readDisplayName(row.profile) ?? "")
        const contact = readContact(row.profile)
        setContactName(contact.name)
        setContactPhone(contact.phone)
      })
      .catch((err) => {
        toast.add({
          type: "error",
          description: errorMessage(err),
          priority: "high",
        })
      })
  }, [id])

  async function save(event: React.FormEvent) {
    event.preventDefault()
    if (!tag || tag.status !== "ACTIVATED") return
    setPending(true)
    setError("")
    try {
      const profile = {
        ...(tag.profile ?? {}),
        identity: {
          ...((tag.profile?.identity as Record<string, unknown>) ?? {}),
          display_name: displayName.trim(),
        },
        contacts: [
          {
            name: contactName.trim(),
            phone: contactPhone.trim(),
          },
        ],
      }
      const updated = await patchMyTag(id, { profile_data: profile })
      setTag(updated)
      toast.add({
        type: "success",
        description: "Pulseira atualizada.",
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

  async function suspend() {
    setPending(true)
    try {
      await suspendMyTag(id)
      toast.add({
        type: "success",
        description: "Pulseira suspensa.",
        priority: "high",
      })
      router.push("/conta/pulseiras")
    } catch (err) {
      toast.add({
        type: "error",
        description: errorMessage(err),
        priority: "high",
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <AccountShell>
      <Card>
        <CardHeader>
          <CardTitle>{tag ? tag.id : "Pulseira"}</CardTitle>
          <CardDescription>
            {tag?.status}
            {tag?.category ? ` · ${tag.category.name}` : null}
          </CardDescription>
        </CardHeader>
        {tag?.status === "ACTIVATED" ? (
          <form onSubmit={save}>
            <CardContent>
              <FieldGroup>
                {error ? <FieldError>{error}</FieldError> : null}
                <Field>
                  <FieldLabel htmlFor="display-name">Como chamar</FieldLabel>
                  <Input
                    id="display-name"
                    value={displayName}
                    onChange={(event) => setDisplayName(event.target.value)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="contact-name">Contato</FieldLabel>
                  <Input
                    id="contact-name"
                    value={contactName}
                    placeholder="Nome"
                    onChange={(event) => setContactName(event.target.value)}
                  />
                  <Input
                    id="contact-phone"
                    value={contactPhone}
                    placeholder="Telefone"
                    onChange={(event) => setContactPhone(event.target.value)}
                  />
                </Field>
              </FieldGroup>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2">
              <Button type="submit" disabled={pending}>
                Salvar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger
                  render={<Button type="button" variant="destructive" disabled={pending} />}
                >
                  Suspender
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Suspender pulseira?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação é irreversível. A pulseira deixa de mostrar
                      informações públicas.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={suspend}>Confirmar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </form>
        ) : (
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Esta pulseira não pode ser editada no estado atual.
            </p>
          </CardContent>
        )}
      </Card>
    </AccountShell>
  )
}

function readDisplayName(profile?: Record<string, unknown>): string | null {
  if (!profile) return null
  const identity = profile.identity
  if (!identity || typeof identity !== "object") return null
  const name = (identity as Record<string, unknown>).display_name
  return typeof name === "string" ? name : null
}

function readContact(profile?: Record<string, unknown>): { name: string; phone: string } {
  const empty = { name: "", phone: "" }
  if (!profile || !Array.isArray(profile.contacts) || profile.contacts.length === 0) {
    return empty
  }
  const first = profile.contacts[0]
  if (!first || typeof first !== "object") return empty
  const row = first as Record<string, unknown>
  return {
    name: typeof row.name === "string" ? row.name : "",
    phone: typeof row.phone === "string" ? row.phone : "",
  }
}
