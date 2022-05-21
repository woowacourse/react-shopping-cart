import { useParams } from 'react-router-dom';
import { Button, Divider, Error, FlexWrapper, Image, Text } from 'components/@shared';
import Header from 'components/Header/Header.component';
import Loading from 'components/Loading/Loading.component';
import { useFetch, useShoppingBasket } from 'hooks';
import STATE_KEY from 'constants/stateKey';
import { PALETTE } from 'styles/theme';

function ProductDetail() {
  const { product_id: productId } = useParams();

  const {
    data: productInfo,
    isLoading,
    error,
  } = useFetch(`${process.env.REACT_APP_API_HOST}/product/${productId}`);

  const { checkIsContainedProduct, addProduct, deleteProducts } = useShoppingBasket(
    STATE_KEY.SHOPPING_BASKET_REDUCER
  );

  const isContained = checkIsContainedProduct(Number(productId));

  const handleClickAddShoppingCart = () => {
    isContained ? deleteProducts([productInfo.id]) : addProduct(productInfo);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <Loading style={{ marginTop: '60px' }} />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Error style={{ marginTop: '60px' }}>상품 정보를 불러올 수 없습니다.</Error>
      </>
    );
  }

  return (
    <>
      <Header />
      <FlexWrapper style={{ margin: '60px 0 60px' }} isColumnDirection={true}>
        <FlexWrapper isColumnDirection={true}>
          <Image src={productInfo.thumbnail} type="large" />
          <Text style={{ marginTop: '21px' }} fontSize="extraLarge" bold={true}>
            {productInfo.name}
          </Text>
        </FlexWrapper>
        <Divider width="640px" height="4px" margin="33px 0 0" backgroundColor={PALETTE.GRAY_002} />
        <FlexWrapper style={{ justifyContent: 'space-between', width: '570px', marginTop: '33px' }}>
          <Text fontSize="large">금액</Text>
          <Text className="product-price" fontSize="extraLarge">
            {productInfo.price.toLocaleString('ko-KR')}원
          </Text>
        </FlexWrapper>
        <Button
          type="button"
          style={{ marginTop: '57px' }}
          width={'638px'}
          height={'98px'}
          backgroundColor={isContained ? PALETTE.MINT_001 : PALETTE.BROWN_001}
          onClick={handleClickAddShoppingCart}
        >
          <Text style={{ color: PALETTE.WHITE_001 }} bold={true} fontSize="extraLarge">
            장바구니
          </Text>
        </Button>
      </FlexWrapper>
    </>
  );
}

export default ProductDetail;
