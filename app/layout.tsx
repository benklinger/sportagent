import type { Metadata } from "next";
import { Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";

const notoLinesHebrew = Noto_Sans_Hebrew({
  subsets: ["hebrew", "latin"],
  variable: "--font-noto-hebrew",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "חבילות וכרטיסים למשחקי כדורגל בחו״ל",
  description: "הזמן את טיול הכדורגל החלומי שלך תוך דקות. בחר קבוצה, משחק, ואנחנו נדאג לכל השאר.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he">
      <body className={`${notoLinesHebrew.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
