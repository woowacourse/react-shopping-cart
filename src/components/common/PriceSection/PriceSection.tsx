import { borderTopWrapper, cartFooterSection } from './PriceSection.styled';
import GuideText from '../GuideText';

import Receipt from '@/components/Cart/Receipt';
import useOrderInfo from '@/hooks/useOrderInfo';
import { CONFIG } from '@constants/config';

interface PriceSectionProps {
  type: 'CART' | 'ORDER';
}

const PriceSection = ({ type }: PriceSectionProps) => {
  const { totalOrderPrice, totalDiscountPrice, shippingPrice, totalPurchasePrice } =
    useOrderInfo(type);

  return (
    <section css={cartFooterSection}>
      <GuideText
        label={`총 주문 금액이 ${CONFIG.FREE_SHIPPING_CONDITION}원 이상일 경우 무료 배송됩니다.`}
      />
      <div>
        <div css={borderTopWrapper}>
          <Receipt title="주문 금액" price={totalOrderPrice} />
          {type === 'ORDER' && <Receipt title="쿠폰 할인 금액" price={totalDiscountPrice} />}
          <Receipt title="배송비" price={shippingPrice} />
        </div>
        <div css={borderTopWrapper}>
          <Receipt title="총 결제 금액" price={totalPurchasePrice} />
        </div>
      </div>
    </section>
  );
};

export default PriceSection;
