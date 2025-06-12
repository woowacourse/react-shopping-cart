import { ReactNode } from "react";

interface RenderIfItemsExistProps<T> {
  items: T[];
  fallback: ReactNode;
  children: ReactNode;
}

export default function RenderIfItemsExist<T>({ items, fallback, children }: RenderIfItemsExistProps<T>) {
  if (items.length === 0) return fallback;
  return children;
}
