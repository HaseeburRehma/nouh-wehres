"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSlider({
  images,
  interval = 4000,
}: {
  images: { src: string; alt: string }[];
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(
      () => setI((p) => (p + 1) % images.length),
      interval
    );
    return () => clearInterval(id);
  }, [images.length, interval, paused]);

  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 to-surface shadow-xl ring-1 ring-line sm:aspect-[3/4] lg:aspect-[4/5]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((img, idx) => (
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          priority={idx === 0}
          sizes="(max-width: 1024px) 100vw, 45vw"
          className={`object-cover transition-opacity duration-700 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Bild ${idx + 1}`}
            aria-current={idx === i}
            onClick={() => setI(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === i ? "w-5 bg-white" : "w-2 bg-white/60 hover:bg-white/90"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
