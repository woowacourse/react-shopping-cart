import { useEffect } from 'react';
import { addItemToCart } from '../../../service/products';
import useProducts from '../../../hooks/useProducts';
import PageWrapper from '../../@common/PageWrapper';
import ProductDetail from '../../ProductDetail';
import {
  DetailWrapper,
  Container,
  RandomProduct,
  LeftButton,
  RightButton,
  Wrapper,
} from './index.styles';
import useLoading from '../../../hooks/useLoading';
import useRandom from '../../../hooks/useRandom';
import Loading from '../../@common/Loading';
import ProductItem from '../../ProductItem';

const Details = ({ onImageError, match }) => {
  const { loading, timer } = useLoading();

  const {
    products,
    product,
    updateProductDetailURL,
    updateProductDetail,
    resetProductDetail,
    randomProducts,
  } = useProducts();

  useEffect(() => {
    updateProductDetail(match);
    updateProductDetailURL();

    return () => resetProductDetail();
  }, []);

  const { randomItems, setRandomItems } = useRandom();
  useEffect(() => {
    setRandomItems(randomProducts(products, 5));
  }, [loading]);

  useEffect(() => {
    if (loading === false) return;
    timer();

    return clearTimeout(timer());
  }, [loading]);

  return (
    <DetailWrapper>
      {loading && <Loading />}
      <PageWrapper noPadding={true}>
        <ProductDetail
          product={product}
          sd
          onImageError={onImageError}
          addItemToCart={addItemToCart}
        />
      </PageWrapper>
      <Container>
        <RandomProduct>
          <LeftButton onClick={() => {}} />
          {randomItems.map((item, id) => (
            <Wrapper>
              <ProductItem key={id} {...item} showButton={false} />
            </Wrapper>
          ))}
          <RightButton onClick={() => {}} />
        </RandomProduct>
      </Container>
    </DetailWrapper>
  );
};

export default Details;
