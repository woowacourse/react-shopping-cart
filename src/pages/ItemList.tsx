import { useEffect, useCallback, useRef } from 'react';
import { getItemList } from 'redux/action-creators/itemListThunk';
import ItemContainer from 'components/ItemList/ItemContainer';
import styled from 'styled-components';
import { ItemListAction } from 'redux/actions/itemList';
import { useAppDispatch } from 'hooks/useAppDispatch';
import useCartList from 'hooks/useCartList';
import { useDispatch } from 'react-redux';
import { SnackbarActionType } from 'redux/actions/snackbar';
import { useAppSelector } from 'hooks/useAppSelector';

const ItemList = () => {
  const { data: itemList, error, loading } = useAppSelector(state => state.itemListReducer);
  const dispatch = useAppDispatch<ItemListAction>();
  // @TODO: 에러 처리
  const { cartList, updateCartItemQuantity } = useCartList();
  const timerRef = useRef(null);
  const snackbarDispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemList());
  }, []);

  const openSnackbar = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    snackbarDispatch({ type: SnackbarActionType.OPEN_SNACKBAR, payload: 'cart' });
    timerRef.current = setTimeout(() => {
      snackbarDispatch({ type: SnackbarActionType.CLOSE_SNACKBAR });
    }, 3000);
  }, []);

  return (
    <StyledRoot>
      {itemList.map((item, index) => (
        <ItemContainer
          key={item.id}
          id={item.id}
          thumbnailUrl={item.thumbnailUrl}
          price={item.price}
          title={item.title}
          updateCartItemQuantity={cartList[index] && updateCartItemQuantity}
          openSnackbar={openSnackbar}
        />
      ))}
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
