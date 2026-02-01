import { Pokemon } from '@/types';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemonById = async (id: number): Promise<Pokemon | null> => {
    try {
        const res = await fetch(`${API_URL}/pokemon/${id}`);
        if (!res.ok) return null;
        const data = await res.json();
        return {
            id: data.id,
            name: data.name,
            image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
            types: data.types.map((t: any) => t.type.name),
            stats: {
                hp: data.stats.find((s: any) => s.stat.name === 'hp').base_stat,
                attack: data.stats.find((s: any) => s.stat.name === 'attack').base_stat,
                defense: data.stats.find((s: any) => s.stat.name === 'defense').base_stat,
            }
        };
    } catch (error) {
        console.error('Error fetching pokemon:', error);
        return null;
    }
};

export const getRandomPokemon = async (min: number, max: number): Promise<Pokemon | null> => {
    const id = Math.floor(Math.random() * (max - min + 1)) + min;
    return getPokemonById(id);
};

export const getGenerationPokemon = async (genId: number): Promise<Pokemon[]> => {
    // Hardcoded ranges for simplicity as per common gen definitions
    let min = 1, max = 151;
    if (genId === 2) { min = 152; max = 251; }
    if (genId === 3) { min = 252; max = 386; }

    const promises = [];
    // Get 10 random unique IDs from this range
    const ids = new Set<number>();
    while (ids.size < 10) {
        ids.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    for (const id of Array.from(ids)) {
        promises.push(getPokemonById(id));
    }

    const results = await Promise.all(promises);
    return results.filter((p): p is Pokemon => p !== null);
};
