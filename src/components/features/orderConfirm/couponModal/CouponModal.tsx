import { useEffect, useState } from 'react';
import fetchData from '../../cart/utils/fetchData';
import { Coupon } from '../types';
import * as S from './CouponModal.styles';
import Separator from '../../../common/separator/Separator';
import SelectBox from '../../../common/selectBox/SelectBox';
import Close from '/assets/Close.svg';
import { useBestCoupons } from '../hooks/useBestCoupons';
import { CartItemType } from '../../cart/types';
import { useEscapeKey } from '../hooks/useEscapeKey';

interface CouponModalProps {
  products: CartItemType[];
  onClose: () => void;
}

function CouponModal({ products, onClose }: CouponModalProps) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    fetchData<Coupon[]>()('/coupons').then((data) => {
      if (data) setCoupons(data);
    });
  }, []);

  const { selected, setSelected, couponDiscounts } = useBestCoupons({
    coupons,
    products,
  });

  const handleToggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((v) => v !== id)
        : prev.length < 2
        ? [...prev, id]
        : prev
    );
  };

  const totalDiscount = couponDiscounts
    .filter((d) => selected.includes(d.coupon.id))
    .reduce((sum, d) => sum + d.discount, 0);

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
            return (
              <S.CouponContainer key={coupon.id}>
                <Separator />
                <S.CouponBox>
                  <SelectBox
                    selected={selected.includes(coupon.id)}
                    onClick={() => handleToggle(coupon.id)}
                  />
                  <S.Name>
                    {coupon.description}
                    {discount > 0 && (
                      <span style={{ color: '#0a8', marginLeft: 6 }}>
                        (-{discount.toLocaleString()}원)
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

        <S.Button>
          총 {totalDiscount.toLocaleString()}원 할인 쿠폰 사용하기
        </S.Button>
      </S.Container>
    </S.Overlay>
  );
}

export default CouponModal;
