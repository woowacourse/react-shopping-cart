import { useSelector } from 'react-redux';

const useCart = id => {
  const { shoppingCart } = useSelector(state => state.reducer);

  const isInCart = shoppingCart.some(product => product.id === id);
  const product = shoppingCart.find(product => product.id === id);

  return [isInCart, product];
};

export default useCart;
