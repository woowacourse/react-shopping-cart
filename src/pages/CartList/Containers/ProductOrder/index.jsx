import useCart from 'hooks/useCart';

import { Button, FlexContainer, Title, TextUnderline } from 'components/@common';

import { getNumberFormatter } from 'lib/formatterUtils';

import * as S from './styles';

function ProductOrder() {
  const { state } = useCart();
  const { checkedItemList } = state;

  const totalAmount = checkedItemList.reduce(
    (previous, { price, quantity }) => previous + price * quantity,
    0,
  );

  return (
    <S.OrderContainer>
      <Title type="content" size={18}>
        상품 주문하기
      </Title>

      <FlexContainer direction="row" justify="space-between">
        <TextUnderline>결제 예상 금액</TextUnderline>
        <TextUnderline>{`${getNumberFormatter(totalAmount)}원`}</TextUnderline>
      </FlexContainer>

      <FlexContainer>
        <Button state="primary">주문하기 ({checkedItemList.length}개)</Button>
      </FlexContainer>
    </S.OrderContainer>
  );
}

export default ProductOrder;
