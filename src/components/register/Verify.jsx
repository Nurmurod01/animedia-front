"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Loader2, Mail } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useVerifyMutation, useLoginMutation } from "@/redux/service/api";
import { toast } from "react-hot-toast";
import { login } from "@/redux/authSlice";

export default function Verify() {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [verify, { isLoading: verifyLoading }] = useVerifyMutation();
  const [loginUser, { isLoading: loginLoading }] = useLoginMutation();

  useEffect(() => {
    setMounted(true);
    // Get email and password from localStorage or query params
    const storedEmail = localStorage.getItem("tempEmail");
    const storedPassword = localStorage.getItem("tempPassword");

    if (storedEmail) setEmail(storedEmail);
    if (storedPassword) setPassword(storedPassword);
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated && mounted) {
      router.push("/");
    }
  }, [auth.isAuthenticated, mounted, router]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!verificationCode) {
      setError("Iltimos, tasdiqlash kodini kiriting");
      return;
    }

    try {
      // Send verification request
      const response = await verify({
        email,
        password,
        code: verificationCode,
      }).unwrap();

      // Show success message
      toast.success("Muvaffaqiyatli tasdiqlandi!");

      // Auto login after verification
      try {
        const loginResponse = await loginUser({
          email,
          password,
        }).unwrap();

        // Dispatch login action to update Redux state
        dispatch(login(loginResponse));

        // Clean up temp storage
        localStorage.removeItem("tempEmail");
        localStorage.removeItem("tempPassword");

        // Redirect to home page
        router.push("/");
      } catch (loginError) {
        toast.error("Tizimga kirishda xatolik yuz berdi");
        console.error("Login error:", loginError);
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error(
        error?.data?.message ||
          "Tasdiqlash kodini tekshirishda xatolik yuz berdi"
      );
      setError(error?.data?.message || "Noto'g'ri tasdiqlash kodi");
    }
  };

  if (!mounted) {
    return null;
  }

  if (!email || !password) {
    return (
      <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
        <Card className="w-full max-w-md border-none">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Xatolik</CardTitle>
            <CardDescription className="text-center">
              Ro'yxatdan o'tish ma'lumotlari topilmadi. Iltimos, qaytadan
              ro'yxatdan o'ting.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button
              onClick={() => router.push("/auth/register")}
              className="bg-gradient-to-r from-[#8a2be2] to-[#ff5d8f] hover:from-[#ff5d8f] hover:to-[#8a2be2] border-none"
            >
              Ro'yxatdan o'tish
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Card className="w-full max-w-md border-none">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">
            Email tasdiqlash
          </CardTitle>
          <CardDescription className="text-center">
            {email} elektron pochtangizga yuborilgan tasdiqlash kodini kiriting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Tasdiqlash kodi</Label>
              <Input
                className="border-none text-center text-lg tracking-widest"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="000000"
                maxLength={6}
                disabled={verifyLoading || loginLoading}
              />
              {error && (
                <Alert
                  variant="destructive"
                  className="bg-rose-500/10 text-rose-500 border-none"
                >
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#8a2be2] to-[#ff5d8f] hover:from-[#ff5d8f] hover:to-[#8a2be2] border-none"
              disabled={verifyLoading || loginLoading}
            >
              {verifyLoading || loginLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Jarayonda...
                </>
              ) : (
                "Tasdiqlash"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Kod kelmadimi?{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-primary underline-offset-4"
              onClick={() => toast.info("Yangi kod yuborildi", { icon: "📧" })}
              disabled={verifyLoading || loginLoading}
            >
              Qayta yuborish
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
