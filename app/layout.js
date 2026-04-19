import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ever Journey - Cotizador de Seguros de Viaje",
  description: "Cotiza tu seguro de viaje con Ever Journey. Protege tus aventuras con nuestras opciones personalizadas. ¡Viaja seguro y sin preocupaciones!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
