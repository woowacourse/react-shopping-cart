import { useEffect } from 'react';
import { addItemToCart } from '../../../service/products';
import useProducts from '../../../hooks/useProducts';
import ProductDetail from '../../ProductDetail';
import Page from '../../@common/PageWrapper';
import {
  RecommendedItems,
  Container,
  RandomProduct,
  LeftButton,
  RightButton,
  Wrapper,
  Header,
  DetailContainer,
  PageWrapper,
} from './index.styles';
import useLoading from '../../../hooks/useLoading';
import useRandom from '../../../hooks/useRandom';
import Loading from '../../@common/Loading';
import ProductItem from '../../ProductItem';
import usePagination from '../../../hooks/usePagination';
import { SORT_RANDOM_ITEMS } from '../../../constants';
import { useLocation } from 'react-router';

const Details = ({ onImageError, match }) => {
  const location = useLocation();
  const { loading } = useLoading();
  const { randomItems } = useRandom();
  const { index, goPreviousPage, goNextPage, sortItemsBy } = usePagination();

  const {
    product,
    updateProductDetailURL,
    updateProductDetail,
    resetProductDetail,
  } = useProducts();

  const sortedItems = sortItemsBy(randomItems, SORT_RANDOM_ITEMS.STANDARD);

  console.log(randomItems, sortedItems);

  useEffect(() => {
    updateProductDetail(match);
    updateProductDetailURL();

    return () => resetProductDetail();
  }, [location]);

  return (
    <>
      <Page noPadding={true}>
        <PageWrapper>
          {loading && <Loading />}
          <DetailContainer>
            <ProductDetail
              product={product}
              onImageError={onImageError}
              addItemToCart={addItemToCart}
            />
          </DetailContainer>
          <Container>
            <Header>
              <h3>이런 상품은 어떠신가요?</h3>
            </Header>
            <RecommendedItems>
              <LeftButton onClick={goPreviousPage} />
              <RandomProduct>
                {sortedItems[index] &&
                  sortedItems[index].map((item, id) => (
                    <Wrapper key={id}>
                      <ProductItem {...item} showButton={false} smallImage />
                    </Wrapper>
                  ))}
              </RandomProduct>
              <RightButton onClick={() => goNextPage(randomItems)} />
            </RecommendedItems>
          </Container>
        </PageWrapper>
      </Page>
    </>
  );
};

export default Details;
