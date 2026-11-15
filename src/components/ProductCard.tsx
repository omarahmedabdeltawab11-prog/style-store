import { Link } from "react-router-dom";
import type { Product } from "../types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-ink/[0.04] transition-colors hover:border-accent/60"
    >
      <div className="relative aspect-square overflow-hidden">
        {product.isNew && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-paper">
            New
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-sm font-semibold leading-snug">{product.name}</h3>
        <p className="text-sm font-bold text-accent">${product.price}</p>
      </div>
    </Link>
  );
}
