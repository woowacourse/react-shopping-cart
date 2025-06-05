import {useEffect, useState} from 'react';
import Line from '../../../common/Line';
import Header from '../../CartSection/Header';
import * as S from './index.styles';
import {getCoupons} from '../../../../api/coupon/getCoupon';
import {useShowError} from '../../../../provider/errorProvider';
import {CouponType} from '../../../../type/coupon';
import CheckBox from '../../../common/CheckBox';
import Button from '../../../common/Button';
import {formatPrice} from '../../../../utils/formatPrice';
import {formatTime} from '../../../../utils/formatTime';
import {css} from '@emotion/react';

const buttonStyle = css`
  background-color: #333;
  color: #fff;
`;

const Coupon = () => {
  const showError = useShowError();
  const [coupons, setCoupons] = useState<CouponType[]>();

  useEffect(() => {
    const getCouponData = async () => {
      try {
        const data = await getCoupons();
        setCoupons(data);
      } catch (e) {
        showError('쿠폰 정보를 불러올 수 없습니다.');
      }
    };

    getCouponData();
  }, [showError]);

  return (
    <S.Container>
      <Header
        title="쿠폰을 선택해 주세요"
        description="※ 쿠폰은 최대 2개까지 사용할 수 있습니다."
      />
      <Line />
      {coupons?.map((coupon) => (
        <>
          <CheckBox
            label={coupon.description}
            isChecked={true}
            onChange={() => {}}
          />
          <S.Description>만료일: {coupon.expirationDate}</S.Description>
          {coupon.minimumAmount && (
            <S.Description>
              최소 주문 금액: {formatPrice(coupon.minimumAmount)}
            </S.Description>
          )}
          {coupon.availableTime && (
            <S.Description>
              사용 가능 시간: 오전 {formatTime(coupon.availableTime.start)}
              시부터 {formatTime(coupon.availableTime.end)}시까지
            </S.Description>
          )}
          <Line />
        </>
      ))}
      <Button
        title={`총 ${'6000'}원 할인 쿠폰 사용하기`}
        onClick={() => {}}
        css={buttonStyle}
      />
    </S.Container>
  );
};

export default Coupon;
