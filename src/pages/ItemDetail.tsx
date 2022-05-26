import Button from 'components/common/Button';
import CroppedImage from 'components/common/CroppedImage';
import Loading from 'components/common/Loading';
import RequestFail from 'components/common/RequestFail';
import Snackbar, { MESSAGE } from 'components/common/Snackbar';
import { useAppDispatch } from 'hooks/useAppDispatch';
import useSnackBar from 'hooks/useSnackBar';
import useThunkFetch from 'hooks/useThunkFetch';
import { useParams } from 'react-router-dom';
import { CartListAction } from 'redux/cartList/action';
import { getCartListRequest, postCartItemRequest, putCartItemRequest } from 'redux/cartList/thunk';
import { getItemRequest } from 'redux/item/thunk';
import styled from 'styled-components';
import theme from 'styles/theme';

const ItemDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch<CartListAction>();

  const {
    data: item,
    loading,
    error: error_itemList,
  } = useThunkFetch(state => state.item, getItemRequest(id));
  const { data: cartList, error: error_cartList } = useThunkFetch(
    state => state.cartList,
    getCartListRequest()
  );
  const { isOpenSnackbar, openSnackbar } = useSnackBar();

  const isInCart = cartList?.some(cartItem => cartItem.id === item?.id);

  const postCart = () => {
    dispatch(postCartItemRequest({ id: Number(id), quantity: 1, isSelected: true }));
    openSnackbar();
  };

  const updateCart = () => {
    const targetItem = cartList.find(cartItem => cartItem.id === Number(id));

    dispatch(putCartItemRequest({ ...targetItem, quantity: targetItem.quantity + 1 }));
    openSnackbar();
  };

  if (loading) return <Loading />;
  if (error_itemList || error_cartList) return <RequestFail />;

  const { thumbnailUrl, title, price } = item;

  return (
    <StyledRoot>
      <CroppedImage src={thumbnailUrl} width='570px' height='570px' alt='상품' />
      <StyledTitle>{title}</StyledTitle>
      <StyledPrice>
        <StyledPriceDescription>금액</StyledPriceDescription>
        <StyledPriceValue>{price.toLocaleString()}</StyledPriceValue>
      </StyledPrice>
      <Button
        width='63.8rem'
        height='9.8rem'
        fontSize='3.2rem'
        backgroundColor={theme.colors.brown}
        color='white'
        onClick={isInCart ? updateCart : postCart}
      >
        장바구니
      </Button>
      {isOpenSnackbar && <Snackbar message={MESSAGE.cart} />}
    </StyledRoot>
  );
};

export default ItemDetail;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  width: 64rem;
`;

const StyledTitle = styled.div`
  font-weight: 700;
  font-size: 3.2rem;
  width: 100%;
  padding: 0 3.5rem;
  margin-top: 2.1rem;
  margin-bottom: 3.3rem;
`;

const StyledPrice = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: solid 0.4rem ${({ theme }) => theme.colors.GRAY_aaa};
  width: 100%;
  padding: 0 3.5rem;
  padding-top: 3.3rem;
  margin-bottom: 5.7rem;
`;

const StyledPriceDescription = styled.span`
  font-weight: 400;
  font-size: 2.4rem;
`;

const StyledPriceValue = styled.span`
  font-weight: 400;
  font-size: 3.2rem;
`;
