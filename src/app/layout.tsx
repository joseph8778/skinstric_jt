import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Skinstric",
  description: "AI Skincare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js"
        strategy="afterInteractive"
      />

    <script 
      src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`} 
      async 
      defer
    />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem enableColorScheme>
          {/* <div className="bg-white dark:bg-[#0d1117] text-black dark:text-white min-h-screen flex flex-col justify-between"> */}
        {children}
          {/* </div> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
