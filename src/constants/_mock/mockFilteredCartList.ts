import { FilteredCartItemStateType } from '@/types/cart.type';

// 배송비 유무 확인 목 데이터
export const MOCK_FILTERED_CART_LIST_OVER_100000: FilteredCartItemStateType[] =
  [
    {
      id: 624,
      quantity: 5,
      isSelected: true,
      price: 20000,
    },
    {
      id: 674,
      quantity: 3,
      isSelected: true,
      price: 20000,
    },
    {
      id: 675,
      quantity: 7,
      isSelected: true,
      price: 1000,
    },
    {
      id: 676,
      quantity: 1,
      isSelected: true,
      price: 2000,
    },
  ];

export const MOCK_FILTERED_CART_LIST_LESS_100000 = [
  {
    id: 624,
    quantity: 5,
    isSelected: false,
    price: 20000,
  },
  {
    id: 674,
    quantity: 3,
    isSelected: false,
    price: 20000,
  },
  {
    id: 675,
    quantity: 7,
    isSelected: true,
    price: 1000,
  },
  {
    id: 676,
    quantity: 1,
    isSelected: false,
    price: 2000,
  },
];

// 전체 선택 확인 목 데이터
export const MOCK_FILTERED_CART_LIST_ALL_SELECTED = [
  {
    id: 624,
    quantity: 5,
    isSelected: true,
    price: 20000,
  },
  {
    id: 674,
    quantity: 3,
    isSelected: true,
    price: 20000,
  },
  {
    id: 675,
    quantity: 7,
    isSelected: true,
    price: 1000,
  },
  {
    id: 676,
    quantity: 1,
    isSelected: true,
    price: 2000,
  },
];

export const MOCK_FILTERED_CART_LIST_PARTLY_SELECTED = [
  {
    id: 624,
    quantity: 5,
    isSelected: false,
    price: 20000,
  },
  {
    id: 674,
    quantity: 3,
    isSelected: false,
    price: 20000,
  },
  {
    id: 675,
    quantity: 7,
    isSelected: true,
    price: 1000,
  },
  {
    id: 676,
    quantity: 1,
    isSelected: false,
    price: 2000,
  },
];
