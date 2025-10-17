import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className={outfit.className}>
          <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
