// src/app/portfolio/page.tsx
import { Metadata } from 'next';
import { PortfolioGrid} from "@/features/portfolio/Portfoliogrid";
import { PROJECTS, getPortfolioStats } from '@/data/projects.data';
import styles from '../../features/portfolio/portfolio.module.css';
import {Footer} from "@/shared/components/layout/footer/Footer";

export const metadata: Metadata = {
    title: 'Our Portfolio | Advanced Roofing Team Construction',
    description: 'Browse our completed roofing projects across Illinois, Wisconsin, Indiana, and Michigan. Commercial flat roofs and residential shingle systems — all backed by our quality guarantee.',
    openGraph: {
        title: 'Portfolio | Advanced Roofing Team',
        description: 'Residential and commercial roofing projects completed by Advanced Roofing Team Construction.',
        images: [{ url: '/icon.png' }],
    },
};

export default function PortfolioPage() {
    const stats = getPortfolioStats();

    return (
        <main>
            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>
                    <span className={styles.heroLabel}>Advanced Roofing Team</span>
                    <h1 className={styles.heroTitle}>Our Portfolio</h1>
                    <p className={styles.heroSub}>
                        Quality craftsmanship across Illinois, Wisconsin, Indiana &amp; Michigan.
                        Every project backed by our workmanship guarantee.
                    </p>
                </div>

                {/* Stats banner — reemplaza el mapa */}
                <div className={styles.statsBar}>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>{stats.total}+</span>
                        <span className={styles.statLabel}>Projects Completed</span>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>{stats.states.length}</span>
                        <span className={styles.statLabel}>States Served</span>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>{stats.commercial}</span>
                        <span className={styles.statLabel}>Commercial Projects</span>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>{stats.residential}</span>
                        <span className={styles.statLabel}>Residential Projects</span>
                    </div>
                    <div className={styles.statDivider} />
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>
                            {Math.round(stats.sqFt / 1000)}k+
                        </span>
                        <span className={styles.statLabel}>Sq. Ft. Installed</span>
                    </div>
                </div>
            </section>

            {/* ── GRID CON FILTROS ─────────────────────────────────── */}
            <PortfolioGrid projects={PROJECTS} />
            <Footer/>
        </main>
    );
}