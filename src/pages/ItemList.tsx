import { useEffect } from 'react';
import { getItemList } from 'redux/action-creators/itemListThunk';
import ItemContainer from 'components/ItemList/ItemContainer';
import styled from 'styled-components';
import { ItemListAction } from 'redux/actions/itemList';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';

const ItemList = () => {
  const { data: itemList, error, loading } = useAppSelector(state => state.itemListReducer);
  const dispatch = useAppDispatch<ItemListAction>();

  useEffect(() => {
    dispatch(getItemList());
  }, []);

  return (
    <StyledRoot>
      {itemList.map(item => (
        <ItemContainer
          key={item.id}
          thumbnailUrl={item.thumbnailUrl}
          price={item.price}
          title={item.title}
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
