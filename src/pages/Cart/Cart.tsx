import useCart from '../../hooks/useCart';

/**
 * TODO: 
 * STEP 2 에서 구현할 예정입니다.
 * STEP 1 에서는 전역 상태 관리 테스트만 하고 있습니다!
 */

function Cart() {
  const { cartList } = useCart();
  return (
    <>
      {cartList.map((cart) => (
        <div key={cart.id}>
          <div style={{ fontSize: '20px' }}>
            {cart.product.name} - ({cart.quantity}개)
          </div>
        </div>
      ))}
    </>
  );
}
export default Cart;
