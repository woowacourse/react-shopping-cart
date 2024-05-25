import {formatToWon} from "@/utils/stringHelper.ts";

export const FREE_SHIPPING_THRESHOLD = 100000;

export const SHIPPING_FEE = {
    free: 0,
    basic: 3000,
    remoteAreaShippingFee: 6000,
};

export type ShippingFeeType = keyof typeof SHIPPING_FEE;

export const SHIPPING_MESSSAGES = {
    freeShippingInfo: `총 주문 금액이 ${formatToWon(
        FREE_SHIPPING_THRESHOLD
    )} 이상일 경우 무료 배송됩니다.`,
}