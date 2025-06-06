import * as Styled from "./CouponList.style";

import { PropsWithChildren } from "react";
import notice from "/notice.svg";
import { MAX_COUPON_COUNT } from "@/constants/priceSetting";

interface CouponListProps extends PropsWithChildren {}

function CouponList({ children }: CouponListProps) {
  return (
    <Styled.Container>
      <Styled.CouponListHeader>
        <Styled.Notice>
          <Styled.NoticeIcon src={notice} />
          <Styled.CouponNoticeText>
            쿠폰은 최대 {MAX_COUPON_COUNT}개까지 사용할수 있습니다.
          </Styled.CouponNoticeText>
        </Styled.Notice>
      </Styled.CouponListHeader>
      <Styled.UlContainer>{children}</Styled.UlContainer>
    </Styled.Container>
  );
}

export default CouponList;
