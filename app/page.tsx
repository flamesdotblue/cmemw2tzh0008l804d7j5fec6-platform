"use client"

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { fetchAllPokemon } from '@/lib/pokeapi'
import PokemonCard from '@/components/PokemonCard'

type PokemonListItem = { name: string; id: number }

export default function HomePage() {
  const [allPokemon, setAllPokemon] = useState<PokemonListItem[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    fetchAllPokemon()
      .then((list) => {
        if (!active) return
        setAllPokemon(list)
        setLoading(false)
      })
      .catch((e) => {
        if (!active) return
        setError('Failed to load Pokémon. Please try again.')
        setLoading(false)
        console.error(e)
      })
    return () => {
      active = false
    }
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return allPokemon.slice(0, 30)
    return allPokemon.filter((p) => p.name.includes(q)).slice(0, 60)
  }, [allPokemon, query])

  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 pointer-events-none select-none opacity-30">
        <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-pokeyellow blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-[640px] h-[640px] rounded-full bg-pokeblue blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full bg-pokered blur-[180px] opacity-20" />
      </div>

      <section className="relative z-10 px-6 md:px-10 pt-16 md:pt-24 max-w-7xl mx-auto">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 md:size-12 rounded-full card-glass grid place-items-center">
              <Image src="https://img.pokemondb.net/sprites/items/poke-ball.png" alt="Poké Ball" width={36} height={36} />
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Pokédex</h1>
          </div>
          <a
            href="https://pokeapi.co/"
            target="_blank"
            className="text-sm md:text-base text-white/80 hover:text-white underline underline-offset-4"
          >
            Powered by PokéAPI
          </a>
        </header>

        <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black leading-[1.05]">
              Catch them all with a mind‑blowing Pokédex
            </h2>
            <p className="mt-5 text-white/80 text-lg">
              Type to search across every Pokémon. Lightning‑fast, beautiful, and built with Next.js + Tailwind.
            </p>
            <div className="mt-8 card-glass p-2 rounded-2xl">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="size-6 rounded-full bg-pokered animate-pulse" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Pokémon by name… (e.g., pikachu)"
                  className="w-full bg-transparent outline-none text-base md:text-lg placeholder:text-white/60"
                />
              </div>
            </div>
            <div className="mt-4 text-white/60 text-sm">
              {loading ? 'Loading Pokédex…' : `${allPokemon.length.toLocaleString()} Pokémon indexed`}
              {error && <span className="text-red-300 ml-2">{error}</span>}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-pokered/30 via-pokeyellow/20 to-pokeblue/30 blur-2xl" />
            <div className="relative card-glass rounded-3xl p-4 md:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-h-[520px] overflow-auto">
                {loading && (
                  Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="rounded-2xl h-40 bg-white/5 animate-pulse" />
                  ))
                )}
                {!loading && results.map((p) => (
                  <PokemonCard key={p.id} id={p.id} name={p.name} />
                ))}
                {!loading && results.length === 0 && (
                  <div className="col-span-full text-center text-white/70 py-10">No Pokémon found.</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-20 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 text-white/60">
          <p>
            Crafted with Next.js • Open API data courtesy of PokéAPI
          </p>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-green-400 animate-pulse" />
            Live search ready
          </div>
        </footer>
      </section>
    </main>
  )
}
