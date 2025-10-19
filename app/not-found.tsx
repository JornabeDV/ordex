import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>404 - Not Found</CardTitle>
          <CardDescription>The page or resource you are looking for does not exist.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}
