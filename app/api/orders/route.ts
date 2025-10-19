import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import type { CreateOrderInput } from "@/lib/types"
import { handleApiError, validateOrderInput } from "@/lib/errors"

// GET /api/orders - List orders with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status") || undefined
    const search = searchParams.get("search") || undefined

    // Validate pagination parameters
    if (page < 1) {
      return NextResponse.json({ error: "Page must be greater than 0" }, { status: 400 })
    }
    if (limit < 1 || limit > 100) {
      return NextResponse.json({ error: "Limit must be between 1 and 100" }, { status: 400 })
    }

    const result = await db.getOrders(page, limit, status, search)

    return NextResponse.json(result)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderInput = await request.json()

    // Validate input
    validateOrderInput(body)

    const order = await db.createOrder(body)

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    return handleApiError(error)
  }
}
