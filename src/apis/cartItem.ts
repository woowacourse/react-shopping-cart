const BASE_URL = import.meta.env.VITE_BASE_URL;
const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

export const fetchCartItems = async () => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${BASE_URL}/cart-items`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('failed to fetch cart items');
  }

  const data = await response.json();
  return data.content;
};

export function generateBasicToken(userId: string, userPassword: string): string {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
}
