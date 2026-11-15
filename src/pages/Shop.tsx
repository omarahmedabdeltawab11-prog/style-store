import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import type { Category } from "../types";

const categories: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "hoodies", label: "Hoodies" },
  { value: "tees", label: "Tees" },
  { value: "outerwear", label: "Outerwear" },
  { value: "accessories", label: "Accessories" },
];

type SortOption = "featured" | "price-asc" | "price-desc";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = (searchParams.get("category") as Category | null) ?? "all";
  const [sort, setSort] = useState<SortOption>("featured");

  const filtered = useMemo(() => {
    const list =
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory);

    if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [activeCategory, sort]);

  const setCategory = (value: Category | "all") => {
    if (value === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", value);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8 flex flex-col gap-2">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Shop All</p>
        <h1 className="text-4xl font-black uppercase tracking-tight">The Collection</h1>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategory(cat.value)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                activeCategory === cat.value
                  ? "border-accent bg-accent text-ink"
                  : "border-white/20 text-paper/70 hover:border-accent hover:text-accent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="rounded-full border border-white/20 bg-ink px-4 py-2 text-sm font-semibold uppercase tracking-wide outline-none focus:border-accent"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-paper/50">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
