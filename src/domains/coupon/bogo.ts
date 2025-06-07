import type { CartItemType, CouponType } from "../../types/response";
import type { BogoItemInfoType } from "../../types/bogo";

const getCheckedBogoCoupons = (checkedCoupons: CouponType[]) => {
  return checkedCoupons.filter((coupon) => coupon.code === "BOGO");
};

const getBogoItemInfo = (
  orderItems: CartItemType[],
  buyQuantity: number,
  getQuantity: number
): BogoItemInfoType => {
  const bogoItems = orderItems.filter((item) => item.quantity >= buyQuantity);
  const maxPriceBogoItem = bogoItems.reduce((maxItem, currentItem) =>
    currentItem.product.price > maxItem.product.price ? currentItem : maxItem
  );

  return { bogoItem: maxPriceBogoItem, bogoQuantity: getQuantity };
};

// TODO : isCheckedCoupons -> checkedCoupons로 네이밍 변경
export const getBogoItemsInfo = (
  checkedCoupons: Map<number, CouponType>,
  orderItems: CartItemType[]
) => {
  return getCheckedBogoCoupons(Array.from(checkedCoupons.values())).flatMap(
    (coupon) =>
      "buyQuantity" in coupon
        ? [getBogoItemInfo(orderItems, coupon.buyQuantity, coupon.getQuantity)]
        : []
  );
};

export const getBogoGetQuantity = (
  bogoItemsInfo: BogoItemInfoType[],
  item: CartItemType
) => {
  const bogoItem = bogoItemsInfo.find(
    (bogoItemInfo) => bogoItemInfo.bogoItem.id === item.id
  );

  return bogoItem ? bogoItem.bogoQuantity : 0;
};

export const isBogoItem = (
  item: CartItemType,
  bogoItemsInfo: BogoItemInfoType[]
) => bogoItemsInfo.some((bogoItem) => bogoItem.bogoItem.id === item.id);
