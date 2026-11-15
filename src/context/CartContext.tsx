import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartLine } from "../types";
import { getProductById } from "../data/products";

const STORAGE_KEY = "hustle-co-cart";

interface CartContextValue {
  lines: CartLine[];
  addItem: (productId: string, size: string, quantity: number) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  removeItem: (productId: string, size: string) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStoredLines(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => readStoredLines());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore storage failures (private browsing, quota, etc.)
    }
  }, [lines]);

  const addItem = (productId: string, size: string, quantity: number) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.productId === productId && l.size === size);
      if (existing) {
        return prev.map((l) =>
          l.productId === productId && l.size === size
            ? { ...l, quantity: l.quantity + quantity }
            : l,
        );
      }
      return [...prev, { productId, size, quantity }];
    });
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => !(l.productId === productId && l.size === size))
        : prev.map((l) =>
            l.productId === productId && l.size === size ? { ...l, quantity } : l,
          ),
    );
  };

  const removeItem = (productId: string, size: string) => {
    setLines((prev) => prev.filter((l) => !(l.productId === productId && l.size === size)));
  };

  const clear = () => setLines([]);

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const product = getProductById(l.productId);
        return sum + (product ? product.price * l.quantity : 0);
      }, 0),
    [lines],
  );

  const value: CartContextValue = {
    lines,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
