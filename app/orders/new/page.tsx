import { OrderForm } from "@/components/order-form"
import { Header } from "@/components/header"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NewOrderPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-6 md:py-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 md:mb-6">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
          </Link>
          <OrderForm mode="create" />
        </div>
      </main>
    </div>
  )
}
