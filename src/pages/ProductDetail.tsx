import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getProductById, products } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [size, setSize] = useState(product?.sizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToBag = () => {
    addItem(product.id, size, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-8 text-sm font-semibold text-ink/60 transition-colors hover:text-accent"
      >
        ← Back
      </button>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-3xl">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            {product.isNew && (
              <span className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-paper">
                New Arrival
              </span>
            )}
            <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-2xl font-bold text-accent">${product.price}</p>
          </div>

          <p className="text-ink/70">{product.description}</p>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink/50">
              Size
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                    size === s
                      ? "border-accent bg-accent text-paper"
                      : "border-ink/15 hover:border-accent hover:text-accent"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink/50">
              Quantity
            </p>
            <div className="flex w-fit items-center gap-4 rounded-full border border-ink/15 px-2 py-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-8 w-8 rounded-full text-lg transition-colors hover:text-accent"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="h-8 w-8 rounded-full text-lg transition-colors hover:text-accent"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToBag}
            className="w-full rounded-full bg-accent py-4 text-sm font-bold uppercase tracking-wide text-paper transition-transform hover:scale-[1.02]"
          >
            {added ? "Added to Bag ✓" : "Add to Bag"}
          </button>

          {added && (
            <Link to="/cart" className="text-center text-sm font-semibold text-accent underline">
              View Bag
            </Link>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-black uppercase tracking-tight">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
