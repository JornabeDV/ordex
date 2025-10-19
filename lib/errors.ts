import { NextRequest, NextResponse } from 'next/server'

export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400)
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404)
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409)
  }
}

export function handleApiError(error: unknown): NextResponse {
  console.error('[API Error]:', error)

  if (error instanceof AppError) {
    return NextResponse.json(
      { 
        error: error.message,
        statusCode: error.statusCode,
        timestamp: new Date().toISOString()
      },
      { status: error.statusCode }
    )
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { 
      error: 'Unknown error occurred',
      timestamp: new Date().toISOString()
    },
    { status: 500 }
  )
}

export function validateOrderInput(data: any): void {
  const requiredFields = ['customerName', 'orderDate', 'status', 'shippingAddress']
  
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new ValidationError(`Missing required field: ${field}`)
    }
  }

  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    throw new ValidationError('Order must have at least one item')
  }

  for (const item of data.items) {
    if (!item.productName || !item.quantity || !item.price) {
      throw new ValidationError('Each item must have productName, quantity, and price')
    }
    
    if (item.quantity <= 0) {
      throw new ValidationError('Item quantity must be greater than 0')
    }
    
    if (item.price < 0) {
      throw new ValidationError('Item price cannot be negative')
    }
  }

  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
  if (!validStatuses.includes(data.status)) {
    throw new ValidationError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`)
  }
}
