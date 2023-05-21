import { useCartTotalPriceReadOnly } from '../../hooks/cartListState/cartListState';
import { FlexColWrapper, FlexWrapper } from '../../pages/Cart/Cart.style';

function PayingContainer() {
  const { totalPriceReadOnly } = useCartTotalPriceReadOnly();
  return (
    <FlexColWrapper style={{ width: '400px' }}>
      <div>
        <span>결제 예상 금액</span>
      </div>
      <FlexColWrapper>
        <FlexWrapper>
          <div>총 상품 가격</div>
          <div> {totalPriceReadOnly.toLocaleString('ko-KR')}원</div>
        </FlexWrapper>
        <FlexWrapper>
          <div>총 배송비</div>
          <div>{totalPriceReadOnly.toLocaleString('ko-KR')}원</div>
        </FlexWrapper>
        <FlexWrapper>
          <div>총 주문금액</div>
          <div>{totalPriceReadOnly.toLocaleString('ko-KR')}원</div>
        </FlexWrapper>
      </FlexColWrapper>
    </FlexColWrapper>
  );
}

export default PayingContainer;
