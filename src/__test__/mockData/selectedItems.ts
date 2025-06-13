import {CartProduct} from '../../type/cart';

export const selectedItems: CartProduct[] = [
  {
    id: 1234,
    product: {
      category: 'Electronics',
      id: 1,
      imageUrl: 'https://example.com/images/product1.jpg',
      name: 'Wireless Headphones',
      price: 12000,
      quantity: 10,
    },
    quantity: 2,
  },
];

export const bogoSelectedItems: CartProduct[] = [
  ...selectedItems,
  {
    id: 1234,
    product: {
      category: 'Electronics',
      id: 1,
      imageUrl: 'https://example.com/images/product1.jpg',
      name: 'Wireless Headphones',
      price: 12000,
      quantity: 10,
    },
    quantity: 3,
  },
];

export const multipleBogoSelectedItems = [
  ...bogoSelectedItems,
  {
    id: 1234,
    product: {
      category: 'Electronics',
      id: 1,
      imageUrl: 'https://example.com/images/product1.jpg',
      name: 'Wireless Headphones',
      price: 50000,
      quantity: 10,
    },
    quantity: 3,
  },
];
