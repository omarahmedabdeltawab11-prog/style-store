import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/shop", label: "Shop All" },
  { to: "/shop?category=hoodies", label: "Hoodies" },
  { to: "/shop?category=tees", label: "Tees" },
  { to: "/shop?category=outerwear", label: "Outerwear" },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const currentPath = `${location.pathname}${location.search}`;

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="text-xl font-black tracking-tight" onClick={() => setOpen(false)}>
          HUSTLE<span className="text-accent">.</span>CO
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-wide md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`transition-colors hover:text-accent ${
                currentPath === link.to ? "text-accent" : "text-ink/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Bag
            {itemCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-paper">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="text-2xl md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink/10 px-5 py-4 text-sm font-semibold uppercase tracking-wide md:hidden">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`py-2 transition-colors hover:text-accent ${
                currentPath === link.to ? "text-accent" : "text-ink/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
