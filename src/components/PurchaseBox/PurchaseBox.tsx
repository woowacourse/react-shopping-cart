import { PurchasePropertyWrapper, PurchaseText, PurchaseTitle, PurchaseWrapper } from "./PurchaseBox.style";

function PurchaseBox() {
  return (
    <div style={{ width: '100%' }}>
      <PurchaseWrapper>
        <PurchaseTitle>결제예상금액</PurchaseTitle>
      </PurchaseWrapper>
      <PurchaseWrapper>
        <PurchasePropertyWrapper>
          <PurchaseText>
            총 상품가격
          </PurchaseText>
          <PurchaseText>
            {0}원
          </PurchaseText>
        </PurchasePropertyWrapper>
        <PurchasePropertyWrapper>
          <PurchaseText>
            총 배송비
          </PurchaseText>
          <PurchaseText>
            {0}원
          </PurchaseText>
        </PurchasePropertyWrapper>
        <PurchasePropertyWrapper>
          <PurchaseText>
            총 주문 금액
          </PurchaseText>
          <PurchaseText>
            {0}원
          </PurchaseText>
        </PurchasePropertyWrapper>
        <div>
          <button>
            주문하기
          </button>
        </div>
      </PurchaseWrapper>
    </div>
  );
}

export default PurchaseBox;
