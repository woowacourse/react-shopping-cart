import { CartItemType } from "@/types/cart.type";
import { curKoreaTime } from "./date";

export const isValidExpirationDate = (expirationDate: string) => {
  const today = curKoreaTime;
  const expiration = new Date(expirationDate);
  return today <= expiration;
};

export const isValidAvailableTime = (
  availableTime:
    | {
        start: string;
        end: string;
      }
    | undefined
) => {
  if (availableTime) {
    const startTime = Number(availableTime.start.slice(0, 2));
    const endTime = Number(availableTime.end.slice(0, 2));
    const curTime = curKoreaTime.getHours();

    if (curTime < startTime || curTime >= endTime) {
      return false;
    }
  }
  return true;
};

export const isValidMinimumAmount = (
  orderPrice: number,
  minimumAmount: number | undefined
) => {
  if (minimumAmount && orderPrice < minimumAmount) {
    return false;
  }
  return true;
};

export const isValidMinimumQuantity = (
  selectedItems: CartItemType[],
  minimumQuantity: number | undefined
) => {
  if (
    minimumQuantity &&
    selectedItems.every((item) => item.quantity < minimumQuantity)
  ) {
    return false;
  }
  return true;
};
