import Styled from './style';
import ProductDetail from 'components/ProductDetail/ProductDetail';
import Skeleton from 'components/Skeleton/Skeleton';
import errorApiImg from 'assets/png/errorApiImg.png';
import ImgWrapper from 'components/ImgWrapper/ImgWrapper';
import useAddCartItem from 'hooks/useAddCartItem';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_NAME } from 'constants';
import useFetch from 'hooks/useFetch';
import { useEffect } from 'react';

const Product = () => {
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: product,
    fetchData,
  } = useFetch({
    method: 'get',
    url: `/products/${id}`,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const { addCarItem } = useAddCartItem();
  const navigate = useNavigate();

  const handleClickCartButton = () => {
    addCarItem(product.id);
    navigate(PATH_NAME.CART);
  };

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
