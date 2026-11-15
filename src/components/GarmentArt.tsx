import type { Product } from "../types";

interface GarmentArtProps {
  product: Pick<Product, "category" | "color" | "accent">;
  className?: string;
}

function Hoodie({ color, accent }: { color: string; accent: string }) {
  return (
    <>
      <path
        d="M60 70 L85 40 Q100 25 115 40 L140 70 L155 95 L135 110 L128 92 L128 170 Q128 185 113 185 L87 185 Q72 185 72 170 L72 92 L65 110 L45 95 Z"
        fill={color}
        stroke={accent}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M85 40 Q100 55 115 40"
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="100" cy="68" r="3" fill={accent} />
      <circle cx="100" cy="80" r="3" fill={accent} />
      <circle cx="100" cy="92" r="3" fill={accent} />
      <path d="M78 150 L122 150" stroke={accent} strokeWidth="2" opacity="0.5" />
    </>
  );
}

function Tee({ color, accent }: { color: string; accent: string }) {
  return (
    <>
      <path
        d="M70 55 L85 42 L115 42 L130 55 L152 72 L136 95 L128 85 L128 175 Q128 185 118 185 L82 185 Q72 185 72 175 L72 85 L64 95 L48 72 Z"
        fill={color}
        stroke={accent}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M85 42 Q100 60 115 42" fill="none" stroke={accent} strokeWidth="3" />
      <rect x="92" y="90" width="16" height="16" rx="2" fill="none" stroke={accent} strokeWidth="2" opacity="0.6" />
    </>
  );
}

function Outerwear({ color, accent }: { color: string; accent: string }) {
  return (
    <>
      <path
        d="M62 65 L88 40 L100 50 L112 40 L138 65 L152 90 L133 103 L128 88 L128 180 Q128 188 118 188 L100 188 L82 188 Q72 188 72 180 L72 88 L67 103 L48 90 Z"
        fill={color}
        stroke={accent}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M100 50 L100 188" stroke={accent} strokeWidth="2.5" />
      <circle cx="100" cy="75" r="2.5" fill={accent} />
      <circle cx="100" cy="95" r="2.5" fill={accent} />
      <circle cx="100" cy="115" r="2.5" fill={accent} />
      <circle cx="100" cy="135" r="2.5" fill={accent} />
      <rect x="78" y="140" width="18" height="14" rx="2" fill="none" stroke={accent} strokeWidth="2" opacity="0.6" />
    </>
  );
}

function Accessory({ color, accent }: { color: string; accent: string }) {
  return (
    <>
      <ellipse cx="100" cy="90" rx="55" ry="38" fill={color} stroke={accent} strokeWidth="3" />
      <path d="M48 95 Q100 70 152 95" fill="none" stroke={accent} strokeWidth="2.5" opacity="0.7" />
      <rect x="75" y="120" width="50" height="60" rx="10" fill={color} stroke={accent} strokeWidth="3" />
      <path d="M85 120 L85 105 Q100 90 115 105 L115 120" fill="none" stroke={accent} strokeWidth="3" />
    </>
  );
}

export default function GarmentArt({ product, className }: GarmentArtProps) {
  const { category, color, accent } = product;
  return (
    <svg viewBox="0 0 200 220" className={className} role="img" aria-label={category}>
      <rect x="0" y="0" width="200" height="220" fill="transparent" />
      {category === "hoodies" && <Hoodie color={color} accent={accent} />}
      {category === "tees" && <Tee color={color} accent={accent} />}
      {category === "outerwear" && <Outerwear color={color} accent={accent} />}
      {category === "accessories" && <Accessory color={color} accent={accent} />}
    </svg>
  );
}
