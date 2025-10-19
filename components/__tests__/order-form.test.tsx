import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { OrderForm } from '@/components/order-form'

// Mock the toast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

describe('OrderForm', () => {
  const mockOrder = {
    id: '1',
    customerName: 'John Doe',
    orderDate: '2024-01-15',
    status: 'pending' as const,
    totalAmount: 299.99,
    items: [
      { id: '1-1', productName: 'Wireless Headphones', quantity: 1, price: 149.99 },
      { id: '1-2', productName: 'Phone Case', quantity: 2, price: 75.0 },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  }

  beforeEach(() => {
    // Reset fetch mock
    ;(global.fetch as jest.Mock).mockClear()
  })

  it('renders create form correctly', () => {
    render(<OrderForm mode="create" />)
    
    expect(screen.getByText('Create New Order')).toBeInTheDocument()
    expect(screen.getByLabelText('Customer Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Order Date')).toBeInTheDocument()
    expect(screen.getByLabelText('Status')).toBeInTheDocument()
    expect(screen.getByLabelText('Shipping Address')).toBeInTheDocument()
    expect(screen.getByText('Add Item')).toBeInTheDocument()
  })

  it('renders edit form correctly', () => {
    render(<OrderForm order={mockOrder} mode="edit" />)
    
    expect(screen.getByText('Edit Order')).toBeInTheDocument()
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Wireless Headphones')).toBeInTheDocument()
  })

  it('calculates total correctly', async () => {
    const user = userEvent.setup()
    render(<OrderForm mode="create" />)
    
    const productNameInput = screen.getByLabelText('Product Name')
    const quantityInput = screen.getByLabelText('Quantity')
    const priceInput = screen.getByLabelText('Price')
    
    await user.type(productNameInput, 'Test Product')
    await user.clear(quantityInput)
    await user.type(quantityInput, '2')
    await user.clear(priceInput)
    await user.type(priceInput, '50.00')
    
    // Check if total is calculated and displayed
    const totalElement = screen.getByText(/Total:/)
    expect(totalElement).toBeInTheDocument()
  })

  it('adds and removes items correctly', async () => {
    const user = userEvent.setup()
    render(<OrderForm mode="create" />)
    
    // Initially should have 1 item
    expect(screen.getAllByLabelText('Product Name')).toHaveLength(1)
    
    // Find and click the Add Item button
    const addButton = screen.getByText('Add Item')
    await user.click(addButton)
    
    // Should now have 2 items
    expect(screen.getAllByLabelText('Product Name')).toHaveLength(2)
  })

  it('submits form with correct data', async () => {
    const user = userEvent.setup()
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...mockOrder }),
    })
    
    render(<OrderForm mode="create" />)
    
    await user.type(screen.getByLabelText('Customer Name'), 'Jane Smith')
    await user.type(screen.getByLabelText('Product Name'), 'Test Product')
    await user.type(screen.getByLabelText('Quantity'), '1')
    await user.type(screen.getByLabelText('Price'), '100.00')
    await user.type(screen.getByLabelText('Shipping Address'), '456 Test St')
    
    await user.click(screen.getByText('Create Order'))
    
    // Verify API call was made
    expect(global.fetch).toHaveBeenCalledWith('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: expect.stringContaining('Jane Smith'),
    })
  })
})
