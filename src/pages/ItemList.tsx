import { getItemList } from 'redux/action-creators/itemListThunk';
import ItemContainer from 'components/ItemList/ItemContainer';
import styled from 'styled-components';
import { ItemListAction } from 'redux/actions/itemList';
import { useAppDispatch } from 'hooks/useAppDispatch';
import useCartList from 'hooks/useCartList';
import { useAppSelector } from 'hooks/useAppSelector';
import useSnackBar from 'hooks/useSnackBar';
import { useEffect } from 'react';

const ItemList = () => {
  const { data: itemList, error, loading } = useAppSelector(state => state.itemListReducer);
  const dispatch = useAppDispatch<ItemListAction>();

  const { cartList, updateCartItemQuantity } = useCartList();
  const { openSnackbar } = useSnackBar();

  useEffect(() => {
    dispatch(getItemList());
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
