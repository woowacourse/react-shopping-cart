import errorApiImg from 'assets/png/errorApiImg.png';
import emptyImg from 'assets/png/emptyImg.png';
import ProductContainer from 'components/ProductContainer/ProductContainer';
import ProductItem from 'components/ProductItem/ProductItem';
import Skeleton from 'components/Skeleton/Skeleton';
import ImgWrapper from 'components/ImgWrapper/ImgWrapper';
import useProducts from 'hooks/useProducts';

const ProductList = () => {
  const { isLoading, isError, products } = useProducts();
  const isEmpty = !isLoading && products.length === 0;

  const getLoadingStatus = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <Skeleton key={index} sizeType="small" />
    ));
  };

  return (
    <>
      {isError ? (
        <ImgWrapper src={errorApiImg} />
      ) : isEmpty ? (
        <ImgWrapper src={emptyImg} />
      ) : (
        <ProductContainer>
          {isLoading && getLoadingStatus()}
          {products.map(({ name, price, imgUrl, id }) => (
            <ProductItem
              id={id}
              name={name}
              price={price}
              imgUrl={imgUrl}
              key={id}
            />
          ))}
        </ProductContainer>
      )}
    </>
  );
};

export default ProductList;
