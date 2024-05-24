import * as S from '../CouponModal/style';

import { checkedItemsState, deliveryFeeState } from '../../../recoil/selectors';
import { useRecoilState, useRecoilValue } from 'recoil';

import COUPONS from '../../../constants/coupons';
import CouponItem from '../CouponItem/CouponItem';
import { InfoIcon } from '../../../assets';
import { Modal } from 'le-sserafim';
import checkIsAvailableCoupon from '../../../utils/checkIsAvailableCoupon';
import convertToLocaleAmount from '../../../utils/convertToLocalePrice';
import getCouponsAmount from '../../../utils/getCouponsAmount';
import getLastTimeDate from '../../../utils/getLastTimeDate';
import { iso8601ToDate } from '../../../utils/translateFormat';
import { selectedCoupons as selectedCouponsState } from '../../../recoil/atoms';
import useCoupons from '../../../hooks/useCoupons';

interface CouponModalProps {
  onClose: () => void;
  onConfirm: () => void;
}
export default function CouponModal({ onClose, onConfirm }: CouponModalProps) {
  // TODO: api 정상 동작 시 모킹 데이터를 api 패칭된 쿠폰으로 변환해야 함
  const filteredCoupon = COUPONS.filter(
    (coupon) => new Date() < getLastTimeDate(iso8601ToDate(coupon.expirationDate)),
  );

  // 선택 쿠폰과 모달에서 체크된 쿠폰은 다름
  const [selectedCoupon, setSelectedCoupon] = useRecoilState(selectedCouponsState);

  const checkedItems = useRecoilValue(checkedItemsState);
  const deliveryFee = useRecoilValue(deliveryFeeState);

  const {
    coupons: checkedCoupons,
    setCoupons: setCheckedCoupons,
    isSelectedCoupon: isCheckedCoupon,
    addCoupon,
    deleteCoupon,
    IS_ADDABLE: isCouponAddable,
  } = useCoupons();

  const checkedCouponAmount = getCouponsAmount(checkedCoupons, checkedItems, deliveryFee);

  // 모달을 닫음(esc, x 버튼) => 모달에서 체크된 쿠폰을 선택 쿠폰으로 바꿈
  const closeHandler = () => {
    setCheckedCoupons(selectedCoupon);
    onClose();
  };

  // 모달에서 확인을 누름 => 모달에서 체크된 쿠폰이 선택 쿠폰이 됨
  const confirmHandler = () => {
    setSelectedCoupon(checkedCoupons);
    onConfirm();
  };

  return (
    <Modal
      onClose={closeHandler}
      onConfirm={confirmHandler}
      buttonText={`총 ${convertToLocaleAmount(checkedCouponAmount)} 할인 쿠폰 사용하기`}
      title="쿠폰을 선택해 주세요"
      size={'free'}
    >
      <S.ContentContainer>
        <S.InfoBox>
          <img src={InfoIcon} /> {'쿠폰은 최대 2개까지 사용할 수 있습니다.'}
        </S.InfoBox>
        <S.CouponItemContainer>
          {filteredCoupon.map((coupon) => {
            const isAvailableTime = checkIsAvailableCoupon(coupon, checkedItems, deliveryFee);
            return (
              <CouponItem
                key={coupon.id}
                isChecked={isCheckedCoupon(coupon)}
                coupon={coupon}
                isAvailable={(isCouponAddable || isCheckedCoupon(coupon)) && isAvailableTime}
                isCheckedToggler={() => {
                  isCheckedCoupon(coupon) ? deleteCoupon(coupon) : addCoupon(coupon);
                }}
              />
            );
          })}
        </S.CouponItemContainer>
      </S.ContentContainer>
    </Modal>
  );
}
