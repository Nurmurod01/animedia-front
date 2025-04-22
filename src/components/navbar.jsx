"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Menu, LogIn, LogOut } from "lucide-react";
import { Avatar } from "@radix-ui/react-avatar";
import { loadUser, logout } from "@/redux/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const auth = useSelector((state) => state.auth);
  const { isAuthenticated } = auth;
  console.log(isAuthenticated);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = () => {
    dispatch(logout());
  };

  if (!mounted) {
    return (
      <header className="fixed top-0 z-50 w-full border-b border-[#2a2a4a] bg-[#0f0f1a]/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center">
          <Link
            href="/"
            className="flex items-center font-bold text-center mr-6"
          >
            <span className="text-white">Ani</span>-
            <span className="text-[#ff5d8f]">Media</span>
          </Link>
          <div className="flex-1"></div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-[#2a2a4a] transition-all duration-300 ${
        scrolled
          ? "bg-[#0f0f1a]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0f0f1a]/60"
          : "bg-transparent"
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
                  <span className="text-white">Ani</span>-
                  <span className="text-[#ff5d8f]">Media</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {[
                    { href: "/", label: "Asosiy" },
                    { href: "/movies", label: "Animelar" },
                    { href: "/genres", label: "Janrlar" },
                    { href: "/blog", label: "Yangiliklar" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-muted-foreground hover:text-foreground relative group ${
                        pathname === item.href
                          ? "text-foreground font-medium"
                          : ""
                      }`}
                    >
                      {item.label}
                      {pathname === item.href && (
                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#8a2be2] to-[#ff5d8f]" />
                      )}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8a2be2] to-[#ff5d8f] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/" className="flex items-center font-bold text-center mr-6">
          <span className="text-white">Ani</span>-
          <span className="text-[#ff5d8f]">Media</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {[
            { href: "/", label: "Asosiy" },
            { href: "/movies", label: "Animelar" },
            { href: "/genres", label: "Janrlar" },
            { href: "/blog", label: "Yangiliklar" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium transition-colors relative group ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-munted-foreground"
                  : ""
              }`}
            >
              {item.label}
              {(pathname === item.href ||
                pathname.startsWith(item.href + "/")) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#8a2be2] to-[#ff5d8f]" />
              )}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8a2be2] to-[#ff5d8f] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center ml-auto gap-2">
          {isSearchOpen ? (
            <div className="relative w-full max-w-sm">
              <Input
                type="search"
                placeholder="Anime qidirish..."
                className="pr-8 bg-[#1a1a2e] border-[#2a2a4a]"
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
            >
              <span className="sr-only">
                <Search className="h-5 w-5" /> Qidirish
              </span>
            </Button>
          )}

          {isAuthenticated ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/profile">
                  <Avatar /> Profil
                </Link>
              </Button>
              <Button
                onClick={handleLogOut}
                className="bg-gradient-to-r from-[#8a2be2] to-[#ff5d8f] hover:from-[#ff5d8f] hover:to-[#8a2be2] border-none"
              >
                <LogOut /> Chiqish
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth/login">
                  <LogIn className="mr-2 h-4 w-4" /> Kirish
                </Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-[#8a2be2] to-[#ff5d8f] hover:from-[#ff5d8f] hover:to-[#8a2be2] border-none"
                asChild
              >
                <Link href="/auth/register">Ro'yxatdan o'tish</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
