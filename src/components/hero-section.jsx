"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Plus, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function HeroSection({ movies }) {
  const [mounted, setMounted] = useState(false);

  const moviesList = Array.isArray(movies) ? movies : [movies];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="relative h-[70vh] bg-[#1a1a2e]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/80 to-[#0f0f1a]/10 z-10"></div>
      </section>
    );
  }

  return (
    <section className="relative">
      <div className="relative h-[70vh] bg-[#1a1a2e] overflow-hidden">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".swiper-custom-pagination",
            bulletClass: "swiper-custom-bullet",
            bulletActiveClass: "swiper-custom-bullet-active",
            renderBullet: (index, className) =>
              `<button class="${className}" aria-label="Go to slide ${
                index + 1
              }"></button>`,
          }}
          navigation={{
            prevEl: ".swiper-custom-button-prev",
            nextEl: ".swiper-custom-button-next",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full w-full"
        >
          {moviesList.map((movie) => (
            <SwiperSlide key={movie.id} className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f1a] via-[#0f0f1a]/50 to-[#0f0f1a]/1 z-10" />

              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <Image
                  src={movie.coverImage || "/placeholder.svg"}
                  height={600}
                  width={500}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div className="container mx-auto absolute inset-0 flex items-end pb-24 z-20">
                <div className="max-w-2xl space-y-4">
                  <Badge className="mb-2 bg-[#ff5d8f]">{movie.ageLimit}</Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold neon-text">
                    {movie.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      <span>{movie.rating}/10</span>
                    </div>
                    <span>{movie.year}</span>
                    <span>{movie.country}</span>
                  </div>
                  <p className="text-muted-foreground line-clamp-3 md:line-clamp-4">
                    {movie.description}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#8a2be2] to-[#ff5d8f] hover:from-[#ff5d8f] transition-all duration-700 ease-in-out hover:to-[#8a2be2] border-none"
                      asChild
                    >
                      <Link href={`/movies/${movie.id}`}>
                        <Play className="mr-2 h-4 w-4" />
                        Tomosha qilish
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="cursor-pointer border-[#8a2be2] text-white hover:bg-[#8a2be2]/20"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Kuzatuv roʻyxatiga qoʻshish
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom navigation */}
      {moviesList.length > 1 && (
        <>
          <div className="absolute bottom-8 right-8 z-30 flex items-center gap-5">
            <Button
              variant="outline"
              size="icon"
              className="swiper-custom-button-prev rounded-full bg-[#1a1a2e]/20 backdrop-blur-sm hover:bg-[#8a2be2]/40 border-[#8a2be2]"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="swiper-custom-button-next rounded-full bg-[#1a1a2e]/20 backdrop-blur-sm hover:bg-[#8a2be2]/40 border-[#8a2be2]"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Custom pagination */}
          <div className="swiper-custom-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2"></div>
        </>
      )}

      <style jsx global>{`
        .swiper-custom-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          transition: all 0.3s;
          cursor: pointer;
        }

        .swiper-custom-bullet-active {
          background-color: #ff5d8f;
          width: 16px;
          border-radius: 9999px;
        }
      `}</style>
    </section>
  );
}
