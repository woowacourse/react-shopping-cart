import { useOrderContext } from '../context/useOrderContext';

export default function OrderConfirmationText() {
  const { cartTypeQuantity, totalQuantity } = useOrderContext();

  return (
    <>
      <span>
        총 {cartTypeQuantity}종류의 상품 {totalQuantity}개를 주문합니다.
      </span>
      <span>최종 결제 금액을 확인해 주세요.</span>
    </>
  );
}
