import { Product } from 'component';

function ProductContainer({ image, name, price }) {
  const handleProductClick = () => {
    return;
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
    ></Product>
  );
}

export default ProductContainer;
