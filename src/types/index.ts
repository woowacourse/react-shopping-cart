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

interface ToastState {
  type: 'success' | 'error' | 'warning';
  message: string;
}

type MutationFetchMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type { Product, CartItem, ToastState, MutationFetchMethod };
