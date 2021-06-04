import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { MESSAGE, ROUTE } from '../constants';
import { addProduct } from '../redux/cartSlice';

const useProduct = () => {
  const { products } = useSelector(({ product }) => product);
  const dispatch = useDispatch();
  const history = useHistory();

  const addToCart = product => {
    if (!window.confirm(MESSAGE.PRODUCTS.ADD_TO_CART_CONFIRM)) return;
    alert(MESSAGE.PRODUCTS.ADD_TO_CART_ALERT);
    dispatch(addProduct({ product }));
  };

  const viewProductDetail = product =>
    history.push(ROUTE.PRODUCT_DETAIL, { product });

  return { products, addToCart, viewProductDetail };
};

export default useProduct;
