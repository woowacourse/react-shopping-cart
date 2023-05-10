import useCart from '../../hooks/useCart';

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
