import Text from '../common/Text/Text';
import * as S from './SelectCouponItem.style';
import Checkbox from '../common/Checkbox/Checkbox';
import { Divider } from '../common/Divider/Divider.style';
import { toKoreanDate, toKoreanTime } from '../../utils/date';
import useSelectedCoupon from '../../hooks/coupon/useSelectedCoupon';
import useSelectedCouponList from '../../hooks/coupon/useSelectedCouponList';
import { validateCouponAvailable } from '../../utils/validateCouponAvailable';

interface SelectCouponItemProps {
  coupon: Coupon;
}

const SelectCouponItem = ({ coupon }: SelectCouponItemProps) => {
  const { id, description, expirationDate, minimumAmount, availableTime } =
    coupon;

  const { isSelected, toggleSelectedCoupon } = useSelectedCoupon();
  const { selectedCouponList } = useSelectedCouponList();

  const disabled =
    !validateCouponAvailable(coupon) ||
    (selectedCouponList.length === 2 && !selectedCouponList.includes(coupon));

  if (disabled && isSelected(id)) {
    toggleSelectedCoupon(coupon);
  }

  return (
    <S.SelectCouponItem disabled={disabled}>
      <Divider />
      <S.CheckboxContainer>
        <Checkbox
          state={isSelected(id)}
          handleClick={() => toggleSelectedCoupon(coupon)}
          disabled={disabled}
        />
        <Text size="m">{description}</Text>
      </S.CheckboxContainer>
      <S.DescriptionContainer>
        <Text size="s" weight="s">
          {`만료일: ${toKoreanDate(expirationDate)}`}
        </Text>
        {minimumAmount ? (
          <Text size="s" weight="s">
            {`최소 주문 금액: ${minimumAmount.toLocaleString('ko-kr')}원`}
          </Text>
        ) : null}
        {availableTime ? (
          <Text size="s" weight="s">
            {`사용 가능 시간: ${toKoreanTime(availableTime.start)}부터 ${toKoreanTime(availableTime.end)}까지`}
          </Text>
        ) : null}
      </S.DescriptionContainer>
    </S.SelectCouponItem>
  );
};

export default SelectCouponItem;
