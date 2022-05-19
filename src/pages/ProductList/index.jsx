import errorApiImg from 'assets/png/errorApiImg.png';
import emptyImg from 'assets/png/emptyImg.png';
import ProductContainer from 'components/ProductContainer/ProductContainer';
import ProductItem from 'components/ProductItem/ProductItem';
import Skeleton from 'components/Skeleton/Skeleton';
import ImgWrapper from 'components/ImgWrapper/ImgWrapper';
import useProducts from 'hooks/useProducts';
import useAddCartItem from 'hooks/useAddCartItem';

const ProductList = () => {
  const { isLoading, isSucceed, isError, products } = useProducts();
  const { addCarItem } = useAddCartItem();
  const isEmpty = !isLoading && products.length === 0;

  const handleClickCartButton = (id) => (e) => {
    e.stopPropagation();
    addCarItem(id);
  };

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
          {isSucceed &&
            products.map(({ name, price, imgUrl, id }) => (
              <ProductItem
                id={id}
                name={name}
                price={price}
                imgUrl={imgUrl}
                key={id}
                onClickCartButton={handleClickCartButton(id)}
              />
            ))}
        </ProductContainer>
      )}
    </>
  );
};

export default ProductList;
