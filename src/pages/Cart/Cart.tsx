import useCartList from '../../hooks/useCartList';

function Cart() {
  const { cartList } = useCartList();

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
