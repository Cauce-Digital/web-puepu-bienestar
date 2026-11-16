import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_URL } from "@/lib/site";
import { OG_DEFAULTS } from "@/lib/seo";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const dmSans = DM_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Puepu Bienestar | Medicina Tradicional China y Baños de Bosque en Valdivia",
    template: "%s | Puepu Bienestar",
  },
  description:
    "Gloria Jofré, terapeuta en Medicina Tradicional China. Baños de bosque, caminatas medicinales y talleres en la Selva Valdiviana.",
  openGraph: OG_DEFAULTS,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[var(--color-niebla)] text-[var(--color-musgo)]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
