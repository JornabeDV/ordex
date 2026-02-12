import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/orders/route'
import { GET as GET_ORDER, PUT, DELETE } from '@/app/api/orders/[id]/route'
import { db } from '@/lib/db'

// Mock the database
jest.mock('@/lib/db', () => ({
  db: {
    getOrders: jest.fn(),
    getOrderById: jest.fn(),
    createOrder: jest.fn(),
    updateOrder: jest.fn(),
    deleteOrder: jest.fn(),
  },
}))

// Mock NextRequest and NextResponse
jest.mock('next/server', () => ({
  NextRequest: jest.fn().mockImplementation((url, options = {}) => ({
    url,
    method: options.method || 'GET',
    headers: new Map(Object.entries(options.headers || {})),
    body: options.body,
    nextUrl: {
      searchParams: new URLSearchParams(url.split('?')[1] || '')
    },
    json: jest.fn().mockResolvedValue(JSON.parse(options.body || '{}'))
  })),
  NextResponse: {
    json: jest.fn((data, options = {}) => ({
      json: () => Promise.resolve(data),
      status: options.status || 200,
      statusText: options.statusText || 'OK'
    }))
  }
}))

describe('/api/orders', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/orders', () => {
    it('should return orders with pagination', async () => {
      const mockOrders = {
        data: [
          {
            id: '1',
            customerName: 'John Doe',
            orderDate: '2024-01-15',
            status: 'pending',
            totalAmount: 299.99,
            items: [],
            shippingAddress: '123 Main St',
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-01-15T10:00:00Z',
          },
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      }

      ;(db.getOrders as jest.Mock).mockResolvedValue(mockOrders)

      const request = new NextRequest('http://localhost:3000/api/orders?page=1&limit=10')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockOrders)
      expect(db.getOrders).toHaveBeenCalledWith(1, 10, undefined, undefined)
    })

    it('should handle errors', async () => {
      ;(db.getOrders as jest.Mock).mockRejectedValue(new Error('Database error'))

      const request = new NextRequest('http://localhost:3000/api/orders')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Internal server error')
    })
  })

  describe('POST /api/orders', () => {
    it('should create a new order', async () => {
      const newOrder = {
        id: '1',
        customerName: 'Jane Smith',
        orderDate: '2024-01-15',
        status: 'pending',
        totalAmount: 199.99,
        items: [{ productName: 'Test Product', quantity: 1, price: 199.99 }],
        shippingAddress: '456 Test St',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
      }

      ;(db.createOrder as jest.Mock).mockResolvedValue(newOrder)

      const requestBody = {
        customerName: 'Jane Smith',
        orderDate: '2024-01-15',
        status: 'pending',
        totalAmount: 199.99,
        items: [{ productName: 'Test Product', quantity: 1, price: 199.99 }],
        shippingAddress: '456 Test St',
      }

      const request = new NextRequest('http://localhost:3000/api/orders', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data).toEqual(newOrder)
      expect(db.createOrder).toHaveBeenCalledWith(requestBody)
    })

    it('should validate required fields', async () => {
      const requestBody = {
        customerName: '',
        orderDate: '2024-01-15',
        status: 'pending',
        totalAmount: 199.99,
        items: [],
        shippingAddress: '456 Test St',
      }

      const request = new NextRequest('http://localhost:3000/api/orders', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing required field: customerName')
    })
  })
})

describe('/api/orders/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/orders/[id]', () => {
    it('should return a single order', async () => {
      const mockOrder = {
        id: '1',
        customerName: 'John Doe',
        orderDate: '2024-01-15',
        status: 'pending',
        totalAmount: 299.99,
        items: [],
        shippingAddress: '123 Main St',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
      }

      ;(db.getOrderById as jest.Mock).mockResolvedValue(mockOrder)

      const request = new NextRequest('http://localhost:3000/api/orders/1')
      const response = await GET_ORDER(request, { params: Promise.resolve({ id: '1' }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockOrder)
      expect(db.getOrderById).toHaveBeenCalledWith('1')
    })

    it('should return 404 for non-existent order', async () => {
      ;(db.getOrderById as jest.Mock).mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/orders/999')
      const response = await GET_ORDER(request, { params: Promise.resolve({ id: '999' }) })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toBe('Order not found')
    })
  })

  describe('PUT /api/orders/[id]', () => {
    it('should update an order', async () => {
      const updatedOrder = {
        id: '1',
        customerName: 'John Doe Updated',
        orderDate: '2024-01-15',
        status: 'processing',
        totalAmount: 299.99,
        items: [],
        shippingAddress: '123 Main St',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
      }

      ;(db.updateOrder as jest.Mock).mockResolvedValue(updatedOrder)

      const requestBody = {
        customerName: 'John Doe Updated',
        status: 'processing',
      }

      const request = new NextRequest('http://localhost:3000/api/orders/1', {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      })

      const response = await PUT(request, { params: Promise.resolve({ id: '1' }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(updatedOrder)
      expect(db.updateOrder).toHaveBeenCalledWith('1', requestBody)
    })
  })

  describe('DELETE /api/orders/[id]', () => {
    it('should delete an order', async () => {
      ;(db.deleteOrder as jest.Mock).mockResolvedValue(true)

      const request = new NextRequest('http://localhost:3000/api/orders/1', {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: Promise.resolve({ id: '1' }) })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.message).toBe('Order deleted successfully')
      expect(db.deleteOrder).toHaveBeenCalledWith('1')
    })

    it('should return 404 for non-existent order', async () => {
      ;(db.deleteOrder as jest.Mock).mockResolvedValue(false)

      const request = new NextRequest('http://localhost:3000/api/orders/999', {
        method: 'DELETE',
      })

      const response = await DELETE(request, { params: Promise.resolve({ id: '999' }) })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toBe('Order not found')
    })
  })
})
