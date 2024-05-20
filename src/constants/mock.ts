import { CartItemProps } from '@/types/cartItem';

export const TOTAL_PRICE_UNDER_100000_DATA: CartItemProps[] = [
  {
    id: 496,
    quantity: 1,
    product: {
      id: 2,
      name: '나이키',
      price: 1000,
      imageUrl:
        'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
      category: 'fashion',
    },
  },
  {
    id: 532,
    quantity: 2,
    product: {
      id: 10,
      name: '아디다스',
      price: 10000,
      imageUrl: 'https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg',
      category: 'fashion',
    },
  },
] as const;

export const TOTAL_PRICE_OVER_100000_DATA: CartItemProps[] = [
  {
    id: 532,
    quantity: 10,
    product: {
      id: 10,
      name: '퓨마',
      price: 10000,
      imageUrl: 'https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg',
      category: 'fashion',
    },
  },
] as const;
