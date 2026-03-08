"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Carousel.module.css";

interface Slide {
  year: string;
  image: string;
  href?: string;
  name?: {
    pt: string;
    en: string;
  };
}

interface CarouselProps {
  slides: Slide[];
  logo: string;
  locale: "pt" | "en";
  overlay?: React.ReactNode;
}

const ITEM_HEIGHT = 36;
const ACTIVE_POSITION = 120;
const AUTOPLAY_DELAY = 4000;
const PAUSE_DURATION = 7000;

export default function Carousel({ slides, logo, locale, overlay }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [layout, setLayout] = useState({
    itemHeight: ITEM_HEIGHT,
    baseOffset: ACTIVE_POSITION,
    logoCenterY: ACTIVE_POSITION,
  });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const pauseTimeoutRef = useRef<number | null>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);
  const yearColumnRef = useRef<HTMLDivElement | null>(null);
  const yearItemRef = useRef<HTMLDivElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const measureLayout = () => {
    if (!logoRef.current || !yearColumnRef.current || !yearItemRef.current || !containerRef.current) return;

    const logoRect = logoRef.current.getBoundingClientRect();
    const columnRect = yearColumnRef.current.getBoundingClientRect();
    const itemRect = yearItemRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const itemHeight = itemRect.height || ITEM_HEIGHT;
    const targetCenter = logoRect.top + logoRect.height / 2 - 3;
    const baseOffset = targetCenter - columnRect.top - itemHeight / 2;
    const logoCenterY = targetCenter - containerRect.top;

    setLayout({ itemHeight, baseOffset, logoCenterY });
  };

  // AUTOPLAY sempre ativo (a menos que pausado)
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_DELAY);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, slides.length]);

  // Detecta clique na tela e pausa 7s
  useEffect(() => {
    const handleUserInteraction = () => {
      setIsPaused(true);

      if (intervalRef.current) clearInterval(intervalRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);

      pauseTimeoutRef.current = window.setTimeout(() => {
        setIsPaused(false);
      }, PAUSE_DURATION);
    };

    window.addEventListener("click", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  useLayoutEffect(() => {
    const rafMeasure = () => requestAnimationFrame(measureLayout);

    rafMeasure();
    window.addEventListener("resize", rafMeasure);

    if (typeof ResizeObserver !== "undefined") {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = new ResizeObserver(rafMeasure);
      if (logoRef.current) resizeObserverRef.current.observe(logoRef.current);
      if (yearColumnRef.current) resizeObserverRef.current.observe(yearColumnRef.current);
      if (yearItemRef.current) resizeObserverRef.current.observe(yearItemRef.current);
    }

    return () => {
      window.removeEventListener("resize", rafMeasure);
      resizeObserverRef.current?.disconnect();
    };
  }, [slides.length]);

  const translateY =
    layout.baseOffset - currentIndex * layout.itemHeight;

  return (
    <div className={styles.carouselContainer} ref={containerRef}>
      <img
        src={logo}
        alt="Logo"
        className={styles.logo}
        ref={logoRef}
        onLoad={measureLayout}
      />

      {overlay ? (
        <div className={styles.overlay} style={{ top: layout.logoCenterY }}>
          {overlay}
        </div>
      ) : null}

      <div className={styles.scrollHint} aria-hidden="true" />

      {/* MENU DE ANOS */}
      <div className={styles.yearColumn} ref={yearColumnRef}>
        <div
          className={styles.yearTrack}
          style={{ transform: `translateY(${translateY}px)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`${styles.yearItem} ${index === currentIndex ? styles.active : ""}`}
              ref={index === 0 ? yearItemRef : undefined}
              onClick={() => setCurrentIndex(index)}
            >
              {slide.year}
            </div>
          ))}
        </div>
      </div>

      {/* SLIDER */}
      <div
        className={styles.slider}
        style={{ transform: `translateY(-${currentIndex * 100}vh)` }}
      >
        {slides.map((slide, index) => (
          <div className={styles.slide} key={index}>
              {slide.href ? (
                <a href={slide.href} target="_blank" rel="noopener noreferrer">
                  <img src={slide.image} alt={slide.year} />
                </a>
              ) : (
                <img src={slide.image} alt={slide.year} />
              )}
              {slide.name?.[locale] ? (
                <div className={styles.slideLabel}>{slide.name[locale]}</div>
              ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
