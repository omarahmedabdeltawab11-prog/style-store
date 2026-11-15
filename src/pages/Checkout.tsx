import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  if (lines.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      clear();
      navigate("/order-confirmed");
    }, 600);
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="mb-8 text-3xl font-black uppercase tracking-tight md:text-4xl">Checkout</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <fieldset className="flex flex-col gap-4">
          <legend className="mb-2 text-sm font-bold uppercase tracking-wide text-accent">
            Contact & Shipping
          </legend>
          <input
            required
            type="text"
            placeholder="Full name"
            className="rounded-xl border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
          <input
            required
            type="email"
            placeholder="Email address"
            className="rounded-xl border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
          <input
            required
            type="text"
            placeholder="Shipping address"
            className="rounded-xl border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              type="text"
              placeholder="City"
              className="rounded-xl border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
            />
            <input
              required
              type="text"
              placeholder="Postal code"
              className="rounded-xl border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className="mb-2 text-sm font-bold uppercase tracking-wide text-accent">
            Payment (Demo)
          </legend>
          <p className="text-xs text-paper/50">
            This is a demo storefront — no real payment is processed. Enter any values.
          </p>
          <input
            required
            type="text"
            placeholder="Card number"
            inputMode="numeric"
            className="rounded-xl border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              type="text"
              placeholder="MM / YY"
              className="rounded-xl border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
            />
            <input
              required
              type="text"
              placeholder="CVC"
              inputMode="numeric"
              className="rounded-xl border border-white/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
            />
          </div>
        </fieldset>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>${subtotal.toFixed(0)}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-accent py-4 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {submitting ? "Placing Order…" : "Place Order"}
        </button>
      </form>
    </div>
  );
}
