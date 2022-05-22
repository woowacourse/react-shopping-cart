import Product from 'component/ProductList/Product';
import { PATH } from 'constant/path';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectProduct } from 'store/action/selectActions';
import { addCartProductThunk } from 'store/thunk/productThunk';

function ProductContainer({ product }) {
  const { image, name, price, id } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProductClick = productId => {
    dispatch(selectProduct(productId));
    navigate(PATH.PRODUCT_DETAIL);
  };

  const handleCartClick = () => {
    dispatch(addCartProductThunk(product));
  };

  return (
    <Product
      handleProductClick={handleProductClick}
      handleCartClick={handleCartClick}
      image={image}
      name={name}
      price={price}
      id={id}
    ></Product>
  );
}

export default ProductContainer;
