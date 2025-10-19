import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import type { UpdateOrderInput } from "@/lib/types"
import { handleApiError, NotFoundError, validateOrderInput } from "@/lib/errors"

// GET /api/orders/:id - Get single order
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const order = await db.getOrderById(id)

    if (!order) {
      throw new NotFoundError('Order')
    }

    return NextResponse.json(order)
  } catch (error) {
    return handleApiError(error)
  }
}

// PUT /api/orders/:id - Update order
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body: UpdateOrderInput = await request.json()

    // Validate input if provided
    if (body.items) {
      validateOrderInput({ ...body, customerName: body.customerName || 'temp', orderDate: body.orderDate || '2024-01-01', status: body.status || 'pending', shippingAddress: body.shippingAddress || 'temp' })
    }

    const order = await db.updateOrder(id, body)

    if (!order) {
      throw new NotFoundError('Order')
    }

    return NextResponse.json(order)
  } catch (error) {
    return handleApiError(error)
  }
}

// DELETE /api/orders/:id - Delete order
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const success = await db.deleteOrder(id)

    if (!success) {
      throw new NotFoundError('Order')
    }

    return NextResponse.json({ message: "Order deleted successfully" })
  } catch (error) {
    return handleApiError(error)
  }
}
