"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Film, Loader2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "@/redux/service/api";
import { login as loginAction } from "@/redux/authSlice";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [loginUser, { isLoading }] = useLoginMutation();
  const redirectTo = "/";

  // Fix for hydration issues
  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  useEffect(() => {
    if (auth.isAuthenticated || mounted) {
      router.push("/");
    }
  }, [auth.isAuthenticated, router, redirectTo, mounted]);

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email kiritish majburiy";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email noto'g'ri kiritilgan";
    }

    if (!formData.password) {
      errors.password = "Parol kiritish majburiy";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const result = await loginUser({
          email: formData.email,
          password: formData.password,
        }).unwrap();

        console.log("Login result:", result); 

        const payload = {
          user: result.user || {},
          token: result.access_token || result.token,
          role: result.user?.role || "user",
        };

        dispatch(loginAction(payload));

        toast.success("Muvaffaqiyatli kirildi!");

        router.push(redirectTo);
      } catch (error) {
        console.error("Login error:", error);

        // Handle specific errors from API
        if (error?.data?.message) {
          toast.error(error.data.message);

          // If it's specifically about email not verified
          if (
            error.data.message.includes("verified") ||
            error.data.message.includes("tasdiqlash")
          ) {
            setFormErrors({
              general: "Email tasdiqlash kerak. Tasdiqlash kodini kiriting.",
            });

            // Store credentials temporarily and redirect to verification page
            localStorage.setItem("tempEmail", formData.email);
            localStorage.setItem("tempPassword", formData.password);

            setTimeout(() => {
              router.push("/auth/verify");
            }, 2000);

            return;
          }
        } else {
          toast.error("Tizimga kirishda xatolik yuz berdi");
        }

        setFormErrors((prev) => ({
          ...prev,
          general: "Email yoki parol noto'g'ri",
        }));
      }
    }
  };

  // if (!mounted) {
  //   return null;
  // }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Card className="w-full max-w-md border-none">
        <div className="border-gradient">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4"></div>
            <CardTitle className="text-2xl text-center">
              Xush kelibsiz!
            </CardTitle>
            <CardDescription className="text-center">
              Hisobingizga kirish uchun hisob ma'lumotlaringizni kiriting!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {formErrors.general && (
                <Alert
                  variant="destructive"
                  className="bg-rose-500/10 text-rose-500 border-none"
                >
                  <AlertDescription>{formErrors.general}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="border-none"
                />
                {formErrors.email && (
                  <p className="text-sm text-rose-500">{formErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Parol</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Parolni unutdingizmi?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="border-none"
                />
                {formErrors.password && (
                  <p className="text-sm text-rose-500">{formErrors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#8a2be2] to-[#ff5d8f] hover:from-[#ff5d8f] hover:to-[#8a2be2] border-none transform"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Jarayonda...
                  </>
                ) : (
                  "Kirish"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm">
              Siz yangimisiz?{" "}
              <Link
                href="/auth/register"
                className="text-primary underline-offset-4 hover:underline"
              >
                Ro'yxatdan o'tish
              </Link>
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
