'use client';

import styles from './error.module.css';

export default function Error({
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className={styles.error}>
            <h2>Something went wrong!</h2>
            <button
                onClick={() => reset()}
                className={styles.button}
            >
                Try again
            </button>
        </div>
    );
}
