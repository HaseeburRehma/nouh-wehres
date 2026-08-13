"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Autoplaying crossfade slider for a set of same-purpose photos inside a card.
export default function ImageSlider({
  images,
  alt,
  interval = 3200,
}: {
  images: string[];
  alt: string;
  interval?: number;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className="relative h-64 w-full overflow-hidden">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} (${i + 1}/${images.length})`}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className={`object-cover transition-opacity duration-700 ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
        />
      ))}

      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-5 bg-white" : "w-1.5 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
