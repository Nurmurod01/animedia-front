import { data } from "@/data"
import BlogPostCard from "@/components/blog-post-card"

export default function BlogPage() {
  const posts = Object.values(data.posts)

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Blog</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} users={data.users} />
        ))}
      </div>
    </div>
  )
}

