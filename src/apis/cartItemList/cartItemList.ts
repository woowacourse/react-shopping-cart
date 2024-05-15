import { generateBasicToken } from '../../utils/auth';

const API_URL = import.meta.env.VITE_API_URL;
const USER_ID = import.meta.env.VITE_API_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_API_USER_PASSWORD;

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

// TODO: 함수명 수정과 날것의  response 타입 선언
const make = (arr: ResponseCartItem[]) => {
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

// TODO: 헤더 분리해서 재사용
export const getCartItemList = async (): Promise<CartItem[]> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }

  const data = await response.json();

  return make(data.content);
};

export const setCartItemQuantity = async (cartItemId: number, quantity: number) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}/cart-items/${cartItemId}`, {
    method: 'PATCH',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quantity,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to addCartItemQuantity');
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
    throw new Error('Failed to addCartItemQuantity');
  }
};
