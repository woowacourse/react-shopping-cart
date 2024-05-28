import ApiClient from '@apis/ApiClient';

export default class ShoppingCartFetcher {
  static async getCartItems() {
    const response = await ApiClient.get('cart-items');

    ApiClient.validateResponse(response, '장바구니 목록을 불러오는데 실패했습니다.');

    const data = await response.json();

    return data.content;
  }

  static async patchCartItemCount(productId: number, quantity: number) {
    const response = await ApiClient.patch(`cart-items/${productId}`, { quantity });

    ApiClient.validateResponse(response, '수량 변경을 실패했습니다.');
  }

  static async deleteCartItem(id: number) {
    const response = await ApiClient.delete(`cart-items/${id}`);

    ApiClient.validateResponse(response, '장바구니 아이템을 삭제하지 못했습니다.');
  }
}
