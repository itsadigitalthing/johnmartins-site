import "./globals.css";
import Link from "next/link";
import site from "@/content/settings/site.json";

export const metadata = {
  title: "John Martins Interior Design Studio",
  description: "Portfolio and studio site for John Martins Interior Design"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className="min-h-screen flex flex-col text-neutral-900 bg-white">
    <header className="px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-sm tracking-wide">
        {site?.logo ? <img src={site.logo} alt="Logo" className="h-6"/> : "John Martins Interior Design Studio"}
      </Link>
      <nav className="flex gap-6 text-sm">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <a href={site?.instagram ?? "https://instagram.com"} target="_blank">Instagram</a>
      </nav>
    </header>
    <main className="flex-1">{children}</main>
    <footer className="px-6 py-12 text-xs opacity-70">
      © 2025 John Martins
    </footer>

    <div id="cookie"
         className="fixed bottom-4 left-4 right-4 md:right-auto md:max-w-xl bg-black text-white p-4 text-sm rounded hidden">
      <p>{site?.cookieText ?? "We use cookies to improve your experience."}</p>
      <button id="cookie-ok" className="mt-2 bg-white text-black px-3 py-1 rounded">Ok</button>
    </div>
    <script dangerouslySetInnerHTML={{
      __html: `
          try {
            if (!localStorage.getItem('cookieAck')) {
              const el = document.getElementById('cookie');
              if (el) { el.style.display = 'block' }
            }
            document.querySelector('#cookie button')?.addEventListener('click', () => {
              localStorage.setItem('cookieAck','1');
            });
          } catch(e){}
        `
    }}/>
    </body>
    </html>
  );
}
