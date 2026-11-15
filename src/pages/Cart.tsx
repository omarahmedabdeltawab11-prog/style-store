import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProductById } from "../data/products";
import GarmentArt from "../components/GarmentArt";

export default function Cart() {
  const { lines, updateQuantity, removeItem, subtotal } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-24 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tight">Your Bag is Empty</h1>
        <p className="text-ink/60">Looks like you haven't added anything yet.</p>
        <Link
          to="/shop"
          className="rounded-full bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wide text-paper"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="mb-8 text-3xl font-black uppercase tracking-tight md:text-4xl">Your Bag</h1>

      <div className="grid gap-10 md:grid-cols-3">
        <div className="flex flex-col gap-4 md:col-span-2">
          {lines.map((line) => {
            const product = getProductById(line.productId);
            if (!product) return null;
            return (
              <div
                key={`${line.productId}-${line.size}`}
                className="flex gap-4 rounded-2xl border border-ink/10 bg-ink/[0.04] p-4"
              >
                <div
                  className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: product.color }}
                >
                  <GarmentArt product={product} className="h-16 w-16" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to={`/product/${product.id}`}
                        className="font-semibold hover:text-accent"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm text-ink/50">Size {line.size}</p>
                    </div>
                    <p className="font-bold text-accent">
                      ${(product.price * line.quantity).toFixed(0)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 rounded-full border border-ink/15 px-2 py-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.productId, line.size, line.quantity - 1)}
                        className="h-7 w-7 rounded-full transition-colors hover:text-accent"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm font-semibold">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(line.productId, line.size, line.quantity + 1)}
                        className="h-7 w-7 rounded-full transition-colors hover:text-accent"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.productId, line.size)}
                      className="text-xs font-semibold uppercase tracking-wide text-ink/50 hover:text-accent"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-fit rounded-2xl border border-ink/10 bg-ink/[0.04] p-6">
          <h2 className="mb-4 text-lg font-black uppercase tracking-tight">Order Summary</h2>
          <div className="flex justify-between text-sm text-ink/70">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(0)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-ink/70">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="my-4 border-t border-ink/10" />
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>${subtotal.toFixed(0)}</span>
          </div>
          <Link
            to="/checkout"
            className="mt-6 block rounded-full bg-accent py-3 text-center text-sm font-bold uppercase tracking-wide text-paper transition-transform hover:scale-[1.02]"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
