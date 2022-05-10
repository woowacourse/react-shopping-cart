import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getItemList } from '../redux/action-creators/itemListThunk';
import { RootState } from '../redux/reducers';
import ItemContainer from '../components/ItemList/ItemContainer';

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
    <div>
      {itemList.map(item => (
        <ItemContainer
          key={item.id}
          thumbnailUrl={item.thumbnailUrl}
          price={item.price}
          title={item.title}
        />
      ))}
    </div>
  );
};

export default ItemList;
