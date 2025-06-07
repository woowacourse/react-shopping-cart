import { VITE_BASE_URL } from '../constants/evt';

const deleteCartItems = async (id: number) => {
  const response = await fetch(`${VITE_BASE_URL}/cart-items/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete cart item');
  }

  return response.json();
};

export default deleteCartItems;
