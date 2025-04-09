"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Plus, Star, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function HeroSection({ movies }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const intervalRef = useRef(null)

  // If a single movie is passed, convert to array
  const moviesList = Array.isArray(movies) ? movies : [movies]

  // Fix for hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-advance slides
  useEffect(() => {
    if (moviesList.length <= 1) return

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % moviesList.length)
    }, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [moviesList.length])

  const goToSlide = (index) => {
    setActiveIndex(index)
    // Reset interval when manually changing slides
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % moviesList.length)
      }, 5000)
    }
  }

  const goToPrevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + moviesList.length) % moviesList.length)
  }

  const goToNextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % moviesList.length)
  }

  if (!mounted) {
    return (
      <section className="relative h-[70vh] bg-[#1a1a2e]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/80 to-[#0f0f1a]/10 z-10"></div>
      </section>
    )
  }

  return (
    <section className="relative">
      <div className="relative h-[70vh] bg-[#1a1a2e] overflow-hidden">
        {moviesList.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/50 to-[#0f0f1a]/1 z-10" />

            {/* Background image */}
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <Image
                src={movie.coverImage || "/placeholder.svg"}
                height={600}
                width={500}
                alt={movie.title}
                className="w-full h-full object-cover opacity-50"
                unoptimized // Add this to prevent optimization errors with placeholder URLs
              />
            </div>

            {/* Content */}
            <div className="container mx-auto absolute inset-0 flex items-end pb-24 z-20">
              <div className="max-w-2xl space-y-4">
                <Badge className="mb-2 bg-[#ff5d8f]">{movie.ageLimit}</Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold neon-text">{movie.title}</h1>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    <span>{movie.rating}/10</span>
                  </div>
                  <span>{movie.year}</span>
                  <span>{movie.country}</span>
                </div>
                <p className="text-muted-foreground line-clamp-3 md:line-clamp-4">{movie.description}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#8a2be2] to-[#ff5d8f] hover:from-[#ff5d8f] hover:to-[#8a2be2] border-none"
                    asChild
                  >
                    <Link href={`/movies/${movie.id}`}>
                      <Play className="mr-2 h-4 w-4" />
                      Watch Now
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="cursor-pointer border-[#8a2be2] text-white hover:bg-[#8a2be2]/20"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Watchlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom navigation */}
      {moviesList.length > 1 && (
        <>
          <div className="absolute bottom-8 right-8 z-30 flex items-center gap-5">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-[#1a1a2e]/20 backdrop-blur-sm hover:bg-[#8a2be2]/40 border-[#8a2be2]"
              onClick={goToPrevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-[#1a1a2e]/20 backdrop-blur-sm hover:bg-[#8a2be2]/40 border-[#8a2be2]"
              onClick={goToNextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Custom pagination */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {moviesList.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? "bg-[#ff5d8f] w-4" : "bg-white/50 hover:bg-white/80"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

