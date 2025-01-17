import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Math Game App",
  description: "A fun math game to enhance your skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="bg-gradient-to-r from-blue-800 via-purple-700 to-pink-700 shadow-lg">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center p-6">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Math Game App
              </h1>
              <nav className="space-x-6 text-lg">
                <a href="#" className="hover:underline transition-opacity duration-200">
                  Home
                </a>
                <a href="#" className="hover:underline transition-opacity duration-200">
                  About
                </a>
                <a href="#" className="hover:underline transition-opacity duration-200">
                  Contact
                </a>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-grow max-w-screen-lg mx-auto px-6 py-12 sm:p-16 lg:p-24">
            <div className="bg-white/90 rounded-lg shadow-2xl p-8 sm:p-12 text-gray-800">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 text-gray-300 text-sm sm:text-base text-center py-4">
            <div className="max-w-screen-xl mx-auto">
              <p>
                &copy; {new Date().getFullYear()}{" "}
                <span className="font-semibold">Math Game App</span>. All Rights
                Reserved.
              </p>
              <p className="mt-2">
                Made with ❤️ using <span className="font-mono">Next.js</span> and{" "}
                <span className="font-mono">Tailwind CSS</span>.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
