import { CartItemTypes } from "../../../shopping-cart/types/cartItem";
import { AvailableTime } from "../../types/coupon";
import { getNowInMinutes, getTimeInMinutes } from "../../utils/getDateInfo";

// =============== Validation interface ===============

interface ValidateDateProps {
  expirationDate: string;
  today: Date;
}

interface ValidateTimeProps {
  availableTime: AvailableTime;
  today: Date;
}

interface ValidateMinimumAmountProps {
  minimumAmount: number;
  orderPrice: number;
}

interface ValidateTwoPlusOneProps {
  twoPlusOneApplicableItems: CartItemTypes[];
}

// =============== Validation Functions ===============

function validateDate({ expirationDate, today }: ValidateDateProps) {
  return new Date(expirationDate) >= today;
}

function validateTime({ availableTime, today }: ValidateTimeProps) {
  const { start, end } = availableTime;

  const startMinutes = getTimeInMinutes(start);
  const endMinutes = getTimeInMinutes(end);
  const nowMinutes = getNowInMinutes(today);

  return nowMinutes >= startMinutes && nowMinutes <= endMinutes;
}

function validateMinimumAmount({
  minimumAmount,
  orderPrice,
}: ValidateMinimumAmountProps) {
  return orderPrice >= minimumAmount;
}

function validateTwoPlusOne({
  twoPlusOneApplicableItems,
}: ValidateTwoPlusOneProps) {
  return twoPlusOneApplicableItems.length > 0;
}

export {
  validateDate,
  validateMinimumAmount,
  validateTime,
  validateTwoPlusOne,
};
