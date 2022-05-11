import { useEffect } from 'react';
import { getItemList } from 'redux/action-creators/itemListThunk';
import ItemContainer from 'components/ItemList/ItemContainer';
import styled from 'styled-components';
import { ItemListAction } from 'redux/actions/itemList';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import useCartList from 'hooks/useCartList';

const ItemList = () => {
  const { data: itemList, error, loading } = useAppSelector(state => state.itemListReducer);
  const dispatch = useAppDispatch<ItemListAction>();
  // @TODO: 에러 처리
  const { cartList, updateCartItemQuantity } = useCartList();

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
