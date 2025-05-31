export const CART_ACTIONS = {
  plus: 'plus',
  minus: 'minus',
  delete: 'delete',
} as const;

export type CartActionType = (typeof CART_ACTIONS)[keyof typeof CART_ACTIONS];
