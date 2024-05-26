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
  selectedCouponsState,
  couponsState,
} from "../../recoil";
import { OutlineCheckSvg, FilledCheckSvg, XSvg } from "../../assets";
import { Tip, Text } from "../common";
import { MAX_COUPON_NUMBER } from "../../constants/coupon";

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
      return;
    }
    setSelectedCoupons([...selectedCoupons, couponId]);
  };

  const isDisableCoupon = (couponId: number) => {
    return (
      !selectedCoupons.includes(couponId) &&
      (!possibleCouponList.includes(couponId) || selectedCoupons.length >= MAX_COUPON_NUMBER)
    );
  };

  return (
    <Wrapper>
      <CouponListHeader>
        <Text size="medium">쿠폰을 선택해 주세요</Text>
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
              <Text size="medium">{coupon.description}</Text>
            </CouponHeader>
            <Text size="small">만료일: {coupon.expirationDate}</Text>
            {coupon.minimumAmount && (
              <Text size="small">
                최소 주문 금액: {coupon.minimumAmount.toLocaleString("ko-KR")}원
              </Text>
            )}
          </Coupon>
        ))}
      </CouponListBody>
      <CouponConfirmButton onClick={handleCloseModal}>
        <Text size="medium">
          총 {couponDiscountPrice.toLocaleString("ko-KR")}원 할인 쿠폰 사용하기
        </Text>
      </CouponConfirmButton>
    </Wrapper>
  );
};

export default CouponList;
