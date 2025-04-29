import { data } from "@/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero-section";
import MovieCard from "@/components/movie-card";
import BlogPostCard from "@/components/blog-post-card";
import Image from "next/image";
import GenreCard from "@/components/genrecard";

export default function Home() {

  
  const movies = Object.values(data.movies);
  const genres = data.genres;
  const posts = Object.values(data.posts);

  

  const featuredMovies = [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const trendingMovies = [...movies]
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  const latestMovies = [...movies]
    .sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
    .slice(0, 5);

  return (
    <div>
      <HeroSection movies={featuredMovies} />

      <section className="container mx-auto py-8 md:py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Trend Animelar</h2>
          <Button
            variant="outline"
            className="border-[#8a2be2] text-white hover:bg-[#8a2be2]/20"
            asChild
          >
            <Link href="/movies">Hammasini Ko'rish</Link>
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
          <h2 className="text-2xl font-bold text-white">Ongoing Animelar</h2>
          <Button
            variant="outline"
            className="border-[#8a2be2] text-white hover:bg-[#8a2be2]/20"
            asChild
          >
            <Link href="/movies">Hammasini Ko'rish</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {latestMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={genres} />
          ))}
        </div>
      </section>

      <section className="py-8 md:py-12 bg-[#1a1a2e]">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              Janr Boʻyicha Qidirish
            </h2>
            <Button
              variant="outline"
              className="border-[#8a2be2] text-white hover:bg-[#8a2be2]/20"
              asChild
            >
              <Link href="/genres">Hammasini Janrlarni Ko'rish</Link>
            </Button>
          </div>

          <GenreCard genres={genres}></GenreCard>
        </div>
      </section>

      <section className="container mx-auto py-8 md:py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">From Our Blog</h2>
          <Button
            variant="outline"
            className="border-[#8a2be2] text-white hover:bg-[#8a2be2]/20"
            asChild
          >
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} users={data.users} />
          ))}
        </div>
      </section>
    </div>
  );
}
