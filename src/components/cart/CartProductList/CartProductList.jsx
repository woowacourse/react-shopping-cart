import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartAsync } from '../../../store/actions/cart';
import CartProductCard from '../../product/CartProductCard/CartProductCard';

function CartProductList() {
  const {
    cart: { cart },
  } = useSelector(({ cart }) => cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div>
      {cart &&
        Object.keys(cart).map((id) => {
          const { productData, quantity } = cart[id];
          return <CartProductCard key={id} product={productData} quantity={quantity} />;
        })}
    </div>
  );
}

export default CartProductList;
