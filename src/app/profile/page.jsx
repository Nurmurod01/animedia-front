"use client"

import { useState, useEffect } from "react"
import { data } from "@/data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Settings, CreditCard, Clock, Calendar } from "lucide-react"
// import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"
import Image from "next/image"

export default function ProfilePage() {
  // const { isAuthenticated, loading, user } = useAuth()
  const [mounted, setMounted] = useState(false)

  // Fix for hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
  //       <div className="flex flex-col items-center gap-2">
  //         <Loader2 className="h-8 w-8 animate-spin text-primary" />
  //         <p className="text-muted-foreground">Loading...</p>
  //       </div>
  //     </div>
  //   )
  // }

  // if (!isAuthenticated) {
  //   return (
  //     <div className="container mx-auto py-12 text-center">
  //       <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
  //       <p className="text-muted-foreground mb-6">You need to be logged in to access this page.</p>
  //       <Button asChild>
  //         <Link href="/auth/login?redirectTo=/profile">Sign In</Link>
  //       </Button>
  //     </div>
  //   )
  // }

  return <ProfileContent userId={user.id} />
}

function ProfileContent({ userId }) {
  // Get user data from mock data
  const userData = data.users[userId] || {}

  // Get user's subscription
  const subscription = data.subscriptions[userData.subscription]
  const plan = subscription ? data.plans[subscription.plan] : null

  // Get user's watchlist
  const watchlist = Object.values(data.watchlists).filter((item) => item.userId === userId)

  // Calculate days remaining in subscription
  const daysRemaining = subscription
    ? Math.ceil((new Date(subscription.enddate) - new Date()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={userData.image || "/placeholder.svg?height=96&width=96"} alt={userData.username} />
                <AvatarFallback>{userData.username?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
              </Avatar>
              <CardTitle>{userData.username}</CardTitle>
              <CardDescription>{userData.email}</CardDescription>
              <Badge className="mt-2">{userData.role?.toUpperCase() || "USER"}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Phone</span>
                <span>{userData.phone || "Not provided"}</span>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/profile/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </CardContent>
          </Card>

          {plan && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{plan.name} Plan</span>
                    <Badge variant="secondary">{daysRemaining} days left</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Expires on {new Date(subscription.enddate).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monthly Price</span>
                  <span>${(plan.amount / 100).toFixed(2)}</span>
                </div>
                {plan.discount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Discount</span>
                    <span>${(plan.discount / 100).toFixed(2)}</span>
                  </div>
                )}
                <Button className="w-full">Manage Subscription</Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="watchlist">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
              <TabsTrigger value="history">Watch History</TabsTrigger>
            </TabsList>

            <TabsContent value="watchlist" className="mt-6">
              {watchlist.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Clock className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
                    <h3 className="text-lg font-medium mb-2">Your watchlist is empty</h3>
                    <p className="text-muted-foreground mb-6">
                      Start adding movies to keep track of what you want to watch.
                    </p>
                    <Button asChild>
                      <Link href="/movies">Browse Movies</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {watchlist.slice(0, 3).map((item) => {
                    const movie = data.movies[item.movieId]
                    if (!movie) return null

                    return (
                      <Card key={item.id}>
                        <div className="flex items-center p-4">
                          <div className="h-16 w-24 bg-muted rounded overflow-hidden mr-4">
                            <Image
                              src={movie.coverImage || "/placeholder.svg?height=64&width=96" || "/placeholder.svg"}
                              alt={movie.title}
                              className="w-full h-full object-cover"
                              width={96}
                              height={64}
                              unoptimized // Add this to prevent optimization errors with placeholder URLs
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{movie.title}</h4>
                                <p className="text-xs text-muted-foreground">{movie.year}</p>
                              </div>
                              <Badge
                                variant={
                                  item.status === "watching"
                                    ? "default"
                                    : item.status === "completed"
                                      ? "success"
                                      : "secondary"
                                }
                              >
                                {item.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )
                  })}

                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/watchlist">View Full Watchlist</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <Card>
                <CardContent className="text-center py-12">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
                  <h3 className="text-lg font-medium mb-2">No watch history yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Your watch history will appear here once you start watching movies.
                  </p>
                  <Button asChild>
                    <Link href="/movies">Browse Movies</Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

