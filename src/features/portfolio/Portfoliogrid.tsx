'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Project, ProjectCategory } from '@/data/projects.data';
import styles from './PortfolioGrid.module.css';
import { Clock, Ruler, Wrench, MapPin } from 'lucide-react';

const FILTERS: { label: string; value: 'All' | ProjectCategory }[] = [
    { label: 'All Projects',  value: 'All'         },
    { label: 'Commercial',    value: 'Commercial'  },
    { label: 'Residential',   value: 'Residential' },
];

const PAGE_SIZE = 6;

interface PortfolioGridProps {
    projects: Project[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
    const [activeFilter, setActiveFilter] = useState<'All' | ProjectCategory>('All');
    const [page, setPage] = useState(1);

    const filtered = activeFilter === 'All'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    const visible  = filtered.slice(0, page * PAGE_SIZE);
    const hasMore  = visible.length < filtered.length;

    const handleFilter = (val: 'All' | ProjectCategory) => {
        setActiveFilter(val);
        setPage(1); // reset paginación
    };

    return (
        <section className={styles.section}>
            <div className={styles.inner}>

                {/* Filtros */}
                <div className={styles.filters}>
                    {FILTERS.map(f => (
                        <button
                            key={f.value}
                            className={`${styles.filterBtn} ${activeFilter === f.value ? styles.filterActive : ''}`}
                            onClick={() => handleFilter(f.value)}
                        >
                            {f.label}
                            <span className={styles.filterCount}>
                                {f.value === 'All'
                                    ? projects.length
                                    : projects.filter(p => p.category === f.value).length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className={styles.grid}>
                    {visible.map(project => (
                        <article key={project.id} className={styles.card}>
                            {/* Imagen */}
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                />
                                {/* Badge categoría */}
                                <span className={`${styles.categoryBadge} ${
                                    project.category === 'Commercial'
                                        ? styles.badgeCommercial
                                        : styles.badgeResidential
                                }`}>
                                    {project.category}
                                </span>
                            </div>

                            {/* Contenido */}
                            <div className={styles.content}>
                                <div className={styles.contentTop}>
                                    <h3 className={styles.title}>{project.title}</h3>
                                    <p className={styles.type}>{project.type}</p>

                                    {project.description && (
                                        <p className={styles.description}>{project.description}</p>
                                    )}
                                </div>

                                {/* Meta info */}
                                <div className={styles.meta}>
                                    <div className={styles.metaItem}>
                                        <Ruler size={14} className={styles.metaIcon} />
                                        <span>{project.size}</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <Clock size={14} className={styles.metaIcon} />
                                        <span>{project.time}</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <Wrench size={14} className={styles.metaIcon} />
                                        <span>{project.system}</span>
                                    </div>
                                    {project.location && (
                                        <div className={styles.metaItem}>
                                            <MapPin size={14} className={styles.metaIcon} />
                                            <span>{project.location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Load More */}
                {hasMore && (
                    <div className={styles.loadMoreWrapper}>
                        <button
                            className={styles.loadMoreBtn}
                            onClick={() => setPage(p => p + 1)}
                        >
                            Load More Projects
                            <span className={styles.loadMoreCount}>
                                ({filtered.length - visible.length} remaining)
                            </span>
                        </button>
                    </div>
                )}

                {/* CTA final */}
                <div className={styles.ctaBanner}>
                    <div className={styles.ctaText}>
                        <h2 className={styles.ctaTitle}>Ready to Start Your Project?</h2>
                        <p className={styles.ctaSub}>
                            Call <strong>(877) 945-6565</strong> today or request a free estimate online.
                        </p>
                    </div>
                    <a href="/contact-us" className={styles.ctaBtn}>
                        Get a Free Quote
                    </a>
                </div>

            </div>
        </section>
    );
}