import ItemList from 'components/ItemList';
import Paginator from 'components/common/Paginator';
import { ItemListAction } from 'redux/actions/itemList';
import { getItemList } from 'redux/action-creators/itemListThunk';
import useThunkFetch from 'hooks/useThunkFetch';

const Main = () => {
  const { data: itemList } = useThunkFetch<ItemListAction>(
    state => state.itemListReducer,
    getItemList
  );

  return (
    <>
      <ItemList />
      <Paginator maxIndex={itemList.length} />
    </>
  );
};

export default Main;
