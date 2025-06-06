"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/page";
import Slidebar from "./Slidebar/page";
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.includes('/Login') || pathname?.includes('/Register');

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            success: {
              duration: 3000,
              style: {
                background: '#10B981',
                color: 'white',
                padding: '16px',
                borderRadius: '10px',
                fontSize: '14px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: '#EF4444',
                color: 'white',
                padding: '16px',
                borderRadius: '10px',
                fontSize: '14px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              },
            },
          }}
        />
        {!isAuthPage && <Navbar />}
        <div className="flex">
          {/* Sidebar */}
          {!isAuthPage && (
            <div className="fixed top-0 left-0 z-50 h-screen w-16 md:w-20 lg:w-24 xl:w-28 2xl:w-3">
              <Slidebar />
            </div>
          )}
          {/* Main Content */}
          <main className={`${!isAuthPage ? "ml-16 md:ml-20 lg:ml-24 xl:ml-28 2xl:ml-32" : ""} w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24`}>
            <div className={`max-w-screen-2xl mx-auto ${!isAuthPage ? "pt-6" : ""}`}>
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}






