import ItemContainer from 'components/ItemList/ItemContainer';
import styled from 'styled-components';
import useUpdateCartItem from 'hooks/useUpdateCartItem';
import useSnackBar from 'hooks/useSnackBar';
import { useParams } from 'react-router-dom';
import { BASE_URL } from 'apis';
import { Item } from 'types/domain';
import Loading from 'components/common/Loading';
import RequestFail from 'components/common/RequestFail';
import { useFetch } from 'hooks/useFetch';
import useThunkFetch from 'hooks/useThunkFetch';
import { CartListAction } from 'redux/actions/cartList';
import { getCartList } from 'redux/action-creators/cartListThunk';
import Snackbar from 'components/common/Snackbar';
import { MAX_RESULT_ITEM_LIST } from 'constants/index';

const ItemList = () => {
  const params = useParams();
  const id = Number(params.id);

  const {
    data: itemList,
    error,
    loading,
  } = useFetch<Item[]>(`${BASE_URL}/itemList?_page=${id}&_limit=${MAX_RESULT_ITEM_LIST}`);

  const { data: cartList } = useThunkFetch<CartListAction>(
    state => state.cartListReducer,
    getCartList
  );
  const { updateCartItemQuantity } = useUpdateCartItem(cartList);

  const { isOpenSnackbar, openSnackbar } = useSnackBar();

  if (loading) return <Loading />;
  if (error) return <RequestFail />;

  return (
    <StyledRoot>
      {itemList.map(item => (
        <ItemContainer
          key={item.id}
          id={item.id}
          thumbnailUrl={item.thumbnailUrl}
          price={item.price}
          title={item.title}
          updateCartItemQuantity={updateCartItemQuantity}
          openSnackbar={openSnackbar}
        />
      ))}
      {isOpenSnackbar && <Snackbar contentType='cart' />}
    </StyledRoot>
  );
};

const StyledRoot = styled.div`
  width: 1300px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  gap: 2.7rem 5.73rem;
`;

export default ItemList;
