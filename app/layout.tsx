import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "ValenLingo 💘🇫🇷",
  description: "A tiny French lesson… with a surprise at the end.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
            <Link href="/" className="font-black tracking-tight">
              ValenLingo <span className="ml-1">💘🇫🇷</span>
            </Link>

            <nav className="flex items-center gap-4 text-sm font-semibold">
              <Link href="/" className="text-slate-600 hover:text-slate-900">
                Home
              </Link>
              <Link href="/learn" className="text-slate-600 hover:text-slate-900">
                Lessons
              </Link>
              <Link href="/yes" className="text-slate-600 hover:text-slate-900">
                Surprise
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-slate-600">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>Made with 💛</div>
              <div className="opacity-80">
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
