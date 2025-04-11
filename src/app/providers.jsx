import { ThemeProvider } from "@/components/theme-provider";
import { Poppins } from "next/font/google";

// Poppins shriftini sozlash
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class">
      <div className={poppins.className}>{children}</div>
    </ThemeProvider>
  );
}
