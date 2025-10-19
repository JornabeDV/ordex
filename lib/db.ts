import type { Order, CreateOrderInput, UpdateOrderInput } from "./types"

// In-memory database simulation
const orders: Order[] = [
  {
    id: "1",
    customerName: "John Doe",
    orderDate: "2024-01-15",
    status: "delivered",
    totalAmount: 299.99,
    items: [
      { id: "1-1", productName: "Wireless Headphones", quantity: 1, price: 149.99 },
      { id: "1-2", productName: "Phone Case", quantity: 2, price: 75.0 },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
    createdAt: new Date("2024-01-15T10:00:00Z").toISOString(),
    updatedAt: new Date("2024-01-20T14:30:00Z").toISOString(),
  },
  {
    id: "2",
    customerName: "Jane Smith",
    orderDate: "2024-01-18",
    status: "shipped",
    totalAmount: 599.99,
    items: [
      { id: "2-1", productName: "Laptop Stand", quantity: 1, price: 89.99 },
      { id: "2-2", productName: "Mechanical Keyboard", quantity: 1, price: 159.99 },
      { id: "2-3", productName: "USB-C Hub", quantity: 1, price: 350.01 },
    ],
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    createdAt: new Date("2024-01-18T09:15:00Z").toISOString(),
    updatedAt: new Date("2024-01-19T11:20:00Z").toISOString(),
  },
  {
    id: "3",
    customerName: "Bob Johnson",
    orderDate: "2024-01-20",
    status: "processing",
    totalAmount: 1299.99,
    items: [
      { id: "3-1", productName: "4K Monitor", quantity: 1, price: 799.99 },
      { id: "3-2", productName: "Webcam", quantity: 1, price: 129.99 },
      { id: "3-3", productName: "Desk Lamp", quantity: 2, price: 185.01 },
    ],
    shippingAddress: "789 Pine Rd, Chicago, IL 60601",
    createdAt: new Date("2024-01-20T13:45:00Z").toISOString(),
    updatedAt: new Date("2024-01-20T13:45:00Z").toISOString(),
  },
  {
    id: "4",
    customerName: "Alice Williams",
    orderDate: "2024-01-22",
    status: "pending",
    totalAmount: 449.99,
    items: [
      { id: "4-1", productName: "Wireless Mouse", quantity: 2, price: 79.98 },
      { id: "4-2", productName: "Mouse Pad", quantity: 2, price: 40.0 },
      { id: "4-3", productName: "Cable Organizer", quantity: 1, price: 330.01 },
    ],
    shippingAddress: "321 Elm St, Houston, TX 77001",
    createdAt: new Date("2024-01-22T16:20:00Z").toISOString(),
    updatedAt: new Date("2024-01-22T16:20:00Z").toISOString(),
  },
  {
    id: "5",
    customerName: "Charlie Brown",
    orderDate: "2024-01-23",
    status: "cancelled",
    totalAmount: 199.99,
    items: [{ id: "5-1", productName: "Bluetooth Speaker", quantity: 1, price: 199.99 }],
    shippingAddress: "654 Maple Dr, Phoenix, AZ 85001",
    createdAt: new Date("2024-01-23T08:30:00Z").toISOString(),
    updatedAt: new Date("2024-01-24T10:00:00Z").toISOString(),
  },
  {
    id: "6",
    customerName: "Maria Garcia",
    orderDate: "2024-01-25",
    status: "pending",
    totalAmount: 89.99,
    items: [
      { id: "6-1", productName: "Wireless Earbuds", quantity: 1, price: 89.99 },
    ],
    shippingAddress: "987 Cedar Ave, Miami, FL 33101",
    createdAt: new Date("2024-01-25T11:15:00Z").toISOString(),
    updatedAt: new Date("2024-01-25T11:15:00Z").toISOString(),
  },
  {
    id: "7",
    customerName: "David Lee",
    orderDate: "2024-01-26",
    status: "processing",
    totalAmount: 459.98,
    items: [
      { id: "7-1", productName: "Gaming Mouse", quantity: 1, price: 79.99 },
      { id: "7-2", productName: "RGB Keyboard", quantity: 1, price: 129.99 },
      { id: "7-3", productName: "Mouse Pad", quantity: 2, price: 125.0 },
    ],
    shippingAddress: "456 Pine St, Seattle, WA 98101",
    createdAt: new Date("2024-01-26T14:20:00Z").toISOString(),
    updatedAt: new Date("2024-01-26T16:45:00Z").toISOString(),
  },
  {
    id: "8",
    customerName: "Sarah Johnson",
    orderDate: "2024-01-27",
    status: "shipped",
    totalAmount: 299.99,
    items: [
      { id: "8-1", productName: "Smart Watch", quantity: 1, price: 299.99 },
    ],
    shippingAddress: "789 Oak Blvd, Denver, CO 80201",
    createdAt: new Date("2024-01-27T09:30:00Z").toISOString(),
    updatedAt: new Date("2024-01-28T12:00:00Z").toISOString(),
  },
  {
    id: "9",
    customerName: "Michael Brown",
    orderDate: "2024-01-28",
    status: "delivered",
    totalAmount: 799.99,
    items: [
      { id: "9-1", productName: "Tablet", quantity: 1, price: 499.99 },
      { id: "9-2", productName: "Tablet Case", quantity: 1, price: 49.99 },
      { id: "9-3", productName: "Screen Protector", quantity: 2, price: 125.01 },
    ],
    shippingAddress: "321 Elm St, Boston, MA 02101",
    createdAt: new Date("2024-01-28T13:45:00Z").toISOString(),
    updatedAt: new Date("2024-01-30T10:15:00Z").toISOString(),
  },
  {
    id: "10",
    customerName: "Lisa Wilson",
    orderDate: "2024-01-29",
    status: "cancelled",
    totalAmount: 149.99,
    items: [
      { id: "10-1", productName: "Fitness Tracker", quantity: 1, price: 149.99 },
    ],
    shippingAddress: "654 Maple Dr, Portland, OR 97201",
    createdAt: new Date("2024-01-29T16:20:00Z").toISOString(),
    updatedAt: new Date("2024-01-30T09:00:00Z").toISOString(),
  },
  {
    id: "11",
    customerName: "Robert Davis",
    orderDate: "2024-01-30",
    status: "pending",
    totalAmount: 199.99,
    items: [
      { id: "11-1", productName: "Power Bank", quantity: 2, price: 99.995 },
    ],
    shippingAddress: "987 Cedar Ave, Austin, TX 78701",
    createdAt: new Date("2024-01-30T10:10:00Z").toISOString(),
    updatedAt: new Date("2024-01-30T10:10:00Z").toISOString(),
  },
  {
    id: "12",
    customerName: "Jennifer Martinez",
    orderDate: "2024-01-31",
    status: "processing",
    totalAmount: 349.99,
    items: [
      { id: "12-1", productName: "Bluetooth Headphones", quantity: 1, price: 199.99 },
      { id: "12-2", productName: "Phone Stand", quantity: 1, price: 150.0 },
    ],
    shippingAddress: "456 Pine St, Nashville, TN 37201",
    createdAt: new Date("2024-01-31T12:30:00Z").toISOString(),
    updatedAt: new Date("2024-01-31T15:45:00Z").toISOString(),
  },
  {
    id: "13",
    customerName: "Christopher Taylor",
    orderDate: "2024-02-01",
    status: "shipped",
    totalAmount: 599.99,
    items: [
      { id: "13-1", productName: "External SSD", quantity: 1, price: 199.99 },
      { id: "13-2", productName: "USB-C Cable", quantity: 3, price: 133.33 },
    ],
    shippingAddress: "789 Oak Blvd, Las Vegas, NV 89101",
    createdAt: new Date("2024-02-01T14:15:00Z").toISOString(),
    updatedAt: new Date("2024-02-02T11:30:00Z").toISOString(),
  },
  {
    id: "14",
    customerName: "Amanda Anderson",
    orderDate: "2024-02-02",
    status: "delivered",
    totalAmount: 249.99,
    items: [
      { id: "14-1", productName: "Wireless Charger", quantity: 2, price: 124.995 },
    ],
    shippingAddress: "321 Elm St, Minneapolis, MN 55401",
    createdAt: new Date("2024-02-02T09:45:00Z").toISOString(),
    updatedAt: new Date("2024-02-04T14:20:00Z").toISOString(),
  },
  {
    id: "15",
    customerName: "Kevin Thomas",
    orderDate: "2024-02-03",
    status: "pending",
    totalAmount: 179.99,
    items: [
      { id: "15-1", productName: "Webcam", quantity: 1, price: 99.99 },
      { id: "15-2", productName: "Microphone", quantity: 1, price: 80.0 },
    ],
    shippingAddress: "654 Maple Dr, Kansas City, MO 64101",
    createdAt: new Date("2024-02-03T11:20:00Z").toISOString(),
    updatedAt: new Date("2024-02-03T11:20:00Z").toISOString(),
  },
  {
    id: "16",
    customerName: "Michelle White",
    orderDate: "2024-02-04",
    status: "processing",
    totalAmount: 429.99,
    items: [
      { id: "16-1", productName: "Monitor Stand", quantity: 1, price: 89.99 },
      { id: "16-2", productName: "Cable Management", quantity: 1, price: 340.0 },
    ],
    shippingAddress: "987 Cedar Ave, New Orleans, LA 70112",
    createdAt: new Date("2024-02-04T13:10:00Z").toISOString(),
    updatedAt: new Date("2024-02-04T16:30:00Z").toISOString(),
  },
  {
    id: "17",
    customerName: "Daniel Harris",
    orderDate: "2024-02-05",
    status: "shipped",
    totalAmount: 99.99,
    items: [
      { id: "17-1", productName: "Phone Case", quantity: 1, price: 29.99 },
      { id: "17-2", productName: "Screen Protector", quantity: 2, price: 35.0 },
    ],
    shippingAddress: "456 Pine St, Salt Lake City, UT 84101",
    createdAt: new Date("2024-02-05T15:45:00Z").toISOString(),
    updatedAt: new Date("2024-02-06T10:15:00Z").toISOString(),
  },
  {
    id: "18",
    customerName: "Nicole Clark",
    orderDate: "2024-02-06",
    status: "delivered",
    totalAmount: 699.99,
    items: [
      { id: "18-1", productName: "Gaming Chair", quantity: 1, price: 699.99 },
    ],
    shippingAddress: "789 Oak Blvd, Milwaukee, WI 53201",
    createdAt: new Date("2024-02-06T10:30:00Z").toISOString(),
    updatedAt: new Date("2024-02-08T16:45:00Z").toISOString(),
  },
  {
    id: "19",
    customerName: "Ryan Lewis",
    orderDate: "2024-02-07",
    status: "cancelled",
    totalAmount: 299.99,
    items: [
      { id: "19-1", productName: "VR Headset", quantity: 1, price: 299.99 },
    ],
    shippingAddress: "321 Elm St, Raleigh, NC 27601",
    createdAt: new Date("2024-02-07T12:15:00Z").toISOString(),
    updatedAt: new Date("2024-02-08T09:30:00Z").toISOString(),
  },
  {
    id: "20",
    customerName: "Stephanie Walker",
    orderDate: "2024-02-08",
    status: "pending",
    totalAmount: 159.99,
    items: [
      { id: "20-1", productName: "Desk Organizer", quantity: 1, price: 79.99 },
      { id: "20-2", productName: "Pen Holder", quantity: 1, price: 80.0 },
    ],
    shippingAddress: "654 Maple Dr, Richmond, VA 23219",
    createdAt: new Date("2024-02-08T14:20:00Z").toISOString(),
    updatedAt: new Date("2024-02-08T14:20:00Z").toISOString(),
  },
]

let nextId = 21

export const db = {
  // Get all orders with pagination and filtering
  getOrders: async (page = 1, limit = 10, status?: string, search?: string) => {
    let filtered = [...orders]

    // Filter by status
    if (status && status !== "all") {
      filtered = filtered.filter((order) => order.status === status)
    }

    // Search by customer name or order ID
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (order) => order.customerName.toLowerCase().includes(searchLower) || order.id.includes(searchLower),
      )
    }

    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    // Pagination
    const total = filtered.length
    const totalPages = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const end = start + limit
    const data = filtered.slice(start, end)

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    }
  },

  // Get single order by ID
  getOrderById: async (id: string): Promise<Order | null> => {
    const order = orders.find((o) => o.id === id)
    return order || null
  },

  // Create new order
  createOrder: async (input: CreateOrderInput): Promise<Order> => {
    const now = new Date().toISOString()
    const newOrder: Order = {
      id: String(nextId++),
      ...input,
      items: input.items.map((item, index) => ({
        ...item,
        id: `${nextId - 1}-${index + 1}`,
      })),
      createdAt: now,
      updatedAt: now,
    }
    orders.push(newOrder)
    return newOrder
  },

  // Update existing order
  updateOrder: async (id: string, input: UpdateOrderInput): Promise<Order | null> => {
    const index = orders.findIndex((o) => o.id === id)
    if (index === -1) return null

    const updatedOrder: Order = {
      ...orders[index],
      ...input,
      items: input.items
        ? input.items.map((item, idx) => ({
            ...item,
            id: `${id}-${idx + 1}`,
          }))
        : orders[index].items,
      updatedAt: new Date().toISOString(),
    }

    orders[index] = updatedOrder
    return updatedOrder
  },

  // Delete order
  deleteOrder: async (id: string): Promise<boolean> => {
    const index = orders.findIndex((o) => o.id === id)
    if (index === -1) return false
    orders.splice(index, 1)
    return true
  },
}
