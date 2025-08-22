import Image from 'next/image'

export default function PokemonCard({ id, name }: { id: number; name: string }) {
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  const displayName = name.charAt(0).toUpperCase() + name.slice(1)

  return (
    <div className="group rounded-2xl p-3 card-glass hover:bg-white/10 transition-colors cursor-pointer">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white/5">
        <Image
          src={image}
          alt={displayName}
          fill
          sizes="(max-width: 768px) 50vw, 200px"
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          priority={id <= 6}
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <h3 className="font-semibold tracking-wide">{displayName}</h3>
        <span className="text-white/60 text-sm">#{String(id).padStart(3, '0')}</span>
      </div>
    </div>
  )
}
