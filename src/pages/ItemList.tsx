import { BASE_URL } from 'apis';
import Loading from 'components/common/Loading';
import Pagination from 'components/common/Pagination';
import RequestFail from 'components/common/RequestFail';
import Snackbar, { MESSAGE } from 'components/common/Snackbar';
import ItemContainer from 'components/ItemList/ItemContainer';
import { MAX_RESULT_ITEM_LIST } from 'constants/index';
import useCartRequest from 'hooks/useCartRequest';
import { useFetch } from 'hooks/useFetch';
import useSnackBar from 'hooks/useSnackBar';
import useThunkFetch from 'hooks/useThunkFetch';
import { useParams } from 'react-router-dom';
import { getCartList } from 'redux/action-creators/cartListThunk';
import { getItemList } from 'redux/action-creators/itemListThunk';
import styled from 'styled-components';
import { Item } from 'types/domain';

const ItemList = () => {
  const { id } = useParams();
  const { isOpenSnackbar, openSnackbar } = useSnackBar();

  const {
    data: itemList,
    error: itemListError,
    loading,
  } = useFetch<Item[]>(`${BASE_URL}/itemList?_page=${id}&_limit=${MAX_RESULT_ITEM_LIST}`);
  const { data: allItemList, error: allItemListError } = useThunkFetch(
    state => state.itemListReducer,
    getItemList
  );
  const { data: cartList, error: cartListError } = useThunkFetch(
    state => state.cartListReducer,
    getCartList
  );
  const { postCartItemQuantity, updateCartItemQuantity } = useCartRequest(cartList);

  if (loading) return <Loading />;
  if (itemListError || allItemListError || cartListError) return <RequestFail />;

  return (
    <StyledRoot>
      {itemList.map(item => {
        const isInCart = cartList.some(el => el.id === item.id);

        return (
          <ItemContainer
            key={item.id}
            id={item.id}
            thumbnailUrl={item.thumbnailUrl}
            price={item.price}
            title={item.title}
            onCartClick={
              isInCart ? updateCartItemQuantity?.(item.id) : postCartItemQuantity?.(item.id)
            }
            openSnackbar={openSnackbar}
          />
        );
      })}
      <Pagination
        count={10}
        lastIndex={Math.floor(allItemList.length / MAX_RESULT_ITEM_LIST) + 1}
      />
      {isOpenSnackbar && <Snackbar message={MESSAGE.cart} />}
    </StyledRoot>
  );
};

export default ItemList;

const StyledRoot = styled.div`
  width: 1300px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  gap: 2.7rem 5.73rem;
`;
