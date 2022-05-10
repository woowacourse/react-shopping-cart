import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getItemList } from 'redux/action-creators/itemListThunk';
import { RootState } from 'redux/reducers';
import ItemContainer from 'components/ItemList/ItemContainer';
import styled from 'styled-components';

const ItemList = () => {
  const {
    data: itemList,
    error,
    loading,
  } = useSelector((state: RootState) => state.itemListReducer);
  const dispatch = useDispatch();

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
  gap: 2.7rem 4.7rem;
`;

export default ItemList;
