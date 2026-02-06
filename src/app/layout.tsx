import { Inter, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["400", "700", "900"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "700", "900"] });

export const metadata = {
  title: "KDMA | Kanyakumari District Mallkambh Association",
  description: "Official Association for Mallakhamb in Kanyakumari District.",
};

import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";
import CartDrawer from "@/components/CartDrawer";
import EnquiryModal from "@/components/EnquiryModal";
import { CartProvider } from "@/context/CartContext";
import { EnquiryProvider } from "@/context/EnquiryContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${playfair.variable}`}>
      <body className="antialiased cursor-none bg-black">
        <CartProvider>
          <EnquiryProvider>
            <ScrollToTop />
            <CustomCursor />
            <CartDrawer />
            <EnquiryModal />
            {children}
          </EnquiryProvider>
        </CartProvider>
      </body>
    </html>
  );
}
