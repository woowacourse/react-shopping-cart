import { useCartTotalPriceReadOnly } from '../../hooks/cartListState/cartListState';
import { FlexColWrapper } from '../../pages/Cart/Cart.style';

function PayingContainer() {
  const { totalPriceReadOnly } = useCartTotalPriceReadOnly();
  return (
    <FlexColWrapper>
      <span>총 상품 금액: {totalPriceReadOnly}</span>
    </FlexColWrapper>
  );
}

export default PayingContainer;
