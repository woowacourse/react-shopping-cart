import Product from 'component/ProductList/Product';
import { PATH } from 'constant/path';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductCart } from 'store/action/cartActions';
import { selectProduct } from 'store/action/selectActions';
import { updateSnackBar } from 'store/action/snackBarActions';

function ProductContainer({ product }) {
  const { image, name, price, id } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProductClick = productId => {
    dispatch(selectProduct(productId));
    navigate(PATH.PRODUCT_DETAIL);
  };

  const handleCartClick = () => {
    dispatch(addProductCart(product));
    dispatch(updateSnackBar(`${name} 1개가 장바구니에 추가되었습니다.`));
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
