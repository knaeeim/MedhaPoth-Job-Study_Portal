import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "মেধাপথ (MedhaPath) - গেমিফাইড বিসিএস ও সরকারি চাকরি প্রস্তুতি",
  description: "বাংলা, ইংরেজি, গণিত ও সাধারণ জ্ঞানের বেসিক কনসেপ্ট, গেমিফাইড লার্নিং, স্পেসড রেপিটিশন রিভিশন, প্রশ্ন ব্যাংক এবং লাইভ মডেল টেস্ট।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
