import { CouponType } from "@/types/coupon.type";
import { MAX_APPLICABLE_COUPON } from "@/constants/system";
import { cartSummaryState } from "@/store/selectors/summarySelector/cartSummarySelector";
import { curKoreaTime } from "@/utils/date";
import { isValidExpirationDate } from "@/utils/isValidExpirationDate";
import { selectedItemsState } from "@/store/selectors/selectedSelector/selectedItemsSelector";
import { useRecoilValue } from "recoil";
import { useState } from "react";

interface Props {
  coupon: CouponType;
  selectedCoupons: CouponType[];
  setSelectedCoupons: React.Dispatch<React.SetStateAction<CouponType[]>>;
}

const useCoupon = ({ coupon, selectedCoupons, setSelectedCoupons }: Props) => {
  const [isSelected, setSelected] = useState(selectedCoupons.includes(coupon));
  const { orderPrice } = useRecoilValue(cartSummaryState);
  const selectedItems = useRecoilValue(selectedItemsState);

  const handleSelect = () => {
    setSelected(!isSelected);

    if (!isSelected && !selectedCoupons.includes(coupon)) {
      const newList = [...selectedCoupons, coupon];
      setSelectedCoupons(newList);
      return;
    }

    const filteredList = selectedCoupons.filter(
      (selectedCoupon) => coupon.id !== selectedCoupon.id
    );

    setSelectedCoupons(filteredList);
  };

  const checkDisabled = () => {
    //유효기간 확인
    if (!isValidExpirationDate(coupon.expirationDate)) {
      return true;
    }
    // 사용 가능 시간 확인
    if (coupon.availableTime) {
      const startTime = Number(coupon.availableTime.start.slice(0, 2));
      const endTime = Number(coupon.availableTime.end.slice(0, 2));
      const curTime = curKoreaTime.getHours();

      if (curTime < startTime || curTime >= endTime) {
        return true;
      }
    }

    //최소 주문 금액 확인
    if (coupon.minimumAmount && orderPrice < coupon.minimumAmount) {
      return true;
    }

    // BOGO 쿠폰 최소 수량 확인
    if (selectedItems.every((item) => item.quantity < 3)) {
      return true;
    }

    // coupon 최대 적용 갯수 확인
    if (
      selectedCoupons.length >= MAX_APPLICABLE_COUPON &&
      !selectedCoupons.includes(coupon)
    ) {
      return true;
    }

    return false;
  };

  const disabled = checkDisabled();

  return { isSelected, disabled, handleSelect };
};

export default useCoupon;
