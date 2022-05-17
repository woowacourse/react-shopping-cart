import { Product } from 'component';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectProduct } from 'store/action/selectActions';

function ProductContainer({ image, name, price, id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProductClick = productId => {
    console.log(productId);
    dispatch(selectProduct(productId));
    navigate('/productDetail');
  };

  const handleCartClick = () => {
    return;
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
