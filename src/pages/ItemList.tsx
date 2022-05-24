import Loading from 'components/common/Loading';
import Pagination from 'components/common/Pagination';
import RequestFail from 'components/common/RequestFail';
import Snackbar, { MESSAGE } from 'components/common/Snackbar';
import ItemContainer from 'components/ItemList/ItemContainer';
import { MAX_RESULT_ITEM_LIST } from 'constants/index';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useFetch } from 'hooks/useFetch';
import useSnackBar from 'hooks/useSnackBar';
import useThunkFetch from 'hooks/useThunkFetch';
import { useParams } from 'react-router-dom';
import { CartListAction } from 'redux/cartList/action';
import { getCartListRequest, postCartItemRequest, putCartItemRequest } from 'redux/cartList/thunk';
import { getItemList } from 'redux/itemList/thunk';
import styled from 'styled-components';
import { Item } from 'types/domain';

const ItemList = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch<CartListAction>();
  const {
    data: itemList,
    error: error_getItemList,
    loading,
  } = useFetch<Item[]>(`/itemList?_page=${id}&_limit=${MAX_RESULT_ITEM_LIST}`);
  const { data: allItemList, error: error_getAllItemList } = useThunkFetch(
    state => state.itemList,
    getItemList
  );
  const { data: cartList, error: error_getCartList } = useThunkFetch(
    state => state.cartList,
    getCartListRequest
  );
  const { isOpenSnackbar, openSnackbar } = useSnackBar();

  if (loading) return <Loading />;
  if (error_getItemList || error_getAllItemList || error_getCartList) return <RequestFail />;

  return (
    <StyledRoot>
      {itemList?.map(item => {
        const id = item.id;
        const targetCartItem = cartList.find(cartItem => cartItem.id === id);

        const handleCartClick = () => {
          if (targetCartItem) {
            return () =>
              dispatch(
                putCartItemRequest({
                  ...targetCartItem,
                  quantity: targetCartItem.quantity + 1,
                })
              );
          }

          return () =>
            dispatch(postCartItemRequest({ id: Number(id), quantity: 1, isSelected: true }));
        };

        return (
          <ItemContainer
            key={id}
            item={item}
            onCartClick={handleCartClick()}
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
