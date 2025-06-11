import * as S from './CouponModal.styles';
import Separator from '../../../common/separator/Separator';
import SelectBox from '../../../common/selectBox/SelectBox';
import Close from '/assets/Close.svg';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { useCartSelectionContext } from '../../cart/contexts/CartSelectionContext';
import { getCouponValidator } from '../utils/getCouponValidator';
import { useCouponContext } from '../contexts/CouponContext';

interface CouponModalProps {
  onClose: () => void;
}

function CouponModal({ onClose }: CouponModalProps) {
  const { coupons, selected, setSelected, couponDiscounts, totalDiscount } =
    useCouponContext();

  const { selectCartItems, orderPrice } = useCartSelectionContext();

  const handleToggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((v) => v !== id)
        : prev.length < 2
        ? [...prev, id]
        : prev
    );
  };

  useEscapeKey(onClose);

  return (
    <S.Overlay>
      <S.Container>
        <S.Header>
          <S.Title>쿠폰을 선택해 주세요</S.Title>
          <img
            src={Close}
            alt="닫기"
            onClick={onClose}
            style={{ cursor: 'pointer' }}
          />
        </S.Header>
        <S.Notice>
          <img src="./assets/Notification.svg" />
          <S.NoticeText>쿠폰은 최대 2개까지 사용할 수 있습니다.</S.NoticeText>
        </S.Notice>

        {coupons.length === 0 ? (
          <S.DescriptionText>사용 가능한 쿠폰이 없습니다.</S.DescriptionText>
        ) : (
          coupons.map((coupon) => {
            const discount =
              couponDiscounts.find((d) => d.coupon.id === coupon.id)
                ?.discount || 0;
            const disabled = !getCouponValidator(
              coupon,
              selectCartItems,
              orderPrice
            );
            return (
              <S.CouponContainer key={coupon.id} disabled={disabled}>
                <Separator />
                <S.CouponBox>
                  <SelectBox
                    selected={selected.includes(coupon.id)}
                    onClick={() => handleToggle(coupon.id)}
                  />
                  <S.Name>
                    {coupon.description}
                    {discount > 0 ? (
                      <span style={{ color: '#0a8', marginLeft: 6 }}>
                        (-{discount.toLocaleString()}원)
                      </span>
                    ) : (
                      <span style={{ color: '#0a8', marginLeft: 6 }}>
                        (0원)
                      </span>
                    )}
                  </S.Name>
                </S.CouponBox>
                <S.Description>
                  <S.DescriptionText>
                    만료일: {coupon.expirationDate}
                  </S.DescriptionText>
                  {'minimumAmount' in coupon && coupon.minimumAmount && (
                    <S.DescriptionText>
                      최소 주문 금액: {coupon.minimumAmount.toLocaleString()}원
                    </S.DescriptionText>
                  )}
                  {'buyQuantity' in coupon && 'getQuantity' in coupon && (
                    <S.DescriptionText>
                      {coupon.buyQuantity}개 구매 시 {coupon.getQuantity}개 무료
                    </S.DescriptionText>
                  )}
                  {'availableTime' in coupon && coupon.availableTime && (
                    <S.DescriptionText>
                      사용 가능 시간: {coupon.availableTime.start}~
                      {coupon.availableTime.end}
                    </S.DescriptionText>
                  )}
                </S.Description>
              </S.CouponContainer>
            );
          })
        )}

        <S.Button onClick={onClose}>
          총 {totalDiscount.toLocaleString()}원 할인 쿠폰 사용하기
        </S.Button>
      </S.Container>
    </S.Overlay>
  );
}

export default CouponModal;
