'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Pokemon } from '@/types';
import { getRandomPokemon } from '@/utils/api';
import PokemonCard from '@/components/PokemonCard';
import styles from './page.module.css';

// Página principal
export default function Home() {
  const { t } = useLanguage();

  // Estado para el pokemon aleatorio del día
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  // Efecto: Carga un pokemon aleatorio al iniciar
  useEffect(() => {
    const fetchRandom = async () => {
      setLoading(true);
      // Elige un número entre 1 y 386 (Gen 1-3)
      const p = await getRandomPokemon(1, 386);
      setPokemon(p);
      setLoading(false);
    };
    fetchRandom();
  }, []);

  // Renderizado
  return (
    <div className={styles.container}>
      {/* Título de bienvenida */}
      <h1 className={styles.title}>
        {t.welcome}
      </h1>

      {/* Contenedor de la carta del Pokemon */}
      <div className={styles.cardContainer}>
        {loading ? (
          <div className={`${styles.loading} glass`}>
            {t.loading}
          </div>
        ) : pokemon ? (
          <div className={styles.cardWrapper}>
            <PokemonCard pokemon={pokemon} />
          </div>
        ) : (
          <div className={styles.error}>{t.error}</div>
        )}
      </div>
    </div>
  );
}
