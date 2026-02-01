'use client';

// Importaciones
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

// Página de Contacto
export default function Contact() {
    const { t } = useLanguage();
    return (
        <div className={styles.container}>
            <div className={`${styles.card} glass`}>
                <h1 className={styles.title}>{t.contact}</h1>
                <p className={styles.text}>
                    {t.footer_text.replace('[Tu Nombre]', 'Jiahao')}
                </p>
            </div>
        </div>
    );
}
