import { renameObjKeys } from '../utils/renameObjKeys';

type ProductsData = {
  product_id: number;
  price: number;
  name: string;
  image_url: string;
};

type CartData = {
  cart_id: number;
  price: number;
  name: string;
  image_url: string;
};

type OrderData = {
  order_id: number;
  order_details: [];
};

export const FORMAT_DATA = {
  PRODUCTS: (dataList: ProductsData[]): Product[] =>
    (dataList.map(data =>
      renameObjKeys(data, [
        ['product_id', 'productId'],
        ['image_url', 'thumbnail'],
      ])
    ) as unknown) as Product[],
  PRODUCT: (data: ProductsData): Product =>
    (renameObjKeys(data, [
      ['product_id', 'productId'],
      ['image_url', 'thumbnail'],
    ]) as unknown) as Product,
  CART: (dataList: CartData[]): CartItem[] =>
    (dataList.map(data => {
      return {
        ...renameObjKeys(data, [
          ['cart_id', 'cartId'],
          ['product_id', 'productId'],
          ['image_url', 'thumbnail'],
        ]),
        quantity: '1',
        isSelected: true,
      };
    }) as unknown) as CartItem[],
  ORDERS: (dataList: OrderData[]): Orders =>
    (dataList.map(data => {
      return {
        ...renameObjKeys(data, [['order_id', 'orderId']]),
        orderDetails: data.order_details.map(item => ({
          ...renameObjKeys(item, [
            ['product_id', 'productId'],
            ['image_url', 'thumbnail'],
          ]),
        })),
      };
    }) as unknown) as Orders,
  ORDER: (data: OrderData): Order =>
    (({
      ...renameObjKeys(data, [['order_id', 'orderId']]),
      orderDetails: data.order_details.map(item => ({
        ...renameObjKeys(item, [
          ['product_id', 'productId'],
          ['image_url', 'thumbnail'],
        ]),
      })),
    } as unknown) as Order),
};
