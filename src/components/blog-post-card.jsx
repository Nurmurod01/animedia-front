import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "lucide-react";
import Image from "next/image";

export default function BlogPostCard({ post, users }) {
  // Get author
  const author = users[post.authorId] || { username: "Unknown Author" };

  // Format date
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="relative overflow-hidden border-none anime-card">
      <div className="aspect-video relative bg-[#1a1a2e]">
        <Image
          src={post.image || "/placeholder.svg?height=400&width=800"}
          alt={post.title}
          width={400}
          height={400}
          className="object-cover w-full h-full"
          unoptimized // Add this to prevent optimization errors with placeholder URLs
        />
      </div>
      <CardContent className="p-6 bg-[#16162a]">
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="text-muted-foreground line-clamp-2 mb-4">
          {post.content}
        </p>
      </CardContent>
      <CardFooter className="border-t border-[#2a2a4a] bg-[#16162a] p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border border-[#8a2be2]">
            {author.image ? (
              <Image
                src={author.image || "/placeholder.svg"}
                height={50}
                width={50}
                alt={
                  <AvatarFallback>
                    {author.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                }
                className="rounded-full"
              />
            ) : (
              <div>
                <AvatarImage
                  src={author.image || "/placeholder.svg?height=32&width=32"}
                  alt={author.username}
                />
                <AvatarFallback className="bg-[#8a2be2] text-white">
                  {author.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>{" "}
              </div>
            )}
          </Avatar>
          <span className="text-sm font-medium">{author.username}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formattedDate}</span>
        </div>
      </CardFooter>
      <Link href={`/blog/${post.id}`} className="absolute inset-0">
        <span className="sr-only">Read {post.title}</span>
      </Link>
    </Card>
  );
}
