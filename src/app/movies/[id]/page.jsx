"use client";

import { use, useState } from "react";
import { data } from "@/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Play, Plus, Calendar, Globe } from "lucide-react";
import CommentSection from "@/components/comment-section";
import RelatedMovies from "@/components/related-movies";
import VideoPlayer from "@/components/video-player";
import Image from "next/image";

export default function MoviePage({ params }) {
  const [showTrailer, setShowTrailer] = useState(false);

  const movieId = use(params).id;
  const movie = data.movies[movieId];

  if (!movie) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Anime topilmadi</h1>
        <p className="text-muted-foreground mb-6">
          Siz izlayotgan anime mavjud emas yoki oʻchirib tashlangan.
        </p>
        <Button
          asChild
          className="bg-gradient-to-r from-[#8a2be2] to-[#ff5d8f] hover:from-[#ff5d8f] hover:to-[#8a2be2] border-none"
        >
          <Link href="/">Ortga qaytish</Link>
        </Button>
      </div>
    );
  }

  // Get genre
  const genre = data.genres[movie.genre] || { name: "Unknown" };

  // Get comments for this movie
  const comments = Object.values(data.comments).filter(
    (comment) => comment.movieId === movieId
  );

  // Get similar movies (same genre)
  const similarMovies = Object.values(data.movies)
    .filter((m) => m.id !== movieId && m.genre === movie.genre)
    .slice(0, 3);

  return (
    <div>
      {/* Movie Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/50 to-[#0f0f1a]/20 z-10" />
        <div className="relative h-[50vh] bg-[#1a1a2e] overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <Image
              src={movie.coverImage || "/placeholder.svg"}
              height={600}
              width={500}
              alt={movie.title}
              className="w-full h-full object-cover"
              unoptimized // Add this to prevent optimization errors with placeholder URLs
            />
          </div>
        </div>
      </section>

      {/* Movie Content */}
      <section className="container mx-auto -mt-32 relative z-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Badge className="mb-2 bg-[#ff5d8f]">{movie.ageLimit}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 neon-text">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  <span>{movie.country}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400" />
                  <span>{movie.rating}/10</span>
                </div>
                <Badge variant="outline" className="border-[#8a2be2]">
                  {genre.name}
                </Badge>
              </div>
              <p className="text-muted-foreground">{movie.description}</p>
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#8a2be2] to-[#ff5d8f] hover:from-[#ff5d8f] hover:to-[#8a2be2] border-none"
                onClick={() => setShowTrailer(!showTrailer)}
              >
                <Play className="mr-2 h-4 w-4" />
                {showTrailer ? "Yopish" : "Tailerni Ko'rish"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#8a2be2] text-white hover:bg-[#8a2be2]/20"
              >
                <Plus className="mr-2 h-4 w-4" />
                Kuzatuv roʻyxatiga qoʻshish
              </Button>
            </div>

            {/* Trailer Video Player */}
            {showTrailer && (
              <div className="mb-8">
                <VideoPlayer
                  src={movie.trailerUrl || "https://youtube.com/trailer"}
                  title={`${movie.title} - Trailer`}
                  poster={movie.coverImage}
                  className="border border-[#2a2a4a] rounded-lg overflow-hidden"
                />
                <div className="mt-2 p-3 bg-[#16162a] rounded-b-lg border border-t-0 border-[#2a2a4a]">
                  <h3 className="text-lg font-semibold">
                    {movie.title} - Trailer
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {movie.title}ning rasmiy Traileri
                  </p>
                </div>
              </div>
            )}

            <Tabs defaultValue="comments">
              <TabsList className="mb-4 bg-[#1a1a2e] ">
                <TabsTrigger
                  value="comments"
                  className="data-[state=active]:bg-[#8a2be2] data-[state=active]:text-white "
                >
                  Izohlar ({comments.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="comments">
                <CommentSection
                  className="border-gradient"
                  comments={comments}
                  users={data.users}
                />
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <RelatedMovies movies={similarMovies} />
          </div>
        </div>
      </section>
    </div>
  );
}
