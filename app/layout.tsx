export const dynamic = 'force-dynamic'; // Disable static caching
export const revalidate = 0;           // Disable ISR
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/config/site";
import Nav from "@/components/NabBar";
import { GoogleAnalytics } from '@next/third-parties/google'
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <Nav/>
          {children}
          <Footer/>
        </ThemeProvider>
        <Toaster />
      </body>
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID || "G-YF04C372CG"} />

    </html>
  );
}
