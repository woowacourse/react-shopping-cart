import Loading from 'components/common/Loading';
import Pagination from 'components/common/Pagination';
import RequestFail from 'components/common/RequestFail';
import Snackbar, { MESSAGE } from 'components/common/Snackbar';
import ItemContainer from 'components/ItemList/ItemContainer';
import { MAX_RESULT_ITEM_LIST } from 'constants/index';
import useSnackBar from 'hooks/useSnackBar';
import useThunkFetch from 'hooks/useThunkFetch';
import { useParams } from 'react-router-dom';
import { getCartListRequest } from 'redux/cartList/thunk';
import { getItemList } from 'redux/itemList/thunk';
import { getPageItemListRequest } from 'redux/pageItemList/thunk';
import styled from 'styled-components';

const ItemList = () => {
  const { id } = useParams();
  const {
    data: itemList,
    error: error_getItemList,
    loading,
  } = useThunkFetch(state => state.pageItemList, getPageItemListRequest(id));
  const { data: allItemList, error: error_getAllItemList } = useThunkFetch(
    state => state.itemList,
    getItemList()
  );
  const { data: cartList, error: error_getCartList } = useThunkFetch(
    state => state.cartList,
    getCartListRequest()
  );
  const { isOpenSnackbar, openSnackbar } = useSnackBar();

  if (loading) return <Loading />;
  if (error_getItemList || error_getAllItemList || error_getCartList) return <RequestFail />;

  return (
    <StyledRoot>
      {itemList?.map(item => (
        <ItemContainer
          key={item.id}
          item={item}
          cartItem={cartList.find(cartItem => cartItem.id === item.id)}
          openSnackbar={openSnackbar}
        />
      ))}
      <Pagination
        endpoint='main'
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
