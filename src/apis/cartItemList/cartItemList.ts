import { generateBasicToken } from '../../utils/auth';

const API_URL = process.env.VITE_API_URL || 'url';
const USER_ID = process.env.VITE_API_USER_ID || 'id';
const USER_PASSWORD = process.env.VITE_API_USER_PASSWORD || 'password';

export interface Root {
  content: ResponseCartItem[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  sort: Sort2;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

interface ResponseCartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface TransformedCartItem {
  cartItemId: number;
  quantity: number;
  product: Product;
}

interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface Sort2 {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

const transformCartItemListData = (arr: ResponseCartItem[]): TransformedCartItem[] => {
  return arr.map(({ id, quantity, product }: ResponseCartItem) => ({
    quantity,
    product: {
      productId: id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
    },
    cartItemId: id,
  }));
};

export const requestCartItemList = async (): Promise<TransformedCartItem[]> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products:');
  }
  const data = await response.json();

  return transformCartItemListData(data.content);
};

export const requestSetCartItemQuantity = async (cartItemId: number, quantity: number) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'PATCH',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quantity,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to setCartItemQuantity');
  }
};

export const requestDeleteCartItem = async (cartItemId: number) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'DELETE',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: cartItemId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to deleteCartItem');
  }
};
