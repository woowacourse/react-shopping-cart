import * as Styled from './style';
import ProductDetail from 'components/Product/ProductDetail/ProductDetail';
import Skeleton from 'components/Common/Skeleton/Skeleton';
import errorApiImg from 'assets/png/errorApiImg.png';
import ImgWrapper from 'components/Common/ImgWrapper/ImgWrapper';
import useProductPage from 'hooks/pages/useProductPage';
import itemAltImg from 'assets/png/itemAltImg.png';

const Product = () => {
  const { isLoading, isError, product, handleClickCartButton } =
    useProductPage();
  if (isLoading)
    return (
      <Styled.Wrapper>
        <Skeleton sizeType="large" />
      </Styled.Wrapper>
    );

  if (isError)
    return (
      <Styled.Wrapper>
        <ImgWrapper src={errorApiImg} />
      </Styled.Wrapper>
    );

  return (
    <Styled.Wrapper>
      {product && (
        <ProductDetail
          id={product.id}
          imgUrl={product.imgUrl || itemAltImg}
          name={product.name}
          price={product.price}
          onClickCartButton={handleClickCartButton}
        />
      )}
    </Styled.Wrapper>
  );
};

export default Product;
