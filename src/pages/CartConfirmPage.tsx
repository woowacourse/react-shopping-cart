import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { fetchTotalQuantity } from '@/apis/cartItem';
import { cartItemsState, purchaseTotalPriceState } from '@/recoil/cartItems';

export default function CartConfirmPage() {
  const navigate = useNavigate();
  const cartItems = useRecoilValue(cartItemsState);
  const totalPurchasePrice = useRecoilValue(purchaseTotalPriceState);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const getTotalQuantity = async () => {
      const result = await fetchTotalQuantity();
      setTotalCount(result);
    };

    getTotalQuantity();
  }, []);

  return (
    <div>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      <p>
        총 {cartItems.length}종류의 상품 {totalCount}개를 주문합니다.
      </p>
      <p>최종 결제 금액을 확인해주세요.</p>
      <p>총 결제 금액: {totalPurchasePrice}원</p>
    </div>
  );
}
