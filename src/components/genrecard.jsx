import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function GenreCard({ genres }) {
  return (
    <div className="relative grid grid-cols-2 text-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Object.values(genres).map((genre) => (
              <Link
                key={genre.id}
                href={`/genres/${genre.id}`}
                className="relative bg-[#16162a] hover:bg-[#16162a]/80 transition-colors rounded-lg text-center h-40 overflow-hidden anime-card"
              >
                <div className="absolute inset-0">
                  <Image
                    src={genre.image || "/placeholder.svg"}
                    fill={true}
                    style={{ objectFit: "cover" }}
                    alt={genre.name}
                    className="opacity-70"
                    unoptimized
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="font-medium text-lg px-2 py-1 bg-[#0f0f1a]/80 text-white rounded">
                    {genre.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
  );
}
