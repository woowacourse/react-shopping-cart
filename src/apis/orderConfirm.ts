import ApiClient from '@apis/ApiClient';

export default class OrderConfirmFetcher {
  static async getCoupons() {
    const response = await ApiClient.get('coupons');

    ApiClient.validateResponse(response, '쿠폰 목록을 불러오는데 실패했습니다.');

    const data = await response.json();

    return data;
  }

  static async postNewOrders(cartItemIds: number[]) {
    const response = await ApiClient.post('orders', { cartItemIds });

    ApiClient.validateResponse(response, '주문을 실패했습니다.');
  }
}
