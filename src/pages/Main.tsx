import ItemList from 'components/ItemList';
import Pagination from 'components/common/Pagination';
import { ItemListAction } from 'redux/actions/itemList';
import { getItemList } from 'redux/action-creators/itemListThunk';
import useThunkFetch from 'hooks/useThunkFetch';
import { MAX_RESULT_ITEM_LIST } from 'constants/index';

const Main = () => {
  const { data: itemList } = useThunkFetch<ItemListAction>(
    state => state.itemListReducer,
    getItemList
  );

  return (
    <>
      <ItemList />
      <Pagination count={10} lastIndex={Math.floor(itemList.length / MAX_RESULT_ITEM_LIST) + 1} />
    </>
  );
};

export default Main;
