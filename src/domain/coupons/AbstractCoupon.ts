import { CouponType } from "../../types/Coupon";
import { CartItemQuantityAndPrice } from "../../types/ShoppingCart";
import BuyXgetYCoupon from "./BuyXgetYCoupon";
import FixedCoupon from "./FixedCoupon";
import FreeShippingCoupon from "./FreeShippingCoupon";
import PercentageCoupon from "./PercentageCoupon";

export type CouponInstances = BuyXgetYCoupon | FixedCoupon | FreeShippingCoupon | PercentageCoupon;

abstract class Coupon {
  protected data: CouponType;

  constructor(coupon: CouponType) {
    this.data = coupon;
  }

  public abstract discountAmount(param: {
    amount: number;
    shippingFee: number;
    itemInfo: CartItemQuantityAndPrice[];
  }): number;

  public get discountType() {
    return this.data.discountType;
  }

  public get couponName() {
    return this.data.description;
  }

  public get couponExpirationDate() {
    if (!this.data.expirationDate) return undefined;

    const [year, month, day] = this.data.expirationDate.split("-");

    return `만료일: ${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
  }

  public get minimumAmount() {
    if (!this.data.minimumAmount) return undefined;

    return `최소 주문 금액: ${this.data.minimumAmount?.toLocaleString()}원`;
  }

  public get availableTime() {
    if (!this.data.availableTime) return undefined;

    const [startHours] = this.data.availableTime.start.split(":").map(Number);
    const [endHours] = this.data.availableTime.end.split(":").map(Number);

    return `사용 가능 시간: 오전 ${startHours}시부터 ${endHours}시까지`;
  }

  public isAvailable(amount: number): boolean {
    if (this.isExpired()) return false;
    if (!this.isAvailableTime()) return false;
    if (!this.isAboveMinimumAmount(amount)) return false;

    return true;
  }

  private isExpired() {
    const today = new Date();
    const expiration = new Date(this.data.expirationDate);

    today.setHours(0, 0, 0, 0);

    return today > expiration;
  }

  private isAvailableTime() {
    const availableTime = this.data.availableTime;
    if (availableTime === undefined) return true;

    const now = new Date();
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");
    const currentTime = [hour, minute, second].join(":");

    if (availableTime.start <= currentTime && currentTime <= availableTime.end) return true;

    return false;
  }

  private isAboveMinimumAmount(amount: number) {
    const minimumAmount = this.data.minimumAmount;
    if (minimumAmount === undefined) return true;
    if (minimumAmount <= amount) return true;

    return false;
  }
}

export default Coupon;
