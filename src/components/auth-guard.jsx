"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Loader2 } from "lucide-react";

export default function AuthGuard({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  // const { isAuthenticated, loading } = useAuth()
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Fix for hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   // Wait for auth check to complete
  //   if (mounted && !loading) {
  //     if (!isAuthenticated) {
  //       // Redirect to login with return URL
  //       router.push(`/auth/login?redirectTo=${encodeURIComponent(pathname)}`)
  //     } else {
  //       setIsLoading(false)
  //     }
  //   }
  // }, [isAuthenticated, loading, router, pathname, mounted])

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return children;
}
