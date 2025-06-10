import type { OrderConfirmationState } from "../types/pageState";

export const isOrderConfirmationState = (
  state: unknown
): state is OrderConfirmationState => {
  if (typeof state !== "object" || state === null) return false;
  const s = state as any;

  return (
    Array.isArray(s.orderItems) &&
    typeof s.orderPrice === "number" &&
    typeof s.deliveryFee === "number"
  );
};
