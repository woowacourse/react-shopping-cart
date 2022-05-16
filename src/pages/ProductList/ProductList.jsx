import useProducts from 'hooks/useProducts';
import ProductContainer from 'components/ProductContainer';
import ProductItem from 'components/ProductItem';
import SkeletonList from 'components/SkeletonList';
import ImgWrapper from 'components/ImgWrapper';
import errorApiImg from 'assets/png/errorApiImg.png';
import emptyImg from 'assets/png/emptyImg.png';
import comma from 'utils/comma';

const ProductList = () => {
  const { getProductsEffect, products, isLoading, isError, isEmpty } =
    useProducts();

  getProductsEffect();

  return (
    <>
      {isError ? (
        <ImgWrapper src={errorApiImg} alt="API 에러 이미지" />
      ) : isEmpty ? (
        <ImgWrapper src={emptyImg} alt="빈 화면 이미지" />
      ) : (
        <ProductContainer>
          {isLoading && <SkeletonList length={8} />}
          {products.map(({ name, price, imgUrl, id }) => (
            <ProductItem
              id={id}
              name={name}
              price={comma(price)}
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
