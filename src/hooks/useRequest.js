import { PATH, request, getFetchParams } from '../request';

export const useRequest = () => {
  const getProductList = async () => {
    const params = getFetchParams({ path: PATH.PRODUCT });
    const response = await request.get(params);
    const productList = await response.json();

    return productList.map(({ product_id, price, name, image_url }) => ({
      id: product_id,
      price,
      name,
      img: image_url,
    }));
  };

  const getOrderList = async () => {
    const params = getFetchParams({ path: PATH.ORDER });
    const response = await request.get(params);
    const orderList = await response.json();

    return orderList.map(({ order_id, order_details }) => {
      const orderItems = order_details.map(({ product_id, price, name, image_url, quantity }) => ({
        id: product_id,
        name,
        price,
        img: image_url,
        quantity,
      }));

      return { orderId: order_id, orderItems };
    });
  };

  return { getProductList, getOrderList };
};
