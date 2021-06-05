import { useEffect } from 'react';
import { addItemToCart } from '../../../service/products';
import useProducts from '../../../hooks/useProducts';
import PageWrapper from '../../@common/PageWrapper';
import ProductDetail from '../../ProductDetail';
import {
  DetailWrapper,
  RecommendedItems,
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
import usePagination from '../../../hooks/usePagination';

const Details = ({ onImageError, match }) => {
  const { loading, timer } = useLoading();
  const { randomItems, setRandomItems } = useRandom();
  const { page, goPreviousPage, goNextPage, sortItemsBy } = usePagination();

  const {
    products,
    product,
    updateProductDetailURL,
    updateProductDetail,
    resetProductDetail,
    randomProducts,
  } = useProducts();

  const sortedItems = sortItemsBy(randomItems, 'id');
  console.log(sortedItems);

  useEffect(() => {
    updateProductDetail(match);
    updateProductDetailURL();

    return () => resetProductDetail();
  }, []);

  useEffect(() => {
    setRandomItems(randomProducts(products, 10));

    if (loading === false) return;
    timer();

    return clearTimeout(timer());
  }, [loading]);

  return (
    <>
      <PageWrapper noPadding={true}>
        <DetailWrapper>
          {loading && <Loading />}
          <ProductDetail
            product={product}
            sd
            onImageError={onImageError}
            addItemToCart={addItemToCart}
          />
        </DetailWrapper>
      </PageWrapper>
      <Container>
        <h3>이런 상품은 어떠신가요?</h3>
        <RecommendedItems>
          <LeftButton onClick={goPreviousPage} />
          <RandomProduct>
            {sortedItems[page - 1] &&
              sortedItems[page - 1].map((item, id) => (
                <Wrapper key={id}>
                  <ProductItem {...item} showButton={false} smallImage />
                </Wrapper>
              ))}
          </RandomProduct>
          <RightButton onClick={() => goNextPage(randomItems)} />
        </RecommendedItems>
      </Container>
    </>
  );
};

export default Details;
