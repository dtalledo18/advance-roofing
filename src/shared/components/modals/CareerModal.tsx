"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

const slides = [
    { src: "/assets/images/shared/dialog_laborday.webp", link: "/contact-us", aspect: "portrait" },
    // { src: "/assets/images/shared/dialog_hiring_1.webp", link: "/contact-us", aspect: "landscape" },
    // { src: "/assets/images/shared/dialog_hiring_2.webp", link: "/contact-us", aspect: "landscape" },
];

export const CareerCarousel = () => {
    const dialogRef   = useRef<HTMLDialogElement>(null);
    const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null); // ← fix race condition
    const [currentIndex, setCurrentIndex] = useState(0);

    // ── Reinicia el timer cada vez que se cambia de slide manualmente ────────
    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 4000);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        startTimer(); // ← resetea el timer para evitar el doble-salto
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

            {/* Contenedor — más grande y adaptativo */}
            <div
                className="relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500"
                style={{
                    width:     isPortrait ? "min(75vw, 520px)"  : "min(90vw, 820px)",
                    aspectRatio: isPortrait ? "4/5"             : "4/3",
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
                        {/* Sin botón APPLY NOW para labor_day — solo lo muestras si el slide lo pide */}
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