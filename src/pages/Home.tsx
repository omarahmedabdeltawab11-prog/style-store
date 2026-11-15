import { useRef } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

function HangerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor">
      <circle cx="12" cy="4.5" r="1.6" strokeWidth="1.5" />
      <path d="M12 6v2" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M3.5 16.5 11 9.8a1.4 1.4 0 0 1 2 0l7.5 6.7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2.5 17.2h19" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Home() {
  const railRef = useRef<HTMLDivElement>(null);
  const featured = products.slice(0, 6);
  const newArrivals = products.filter((p) => p.isNew);

  const scrollRail = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-20 pb-20">
      <section className="mx-auto w-full max-w-6xl px-5 pt-16 text-center md:pt-24">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">New Season Drop</p>
        <h1 className="mt-4 text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl">
          No Rules. <span className="text-accent">Just Style.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-ink/60 md:text-lg">
          Oversized fits, heavyweight fleece, and silhouettes made for the street. Gear up with
          the latest Hustle Co. collection.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/shop"
            className="rounded-full bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wide text-paper transition-transform hover:scale-105"
          >
            Shop Now
          </Link>
          <Link
            to="/shop?category=hoodies"
            className="rounded-full border border-ink/25 px-8 py-3 text-sm font-bold uppercase tracking-wide transition-colors hover:border-accent hover:text-accent"
          >
            Hoodies
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl">
            Best Sellers
          </h2>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollRail(-1)}
              aria-label="Scroll left"
              className="h-9 w-9 rounded-full border border-ink/15 transition-colors hover:border-accent hover:text-accent"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollRail(1)}
              aria-label="Scroll right"
              className="h-9 w-9 rounded-full border border-ink/15 transition-colors hover:border-accent hover:text-accent"
            >
              ›
            </button>
          </div>
        </div>
        <div
          ref={railRef}
          className="relative flex gap-8 overflow-x-auto pb-4 pt-9 [-ms-overflow-style:none] [scrollbar-width:thin]"
        >
          <div className="pointer-events-none absolute inset-x-2 top-5 h-[3px] rounded-full bg-ink/20" />
          {featured.map((product) => (
            <div key={product.id} className="relative w-56 shrink-0">
              <HangerIcon className="absolute left-1/2 top-[-28px] h-8 w-8 -translate-x-1/2 text-ink/50" />
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {newArrivals.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-5">
          <h2 className="mb-6 text-2xl font-black uppercase tracking-tight md:text-3xl">
            Just Dropped
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-6xl px-5">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-ink/10 bg-ink/[0.04] px-6 py-12 text-center">
          <h2 className="text-2xl font-black uppercase tracking-tight md:text-4xl">
            Built Different. Worn Everywhere.
          </h2>
          <p className="max-w-xl text-ink/60">
            Join the Hustle Co. mailing list for early access to drops and exclusive discounts.
          </p>
          <form
            className="mt-2 flex w-full max-w-md gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="w-full rounded-full border border-ink/15 bg-transparent px-5 py-3 text-sm outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase text-paper"
            >
              Join
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
