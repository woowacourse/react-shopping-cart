interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

type MutationFetchMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type { Product, CartItem, MutationFetchMethod };
