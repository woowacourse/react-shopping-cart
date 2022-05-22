import Product from 'component/ProductList/ProductContainer/Product';
import { PATH } from 'constant/path';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectProduct } from 'store/action/selectActions';
import { addCartProductThunk } from 'store/thunk/productThunk';

function ProductContainer({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProductClick = () => {
    dispatch(selectProduct(product.id));
    navigate(PATH.PRODUCT_DETAIL);
  };

  const handleCartClick = () => {
    dispatch(addCartProductThunk(product));
  };

  return (
    <Product
      handleProductClick={handleProductClick}
      handleCartClick={handleCartClick}
      product={product}
    ></Product>
  );
}

export default ProductContainer;
