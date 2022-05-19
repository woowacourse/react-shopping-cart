import Styled from './style';
import ProductDetail from 'components/ProductDetail/ProductDetail';
import Skeleton from 'components/Skeleton/Skeleton';
import errorApiImg from 'assets/png/errorApiImg.png';
import ImgWrapper from 'components/ImgWrapper/ImgWrapper';
import useProduct from 'hooks/useProduct';
import useAddCartItem from 'hooks/useAddCartItem';
import { useNavigate } from 'react-router-dom';
import { PATH_NAME } from 'constants';

const Product = () => {
  const { isLoading, isSucceed, isError, product } = useProduct();
  const { addCarItem } = useAddCartItem();
  const navigate = useNavigate();

  const handleClickCartButton = () => {
    addCarItem(product.id);
    navigate(PATH_NAME.CART);
  };

  return (
    <Styled.Wrapper>
      {isLoading && <Skeleton sizeType="large" />}
      {isError && <ImgWrapper src={errorApiImg} />}
      {isSucceed && product && (
        <ProductDetail
          id={product.id}
          imgUrl={product.imgUrl}
          name={product.name}
          price={product.price}
          onClickCartButton={handleClickCartButton}
        />
      )}
    </Styled.Wrapper>
  );
};

export default Product;
