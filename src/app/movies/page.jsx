import { data } from "@/data"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MovieCard from "@/components/movie-card"

export default function MoviesPage() {
  // Convert objects to arrays for easier mapping
  const movies = Object.values(data.movies)
  const genres = data.genres

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Movies</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Input placeholder="Search movies..." className="w-full" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent className="bg-blue-950">
              <SelectItem value="all">All Genres</SelectItem>
              {Object.values(genres).map((genre) => (
                <SelectItem key={genre.id} value={genre.id.toString()}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Movies</TabsTrigger>
          <TabsTrigger value="action">Action</TabsTrigger>
          <TabsTrigger value="scifi">Sci-Fi</TabsTrigger>
          <TabsTrigger value="thriller">Thriller</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} genres={genres} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="action" className="mt-6 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies
              .filter((movie) => genres[movie.genre]?.name === "Action")
              .map((movie) => (
                <MovieCard key={movie.id} movie={movie} genres={genres} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="scifi" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies
              .filter((movie) => genres[movie.genre]?.name === "Sci-Fi")
              .map((movie) => (
                <MovieCard key={movie.id} movie={movie} genres={genres} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="thriller" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies
              .filter((movie) => genres[movie.genre]?.name === "Thriller")
              .map((movie) => (
                <MovieCard key={movie.id} movie={movie} genres={genres} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

