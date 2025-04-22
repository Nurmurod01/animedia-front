"use client"

import { ThemeProvider } from "@/components/theme-provider";
import store from "@/redux/store";
import { Poppins } from "next/font/google";
import { Provider } from "react-redux";

// Poppins shriftini sozlash
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export function Providers({ children }) {
 
  return (
    <ThemeProvider attribute="class">
      <Provider store={store}>
        <div className={poppins.className}>{children}</div>
      </Provider>
    </ThemeProvider>
  );
}
