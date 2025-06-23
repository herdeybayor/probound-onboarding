"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./embla.css";

const SLIDES = [
    {
        id: 1,
        image: "/images/carousel1.png",
        title: "Makes Custom Outreach",
        description: "Probound is revolutionizing the way outbound sales are done. Powered by AI for boundless customer reach.",
    },
    {
        id: 2,
        image: "/images/carousel2.png",
        title: "Generate Leads",
        description: "Probound is revolutionizing the way outbound sales are done. Powered by AI for boundless customer reach.",
    },
    {
        id: 3,
        image: "/images/carousel3.png",
        title: "Book Demos",
        description: "Probound is revolutionizing the way outbound sales are done. Powered by AI for boundless customer reach.",
    },
];

// Define interface for the autoplay plugin
interface AutoplayApi {
    play: (jump?: boolean) => void;
    stop: () => void;
    reset: () => void;
    isPlaying: () => boolean;
    timeUntilNext: () => number | null;
}

const autoplayOptions = {
    delay: 5000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
};

export function AuthCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay(autoplayOptions)]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [autoplay, setAutoplay] = useState<AutoplayApi | null>(null);
    const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const resetDotAnimation = useCallback(() => {
        // Reset animation by removing and re-adding the active class
        const activeDot = dotRefs.current[selectedIndex];
        if (activeDot) {
            activeDot.classList.remove("active");
            // Force a reflow to restart the animation
            void activeDot.offsetWidth;
            activeDot.classList.add("active");
        }
    }, [selectedIndex]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        const newIndex = emblaApi.selectedScrollSnap();
        if (newIndex !== selectedIndex) {
            setSelectedIndex(newIndex);
            // We'll reset the animation in the useEffect that listens to selectedIndex
        }
    }, [emblaApi, selectedIndex]);

    useEffect(() => {
        if (!emblaApi) return;

        emblaApi.on("select", onSelect);
        onSelect();

        // Store the autoplay plugin instance
        const pluginList = emblaApi.plugins();
        if (pluginList.autoplay) {
            setAutoplay(pluginList.autoplay as AutoplayApi);
        }

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    useEffect(() => {
        // Reset dot animation whenever the selected index changes
        resetDotAnimation();
    }, [selectedIndex, resetDotAnimation]);

    return (
        <div className="flex-1 hidden lg:flex flex-col bg-gray-100 h-[calc(100vh-24px)] rounded-[24px] overflow-hidden">
            <div className="embla h-full w-full relative" ref={emblaRef}>
                <div className="embla__container h-full">
                    {SLIDES.map((slide) => (
                        <div key={slide.id} className="embla__slide h-full">
                            <div className="relative h-full w-full">
                                <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                                <div className="slide-overlay">
                                    <h2 className="slide-title">{slide.title}</h2>
                                    <p className="slide-description">{slide.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="dot-container">
                    {SLIDES.map((slide, index) => (
                        <button
                            key={slide.id}
                            ref={(el) => {
                                dotRefs.current[index] = el;
                            }}
                            type="button"
                            className={`dot ${selectedIndex === index ? "active" : ""}`}
                            onClick={() => {
                                emblaApi?.scrollTo(index);
                                if (autoplay) {
                                    autoplay.reset();
                                }
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                            onMouseEnter={() => autoplay?.stop()}
                            onMouseLeave={() => {
                                autoplay?.play();
                                if (selectedIndex === index) {
                                    resetDotAnimation();
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
