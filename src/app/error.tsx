'use client';

import styles from './error.module.css';

// Componente de manejo de errores (Error Boundary)
// 'reset' es una función provista por Next.js para intentar recuperar la página
export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className={styles.error}>
            <h2>Something went wrong!</h2>
            {/* Botón para intentar renderizar la página de nuevo */}
            <button
                onClick={() => reset()}
                className={styles.button}
            >
                Try again
            </button>
        </div>
    );
}
