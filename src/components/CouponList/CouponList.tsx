import { useRecoilState, useRecoilValue } from "recoil";
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
  possibleCouponListState,
} from "../../recoil/selectors/selectors";
import { OutlineCheckSvg, FilledCheckSvg, XSvg } from "../../assets";
import { selectedCouponsState, couponsState } from "../../recoil/atoms/atoms";
import { SmallText, MediumText, Tip } from "../common";

interface CouponListProps {
  handleCloseModal?: () => void;
}

const CouponList = ({ handleCloseModal }: CouponListProps) => {
  const coupons = useRecoilValue(couponsState);
  const couponDiscountPrice = useRecoilValue(couponDiscountPriceState);
  const [selectedCoupons, setSelectedCoupons] = useRecoilState(selectedCouponsState);
  const possibleCouponList = useRecoilValue(possibleCouponListState);

  const handleClickCoupon = (couponId: number) => {
    if (isDisableCoupon(couponId)) return;

    if (selectedCoupons.includes(couponId)) {
      setSelectedCoupons(selectedCoupons.filter((coupon) => coupon !== couponId));
    } else {
      setSelectedCoupons([...selectedCoupons, couponId]);
    }
  };

  const isDisableCoupon = (couponId: number) => {
    return (
      !selectedCoupons.includes(couponId) &&
      (!possibleCouponList.includes(couponId) || selectedCoupons.length >= 2)
    );
  };

  return (
    <Wrapper>
      <CouponListHeader>
        <MediumText>쿠폰을 선택해 주세요</MediumText>
        <XSvg onClick={handleCloseModal} />
      </CouponListHeader>
      <Tip>쿠폰은 최대 2개까지 사용할 수 있습니다</Tip>
      <CouponListBody>
        {coupons.map((coupon) => (
          <Coupon
            key={coupon.id}
            onClick={() => handleClickCoupon(coupon.id)}
            disabled={isDisableCoupon(coupon.id)}
          >
            <CouponHeader>
              {selectedCoupons.includes(coupon.id) ? <FilledCheckSvg /> : <OutlineCheckSvg />}
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
      <CouponConfirmButton onClick={handleCloseModal}>
        <MediumText>
          총 {couponDiscountPrice.toLocaleString("ko-KR")}원 할인 쿠폰 사용하기
        </MediumText>
      </CouponConfirmButton>
    </Wrapper>
  );
};

export default CouponList;
