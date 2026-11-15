import { Link } from "react-router-dom";

export default function OrderConfirmed() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-5 py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-3xl text-ink">
        ✓
      </span>
      <h1 className="text-3xl font-black uppercase tracking-tight md:text-4xl">
        Order Confirmed
      </h1>
      <p className="text-paper/60">
        Thanks for shopping with Hustle Co. A confirmation has been sent to your email. Your
        order is being packed and will ship soon.
      </p>
      <Link
        to="/shop"
        className="rounded-full bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wide text-ink"
      >
        Keep Shopping
      </Link>
    </div>
  );
}
