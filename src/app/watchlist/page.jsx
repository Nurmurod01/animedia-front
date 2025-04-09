"use client"

import { useState, useEffect } from "react"
import { data } from "@/data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Star, Play, Clock, Plus, Trash2 } from "lucide-react"
// import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

export default function WatchlistPage() {
  // const { isAuthenticated, loading, user } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Fix for hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
  //       <div className="flex flex-col items-center gap-2">
  //         <Loader2 className="h-8 w-8 animate-spin text-primary" />
  //         <p className="text-muted-foreground">Loading...</p>
  //       </div>
  //     </div>
  //   )
  // }

  // if (!isAuthenticated) {
  //   return (
  //     <div className="container mx-auto py-12 text-center">
  //       <h1 className="text-2xl font-bold mb-4">Please sign in to view your watchlist</h1>
  //       <p className="text-muted-foreground mb-6">You need to be logged in to access this page.</p>
  //       <Button asChild>
  //         <Link href="/auth/login?redirectTo=/watchlist">Sign In</Link>
  //       </Button>
  //     </div>
  //   )
  // }

  return <WatchlistContent userId={user.id} />
}

function WatchlistContent({ userId }) {
  // Get user's watchlist
  const watchlist = Object.values(data.watchlists).filter((item) => item.userId === userId)

  // Group by status
  const watching = watchlist.filter((item) => item.status === "watching")
  const planned = watchlist.filter((item) => item.status === "planned")
  const completed = watchlist.filter((item) => item.status === "completed")

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Watchlist</h1>
        <div className="text-sm text-muted-foreground">
          {watchlist.length} {watchlist.length === 1 ? "movie" : "movies"}
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All ({watchlist.length})</TabsTrigger>
          <TabsTrigger value="watching">Watching ({watching.length})</TabsTrigger>
          <TabsTrigger value="planned">Plan to Watch ({planned.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completed.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <WatchlistItems items={watchlist} />
        </TabsContent>

        <TabsContent value="watching">
          <WatchlistItems items={watching} />
        </TabsContent>

        <TabsContent value="planned">
          <WatchlistItems items={planned} />
        </TabsContent>

        <TabsContent value="completed">
          <WatchlistItems items={completed} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function WatchlistItems({ items }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Plus className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-2">Your watchlist is empty</h3>
        <p className="text-muted-foreground mb-6">Start adding movies to keep track of what you want to watch.</p>
        <Button asChild>
          <Link href="/movies">Browse Movies</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {items.map((item) => {
        const movie = data.movies[item.movieId]
        if (!movie) return null

        const genre = data.genres[movie.genre] ? data.genres[movie.genre].name : "Unknown"

        return (
          <div key={item.id} className="border rounded-lg overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-48 h-32 sm:h-auto bg-muted">
                <img
                  src={movie.coverImage || "/placeholder.svg?height=200&width=300"}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{movie.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{movie.year}</span>
                      <span>•</span>
                      <span>{genre}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        <span>{movie.rating}/10</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      item.status === "watching" ? "default" : item.status === "completed" ? "success" : "secondary"
                    }
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{movie.description}</p>

                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Added on {new Date(item.addedAt).toLocaleDateString()}</span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild size="sm">
                    <Link href={`/movies/${movie.id}`}>
                      <Play className="mr-2 h-4 w-4" />
                      {item.status === "watching" ? "Continue Watching" : "Watch Now"}
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

