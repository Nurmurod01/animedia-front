import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Eye } from "lucide-react"
import Image from "next/image"

export default function MovieCard({ movie, genres }) {
  // Find genre name
  const genre = genres[movie.genre] ? genres[movie.genre].name : "Unknown"

  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-lg border-none anime-card bg-[#16162a]">
      <div className="aspect-[2/3] relative bg-[#1a1a2e] overflow-hidden">
        <Image
          src={movie.coverImage || "/placeholder.svg"}
          height={600}
          width={500}
          alt={movie.title}
          className="object-cover w-full h-full"
          unoptimized // Add this to prevent optimization errors with placeholder URLs
        />
        <Badge className="absolute top-2 right-2 py-3 font-semibold rounded-full bg-[#ff5d8f]">{movie.ageLimit}</Badge>
      </div>
      <CardContent className="p-4 bg-[#16162a]">
        <h3 className="font-semibold line-clamp-1 mb-1">{movie.title}</h3>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>{movie.year}</span>
          <span>{genre}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-400" />
            <span>{movie.rating}/10</span>
          </div>
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            <span>{(movie.views / 1000000).toFixed(1)}M</span>
          </div>
        </div>
      </CardContent>
      <Link href={`/movies/${movie.id}`} className="absolute inset-0">
        <span className="sr-only">View {movie.title}</span>
      </Link>
    </Card>
  )
}

