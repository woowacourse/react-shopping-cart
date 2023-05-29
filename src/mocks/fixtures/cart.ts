import { getCart } from '../../utils/localStorage';

export const MockCart = {
  cart: getCart([
    {
      id: 1,
      quantity: 3,
      product: {
        id: 1,
        name: 'Lavender Shampoo Bar Lavender Shampoo Bar Lavender Shampoo Bar',
        price: 12000,
        imageUrl:
          'https://cdn.shopify.com/s/files/1/2806/9936/products/suds-co-sunkissed-shampoo-bar-zero-waste-shampoo-3oz-12-scents-30710433415279.jpg?v=1678125583&width=900',
      },
    },
  ]),
};
