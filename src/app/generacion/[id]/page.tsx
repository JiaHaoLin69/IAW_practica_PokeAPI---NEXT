'use client';
import React, { useEffect, useState, use } from 'react';
import { notFound } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { Pokemon } from '@/types';
import { getGenerationPokemon } from '@/utils/api';
import PokemonCard from '@/components/PokemonCard';
import styles from './page.module.css';

// Componente de página para mostrar pokemons por generación
export default function GenerationPage({ params }: { params: Promise<{ id: string }> }) {
    // Desempaquetamos los parámetros de la URL (Next.js 15 usa Promesas para params)
    const { id } = use(params);

    // Simular error 404 para la 3ª generación
    if (id === '3') {
        notFound();
    }

    const { dict: t } = useLanguage();

    // Estado para guardar la lista de pokemons y el estado de carga
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);

    // Lógica para seleccionar el título correcto
    const titleKey = id === '1' ? 'gen1' : id === '2' ? 'gen2' : id === '3' ? 'gen3' : 'gen4';
    // Si no existe la clave específica, usamos un genérico
    const displayTitle = (t as any)[titleKey] || t.generations;

    // Efecto: Se ejecuta cada vez que cambia el 'id' de la generación
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Mostrar 'Cargando...'
            // Convertimos id a número y pedimos los datos a la API
            const data = await getGenerationPokemon(parseInt(id));
            setPokemons(data); // Guardamos resultados
            setLoading(false); // Ocultar carga
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
