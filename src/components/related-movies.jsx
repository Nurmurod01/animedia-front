import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function RelatedMovies({ movies }) {
  return (
    <div className="border-gradient">
      <Card className="border-none">
        <CardHeader>
          <CardTitle>O'xshash animelar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {movies.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              O'xshash animelar topilmadi
            </p>
          ) : (
            <>
              <div className="space-y-4">
                {movies.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movies/${movie.id}`}
                    className="flex items-center gap-3 hover:bg-muted p-2 rounded-md transition-colors"
                  >
                    <div className="h-16 w-24 bg-muted rounded overflow-hidden">
                      <Image
                        height={600}
                        width={500}
                        src={movie.coverImage || "/placeholder.svg"}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        unoptimized // Add this to prevent optimization errors with placeholder URLs
                      />
                    </div>
                    <div>
                      <h4 className="font-medium line-clamp-1">
                        {movie.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {movie.year}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/movies">Ko'proq ko'rish</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
