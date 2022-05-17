import { BASE_URL } from 'apis';
import Button from 'components/common/Button';
import CroppedImage from 'components/common/CroppedImage';
import Loading from 'components/common/Loading';
import RequestFail from 'components/common/RequestFail';
import Snackbar, { MESSAGE } from 'components/common/Snackbar';
import { useFetch } from 'hooks/useFetch';
import useSnackBar from 'hooks/useSnackBar';
import useThunkFetch from 'hooks/useThunkFetch';
import useUpdateCartItem from 'hooks/useUpdateCartItem';
import { useParams } from 'react-router-dom';
import { getCartList } from 'redux/action-creators/cartListThunk';
import { CartListAction } from 'redux/actions/cartList';
import styled from 'styled-components';
import type { Item } from 'types/domain';

const ItemDetail = () => {
  const params = useParams();
  const id = Number(params.id);
  const { isOpenSnackbar, openSnackbar } = useSnackBar();
  const { data: item, loading, error } = useFetch<Item>(`${BASE_URL}/itemList/${id}`);
  const { data: cartList } = useThunkFetch<CartListAction>(
    state => state.cartListReducer,
    getCartList
  );
  const { updateCartItemQuantity } = useUpdateCartItem(cartList);

  const handleClickCart = () => {
    updateCartItemQuantity(id);
    openSnackbar();
  };

  if (loading) return <Loading />;
  if (error) return <RequestFail />;

  const { thumbnailUrl, title, price } = item;

  return (
    <StyledRoot>
      <CroppedImage src={thumbnailUrl} width='570px' height='570px' alt='상품' />
      <StyledTitle>{title}</StyledTitle>
      <StyldPrice>
        <StyledPriceDescription>금액</StyledPriceDescription>
        <StyledPriceValue>{price.toLocaleString()}</StyledPriceValue>
      </StyldPrice>
      <Button size='large' backgroundColor='brown' onClick={handleClickCart}>
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

const StyldPrice = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: solid 0.4rem ${({ theme }) => theme.colors.divisionLine};
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
