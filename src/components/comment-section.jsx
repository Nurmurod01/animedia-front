"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquare } from "lucide-react";

export default function CommentSection({ comments, users }) {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the comment to your API
    alert(`Comment submitted: ${commentText}`);
    setCommentText("");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <Textarea
          placeholder="Izoh qo'shish..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="min-h-[100px] border-gradient"
        />
        <Button type="submit" disabled={!commentText.trim()}>
          Jo'natish
        </Button>
      </form>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
            <p className="text-muted-foreground">
              Hozircha izohlar yo‘q. Birinchi bo'lib fikr bildiring!
            </p>
          </div>
        ) : (
          comments.map((comment) => {
            const user = users[comment.userId] || { username: "Unknown User" };
            return (
              <div key={comment.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage
                      src={user.image || "/placeholder.svg?height=40&width=40"}
                      alt={user.username}
                    />
                    <AvatarFallback>
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">{user.username}</div>
                      <div className="text-xs text-muted-foreground">
                        {comment.createdAt}
                      </div>
                    </div>
                    <p className="text-sm mb-3">{comment.text}</p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>Like</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>Javob</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
