import { useSelector } from 'react-redux';

const useProduct = id => {
  const { products } = useSelector(state => state.reducer);

  const product = products.find(product => product.id === id);

  return [product];
};

export default useProduct;
