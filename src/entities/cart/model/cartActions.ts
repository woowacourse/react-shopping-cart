import { CartData } from '@entities/cart/model/createCartData';
import { getCartItems } from '@entities/cart/api/getCartItems';
import { deleteCartItem } from '@entities/cart/api/deleteCartItem';
import { updateCartItemQuantity } from '@entities/cart/api/updateCartItemQuantity';

export const cartActions = {
  async fetchItems(cartData: CartData) {
    cartData.setLoading(true);
    cartData.setError(null);

    try {
      const data = await getCartItems();
      cartData.setItems(data);
    } catch (error) {
      cartData.setError(
        error instanceof Error ? error.message : '장바구니를 불러오는데 실패했습니다.',
      );
    } finally {
      cartData.setLoading(false);
    }
  },

  async updateQuantity(cartData: CartData, id: number, quantity: number) {
    const originalItems = cartData.items;
    cartData.setItems(
      cartData.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );

    try {
      await updateCartItemQuantity({ id, quantity });
    } catch (error) {
      cartData.setItems(originalItems);
      cartData.setError(error instanceof Error ? error.message : '수량 변경에 실패했습니다.');
    }
  },

  async removeItem(cartData: CartData, id: number) {
    const originalItems = cartData.items;
    cartData.setItems(cartData.items.filter((item) => item.id !== id));

    try {
      await deleteCartItem(id);
    } catch (error) {
      cartData.setItems(originalItems);
      cartData.setError(error instanceof Error ? error.message : '아이템 삭제에 실패했습니다.');
    }
  },
};
