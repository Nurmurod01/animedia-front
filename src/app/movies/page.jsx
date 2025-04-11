import { data } from "@/data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MovieCard from "@/components/movie-card";

export default function MoviesPage() {
  const movies = Object.values(data.movies);
  const genres = data.genres;

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Movies</h1>
      </div>
      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          {Object.values(genres).map((genre) => (
            <TabsTrigger
              key={genre.id}
              value={genre.name.toString().toLocaleLowerCase()}
            >
              {genre.name}
            </TabsTrigger>
          ))}
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
  );
}
