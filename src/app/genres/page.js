import GenreCard from "@/components/genrecard";
import { data } from "@/data";
import React from "react";

export default function GenrePage() {
  const genres = data.genres;

  return (
    <div className="container mx-auto ">
      <h1 className="text-center text-4xl font-semibold p-7">Barcha Janrlar</h1>
      <div>
        <GenreCard genres={genres}></GenreCard>
      </div>
    </div>
  );
}
