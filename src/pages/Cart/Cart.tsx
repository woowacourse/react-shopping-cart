import useCart from '../../hooks/useCart';

/**
 * STEP 2 에서 구현할 예정입니다.
 * STEP 1 에서는 전역 상태 관리 테스트만 하고 있습니다!
 */

function Cart() {
  const { cartList } = useCart();
  return (
    <>
      {cartList.map((cart) => (
        <div key={cart.id}>
          <h1>
            {cart.product.name} - ({cart.quantity}개)
          </h1>
        </div>
      ))}
    </>
  );
}
export default Cart;
