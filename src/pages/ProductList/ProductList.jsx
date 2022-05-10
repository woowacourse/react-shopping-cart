import Header from 'components/Header/Header';
import { productList } from 'assets/mock';
import ProductContainer from 'components/ProductContainer/ProductContainer';
import ProductItem from 'components/ProductItem/ProductItem';

const ProductList = () => {
  return (
    <>
      <Header />
      <ProductContainer>
        {productList.map(({ name, price, imgUrl, id }) => (
          <ProductItem name={name} price={price} imgUrl={imgUrl} key={id} />
        ))}
      </ProductContainer>
    </>
  );
};

export default ProductList;
