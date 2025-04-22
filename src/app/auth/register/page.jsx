"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useRegisterMutation } from "@/redux/service/api";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [mounted, setMounted] = useState(false);

  const auth = useSelector((state) => state.auth);
  const router = useRouter();

  const [addUser, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push("/");
    }
  }, [auth.isAuthenticated, mounted, router]);

  const validateForm = () => {
    const errors = {};

    if (!formData.username) {
      errors.username = "Taxallus qo'yish majburiy";
    } else if (formData.username.length < 3) {
      errors.username = "Kamida 3ta harfdan iborat bo'lishi kerak";
    }

    if (!formData.email) {
      errors.email = "Email kiritish majburiy";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email topilmadi";
    }

    if (!formData.password) {
      errors.password = "Parol qo'yish majburiy";
    } else if (formData.password.length < 6) {
      errors.password = "Parol kamida 6 ta belgidan iborat bo'lishi kerak";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Parollar mos kelmaydi";
    }

    if (!formData.acceptTerms) {
      errors.acceptTerms = "Siz shartlarni qabul qilishingiz kerak";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      acceptTerms: checked,
    }));

    if (formErrors.acceptTerms) {
      setFormErrors((prev) => ({
        ...prev,
        acceptTerms: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Register the user
        const response = await addUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: "user",
        }).unwrap();

        // Store email and password temporarily for verification
        localStorage.setItem("tempEmail", formData.email);
        localStorage.setItem("tempPassword", formData.password);

        // Show success toast
        toast.success(
          "Ro'yxatdan o'tish muvaffaqiyatli, emailingizni tekshiring"
        );

        // Redirect to verification page
        router.push("/auth/verify");
      } catch (error) {
        console.error("Registration error:", error);
        toast.error(
          error?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi"
        );

        // Handle specific errors
        if (error?.data?.errors) {
          const serverErrors = {};
          error.data.errors.forEach((err) => {
            serverErrors[err.field] = err.message;
          });
          setFormErrors((prev) => ({ ...prev, ...serverErrors }));
        }
      }
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Card className="w-full max-w-md border-none">
        <div className="border-gradient">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              {/* Logo can be added here */}
            </div>
            <CardTitle className="text-2xl text-center">
              Ro'yxatdan o'tish
            </CardTitle>
            <CardDescription className="text-center">
              Ro'yxatdan o'tish uchun malumotlaringizni kiriting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Taxallus</Label>
                <Input
                  className=""
                  id="username"
                  name="username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {formErrors.username && (
                  <p className="text-sm text-destructive text-rose-500">
                    {formErrors.username}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  className=""
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {formErrors.email && (
                  <p className="text-sm text-destructive text-rose-500">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Parol</Label>
                <Input
                  className=""
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {formErrors.password && (
                  <p className="text-sm text-destructive text-rose-500 ">
                    {formErrors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Parolni tasdiqlang</Label>
                <Input
                  className=""
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                {formErrors.confirmPassword && (
                  <p className="text-sm text-destructive text-rose-500">
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={handleCheckboxChange}
                  disabled={isLoading}
                />
                <label
                  htmlFor="acceptTerms"
                  className="text-sm space-y-3 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Men{" "}
                  <Link
                    href="/terms"
                    className="text-primary underline underline-offset-4 hover:text-primary/90"
                  >
                    xizmat shartlari
                  </Link>{" "}
                  va{" "}
                  <Link
                    href="/privacy"
                    className="text-primary underline underline-offset-4 hover:text-primary/90"
                  >
                    maxfiylik siyosatiga{" "}
                  </Link>
                  roziman
                </label>
              </div>
              {formErrors.acceptTerms && (
                <p className="text-sm text-destructive text-rose-500">
                  {formErrors.acceptTerms}
                </p>
              )}

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
                  "Ro'yxatdan o'tish"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm">
              Allaqachon akkount bormi?{" "}
              <Link
                href="/auth/login"
                className="text-primary underline-offset-4 underline"
              >
                KIRISH
              </Link>
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
