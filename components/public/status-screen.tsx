import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type StatusScreenProps = {
  title: string
  description: string
  detail?: string
  primaryHref?: string
  primaryLabel?: string
}

export function StatusScreen({
  title,
  description,
  detail,
  primaryHref = "/",
  primaryLabel = "Ir para o início",
}: StatusScreenProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {detail ? (
          <CardContent>
            <p className="text-sm text-muted-foreground">{detail}</p>
          </CardContent>
        ) : null}
        <CardFooter>
          <Button
            className="w-full"
            nativeButton={false}
            render={<a href={primaryHref} />}
          >
            {primaryLabel}
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
