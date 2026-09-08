// ─────────────────────────────────────────────────────────────────────────────
//  projects.data.ts
//  Fuente única de verdad para OurProjects (home) y /portfolio.
//  Agrega proyectos aquí — ambas secciones se actualizan solas.
// ─────────────────────────────────────────────────────────────────────────────

export type ProjectCategory = 'Commercial' | 'Residential';

export interface Project {
    id: number;
    title: string;
    category: ProjectCategory;
    type: string;          // "Commercial Flat Roof", "Residential Shingle Roof", etc.
    size: string;          // "59,500 sq. ft."
    time: string;          // "3 weeks"
    image: string;
    system: string;        // "Timberline GAF shingle"
    description?: string;  // párrafo para la página de portfolio
    location?: string;     // ciudad/estado — SIN dirección exacta
    year?: number;
}

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: 'Industrial Logistics Hub',
        category: 'Commercial',
        type: 'Commercial Flat Roof',
        size: '59,500 sq. ft.',
        time: '3 weeks',
        image: '/assets/images/projects/industrial-logistics.webp',
        system: 'Roofing Membrane + 5.2" Insulation',
        description: 'Full replacement of a large-scale industrial flat roof using a high-performance TPO membrane system with 5.2" of rigid insulation. The project required coordinated scheduling to avoid disrupting active logistics operations during peak hours.',
        location: 'Des Plaines, IL',
        year: 2025,
    },
    {
        id: 2,
        title: 'Modern Family Estate',
        category: 'Residential',
        type: 'Residential Shingle Roof',
        size: '3,450 sq. ft.',
        time: '3 weeks',
        image: '/assets/images/projects/modern-family.webp',
        system: 'Timberline GAF shingle',
        description: 'Complete residential re-roof on a modern two-story estate. We installed GAF Timberline HDZ shingles with a lifetime warranty, enhanced ridge ventilation, and ice & water shield throughout valleys and eaves.',
        location: 'Schaumburg, IL',
        year: 2025,
    },
    {
        id: 3,
        title: 'Suburban Heritage Home',
        category: 'Residential',
        type: 'Residential Shingle Roof',
        size: '4,222 sq. ft.',
        time: '3 weeks',
        image: '/assets/images/projects/suburban-heritage-alt.webp',
        system: 'Timberline GAF shingle',
        description: 'Storm damage repair and full roof replacement on a heritage-style suburban home. This project included custom flashing work around multiple dormers and a complex hip roof geometry.',
        location: 'Arlington Heights, IL',
        year: 2025,
    },
    {
        id: 4,
        title: 'Classic Residential Villa',
        category: 'Residential',
        type: 'Residential Shingle Roof',
        size: '1,602 sq. ft.',
        time: '2 weeks',
        image: '/assets/images/projects/residential-villa.webp',
        system: 'Timberline GAF shingle',
        description: 'Roof replacement on a classic villa-style home following hail damage. We worked directly with the homeowner\'s insurance adjuster to document all damage and ensure a smooth claims process.',
        location: 'Mount Prospect, IL',
        year: 2024,
    },
    {
        id: 5,
        title: 'Classic Suburban Ranch',
        category: 'Residential',
        type: 'Residential Shingle Roof',
        size: '2,800 sq. ft.',
        time: '2 weeks',
        image: '/assets/images/projects/classic-suburban-ranch.jpg',
        system: 'Timberline GAF shingle',
        description: 'Full re-roof on a single-story ranch home with a low-slope section over the garage. The project included new skylights, updated chimney flashing, and seamless gutter integration.',
        location: 'Palatine, IL',
        year: 2024,
    },
    {
        id: 6,
        title: 'Historic Village Home',
        category: 'Residential',
        type: 'Residential Shingle Roof',
        size: '2,150 sq. ft.',
        time: '2 weeks',
        image: '/assets/images/projects/historic-village-home.jpg',
        system: 'Timberline GAF shingle',
        description: 'Careful replacement of an aging roof on a historic neighborhood home, matching the original profile and color palette while upgrading to modern weather-resistant materials.',
        location: 'Evanston, IL',
        year: 2024,
    },
    {
        id: 7,
        title: 'Contemporary Brick Residence',
        category: 'Residential',
        type: 'Residential Shingle Roof',
        size: '3,200 sq. ft.',
        time: '3 weeks',
        image: '/assets/images/projects/contemporary-brick-residence.jpg',
        system: 'Timberline GAF shingle',
        description: 'Complete roof system replacement on a contemporary brick home. Work included tear-off of two existing layers, full deck inspection and spot repairs, and installation of a new ventilation system.',
        location: 'Naperville, IL',
        year: 2025,
    },
    {
        id: 8,
        title: 'Suburban Brick & Siding Home',
        category: 'Residential',
        type: 'Residential Shingle Roof',
        size: '3,100 sq. ft.',
        time: '3 weeks',
        image: '/assets/images/projects/down-net_http20260727-436-soyo5u.jpg',
        system: 'Timberline GAF shingle',
        description: 'Storm response project covering both roof replacement and partial siding repair. Completed within a tight insurance timeline while maintaining full communication with the claims adjuster.',
        location: 'Skokie, IL',
        year: 2026,
    },
    {
        id: 9,
        title: 'Gated Estate Property',
        category: 'Residential',
        type: 'Residential Shingle Roof',
        size: '3,600 sq. ft.',
        time: '3 weeks',
        image: '/assets/images/projects/down-net_http20260727-164-svejaf.jpg',
        system: 'Timberline GAF shingle',
        description: 'Premium roof replacement on a gated estate property featuring a steep-pitch roof with multiple valleys. Extra scaffolding and safety equipment were deployed to protect the landscaping below.',
        location: 'Hoffman Estates, IL',
        year: 2026,
    },
    {
        id: 10,
        title: 'Dark Grey Colonial Home',
        category: 'Residential',
        type: 'Residential Shingle Roof',
        size: '4,500 sq. ft.',
        time: '3 weeks',
        image: '/assets/images/projects/down-net_http20260727-116-k83ngw.jpg',
        system: 'Timberline GAF shingle',
        description: 'Large colonial home re-roof in charcoal GAF Timberline. The job required a full tear-off of three existing layers before deck repair and installation of the new system with enhanced ridge ventilation.',
        location: 'Des Plaines, IL',
        year: 2026,
    },
    {
        id: 11,
        title: 'Light Blue Modern Residence',
        category: 'Residential',
        type: 'Residential Shingle Roof',
        size: '2,900 sq. ft.',
        time: '2 weeks',
        image: '/assets/images/projects/9c5b654f-da21-4e25-8c74-efcae06db418.jpg',
        system: 'Timberline GAF shingle',
        description: 'Roof replacement on a modern residence following wind damage. We matched the existing shingle color and replaced damaged fascia boards and soffits as part of the same mobilization.',
        location: 'Arlington Heights, IL',
        year: 2026,
    },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Todos los proyectos — para el home carousel */
export const getAllProjects = (): Project[] => PROJECTS;

/** Filtrar por categoría */
export const getProjectsByCategory = (category: ProjectCategory): Project[] =>
    PROJECTS.filter(p => p.category === category);

/** Stats para el hero del portfolio */
export const getPortfolioStats = () => ({
    total:      PROJECTS.length,
    commercial: PROJECTS.filter(p => p.category === 'Commercial').length,
    residential: PROJECTS.filter(p => p.category === 'Residential').length,
    states:     ['IL', 'WI', 'IN', 'MI'],
    sqFt:       PROJECTS.reduce((sum, p) => {
        const n = parseFloat(p.size.replace(/[^0-9.]/g, ''));
        return sum + (isNaN(n) ? 0 : n);
    }, 0),
});