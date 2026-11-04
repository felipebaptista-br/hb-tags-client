"use client"

import { useEffect, useState } from "react"

import { AccountShell } from "@/components/account/account-shell"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "@/components/ui/toast"
import { errorMessage } from "@/lib/api/errors"
import { listMyTags } from "@/lib/api/tags"
import type { OwnerTag } from "@/lib/api/types"

export default function ContaPulseirasPage() {
  const [tags, setTags] = useState<OwnerTag[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listMyTags()
      .then((res) => setTags(res.tags))
      .catch((err) => {
        toast.add({
          type: "error",
          description: errorMessage(err),
          priority: "high",
        })
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <AccountShell>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Minhas pulseiras</h1>
          <p className="text-sm text-muted-foreground">
            Conta do responsável. Cada pulseira tem o perfil de quem usa.
          </p>
        </div>
      </div>
      {loading ? <p>Carregando…</p> : null}
      {!loading && tags.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Nenhuma pulseira</CardTitle>
            <CardDescription>
              Escaneie o QR de uma pulseira nova para ativá-la nesta conta.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}
      <div className="space-y-3">
        {tags.map((tag) => (
          <Card key={tag.id}>
            <CardHeader>
              <CardTitle className="text-base">
                {nestedName(tag.profile) || tag.id}
              </CardTitle>
              <CardDescription>
                {tag.status}
                {tag.category ? ` · ${tag.category.name}` : null}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button
                size="sm"
                nativeButton={false}
                render={<a href={`/conta/pulseiras/${tag.id}`} />}
              >
                Abrir
              </Button>
              {tag.status === "ACTIVATED" ? (
                <Button
                  size="sm"
                  variant="outline"
                  nativeButton={false}
                  render={<a href={`/${tag.id}/informations`} />}
                >
                  Ver público
                </Button>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </AccountShell>
  )
}

function nestedName(profile?: Record<string, unknown>): string | null {
  if (!profile) return null
  const identity = profile.identity
  if (!identity || typeof identity !== "object") return null
  const name = (identity as Record<string, unknown>).display_name
  return typeof name === "string" ? name : null
}
