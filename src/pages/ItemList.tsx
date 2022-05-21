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
import { getCartListRequest } from 'redux/cartList/thunk';
import { getItemList } from 'redux/itemList/thunk';
import styled from 'styled-components';
import { Item } from 'types/domain';

const ItemList = () => {
  const { id } = useParams();
  const {
    data: itemList,
    error: itemListError,
    loading,
  } = useFetch<Item[]>(`/itemList?_page=${id}&_limit=${MAX_RESULT_ITEM_LIST}`);
  const { data: allItemList, error: allItemListError } = useThunkFetch(
    state => state.itemListReducer,
    getItemList
  );
  const { data: cartList, error: cartListError } = useThunkFetch(
    state => state.cartListReducer,
    getCartListRequest
  );
  const { postCartItemQuantity, updateCartItemQuantity } = useCartRequest(cartList);
  const { isOpenSnackbar, openSnackbar } = useSnackBar();

  if (loading) return <Loading />;
  if (itemListError || allItemListError || cartListError) return <RequestFail />;

  return (
    <StyledRoot>
      {itemList?.map(({ id, thumbnailUrl, title, price }) => {
        const isInCart = cartList.some(cartItem => cartItem.id === id);

        return (
          <ItemContainer
            key={id}
            id={id}
            thumbnailUrl={thumbnailUrl}
            price={price}
            title={title}
            onCartClick={isInCart ? updateCartItemQuantity?.(id) : postCartItemQuantity?.(id)}
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
