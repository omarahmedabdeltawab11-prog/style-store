export type Category = "hoodies" | "tees" | "outerwear" | "accessories";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  color: string;
  accent: string;
  image: string;
  description: string;
  sizes: string[];
  isNew?: boolean;
}

export interface CartLine {
  productId: string;
  size: string;
  quantity: number;
}
