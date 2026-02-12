import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrderForm } from "@/components/order-form"
import type { Order } from "@/lib/types"

async function getOrder(id: string): Promise<Order | undefined> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const response = await fetch(`${baseUrl}/api/orders/${id}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return undefined
    }

    return response.json()
  } catch (error) {
    console.error("[v0] Error fetching order:", error)
    return undefined
  }
}

export default async function EditOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await getOrder(id)

  if (!order) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container mx-auto py-8">
          <Link href={`/orders/${id}`}>
            <Button variant="ghost" className="mb-4">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Order Details
            </Button>
          </Link>
          <OrderForm order={order} mode="edit" />
        </div>
      </main>
    </div>
  )
}
