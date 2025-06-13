import { CartItemTypes } from "../../../shopping-cart/types/cartItem";
import { AvailableTime } from "../../types/coupon";
import { getNowInMinutes, getTimeInMinutes } from "../../utils/getDateInfo";

// =============== Validation interface ===============

interface ValidateDateParams {
  expirationDate: string;
  today: Date;
}

interface ValidateTimeParams {
  availableTime: AvailableTime;
  today: Date;
}

interface ValidateMinimumAmountParams {
  minimumAmount: number;
  orderPrice: number;
}

interface ValidateTwoPlusOneParams {
  twoPlusOneApplicableItems: CartItemTypes[];
}

// =============== Validation Functions ===============

function validateDate({ expirationDate, today }: ValidateDateParams) {
  return new Date(expirationDate) >= today;
}

function validateTime({ availableTime, today }: ValidateTimeParams) {
  const { start, end } = availableTime;

  const startMinutes = getTimeInMinutes(start);
  const endMinutes = getTimeInMinutes(end);
  const nowMinutes = getNowInMinutes(today);

  return nowMinutes >= startMinutes && nowMinutes <= endMinutes;
}

function validateMinimumAmount({
  minimumAmount,
  orderPrice,
}: ValidateMinimumAmountParams) {
  return orderPrice >= minimumAmount;
}

function validateTwoPlusOne({
  twoPlusOneApplicableItems,
}: ValidateTwoPlusOneParams) {
  return twoPlusOneApplicableItems.length > 0;
}

export {
  validateDate,
  validateMinimumAmount,
  validateTime,
  validateTwoPlusOne,
};
