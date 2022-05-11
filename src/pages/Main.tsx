import ItemList from 'components/ItemList';
import Paginator from 'components/common/Paginator';
import { useAppSelector } from 'hooks/useAppSelector';
import { ItemListAction } from 'redux/actions/itemList';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getItemList } from 'redux/action-creators/itemListThunk';
import { useEffect } from 'react';

const Main = () => {
  const { data: itemList, error, loading } = useAppSelector(state => state.itemListReducer);
  const dispatch = useAppDispatch<ItemListAction>();

  useEffect(() => {
    dispatch(getItemList());
  }, []);

  return (
    <>
      <ItemList />
      <Paginator maxIndex={itemList.length} />
    </>
  );
};

export default Main;
