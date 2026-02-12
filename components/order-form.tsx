"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import type { Order, OrderStatus, CreateOrderInput } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface OrderFormProps {
  order?: Order
  mode: "create" | "edit"
}

interface OrderItemInput {
  productName: string
  quantity: number
  price: number
}

export function OrderForm({ order, mode }: OrderFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [customerName, setCustomerName] = useState(order?.customerName || "")
  const [orderDate, setOrderDate] = useState(order?.orderDate || new Date().toISOString().split("T")[0])
  const [status, setStatus] = useState<OrderStatus>(order?.status || "pending")
  const [shippingAddress, setShippingAddress] = useState(order?.shippingAddress || "")
  const [items, setItems] = useState<OrderItemInput[]>(
    order?.items.map((item) => ({ productName: item.productName, quantity: item.quantity, price: item.price })) || [
      { productName: "", quantity: 1, price: 0 },
    ],
  )

  const addItem = () => {
    setItems([...items, { productName: "", quantity: 1, price: 0 }])
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const updateItem = (index: number, field: keyof OrderItemInput, value: string | number) => {
    const newItems = [...items]
    // Asegurar que los valores numéricos no sean NaN
    if (field === "quantity" || field === "price") {
      const numValue = typeof value === "string" ? Number.parseFloat(value) : value
      const finalValue = isNaN(numValue) ? (field === "quantity" ? 1 : 0) : numValue
      newItems[index] = { ...newItems[index], [field]: finalValue }
    } else {
      newItems[index] = { ...newItems[index], [field]: value as string }
    }
    setItems(newItems)
  }

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const totalAmount = calculateTotal()
      const payload: CreateOrderInput = {
        customerName,
        orderDate,
        status,
        totalAmount,
        items,
        shippingAddress,
      }

      const url = mode === "create" ? "/api/orders" : `/api/orders/${order?.id}`
      const method = mode === "create" ? "POST" : "PUT"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to save order")
      }

      toast({
        title: mode === "create" ? "Order created" : "Order updated",
        description:
          mode === "create" ? "The order has been created successfully." : "The order has been updated successfully.",
      })

      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("[v0] Error saving order:", error)
      toast({
        title: "Error",
        description: "Failed to save order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{mode === "create" ? "Create New Order" : "Edit Order"}</CardTitle>
          <CardDescription>
            {mode === "create" ? "Add a new order to the system" : "Update order details"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6">
          <div className="grid gap-4 md:gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderDate">Order Date</Label>
              <Input
                id="orderDate"
                type="date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as OrderStatus)}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shippingAddress">Shipping Address</Label>
            <Textarea
              id="shippingAddress"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              required
              placeholder="123 Main St, City, State ZIP"
              rows={3}
            />
          </div>

          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <Label className="text-sm md:text-base">Order Items</Label>
              <Button type="button" variant="outline" size="sm" onClick={addItem} className="w-full sm:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>

            {items.map((item, index) => (
              <Card key={index}>
                <CardContent className="pt-4 md:pt-6">
                  <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_auto]">
                    <div className="space-y-2">
                      <Label htmlFor={`product-${index}`}>Product Name</Label>
                      <Input
                        id={`product-${index}`}
                        value={item.productName}
                        onChange={(e) => updateItem(index, "productName", e.target.value)}
                        required
                        placeholder="Product name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        min="1"
                        value={item.quantity || ""}
                        onChange={(e) => updateItem(index, "quantity", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`price-${index}`}>Price</Label>
                      <Input
                        id={`price-${index}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.price || ""}
                        onChange={(e) => updateItem(index, "price", e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex items-end sm:col-span-3 md:col-span-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(index)}
                        disabled={items.length === 1}
                        className="hover:bg-red-50 hover:text-red-600 disabled:hover:bg-transparent disabled:hover:text-muted-foreground w-full sm:w-auto"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="ml-2 sm:hidden">Remove Item</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-center md:justify-end">
              <div className="text-base md:text-lg font-semibold">Total: ${calculateTotal().toFixed(2)}</div>
            </div>
          </div>

          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:gap-4">
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Saving..." : mode === "create" ? "Create Order" : "Update Order"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/")} className="w-full sm:w-auto">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
