"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, Plus, Home } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 md:h-16 items-center justify-between px-4">
        {/* Logo/Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package className="h-4 w-4 md:h-5 md:w-5" />
          </div>
          <span className="text-lg md:text-xl font-bold">Ordex</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-2 md:space-x-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
            <Button variant="ghost" size="sm" className="sm:hidden">
              <Home className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/orders/new">
            <Button size="sm" className="flex items-center justify-center">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">New Order</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
