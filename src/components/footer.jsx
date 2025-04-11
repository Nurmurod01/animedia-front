import Link from "next/link";
import { Facebook, Film, Instagram, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a4a] bg-[#0f0f1a]">
      <div className="container mx-auto py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Film className="h-5 w-5 text-[#ff5d8f]" />
              <span className="text-white">
                Ani<span className="text-[#ff5d8f]">Media</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Animeni qulay, sifatli va yaxshi ovozda ko'rmoqchimisiz unda siz
              to'g'ri yo'ldasiz.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-white">O‘rganing</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/movies"
                  className="text-muted-foreground hover:text-[#ff5d8f] transition-colors"
                >
                  Animelar
                </Link>
              </li>
              <li>
                <Link
                  href="/genres"
                  className="text-muted-foreground hover:text-[#ff5d8f] transition-colors"
                >
                  Janrlar
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-[#ff5d8f] transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-white">Kabinet</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/profile"
                  className="text-muted-foreground hover:text-[#ff5d8f] transition-colors"
                >
                  Profil
                </Link>
              </li>
              <li>
                <Link
                  href="/watchlist"
                  className="text-muted-foreground hover:text-[#ff5d8f] transition-colors"
                >
                  Ko‘rish ro‘yxati
                </Link>
              </li>
              <li>
                <Link
                  href="/subscription"
                  className="text-muted-foreground hover:text-[#ff5d8f] transition-colors"
                >
                  Obuna
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-white">Huquqiy</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-[#ff5d8f] transition-colors"
                >
                  Foydalanish shartlari
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-[#ff5d8f] transition-colors"
                >
                  Maxfiylik siyosati
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-[#ff5d8f] transition-colors"
                >
                  Biz bilan bog‘laning
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t text-center border-[#2a2a4a] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-center ">
            © {new Date().getFullYear()} AniMedia. Barcha huquqlar himoyalangan.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-muted-foreground flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-700 bg-blue-600 transition-colors"
            >
              <span className="sr-only">Facebook</span>
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="text-muted-foreground flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-purple-500 hover:via-pink-600 hover:to-red-600 transition-colors"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="w-5 h-5 text-white" />
            </Link>

            <Link
              href="https://t.me/animedia_rasmiy"
              className="text-muted-foreground flex items-center justify-center text-center bg-blue-600 hover:bg-blue-700 rounded-full w-10 h-10 transition-colors"
            >
              <span className="sr-only">Telegram</span>
              <Send className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
