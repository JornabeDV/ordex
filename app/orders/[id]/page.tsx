import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import Link from "next/link"
import { ChevronLeft, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DeleteOrderButton } from "@/components/delete-order-button"
import type { Order, OrderStatus } from "@/lib/types"

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

async function getOrder(id: string): Promise<Order | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const response = await fetch(`${baseUrl}/api/orders/${id}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      return null
    }

    return response.json()
  } catch (error) {
    console.error("[v0] Error fetching order:", error)
    return null
  }
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await getOrder(id)

  if (!order) {
    notFound()
  }

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

        <div className="space-y-4 md:space-y-6">
          <Card>
            <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
              <div>
                <CardTitle className="text-lg md:text-xl">Order #{order.id}</CardTitle>
                <CardDescription className="text-sm md:text-base">Created on {new Date(order.createdAt).toLocaleString()}</CardDescription>
              </div>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:gap-2">
                <Link href={`/orders/${order.id}/edit`} className="w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </Link>
                <div className="w-full sm:w-auto">
                  <DeleteOrderButton orderId={order.id} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-xs font-medium text-muted-foreground md:text-sm">Customer Name</h3>
                  <p className="text-base md:text-lg">{order.customerName}</p>
                </div>

                <div>
                  <h3 className="mb-2 text-xs font-medium text-muted-foreground md:text-sm">Order Date</h3>
                  <p className="text-base md:text-lg">{new Date(order.orderDate).toLocaleDateString()}</p>
                </div>

                <div>
                  <h3 className="mb-2 text-xs font-medium text-muted-foreground md:text-sm">Status</h3>
                  <Badge variant="secondary" className={statusColors[order.status]}>
                    {order.status}
                  </Badge>
                </div>

                <div>
                  <h3 className="mb-2 text-xs font-medium text-muted-foreground md:text-sm">Total Amount</h3>
                  <p className="text-base md:text-lg font-semibold">${order.totalAmount.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-medium text-muted-foreground md:text-sm">Shipping Address</h3>
                <p className="text-base md:text-lg">{order.shippingAddress}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs md:text-sm">Product</TableHead>
                      <TableHead className="text-right text-xs md:text-sm">Quantity</TableHead>
                      <TableHead className="text-right text-xs md:text-sm">Price</TableHead>
                      <TableHead className="text-right text-xs md:text-sm">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium text-sm md:text-base">{item.productName}</TableCell>
                        <TableCell className="text-right text-sm md:text-base">{item.quantity}</TableCell>
                        <TableCell className="text-right text-sm md:text-base">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right text-sm md:text-base">${(item.quantity * item.price).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-semibold text-sm md:text-base">
                        Total
                      </TableCell>
                      <TableCell className="text-right font-semibold text-sm md:text-base">${order.totalAmount.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </main>
    </div>
  )
}
