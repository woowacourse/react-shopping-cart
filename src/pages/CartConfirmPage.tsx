import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import {
  productTypesCountState,
  purchaseTotalPriceState,
  totalQuantityState,
} from '@recoil/cartItems';

export default function CartConfirmPage() {
  const navigate = useNavigate();

  const totalPurchasePrice = useRecoilValue(purchaseTotalPriceState);
  const totalQuantity = useRecoilValue(totalQuantityState);
  const productTypesCount = useRecoilValue(productTypesCountState);

  return (
    <div>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      <p>
        총 {productTypesCount}종류의 상품 {totalQuantity}개를 주문합니다.
      </p>
      <p>최종 결제 금액을 확인해주세요.</p>
      <p>총 결제 금액: {totalPurchasePrice}원</p>
    </div>
  );
}
