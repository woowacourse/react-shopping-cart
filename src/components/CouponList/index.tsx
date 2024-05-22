/** @jsxImportSource @emotion/react */
import { title } from "process";
import { PropsWithChildren } from "react";
import { caption } from "../../styles/font";
import { Coupon } from "../../types";
import formatAvailableTime from "../../util/formatAvailableTime";
import formatExpirationDate from "../../util/formatExpirationDate";
import formatPriceToKoreanWon from "../../util/formatPriceToKoreanWon";
import { Divider } from "../CartList/CheckoutSummary/style";
import CheckBox from "../common/CheckBox";
import {
  CouponListDescription,
  CouponListSection,
  CouponListTitle,
} from "./style";

const coupons: Coupon[] = [
  {
    id: 1,
    code: "FIXED5000",
    description: "5,000원 할인 쿠폰",
    expirationDate: "2024-11-30",
    discount: 5000,
    minimumAmount: 100000,
    discountType: "fixed",
  },
  {
    id: 2,
    code: "BOGO",
    description: "2개 구매 시 1개 무료 쿠폰",
    expirationDate: "2024-04-30",
    buyQuantity: 2,
    getQuantity: 1,
    discountType: "buyXgetY",
  },
  {
    id: 3,
    code: "FREESHIPPING",
    description: "5만원 이상 구매 시 무료 배송 쿠폰",
    expirationDate: "2024-08-31",
    minimumAmount: 50000,
    discountType: "freeShipping",
  },
  {
    id: 4,
    code: "MIRACLESALE",
    description: "미라클모닝 30% 할인 쿠폰",
    expirationDate: "2024-07-31",
    discount: 30,
    availableTime: {
      start: "04:00:00",
      end: "07:00:00",
    },
    discountType: "percentage",
  },
];

const CouponList: React.FC<PropsWithChildren> = () => {
  return (
    <>
      {coupons.map(
        ({ id, description, expirationDate, minimumAmount, availableTime }) => (
          <>
            <Divider />
            <CouponListSection>
              <CouponListTitle>
                <CheckBox
                  isSelected={false}
                  id={id.toString()}
                  toggleSelected={() => {}}
                />
                <h3 css={title}>{description}</h3>
              </CouponListTitle>
              <CouponListDescription>
                <p css={caption}>
                  만료일 : {formatExpirationDate(expirationDate)}
                </p>
                {minimumAmount && (
                  <p css={caption}>
                    최소 주문 금액 : {formatPriceToKoreanWon(minimumAmount)}
                  </p>
                )}

                {availableTime && (
                  <p css={caption}>
                    사용 가능 시간 : {formatAvailableTime(availableTime)}
                  </p>
                )}
              </CouponListDescription>
            </CouponListSection>
          </>
        )
      )}
    </>
  );
};

export default CouponList;
