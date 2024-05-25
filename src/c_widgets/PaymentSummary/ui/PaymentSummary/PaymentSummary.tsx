import classNames from 'classnames/bind';

import { HorizontalLine, Text, imgMap } from '@/f_shared';

import css from './PaymentSummary.module.css';

const cn = classNames.bind(css);

interface PaymentSummaryProps {
  showCouponDiscountAmount?: boolean;
}

// TODO: Connect to state
export const PaymentSummary = ({ showCouponDiscountAmount = false }: PaymentSummaryProps) => {
  const Row = ({ title, amount }: { title: string; amount: number }) => (
    <div className={cn('row')}>
      <Text type={'h2'}>{title}</Text>
      <Text type={'h1'}>{`${amount.toLocaleString()}원`}</Text>
    </div>
  );

  // TODO: Change shippingFee to constant
  return (
    <div className={cn('root')}>
      <div className={cn('informationWrapper')}>
        <img src={imgMap.information} alt={'img'} className={cn('img')} />
        <Text tag={'span'} type={'b2'}>
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </Text>
      </div>

      <HorizontalLine opacity={0.1} />

      <div className={cn('rowWrapper')}>
        <Row title={'주문 금액'} amount={100000} />
        {showCouponDiscountAmount && <Row title={'쿠폰 할인 금액'} amount={-3000} />}
        <Row title={'배송비'} amount={3000} />
      </div>

      <HorizontalLine opacity={0.1} />

      <Row title={'총 결제 금액'} amount={100000} />
    </div>
  );
};
