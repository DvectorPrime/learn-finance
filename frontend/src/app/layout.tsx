import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import Script from 'next/script';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';

export const metadata: Metadata = {
  title: 'LearnFinance AI — Smart Financial Intelligence for Students',
  description: 'Gamified financial literacy road for Nigerian students inspired by Acornlearn AI.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A0A0A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-full bg-[#050505] text-[#F5F5F5] antialiased selection:bg-emerald-500 selection:text-black">
        <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
        {/* Outer Canvas Container: Centers the mobile application on desktop and iPad with sleek dark background */}
        <div className="min-h-screen w-full flex justify-center items-start md:py-6 md:px-4">
          {/* Mobile Phone Container (max-w-[430px]) */}
          <div className="w-full max-w-[430px] min-h-screen md:min-h-[900px] bg-[#0A0A0A] md:rounded-[40px] md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)] flex flex-col relative overflow-x-hidden">
            <AuthProvider>
              {/* Header Navigation */}
              <Suspense fallback={<div className="h-16 bg-[#0A0A0A] border-b border-white/5" />}>
                <Navbar />
              </Suspense>

              {/* Main Scrollable Content */}
              <main className="flex-1 flex flex-col w-full px-4 pt-3 pb-24">
                {children}
              </main>

              {/* Mobile Footer */}
              <footer className="border-t border-white/5 py-4 px-4 text-center text-[10px] text-zinc-500 mb-16 md:mb-16">
                <p>
                  LearnFinance AI • Nigeria Student Edition (<span className="text-zinc-400 font-mono">NGN ₦</span>)
                </p>
                <p className="text-zinc-600 mt-0.5">
                  Fictional scenarios for learning purposes. Not professional financial advice.
                </p>
              </footer>
            </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
