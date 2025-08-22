export type RawPokemonItem = { name: string; url: string }

export async function fetchAllPokemon(): Promise<{ name: string; id: number }[]> {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0', {
    // Allow Next.js to cache at edge for a bit while enabling client fetch
    next: { revalidate: 60 * 60 }
  })
  if (!res.ok) throw new Error('Failed to fetch Pokémon list')
  const data = await res.json() as { results: RawPokemonItem[] }
  // Map to name + numeric ID from URL
  const list = data.results
    .map((r) => {
      const parts = r.url.split('/').filter(Boolean)
      const id = Number(parts[parts.length - 1])
      return { name: r.name, id }
    })
    // Remove any invalid ids, sort by ID ascending
    .filter((p) => Number.isFinite(p.id))
    .sort((a, b) => a.id - b.id)
  return list
}
