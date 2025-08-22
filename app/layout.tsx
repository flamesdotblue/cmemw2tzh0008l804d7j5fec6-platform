import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pokédex — Discover and Search Pokémon',
  description: 'A stunning Pokédex landing page with live search powered by PokéAPI.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-radial-poke">
        {children}
      </body>
    </html>
  )
}
