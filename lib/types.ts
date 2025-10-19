// Types for the Ordex application

export interface Order {
  id: string
  customerName: string
  orderDate: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled'
  totalAmount: number
  items: OrderItem[]
  shippingAddress: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productName: string
  quantity: number
  price: number
}

export interface CreateOrderInput {
  customerName: string
  orderDate: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled'
  totalAmount: number
  items: Omit<OrderItem, 'id'>[]
  shippingAddress: string
}

export interface UpdateOrderInput {
  customerName?: string
  orderDate?: string
  status?: 'pending' | 'completed' | 'cancelled'
  totalAmount?: number
  items?: Omit<OrderItem, 'id'>[]
  shippingAddress?: string
}
