# Hustle Co. — Streetwear Store

A demo e-commerce storefront inspired by a modern streetwear brand site: bold typography, a
horizontal "best sellers" rail, and a clean product detail page with size/quantity selection.

Built with React + TypeScript + Vite + Tailwind CSS v4 + React Router. Product artwork is drawn
with inline SVG (no external images), and the cart is kept in `localStorage` — there's no backend,
and checkout is a demo form that doesn't charge anything.

## Pages

- `/` — Home: hero, best-sellers rail, new arrivals, newsletter signup
- `/shop` — Full catalog with category filters and sorting
- `/product/:id` — Product detail: size, quantity, add to bag
- `/cart` — Bag contents with quantity controls
- `/checkout` — Demo checkout form (no real payment)
- `/order-confirmed` — Order confirmation

## Getting started

```bash
npm install
npm run dev
```

## Adding real products

Edit `src/data/products.ts` to add/change products. Swap `GarmentArt` for real product photos by
replacing it in `src/components/ProductCard.tsx` and `src/pages/ProductDetail.tsx`.
