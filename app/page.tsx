"use client"

import { useState } from "react"
import { OrderList } from "@/components/order-list"
import { OrderFilters } from "@/components/order-filters"
import { Header } from "@/components/header"

export default function HomePage() {
  const [filters, setFilters] = useState({ status: "all", search: "" })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl font-bold tracking-tight md:text-4xl">Order Management</h1>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">Track and manage customer orders efficiently with Ordex</p>
          </div>

          <div className="space-y-4 md:space-y-6">
            <OrderFilters onFilterChange={setFilters} />
            <OrderList statusFilter={filters.status} searchQuery={filters.search} />
          </div>
        </div>
      </main>
    </div>
  )
}
