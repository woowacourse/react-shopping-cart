/** @jsxImportSource @emotion/react */
import { title } from "process";
import { PropsWithChildren } from "react";
import { mockCoupons } from "../../mocks";
import { caption } from "../../styles/font";
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

const CouponList: React.FC<PropsWithChildren> = () => {
  return (
    <>
      {mockCoupons.map(
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
