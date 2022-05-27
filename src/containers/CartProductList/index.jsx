import React from 'react';
import { useSelector } from 'react-redux';
import CartProduct from 'containers/CartProduct';

function CartProductList() {
  const carts = useSelector((state) => state.cart.carts);
  console.log(carts);

  return (
    <>
      {carts.map((product) => (
        <CartProduct
          key={product.id}
          id={product.id}
          imgSrc={product.imgSrc}
          title={product.title}
          total={product.total}
        />
      ))}
    </>
  );
}

export default CartProductList;
