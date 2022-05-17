import ItemList from 'components/ItemList';
import Paginator from 'components/common/Paginator';
import { useAppSelector } from 'hooks/useAppSelector';
import { ItemListAction } from 'redux/actions/itemList';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { getItemList } from 'redux/action-creators/itemListThunk';
import { useEffect, useState } from 'react';
import Loading from 'components/common/Loading';
import RequestFail from 'components/common/RequestFail';

const ItemListPage = () => {
  const { data: itemList, loading, error } = useAppSelector(state => state.itemListReducer);
  const dispatch = useAppDispatch<ItemListAction>();

  useEffect(() => {
    dispatch(getItemList());
  }, []);

  if (loading) return <Loading />;
  if (error) return <RequestFail />;

  return (
    <>
      <ItemList fullItemList={itemList} />
      <Paginator maxIndex={itemList.length} />
    </>
  );
};

export default ItemListPage;
