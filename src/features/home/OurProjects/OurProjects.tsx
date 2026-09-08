'use client';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './OurProjects.module.css';
import { Clock, Home } from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal } from '@/shared/animations/ScrollReveal';
import { getAllProjects } from '@/data/projects.data'; // ← importa de la fuente única

const getVisible = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth <= 768)  return 1;
    if (window.innerWidth <= 1280) return 2;
    return 4;
};

const GAP = 20;

const OurProjects = () => {
    const allProjects = getAllProjects();

    const [projects, setProjects] = useState(allProjects);
    const [isMounted, setIsMounted] = useState(false);

    const [baseIndex, setBaseIndex]             = useState(0);
    const [offset, setOffset]                   = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isDragging, setIsDragging]           = useState(false);
    const [dragStart, setDragStart]             = useState(0);
    const [dragDelta, setDragDelta]             = useState(0);
    const [activeId, setActiveId]               = useState(allProjects[0].id);
    const [hoveredIcon, setHoveredIcon]         = useState<{ projectId: number; iconType: string } | null>(null);
    const [cardWidth, setCardWidth]             = useState(0);
    const [visible, setVisible]                 = useState(4);

    const viewportRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        setIsMounted(true);
        setProjects([...allProjects].sort(() => Math.random() - 0.5));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const measureCard = useCallback(() => {
        if (!viewportRef.current) return;
        const vis   = getVisible();
        const total = viewportRef.current.offsetWidth;
        const w     = (total - GAP * (vis - 1)) / vis;
        setCardWidth(w);
        setVisible(vis);
    }, []);

    useEffect(() => {
        measureCard();
        window.addEventListener('resize', measureCard);
        return () => window.removeEventListener('resize', measureCard);
    }, [measureCard]);

    const slideNext = useCallback(() => {
        if (isTransitioning || cardWidth === 0) return;
        setIsTransitioning(true);
        setOffset(-(cardWidth + GAP));
        setTimeout(() => {
            setBaseIndex(prev => (prev + 1) % projects.length);
            setOffset(0);
            setIsTransitioning(false);
        }, 520);
    }, [isTransitioning, cardWidth, projects.length]);

    const startInterval = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(slideNext, 2000);
    }, [slideNext]);

    useEffect(() => {
        if (isMounted) startInterval();
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isMounted, startInterval]);

    useEffect(() => {
        if (projects.length > 0) setActiveId(projects[baseIndex].id);
    }, [baseIndex, projects]);

    const visibleProjects = Array.from({ length: visible + 1 }, (_, i) =>
        projects[(baseIndex + i) % projects.length]
    );

    const onDragStart = (clientX: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsDragging(true);
        setDragStart(clientX);
    };
    const onDragMove = (clientX: number) => {
        if (!isDragging) return;
        setDragDelta(clientX - dragStart);
    };
    const onDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        if (dragDelta < -60) slideNext();
        setDragDelta(0);
        startInterval();
    };

    return (
        <ScrollReveal className={styles.container} direction="right">
            <header className={styles.header}>
                <h2 className={styles.title}>Our projects</h2>
                <p className={styles.description}>
                    Explore our portfolio of completed roofing projects, showcasing quality
                    craftsmanship, durable solutions, and exceptional results across every
                    commercial property.
                </p>
            </header>

            <div
                ref={viewportRef}
                className={styles.carouselViewport}
                onMouseDown={e => onDragStart(e.clientX)}
                onMouseMove={e => onDragMove(e.clientX)}
                onMouseUp={onDragEnd}
                onMouseLeave={onDragEnd}
                onTouchStart={e => onDragStart(e.touches[0].clientX)}
                onTouchMove={e => onDragMove(e.touches[0].clientX)}
                onTouchEnd={onDragEnd}
            >
                <div
                    className={styles.track}
                    style={{
                        transform: `translateX(calc(${offset}px + ${dragDelta}px))`,
                        transition: isTransitioning
                            ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                            : 'none',
                        cursor: isDragging ? 'grabbing' : 'grab',
                    }}
                >
                    {visibleProjects.map((project, i) => (
                        <div
                            key={`${project.id}-${i}`}
                            className={`${styles.card} ${activeId === project.id ? styles.active : ''}`}
                            style={{ flex: cardWidth > 0 ? `0 0 ${cardWidth}px` : undefined }}
                            onMouseEnter={() => {
                                setActiveId(project.id);
                                if (intervalRef.current) clearInterval(intervalRef.current);
                            }}
                            onMouseLeave={() => startInterval()}
                        >
                            <div className={styles.cardContent}>
                                <h3 className={styles.projectTitle}>{project.title}</h3>
                                <p className={styles.projectMeta}>
                                    {project.type} <br /> {project.size}
                                </p>
                            </div>

                            <div className={styles.imageWrapper}>
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={400}
                                    height={300}
                                    className={styles.projectImage}
                                    draggable={false}
                                />

                                {activeId === project.id && hoveredIcon?.projectId === project.id && (
                                    <div className={styles.tooltipContainer}>
                                        {hoveredIcon.iconType === 'time' && (
                                            <div className={styles.systemBadge}>
                                                <span>Project Timeline:</span>
                                                <strong>{project.time || 'N/A'}</strong>
                                            </div>
                                        )}
                                        {hoveredIcon.iconType === 'home' && project.system && (
                                            <div className={styles.systemBadge}>
                                                <span>Roofing System Used:</span>
                                                <strong>{project.system}</strong>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className={styles.iconBar}>
                                    <div
                                        className={styles.iconCircle}
                                        onMouseEnter={() => setHoveredIcon({ projectId: project.id, iconType: 'time' })}
                                        onMouseLeave={() => setHoveredIcon(null)}
                                    >
                                        <Clock size={16} />
                                    </div>
                                    <div
                                        className={styles.iconCircle}
                                        onMouseEnter={() => setHoveredIcon({ projectId: project.id, iconType: 'home' })}
                                        onMouseLeave={() => setHoveredIcon(null)}
                                    >
                                        <Home size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.dots}>
                {projects.map((_, i) => (
                    <button
                        key={i}
                        className={`${styles.dot} ${i === baseIndex ? styles.dotActive : ''}`}
                        onClick={() => {
                            if (isTransitioning) return;
                            setBaseIndex(i);
                            setActiveId(projects[i].id);
                            startInterval();
                        }}
                        aria-label={`Go to project ${i + 1}`}
                    />
                ))}
            </div>

            {/* ← Ahora apunta a /portfolio */}
            <Link href="/portfolio" className={styles.servicesLink}>
                <button className={styles.moreBtn}>View Full Portfolio</button>
            </Link>
        </ScrollReveal>
    );
};

export default OurProjects;