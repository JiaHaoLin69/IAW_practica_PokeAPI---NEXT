'use client';
import React, { useEffect, useState, use } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Pokemon } from '@/types';
import { getGenerationPokemon } from '@/utils/api';
import PokemonCard from '@/components/PokemonCard';
import styles from './page.module.css';

// Componente de página para mostrar pokemons por generación
export default function GenerationPage({ params }: { params: Promise<{ id: string }> }) {
    // Obtener el ID de la URL y el idioma actual
    const { id } = use(params);
    const { t } = useLanguage();

    // Estado para guardar la lista de pokemons y el estado de carga
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    // Mapear el ID (1, 2, 3) a la clave del título correcta (gen1, gen2, gen3)
    const titleKey = id === '1' ? 'gen1' : id === '2' ? 'gen2' : 'gen3';
    const displayTitle = (t as any)[titleKey] || t.generations;

    // Efecto para cargar los pokemons cuando cambia el ID
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getGenerationPokemon(parseInt(id));
            setPokemons(data);
            setLoading(false);
        };
        fetchData();
    }, [id]);

    // Renderizado principal de la página
    return (
        <div className={styles.container}>
            {/* Título de la Generación */}
            <h1 className={styles.title}>
                {displayTitle}
            </h1>

            {/* Mostrar carga o la cuadrícula de pokemons */}
            {loading ? (
                <div className={styles.loading}>
                    {t.loading}
                </div>
            ) : (
                <div className={styles.grid}>
                    {pokemons.map(p => (
                        <PokemonCard key={p.id} pokemon={p} />
                    ))}
                </div>
            )}
        </div>
    );
}
