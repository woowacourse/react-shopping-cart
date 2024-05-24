import ApiClient from '@apis/ApiClient';
import HTTPError from '@errors/HTTPError';

export default class OrderConfirmFetcher {
  private static validateResponse(response: Response, errorMessage: string) {
    if (!response.ok) {
      throw new HTTPError(response.status, errorMessage);
    }
  }

  static async getCoupons() {
    const response = await ApiClient.get('coupons');

    OrderConfirmFetcher.validateResponse(response, '쿠폰 목록을 불러오는데 실패했습니다.');

    const data = await response.json();

    return data;
  }

  static async postNewOrders(cartItemIds: number[]) {
    const response = await ApiClient.post('orders', { cartItemIds });

    OrderConfirmFetcher.validateResponse(response, '주문을 실패했습니다.');
  }
}
