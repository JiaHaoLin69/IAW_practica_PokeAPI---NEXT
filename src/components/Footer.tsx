'use client';

// Importaciones
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

// Componente Footer (Pie de página)
const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className={styles.footer}>
            {/* Texto dinámico con reemplazo de nombre */}
            <p>{t.footer_text.replace('[Tu Nombre]', 'Jiahao')}</p>
        </footer>
    );
};

export default Footer;
