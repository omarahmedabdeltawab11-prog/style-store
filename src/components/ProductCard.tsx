import { Link } from "react-router-dom";
import type { Product } from "../types";
import GarmentArt from "./GarmentArt";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:border-accent/60"
    >
      <div
        className="relative flex aspect-square items-center justify-center overflow-hidden"
        style={{ backgroundColor: product.color }}
      >
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-ink">
            New
          </span>
        )}
        <GarmentArt
          product={product}
          className="h-40 w-40 transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-sm font-semibold leading-snug">{product.name}</h3>
        <p className="text-sm font-bold text-accent">${product.price}</p>
      </div>
    </Link>
  );
}
