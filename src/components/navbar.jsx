"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
// import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Search, Menu } from "lucide-react"

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()
  // const { isAuthenticated, user, logout } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Fix for hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    // logout();
    // Redirect to home page or login page
    window.location.href = "/"
  }

  // Prevent hydration errors by not rendering auth-dependent UI until mounted
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-[#2a2a4a] bg-[#0f0f1a]/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center">
          <Link href="/" className="flex items-center font-bold text-center mr-6">
            <span className="text-white">Ani</span>-<span className="text-[#ff5d8f]">Media</span>
          </Link>
          <div className="flex-1"></div>
        </div>
      </header>
    )
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-[#2a2a4a] transition-all duration-300 ${
        scrolled ? "bg-[#0f0f1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f0f1a]/60" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center">
        <div className="md:hidden mr-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#16162a] border-[#2a2a4a]">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center font-semibold">
                  <span className="text-white">Ani</span>-<span className="text-[#ff5d8f]">Media</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className={`text-muted-foreground hover:text-foreground ${
                      pathname === "/" ? "text-foreground font-medium" : ""
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/movies"
                    className={`text-muted-foreground hover:text-foreground ${
                      pathname === "/movies" ? "text-foreground font-medium" : ""
                    }`}
                  >
                    Movies
                  </Link>
                  <Link
                    href="/genres"
                    className={`text-muted-foreground hover:text-foreground ${
                      pathname === "/genres" ? "text-foreground font-medium" : ""
                    }`}
                  >
                    Genres
                  </Link>
                  <Link
                    href="/blog"
                    className={`text-muted-foreground hover:text-foreground ${
                      pathname === "/blog" ? "text-foreground font-medium" : ""
                    }`}
                  >
                    Blog
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/" className="flex items-center font-bold text-center mr-6">
          <span className="text-white">Ani</span>-<span className="text-[#ff5d8f]">Media</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/"
            className={`font-medium transition-colors hover:text-[#ff5d8f] ${
              pathname === "/" ? "text-[#ff5d8f]" : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href="/movies"
            className={`font-medium transition-colors hover:text-[#ff5d8f] ${
              pathname === "/movies" || pathname.startsWith("/movies/") ? "text-[#ff5d8f]" : "text-muted-foreground"
            }`}
          >
            Movies
          </Link>
          <Link
            href="/genres"
            className={`font-medium transition-colors hover:text-[#ff5d8f] ${
              pathname === "/genres" || pathname.startsWith("/genres/") ? "text-[#ff5d8f]" : "text-muted-foreground"
            }`}
          >
            Genres
          </Link>
          <Link
            href="/blog"
            className={`font-medium transition-colors hover:text-[#ff5d8f] ${
              pathname === "/blog" || pathname.startsWith("/blog/") ? "text-[#ff5d8f]" : "text-muted-foreground"
            }`}
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center ml-auto gap-2">
          {isSearchOpen ? (
            <div className="relative w-full max-w-sm">
              <Input
                type="search"
                placeholder="Search movies..."
                className="pr-8 bg-[#1a1a2e] border-[#2a2a4a]"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-[#8a2be2] to-[#ff5d8f] hover:from-[#ff5d8f] hover:to-[#8a2be2] border-none"
              asChild
            >
              <Link href="/auth/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

