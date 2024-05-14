import { Products } from '../types/Product';
import { generateBasicToken } from '../utils/Auth';

const API_KEY = import.meta.env.VITE_API_URL;

const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

export async function fetchProducts(): Promise<Products[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_KEY}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await response.json();
  return data.content;
}
