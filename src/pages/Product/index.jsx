import Styled from './style';
import ProductDetail from 'components/ProductDetail/ProductDetail';
import Skeleton from 'components/Skeleton/Skeleton';
import errorApiImg from 'assets/png/errorApiImg.png';
import ImgWrapper from 'components/ImgWrapper/ImgWrapper';
import useProduct from 'hooks/useProduct';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const { isLoading, isError, data, handleAddCart } = useProduct();
  const navigate = useNavigate();

  const handleClickCartButton = () => {
    handleAddCart();
    navigate('/cart');
  };

  return (
    <Styled.Wrapper>
      {isLoading && <Skeleton sizeType="large" />}
      {isError && <ImgWrapper src={errorApiImg} />}
      {!isLoading && data && (
        <ProductDetail
          imgUrl={data.imgUrl}
          name={data.name}
          price={data.price}
          id={data.id}
          onClick={handleClickCartButton}
        />
      )}
    </Styled.Wrapper>
  );
};

export default Product;
