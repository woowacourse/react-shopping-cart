import useProducts from 'hooks/useGetProductList';
import ProductContainer from 'components/ProductContainer';
import ProductItem from 'components/ProductItem';
import SkeletonList from 'components/SkeletonList';
import ImgWrapper from 'components/ImgWrapper';
import errorApiImg from 'assets/png/errorApiImg.png';
import emptyImg from 'assets/png/emptyImg.png';
import comma from 'utils/comma';

const ProductList = () => {
  const {
    productList,
    isProductListLoading,
    isProductListError,
    isProductListEmpty,
  } = useProducts();

  return (
    <>
      {isProductListError ? (
        <ImgWrapper src={errorApiImg} alt="API 에러 이미지" />
      ) : isProductListEmpty ? (
        <ImgWrapper src={emptyImg} alt="빈 화면 이미지" />
      ) : (
        <ProductContainer>
          {isProductListLoading && <SkeletonList length={8} />}
          {productList.map(({ name, price, imgUrl, id }) => (
            <ProductItem
              key={id}
              id={id}
              name={name}
              price={comma(price)}
              imgUrl={imgUrl}
            />
          ))}
        </ProductContainer>
      )}
    </>
  );
};

export default ProductList;
