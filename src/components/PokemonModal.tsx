'use client';

// Importaciones
import React, { useEffect, useState } from 'react';
import { Pokemon } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import styles from './PokemonModal.module.css';

interface Props {
    pokemon: Pokemon;
    onClose: () => void;
}

// Modal (Ventana emergente) con detalles del Pokemon
const PokemonModal = ({ pokemon, onClose }: Props) => {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    // Efecto al abrir: Bloquea el scroll de la página
    useEffect(() => {
        setIsVisible(true);
        // Bloquear scroll
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    // Función para cerrar con animación suave
    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    return (
        <div className={`${styles.overlay} ${isVisible ? styles.visible : ''}`} onClick={handleClose}>
            <div className={`${styles.modal} ${isVisible ? styles.modalVisible : ''}`} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={handleClose}>×</button>

                <div className={styles.header}>
                    <img src={pokemon.image} alt={pokemon.name} className={styles.image} />
                    <h2 className={styles.name}>{pokemon.name} <span className={styles.id}>#{pokemon.id}</span></h2>
                </div>

                <div className={styles.statsLayout}>
                    <div className={styles.statRow}>
                        <span className={styles.statLabel}>HP</span>
                        <div className={styles.barContainer}>
                            <div
                                className={`${styles.bar} ${styles.hp}`}
                                style={{ '--stat-width': `${Math.min(pokemon.stats?.hp || 0, 100)}%` } as React.CSSProperties}
                            />
                        </div>
                        <span className={styles.statValue}>{pokemon.stats?.hp}</span>
                    </div>

                    <div className={styles.statRow}>
                        <span className={styles.statLabel}>Attack</span>
                        <div className={styles.barContainer}>
                            <div
                                className={`${styles.bar} ${styles.attack}`}
                                style={{ '--stat-width': `${Math.min(pokemon.stats?.attack || 0, 100)}%` } as React.CSSProperties}
                            />
                        </div>
                        <span className={styles.statValue}>{pokemon.stats?.attack}</span>
                    </div>

                    <div className={styles.statRow}>
                        <span className={styles.statLabel}>Defense</span>
                        <div className={styles.barContainer}>
                            <div
                                className={`${styles.bar} ${styles.defense}`}
                                style={{ '--stat-width': `${Math.min(pokemon.stats?.defense || 0, 100)}%` } as React.CSSProperties}
                            />
                        </div>
                        <span className={styles.statValue}>{pokemon.stats?.defense}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonModal;
