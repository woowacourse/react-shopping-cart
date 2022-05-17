import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Divider, Error, FlexWrapper, Image, Text } from 'components/@shared';
import Header from 'components/Header/Header.component';
import Loading from 'components/Loading/Loading.component';
import useFetch from 'hooks/useFetch';
import { addItem, deleteItem } from 'actions';
import { PALETTE } from 'styles/theme';

function ProductDetail() {
  const { product_id: productId } = useParams();
  const {
    data: productInfo,
    isLoading,
    error,
  } = useFetch(`${process.env.REACT_APP_API_HOST}/product/${productId}`);
  const dispatch = useDispatch();
  const shoppingBasketList = useSelector(state => state.shoppingBasketList);

  const isContained = shoppingBasketList.find(itemInfo => itemInfo.id === productId) !== undefined;

  const handleClickAddShoppingCart = () => {
    dispatch(isContained ? deleteItem(productId) : addItem(productId));
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
        <Divider
          style={{ marginTop: '33px' }}
          width={640}
          height={4}
          backgroundColor={PALETTE.GRAY_002}
        />
        <FlexWrapper style={{ justifyContent: 'space-between', width: '570px', marginTop: '33px' }}>
          <Text fontSize="large">금액</Text>
          <Text className="product-price" fontSize="extraLarge">
            {productInfo.price.toLocaleString('ko-KR')}원
          </Text>
        </FlexWrapper>
        <Button
          type="button"
          style={{ marginTop: '57px' }}
          width={638}
          height={98}
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
