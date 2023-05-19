import { useRecoilValue } from 'recoil';
import useCart from '../../hooks/useCart';
import { cartCountSelector } from '../../recoil/cartAtoms';

function Cart() {
  const { cartList } = useCart();
  const cartCount = useRecoilValue(cartCountSelector);

  return (
    <div>
      <div>장바구니</div>
      <div style={{ display: 'flex' }}>
        <div>
          <div>든든배송 상품 ({cartCount}개)</div>
          {cartList.map((cart) => (
            <div key={cart.id}>
              <div style={{ fontSize: '20px' }}>
                {JSON.stringify(cart)}
              </div>
            </div>
          ))}
        </div>
        <div>
          <div>결제예상금액</div>
          <div>
            <div>
              총 상품가격
            </div>
            <div>
              {0}원
            </div>
          </div>
          <div>
            <div>
              총 배송비
            </div>
            <div>
              {0}원
            </div>
          </div>
          <div>
            <div>
              총 주문 금액
            </div>
            <div>
              {0}원
            </div>
          </div>
          <div>
            <button>
              주문하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
