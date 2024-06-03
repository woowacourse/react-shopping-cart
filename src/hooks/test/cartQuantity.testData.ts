interface CartQuantityType {
  id: number;
  quantity: number;
}

export const cartQuantityPass: CartQuantityType[] = [
  {
    id: 1,
    quantity: 1,
  },
  {
    id: 2,
    quantity: 1,
  },
  {
    id: 3,
    quantity: 1,
  },
  {
    id: 4,
    quantity: 4,
  },
  {
    id: 5,
    quantity: 1,
  },
];

export const cartQuantityFail: CartQuantityType[] = [
  {
    id: 1,
    quantity: 1,
  },
  {
    id: 2,
    quantity: 1,
  },
  {
    id: 3,
    quantity: 1,
  },
  {
    id: 4,
    quantity: 0,
  },
  {
    id: 5,
    quantity: 0,
  },
];
