"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, User, Globe } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    })
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-white ${isScrolled ? "shadow-sm" : "border-b"} transition-all duration-200`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="text-[#FF385C] font-bold text-2xl">Airbnb Clone</div>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="rounded-full">
              Anywhere
            </Button>
            <Button variant="ghost" className="rounded-full">
              Any week
            </Button>
            <Button variant="ghost" className="rounded-full">
              Add guests
            </Button>
            <Button className="rounded-full bg-[#FF385C] hover:bg-[#FF385C]/90 text-white">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden md:flex rounded-full">
              Airbnb your home
            </Button>
            <Button variant="ghost" className="rounded-full p-2">
              <Globe className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full flex items-center space-x-2 border-gray-300">
                  <Menu className="h-4 w-4" />
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="font-semibold">Sign up</DropdownMenuItem>
                <DropdownMenuItem>Log in</DropdownMenuItem>
                <DropdownMenuItem>Airbnb your home</DropdownMenuItem>
                <DropdownMenuItem>Host an experience</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

import { Search } from "lucide-react"

