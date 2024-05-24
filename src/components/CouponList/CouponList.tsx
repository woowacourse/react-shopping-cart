import { useRecoilValue } from "recoil";
import {
  Wrapper,
  CouponConfirmButton,
  CouponListHeader,
  CouponListBody,
  Coupon,
  CouponHeader,
} from "./style";
import {
  couponDiscountPriceState,
  couponsState,
} from "../../recoil/selectors/selectors";
import { OutlineCheckSvg, FilledCheckSvg } from "../../assets";
import { selectedCouponsState } from "../../recoil/atoms/atoms";
import { SmallText, MediumText, LargeText, Tip } from "../common";

const CouponList = () => {
  const coupons = useRecoilValue(couponsState);
  const couponDiscountPrice = useRecoilValue(couponDiscountPriceState);
  const selectedCoupons = useRecoilValue(selectedCouponsState);

  return (
    <Wrapper>
      <CouponListHeader>
        <MediumText>쿠폰을 선택해 주세요</MediumText>
        <div>X</div>
      </CouponListHeader>
      <Tip>쿠폰은 최대 2개까지 사용할 수 있습니다</Tip>
      <CouponListBody>
        {coupons.map((coupon) => (
          <Coupon key={coupon.id}>
            <CouponHeader>
              {selectedCoupons.includes(coupon.id) ? (
                <FilledCheckSvg />
              ) : (
                <OutlineCheckSvg />
              )}
              <MediumText>{coupon.description}</MediumText>
            </CouponHeader>
            <SmallText>만료일: {coupon.expirationDate}</SmallText>
            {coupon.minimumAmount && (
              <SmallText>
                최소 주문 금액: {coupon.minimumAmount.toLocaleString("ko-KR")}원
              </SmallText>
            )}
          </Coupon>
        ))}
      </CouponListBody>
      <CouponConfirmButton>
        <MediumText color="white">
          총 {couponDiscountPrice.toLocaleString("ko-KR")}원 할인 쿠폰 사용하기
        </MediumText>
      </CouponConfirmButton>
    </Wrapper>
  );
};

export default CouponList;
