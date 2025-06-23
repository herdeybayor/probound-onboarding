"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
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

export function AuthCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;

        emblaApi.on("select", onSelect);
        onSelect();

        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <div className="flex-1 hidden lg:flex flex-col bg-gray-100 h-[calc(100vh-100px)] rounded-[24px] overflow-hidden">
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
                            type="button"
                            className={`dot ${selectedIndex === index ? "active" : ""}`}
                            onClick={() => emblaApi?.scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
