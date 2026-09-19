"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw, Sparkles } from "lucide-react";

interface InteractiveImageZoomProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  zoomScale?: number; // default: 2.4x
  aspectRatio?: "video" | "square" | "portrait" | "wide" | "auto";
  badge?: React.ReactNode;
  lightboxTitle?: string;
  lightboxSubtitle?: string;
  fill?: boolean;
  priority?: boolean;
}

export function InteractiveImageZoom({
  src,
  alt,
  className = "",
  containerClassName = "",
  zoomScale = 2.4,
  aspectRatio = "video",
  badge,
  lightboxTitle,
  lightboxSubtitle,
  fill = false,
  priority = false,
}: InteractiveImageZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchPrying, setIsTouchPrying] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1);

  // ----------------------------------------------------
  // 1. DESKTOP PAN & ZOOM LOUPE (2.4x)
  // ----------------------------------------------------
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setOrigin({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    handleMouseMove(e);
  }, [handleMouseMove]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setOrigin({ x: 50, y: 50 });
  }, []);

  // ----------------------------------------------------
  // 2. MOBILE TOUCH-TO-PAN
  // ----------------------------------------------------
  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (touch.clientY - rect.top) / rect.height));
    setIsTouchPrying(true);
    setOrigin({ x: x * 100, y: y * 100 });
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsTouchPrying(false);
    setOrigin({ x: 50, y: 50 });
  }, []);

  // ----------------------------------------------------
  // 3. FULLSCREEN LIGHTBOX ESCAPE KEY HANDLER
  // ----------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      setLightboxScale(1);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen]);

  // Determine aspect ratio class
  const aspectClass =
    aspectRatio === "video"
      ? "aspect-video"
      : aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "portrait"
      ? "aspect-4/5"
      : aspectRatio === "wide"
      ? "aspect-21/9"
      : "";

  const isZoomActive = isHovered || isTouchPrying;

  return (
    <>
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative overflow-hidden select-none cursor-crosshair group ${aspectClass} ${containerClassName}`}
        aria-label={`${alt} (Hover or touch to zoom 2.4x)`}
      >
        {/* Main Image with 2.4x Zoom & Pan */}
        <div
          className="w-full h-full will-change-transform transition-transform duration-100 ease-out"
          style={{
            transform: isZoomActive ? `scale(${zoomScale})` : "scale(1)",
            transformOrigin: `${origin.x}% ${origin.y}%`,
          }}
        >
          {fill ? (
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              className={`object-cover ${className}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
            />
          ) : (
            <img
              src={src}
              alt={alt}
              className={`w-full h-full object-cover ${className}`}
              loading={priority ? "eager" : "lazy"}
            />
          )}
        </div>

        {/* Optional Custom Badges Overlay */}
        {badge && <div className="absolute top-3 left-3 z-10 pointer-events-none">{badge}</div>}

        {/* 2.4x Zoom Active Indicator Pill */}
        <div
          className={`absolute top-3 right-3 z-10 pointer-events-none transition-all duration-200 ${
            isZoomActive ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold shadow-lg border border-white/20">
            <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
            <span>2.4x Close-Up</span>
          </div>
        </div>

        {/* Helper Badge: Desktop / Mobile Instruction */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-medium tracking-wide">
            Move mouse or touch to pan
          </span>
        </div>

        {/* ----------------------------------------------------
            3. FULLSCREEN HD LIGHTBOX EXPAND BUTTON (⛶)
            ---------------------------------------------------- */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsLightboxOpen(true);
          }}
          title="Fullscreen HD View (⛶)"
          aria-label="Open Fullscreen HD Lightbox"
          className="absolute bottom-3 right-3 z-20 p-2.5 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white backdrop-blur-md border border-white/25 shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center group/btn"
        >
          <Maximize2 className="w-4 h-4 group-hover/btn:text-amber-400 transition-colors" />
        </button>
      </div>

      {/* ====================================================
          FULLSCREEN HD LIGHTBOX MODAL (BLACK BACKDROP)
          ==================================================== */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Top Bar: Title & Controls */}
            <div
              className="flex items-center justify-between text-white z-10 pb-4 border-b border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {lightboxTitle || alt}
                </h3>
                {lightboxSubtitle && (
                  <p className="text-xs text-slate-400 mt-0.5">{lightboxSubtitle}</p>
                )}
              </div>

              {/* Action Controls */}
              <div className="flex items-center gap-2">
                {/* Zoom In (+) */}
                <button
                  type="button"
                  onClick={() => setLightboxScale((s) => Math.min(4, s + 0.5))}
                  title="Zoom In"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {/* Zoom Out (-) */}
                <button
                  type="button"
                  onClick={() => setLightboxScale((s) => Math.max(1, s - 0.5))}
                  title="Zoom Out"
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                {/* Reset (1x) */}
                {lightboxScale > 1 && (
                  <button
                    type="button"
                    onClick={() => setLightboxScale(1)}
                    title="Reset Zoom"
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-400 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}

                {/* Close Button (X) */}
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  title="Close Fullscreen (Esc)"
                  className="p-2 rounded-xl bg-white/15 hover:bg-red-600 text-white transition-colors cursor-pointer ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Center: Fullscreen High-Res Image View */}
            <div
              className="flex-1 flex items-center justify-center overflow-auto p-2 sm:p-6"
              onClick={() => setIsLightboxOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative max-w-6xl max-h-[85vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={src}
                  alt={alt}
                  style={{ transform: `scale(${lightboxScale})` }}
                  className="max-h-[80vh] max-w-full object-contain rounded-2xl shadow-2xl transition-transform duration-200 cursor-grab active:cursor-grabbing"
                />
              </motion.div>
            </div>

            {/* Bottom Bar: Hints & Scale Indicator */}
            <div
              className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-white font-mono text-[10px]">Esc</kbd> or click outside to close</span>
              <span className="font-mono text-white/80">Zoom: {lightboxScale.toFixed(1)}x</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
