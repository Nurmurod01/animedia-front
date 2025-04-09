import { data } from "@/data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import MovieCard from "@/components/movie-card"
import BlogPostCard from "@/components/blog-post-card"
import Image from "next/image"

export default function Home() {
  const movies = Object.values(data.movies)
  const genres = data.genres
  const posts = Object.values(data.posts)

  const featuredMovies = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 3)

  const trendingMovies = [...movies].sort((a, b) => b.views - a.views).slice(0, 4)

  const latestMovies = [...movies].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)).slice(0, 4)

  return (
    <div>
      <HeroSection movies={featuredMovies} />

      <section className="container mx-auto py-8 md:py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Trending Movies</h2>
          <Button variant="outline" className="border-[#8a2be2] text-white hover:bg-[#8a2be2]/20" asChild>
            <Link href="/movies">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
          ))}
        </div>
      </section>

      <section className="container mx-auto py-8 md:py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Ongoing Anime</h2>
          <Button variant="outline" className="border-[#8a2be2] text-white hover:bg-[#8a2be2]/20" asChild>
            <Link href="/movies">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {latestMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
          ))}
        </div>
      </section>

      <section className="py-8 md:py-12 bg-[#1a1a2e]">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Browse by Genre</h2>
            <Button variant="outline" className="border-[#8a2be2] text-white hover:bg-[#8a2be2]/20" asChild>
              <Link href="/genres">View All Genres</Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 text-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Object.values(genres).map((genre) => (
              <Link
                key={genre.id}
                href={`/genres/${genre.id}`}
                className="relative bg-[#16162a] hover:bg-[#16162a]/80 transition-colors rounded-lg text-center h-40 overflow-hidden anime-card"
              >
                <div className="absolute inset-0">
                  <Image
                    src={genre.image || "/placeholder.svg"}
                    layout="fill"
                    objectFit="cover"
                    alt={genre.name}
                    className="opacity-70"
                    unoptimized // Add this to prevent optimization errors with placeholder URLs
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="font-medium text-lg px-2 py-1 bg-[#0f0f1a]/80 text-white rounded">{genre.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto py-8 md:py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">From Our Blog</h2>
          <Button variant="outline" className="border-[#8a2be2] text-white hover:bg-[#8a2be2]/20" asChild>
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} users={data.users} />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#8a2be2] to-[#ff5d8f] text-white py-12 md:py-16">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold">Upgrade to Premium</h2>
              <p className="text-white/80 max-w-md">
                Enjoy ad-free streaming, exclusive content, and offline downloads with our premium plan.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" className="bg-white text-[#8a2be2] hover:bg-white/90">
                View Plans
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent text-white border-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

