import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import GarmentHanger3D from "../components/GarmentHanger3D";
import type { Product } from "../types";

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

const TICKER_ITEMS = [
  "FREE SHIPPING OVER $100",
  "NEW DROP EVERY FRIDAY",
  "LIMITED SIZES — MOVE FAST",
  "BUILT DIFFERENT. WORN EVERYWHERE.",
];

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-ink py-2.5 text-paper">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 text-xs font-bold uppercase tracking-[0.2em]"
          >
            {item}
            <span className="text-accent">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const featured = products.slice(0, 6);
  const newArrivals = products.filter((p) => p.isNew);
  const [selectedId, setSelectedId] = useState(featured[0].id);

  const active: Product = featured.find((p) => p.id === selectedId) ?? featured[0];
  const others = featured.filter((p) => p.id !== active.id);

  return (
    <div className="flex flex-col gap-20 pb-20">
      <Ticker />

      <section className="relative mx-auto w-full max-w-6xl px-5 pt-16 text-center md:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        />
        <p className="animate-fade-up text-xs font-bold uppercase tracking-[0.3em] text-accent">
          New Season Drop
        </p>
        <h1 className="animate-fade-up mt-4 text-5xl font-black uppercase leading-[0.95] tracking-tight [animation-delay:80ms] md:text-7xl">
          No Rules. <span className="text-accent">Just Style.</span>
        </h1>
        <p className="animate-fade-up mx-auto mt-5 max-w-xl text-base text-ink/60 [animation-delay:160ms] md:text-lg">
          Oversized fits, heavyweight fleece, and silhouettes made for the street. Gear up with
          the latest Hustle Co. collection.
        </p>
        <div className="animate-fade-up mt-8 flex items-center justify-center gap-4 [animation-delay:240ms]">
          <Link
            to="/shop"
            className="rounded-full bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wide text-paper shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/30"
          >
            Shop Now
          </Link>
          <Link
            to="/shop?category=hoodies"
            className="rounded-full border border-ink/25 px-8 py-3 text-sm font-bold uppercase tracking-wide transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            Hoodies
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5">
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-6 top-[22px] h-[3px] rounded-full bg-ink/25 md:inset-x-10" />
          <div className="pointer-events-none absolute left-3 top-[15px] h-4 w-4 rounded-full bg-ink/25 md:left-6" />
          <div className="pointer-events-none absolute right-3 top-[15px] h-4 w-4 rounded-full bg-ink/25 md:right-6" />

          <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-center md:gap-8 lg:gap-14">
            <div className="flex w-56 shrink-0 flex-col items-center md:w-64">
              <HangerIcon className="h-9 w-9 text-ink/60" />
              <div
                className="mt-1 w-full overflow-hidden rounded-2xl shadow-xl shadow-ink/10 ring-1 ring-ink/5"
                style={{ backgroundColor: active.color }}
              >
                <img
                  key={active.id}
                  src={active.image}
                  alt={active.name}
                  className="animate-fade-up aspect-[4/5] w-full object-cover"
                />
              </div>
              <p className="mt-3 text-center text-sm font-semibold leading-snug">{active.name}</p>
              <p className="text-sm font-bold text-accent">${active.price}</p>
              <Link
                to={`/product/${active.id}`}
                className="mt-3 rounded-full bg-ink px-6 py-2 text-xs font-bold uppercase tracking-wide text-paper transition-all hover:-translate-y-0.5 hover:bg-accent"
              >
                View More
              </Link>
            </div>

            <div className="flex items-start gap-3 md:gap-5 lg:gap-7">
              {others.map((product) => {
                const isSelected = product.id === selectedId;
                return (
                  <div
                    key={product.id}
                    onClick={() => setSelectedId(product.id)}
                    className="group flex cursor-pointer flex-col items-center"
                    role="button"
                    tabIndex={0}
                    aria-label={`Show ${product.name}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setSelectedId(product.id);
                    }}
                  >
                    <HangerIcon
                      className={`h-7 w-7 transition-colors group-hover:text-accent ${
                        isSelected ? "text-accent" : "text-ink/50"
                      }`}
                    />
                    <div
                      className={`-mt-1 rounded-xl transition-transform duration-300 ${
                        isSelected ? "scale-110" : "scale-100 opacity-70 group-hover:opacity-100"
                      }`}
                    >
                      <GarmentHanger3D
                        color={product.color}
                        accent={product.accent}
                        className="h-16 w-14 md:h-24 md:w-20"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {newArrivals.length > 0 && (
        <section className="mx-auto w-full max-w-6xl px-5">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Fresh In</p>
          <div className="mb-6 mt-2 flex items-end justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tight md:text-3xl">
              Just Dropped
            </h2>
            <Link
              to="/shop"
              className="hidden text-xs font-bold uppercase tracking-wide text-ink/60 transition-colors hover:text-accent sm:inline"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto w-full max-w-6xl px-5">
        <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center text-paper">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl"
          />
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Stay in the loop</p>
          <h2 className="text-2xl font-black uppercase tracking-tight md:text-4xl">
            Built Different. Worn Everywhere.
          </h2>
          <p className="max-w-xl text-paper/60">
            Join the Hustle Co. mailing list for early access to drops and exclusive discounts.
          </p>
          <form
            className="relative mt-2 flex w-full max-w-md gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="w-full rounded-full border border-paper/20 bg-paper/5 px-5 py-3 text-sm text-paper outline-none placeholder:text-paper/40 focus:border-accent"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase text-paper transition-all hover:-translate-y-0.5 hover:bg-accent-dark"
            >
              Join
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
