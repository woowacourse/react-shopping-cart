import { renameObjKeys } from '../utils/renameObjKeys';

type productsData = {
  product_id: number;
  price: number;
  name: string;
  image_url: string;
};

type cartData = {
  cart_id: number;
  price: number;
  name: string;
  image_url: string;
};

export const FORMAT_DATA = {
  PRODUCTS: (dataList: productsData[]) =>
    dataList.map(data =>
      renameObjKeys(data, [
        ['product_id', 'id'],
        ['image_url', 'thumbnail'],
      ])
    ),
  PRODUCT: (data: productsData) =>
    renameObjKeys(data, [
      ['product_id', 'id'],
      ['image_url', 'thumbnail'],
    ]),
  CART: (dataList: cartData[]) =>
    dataList.map(data => {
      return {
        ...renameObjKeys(data, [
          ['cart_id', 'cartId'],
          ['product_id', 'productId'],
          ['image_url', 'thumbnail'],
        ]),
        quantity: '1',
        isSelected: true,
      };
    }),
};
