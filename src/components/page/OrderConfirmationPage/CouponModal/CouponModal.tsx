import * as S from '../CouponModal/style';

import { checkedItemsState, deliveryFeeState } from '../../../../recoil/selectors';
import { useRecoilState, useRecoilValue } from 'recoil';

import COUPONS from '../../../../constants/coupons';
import CouponItem from '../CouponItem/CouponItem';
import InfoParagraph from '../../../../components/common/InfoParagraph/InfoParagraph';
import { Modal } from 'le-sserafim';
import POLICES from '../../../../constants/policies';
import checkIsAvailableCoupon from '../../../../utils/checkIsAvailableCoupon';
import convertToLocaleAmount from '../../../../utils/convertToLocalePrice';
import getCouponsAmount from '../../../../utils/getCouponsAmount';
import getLastTimeDate from '../../../../utils/getLastTimeDate';
import { iso8601ToDate } from '../../../../utils/translateFormat';
import { selectedCouponsState } from '../../../../recoil/atoms';
import useCoupons from '../../../../hooks/useCoupons';

interface CouponModalProps {
  onClose: () => void;
  onConfirm: () => void;
}
export default function CouponModal({ onClose, onConfirm }: CouponModalProps) {
  // TODO: api 정상 동작 시 모킹 데이터를 api 패칭된 쿠폰으로 변환해야 함
  const filteredCoupons = COUPONS.filter(
    (coupon) => new Date() < getLastTimeDate(iso8601ToDate(coupon.expirationDate)),
  );

  // 선택 쿠폰과 모달에서 체크된 쿠폰은 다름
  const [selectedCoupon, setSelectedCoupon] = useRecoilState(selectedCouponsState);

  const checkedItems = useRecoilValue(checkedItemsState);
  const deliveryFee = useRecoilValue(deliveryFeeState);

  const availableCoupons = filteredCoupons.filter((coupon) =>
    checkIsAvailableCoupon(coupon, checkedItems, deliveryFee),
  );
  const unavailableCoupons = filteredCoupons.filter(
    (coupon) => !checkIsAvailableCoupon(coupon, checkedItems, deliveryFee),
  );

  const {
    coupons: checkedCoupons,
    isSelectedCoupon: isCheckedCoupon,
    addCoupon,
    deleteCoupon,
  } = useCoupons(selectedCoupon);
  if (unavailableCoupons.some((coupon) => isCheckedCoupon(coupon))) setSelectedCoupon([]);

  const checkedCouponAmount = getCouponsAmount(checkedCoupons, checkedItems, deliveryFee);

  // 모달에서 확인을 누름 => 모달에서 체크된 쿠폰이 선택 쿠폰이 됨
  const confirmHandler = () => {
    setSelectedCoupon(checkedCoupons);
    onConfirm();
  };

  return (
    <Modal
      onClose={onClose}
      onConfirm={confirmHandler}
      buttonText={`총 ${convertToLocaleAmount(checkedCouponAmount)} 할인 쿠폰 사용하기`}
      title="쿠폰을 선택해 주세요"
      size={'free'}
    >
      <S.ContentContainer>
        <InfoParagraph>{`쿠폰은 최대 ${POLICES.couponCountMax}개까지 사용할 수 있습니다.`}</InfoParagraph>
        <S.CouponItemContainer>
          {availableCoupons.map((coupon) => {
            return (
              <CouponItem
                key={coupon.id}
                isChecked={isCheckedCoupon(coupon)}
                coupon={coupon}
                isAvailable={
                  checkedCoupons.length !== POLICES.couponCountMax || isCheckedCoupon(coupon)
                }
                isCheckedToggler={() => {
                  isCheckedCoupon(coupon) ? deleteCoupon(coupon) : addCoupon(coupon);
                }}
              />
            );
          })}
          {unavailableCoupons.map((coupon) => {
            return (
              <CouponItem
                key={coupon.id}
                isChecked={false}
                coupon={coupon}
                isAvailable={false}
                isCheckedToggler={() => {}}
              />
            );
          })}
        </S.CouponItemContainer>
      </S.ContentContainer>
    </Modal>
  );
}
