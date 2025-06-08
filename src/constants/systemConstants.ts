export const FEE = {
  DELIVERY_FEE: 3000,
  DELIVERY_FEE_FREE: 0,
  DELIVERY_FEE_STANDARD: 100_000,
} as const;

export const ROUTE = {
  HOME: '/',
  ORDER_COMPLETE: '/order-complete',
  PAYMENT_CONFIRMATION: '/payment-confirmation',
};
