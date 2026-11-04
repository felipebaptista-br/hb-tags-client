import React, { Suspense } from "react"

import { StatusScreen } from "@/components/public/status-screen"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getPublicTag } from "@/lib/api/public"
import { ApiError } from "@/lib/api/types"
import Loading from "./loading"

interface InformationsParams {
  params: Promise<{
    id: string
  }>
}

export default function Informations({ params }: InformationsParams): React.JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <InformationsContent params={params} />
    </Suspense>
  )
}

async function InformationsContent({ params }: InformationsParams): Promise<React.JSX.Element> {
  const { id } = await params
  try {
    const tag = await getPublicTag(id)
    const displayName = nestedString(tag.profile, ["identity", "display_name"])
    const contacts = Array.isArray(tag.profile.contacts) ? tag.profile.contacts : []
    const firstContact = contacts[0] as { name?: string; phone?: string } | undefined
    const phone = typeof firstContact?.phone === "string" ? firstContact.phone : null

    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{displayName || "Pulseira HB Tags"}</CardTitle>
            <CardDescription>
              {tag.category.name}. Informações públicas para quem pode ajudar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {firstContact?.name ? <p>Contato: {firstContact.name}</p> : null}
            {phone ? <p>Telefone: {phone}</p> : null}
            {!displayName && !phone ? (
              <p className="text-muted-foreground">Sem detalhes públicos cadastrados.</p>
            ) : null}
            <p className="text-muted-foreground">ID: {tag.id}</p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            {phone ? (
              <Button className="w-full" nativeButton={false} render={<a href={`tel:${phone}`} />}>
                Ligar agora
              </Button>
            ) : null}
            <Button
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={<a href="/" />}
            >
              Início
            </Button>
          </CardFooter>
        </Card>
      </main>
    )
  } catch (err) {
    if (err instanceof ApiError && err.code === "not_found") {
      return (
        <StatusScreen
          title="Informações indisponíveis"
          description="Esta pulseira não está ativa ou não existe."
          detail={`Referência: ${id}`}
        />
      )
    }
    return (
      <StatusScreen
        title="Não foi possível carregar"
        description="Tente de novo em instantes."
        detail={`Referência: ${id}`}
      />
    )
  }
}

function nestedString(obj: Record<string, unknown>, path: string[]): string | null {
  let current: unknown = obj
  for (const key of path) {
    if (!current || typeof current !== "object") return null
    current = (current as Record<string, unknown>)[key]
  }
  return typeof current === "string" ? current : null
}
