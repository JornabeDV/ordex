# 🛒 Order Management System (Ordex)

A modern, full-stack order management system built with Next.js 15, React 19, and TypeScript. Features a clean, responsive UI with comprehensive CRUD operations, pagination, filtering, and real-time updates.

![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC)

## 🎥 Demo Videos

**Tutorial completo y demostración de la aplicación (5 minutos)**

### 📱 Demo de la Aplicación
[📹 Ver Demo de la App en Google Drive](https://drive.google.com/file/d/YOUR_APP_VIDEO_ID/view)

### 💻 Demo del Código
[📹 Ver Demo del Código en Google Drive](https://drive.google.com/file/d/YOUR_CODE_VIDEO_ID/view)

*Reemplaza los IDs con los de tus archivos en Google Drive*

**Pasos para compartir:**
1. Sube tus videos a Google Drive
2. Haz clic derecho → "Obtener enlace"
3. Selecciona "Cualquier persona con el enlace"
4. Copia el ID del archivo y reemplázalo arriba

## ✨ Features

- 🎯 **Complete CRUD Operations** - Create, read, update, and delete orders
- 📄 **Pagination** - Efficient data loading with pagination controls
- 🔍 **Advanced Filtering** - Filter orders by status and search by customer/ID
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS
- ⚡ **Real-time Updates** - SWR for efficient data synchronization
- 🔒 **Type Safety** - Full TypeScript support with shared types
- 🧪 **Testing** - Unit tests for components and API endpoints
- 🐳 **Docker Support** - Easy development and deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Docker (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ordex
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
ordex/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   └── orders/        # Order endpoints
│   ├── orders/            # Order pages
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── order-form.tsx    # Order form component
│   ├── order-list.tsx    # Order list component
│   └── order-filters.tsx # Filter component
├── lib/                  # Utilities and types
│   ├── db.ts            # Database simulation
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Utility functions
├── hooks/               # Custom React hooks
├── __tests__/          # Test files
├── jest.config.js      # Jest configuration
├── jest.setup.js       # Jest setup
└── package.json        # Dependencies and scripts
```

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix          # Fix ESLint issues
pnpm format            # Format code with Prettier

# Testing
pnpm test             # Run tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Run tests with coverage
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/orders` | List orders with pagination and filtering |
| `POST` | `/api/orders` | Create a new order |
| `GET` | `/api/orders/[id]` | Get order by ID |
| `PUT` | `/api/orders/[id]` | Update order by ID |
| `DELETE` | `/api/orders/[id]` | Delete order by ID |

#### Query Parameters

**GET /api/orders**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `status` (string): Filter by status (`pending`, `processing`, `shipped`, `delivered`, `cancelled`)
- `search` (string): Search by customer name or order ID

#### Example API Usage

```bash
# Get first page of orders
curl "http://localhost:3000/api/orders?page=1&limit=10"

# Filter by status
curl "http://localhost:3000/api/orders?status=pending"

# Search orders
curl "http://localhost:3000/api/orders?search=john"

# Create new order
curl -X POST "http://localhost:3000/api/orders" \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "orderDate": "2024-01-15",
    "status": "pending",
    "totalAmount": 299.99,
    "items": [
      {
        "productName": "Wireless Headphones",
        "quantity": 1,
        "price": 149.99
      }
    ],
    "shippingAddress": "123 Main St, New York, NY 10001"
  }'
```

## 🧪 Testing

The project includes comprehensive testing setup with Jest and React Testing Library for both frontend components and backend API endpoints.

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

### Test Structure

- **Component Tests**: `components/__tests__/` - React component testing
- **API Tests**: `app/api/__tests__/` - API endpoint testing
- **Unit Tests**: Co-located with source files

### Test Coverage

The project maintains comprehensive test coverage across:
- **Frontend Components**: Form validation, user interactions, rendering
- **API Endpoints**: CRUD operations, error handling, data validation
- **Utility Functions**: Helper functions and data transformations

### Example Tests

**Component Test Example:**
```typescript
// components/__tests__/order-form.test.tsx
import { render, screen } from '@testing-library/react'
import { OrderForm } from '@/components/order-form'

test('renders order form correctly', () => {
  render(<OrderForm mode="create" />)
  expect(screen.getByText('Create New Order')).toBeInTheDocument()
})
```

**API Test Example:**
```typescript
// app/api/__tests__/orders.test.ts
import { GET, POST } from '@/app/api/orders/route'

test('GET /api/orders returns orders', async () => {
  const request = new Request('http://localhost:3000/api/orders')
  const response = await GET(request)
  expect(response.status).toBe(200)
})
```

## 🐳 Docker Support (Development Only)

This project includes Docker configuration optimized for **local development only**. For production deployment, we recommend using Vercel or similar managed platforms.

### Quick Start with Docker

```bash
# Start development environment
pnpm docker:dev

# Or with Docker Compose directly
docker-compose up -d
```

### Available Docker Commands

```bash
# Development
pnpm docker:dev              # Start development container
pnpm docker:dev:build        # Rebuild and start container
pnpm docker:down             # Stop container
pnpm docker:logs             # View container logs
pnpm docker:clean            # Clean up containers and volumes
```

### Docker Features

- ✅ **Hot Reload**: Code changes reflect immediately
- ✅ **Volume Mounting**: Source code mounted for live editing
- ✅ **Optimized Caching**: Faster builds with layer caching
- ✅ **Development Environment**: Consistent across all machines
- ✅ **Easy Cleanup**: Simple commands to reset environment

### Access the Application

Once running, navigate to [http://localhost:3000](http://localhost:3000)

### Why Docker for Development?

- **Consistency**: Same environment for all developers
- **Easy Setup**: No need to install Node.js, pnpm, etc.
- **Isolation**: Doesn't affect your local system
- **Reproducible**: Exact same dependencies and versions

## 📊 Data Model

### Order Schema

```typescript
interface Order {
  id: string
  customerName: string
  orderDate: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  totalAmount: number
  items: OrderItem[]
  shippingAddress: string
  createdAt: string
  updatedAt: string
}

interface OrderItem {
  id: string
  productName: string
  quantity: number
  price: number
}
```

## 🎨 UI Components

Built with [shadcn/ui](https://ui.shadcn.com/) components:

- **Form Components**: Input, Select, Textarea, Button
- **Layout Components**: Card, Table, Badge
- **Feedback Components**: Toast, Alert Dialog
- **Navigation Components**: Breadcrumb, Pagination

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### TypeScript Configuration

The project uses strict TypeScript configuration with:
- Path mapping (`@/*` → `./`)
- Strict type checking
- Next.js optimizations

### ESLint Configuration

ESLint is configured with:
- Next.js recommended rules
- TypeScript support
- React hooks rules
- Accessibility rules

## 🚀 Production Deployment

### Vercel (Recommended)

Vercel is the recommended platform for production deployment due to its seamless Next.js integration.

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Automatic deployments**
   - Connect your GitHub repository
   - Deploy automatically on push to main branch
   - Preview deployments for pull requests

### Other Managed Platforms

- **Netlify**: `npm install -g netlify-cli && netlify deploy`
- **Railway**: `npx @railway/cli@latest login && railway deploy`
- **DigitalOcean App Platform**: Connect GitHub repository
- **AWS Amplify**: Connect GitHub repository

### Why Not Docker for Production?

For this type of application, managed platforms offer:
- ✅ **Automatic scaling**
- ✅ **Global CDN**
- ✅ **SSL certificates**
- ✅ **Zero maintenance**
- ✅ **Better performance**
- ✅ **Lower costs**

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write tests for new features (components and API endpoints)
- Use conventional commit messages
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [SWR](https://swr.vercel.app/) - Data fetching
- [Jest](https://jestjs.io/) - Testing framework

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Review the test files for examples

---

**Happy coding! 🚀**
