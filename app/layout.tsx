import { Inter, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", weight: ["400", "700", "900"] });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["400", "700", "900"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "KDMA | Mallakhamb Training in Kanyakumari | Traditional Indian Sport",
    template: "%s | KDMA Mallakhamb Kanyakumari"
  },
  description: "Official Kanyakumari District Mallakhamb Association (KDMA) - Learn traditional Mallakhamb, pole gymnastics, and Indian martial arts in Kanyakumari, Tamil Nadu. Professional training, events, and competitions for all ages.",
  keywords: [
    'Mallakhamb',
    'Mallakhamb Kanyakumari',
    'Mallakhamb Tamil Nadu',
    'Mallakhamb training',
    'KDMA',
    'Kanyakumari District Mallakhamb Association',
    'pole gymnastics',
    'pole gymnastics India',
    'traditional Indian sports',
    'Indian martial arts',
    'yoga pole',
    'mallakhamb classes',
    'mallakhamb academy',
    'sports training Kanyakumari',
    'gymnastics Kanyakumari',
    'traditional sports Tamil Nadu',
    'Indian sports federation',
    'mallakhamb competition',
    'pole yoga',
    'fitness training Kanyakumari'
  ],
  authors: [{ name: 'KDMA - Kanyakumari District Mallakhamb Association' }],
  creator: 'KDMA',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'KDMA | Mallakhamb Training in Kanyakumari | Traditional Indian Sport',
    description: 'Official Kanyakumari District Mallakhamb Association - Professional Mallakhamb training, pole gymnastics, events, and competitions in Tamil Nadu.',
    siteName: 'KDMA Mallakhamb Kanyakumari',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KDMA | Mallakhamb Kanyakumari',
    description: 'Official Mallakhamb Association in Kanyakumari District - Traditional Indian pole gymnastics training and events.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification code here when available
    // google: 'your-verification-code',
  },
};

import MagicCursor from "@/components/MagicCursor";
import LoadingBar from "@/components/LoadingBar";
import ScrollToTop from "@/components/ScrollToTop";
import CartDrawer from "@/components/CartDrawer";
import EnquiryModal from "@/components/EnquiryModal";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { CartProvider } from "@/context/CartContext";
import { EnquiryProvider } from "@/context/EnquiryContext";
import { CursorProvider } from "@/context/CursorContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${playfair.variable}`}>
      <body className="antialiased cursor-none bg-black">
        <GoogleAnalytics />
        <CartProvider>
          <EnquiryProvider>
            <CursorProvider>
              <LoadingBar />
              <ScrollToTop />
              <MagicCursor />
              <CartDrawer />
              <EnquiryModal />
              {children}
            </CursorProvider>
          </EnquiryProvider>
        </CartProvider>
      </body>
    </html>
  );
}
