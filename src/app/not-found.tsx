'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './not-found.module.css';

export default function NotFound() {
    const { t } = useLanguage();

    return (
        <div className={styles.container}>
            <h1 className={styles.code}>404</h1>
            <h2 className={styles.message}>{t.notFound}</h2>
            <Link href="/" className={styles.link}>
                {t.home}
            </Link>
        </div>
    );
}
