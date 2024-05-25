import * as S from './PriceTable.style';
import NOTICE from '../../assets/notice.svg?react';
import Text from '../common/Text/Text';
import Divider from '../common/Divider/Divider';
import ContentRow from '../common/ContentRow/ContentRow';
import useDiscount from '../../hooks/price/useDiscount';
import usePrice from '../../hooks/price/usePrice';

interface PriceTableProps {
  type?: 'cart' | 'confirm';
}

const PriceTable = ({ type = 'cart' }: PriceTableProps) => {
  const { orderedPrice, deliveryFee, totalPrice } = usePrice();
  const { totalDiscountAmount } = useDiscount();

  return (
    <S.Container>
      <S.NoticeContainer>
        <NOTICE />
        <Text size="s" weight="m">
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </Text>
      </S.NoticeContainer>
      <Divider />
      <S.Rows>
        <ContentRow
          title="주문 금액"
          content={`${orderedPrice.toLocaleString('ko-kr')}원`}
        />
        {type === 'confirm' ? (
          <ContentRow
            title="쿠폰 할인 금액"
            content={`-${totalDiscountAmount.toLocaleString('ko-kr')}원`}
          />
        ) : null}
        <ContentRow
          title="배송비"
          content={`${deliveryFee.toLocaleString('ko-kr')}원`}
        />
      </S.Rows>
      <Divider />
      <ContentRow
        title="총 결제 금액"
        content={`${(totalPrice - totalDiscountAmount).toLocaleString('ko-kr')}원`}
      />
    </S.Container>
  );
};

export default PriceTable;
