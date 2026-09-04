"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const slides = [
    {
        src: "/assets/images/shared/dialog_laborday.webp",
        aspect: "portrait",
        cta: true,
    },
    // { src: "/assets/images/shared/dialog_hiring_1.webp", aspect: "landscape", cta: true },
    // { src: "/assets/images/shared/dialog_hiring_2.webp", aspect: "landscape", cta: true },
];

export const CareerCarousel = () => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile]         = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 4000);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        startTimer();
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
        startTimer();
    };

    useEffect(() => {
        startTimer();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [startTimer]);

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    const close = () => dialogRef.current?.close();

    const isPortrait = slides[currentIndex].aspect === "portrait";

    return (
        <dialog
            ref={dialogRef}
            className="rounded-2xl p-0 backdrop:bg-black/70 bg-transparent overflow-visible animate-[modal-pop_0.35s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
            style={{ margin: "auto", maxWidth: "95vw" }}
            onCancel={close}
        >
            {/* Botón cerrar */}
            <button
                onClick={close}
                className="absolute cursor-pointer -top-3 -right-3 z-50 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition-colors outline-none"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-5 w-5 sm:h-7 sm:w-7">
                    <path d="M18 6 6 18M6 6l12 12" />
                </svg>
            </button>

            {/* Contenedor adaptativo */}
            <div
                className="relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500"
                style={{
                    width:       isPortrait ? "min(80vw, 600px)" : "min(90vw, 900px)",
                    aspectRatio: isPortrait ? "4/5"              : "4/3",
                }}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.src}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                            index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                    >
                        <Image
                            src={slide.src}
                            alt="Promotion"
                            fill
                            priority
                            quality={100}
                            className="object-cover"
                        />

                        {/* CTA */}
                        {slide.cta && (
                            <a
                                href={isMobile
                                    ? "tel:8779456565"
                                    : "https://www.advancedroofingteam.com/contact-us/"
                                }
                                className={`
                                    absolute z-10 flex items-center
                                    bg-[#f7d000] hover:bg-yellow-300 transition-colors
                                    rounded-lg shadow-sm
                                    ${isMobile
                                    ? "top-7 right-7 gap-1 px-2.5 py-1.5"   /* mobile: pequeño */
                                    : "top-12 right-10 gap-2 px-5 py-3"     /* desktop: grande */
                                }
                                `}
                            >
                                {isMobile && (
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-[#00589e] shrink-0">
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                    </svg>
                                )}
                                <span className={`
                                    text-[#00589e] font-extrabold uppercase tracking-wide whitespace-nowrap
                                    ${isMobile ? "text-[12px]" : "text-base"}
                                `}>
                                    {isMobile ? "Call Us Now" : "Contact Us Now"}
                                </span>
                            </a>
                        )}
                    </div>
                ))}
            </div>

            {/* Flechas — solo si hay más de 1 slide */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-1 top-1/2 -translate-y-1/2 md:left-[-50px] p-1 md:p-2 text-white/70 hover:text-yellow-400 transition z-10"
                    >
                        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-1 top-1/2 -translate-y-1/2 md:right-[-50px] p-1 md:p-2 text-white/70 hover:text-yellow-400 transition z-10"
                    >
                        <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}
        </dialog>
    );
};