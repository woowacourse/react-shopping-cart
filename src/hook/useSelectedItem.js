import {useDispatch} from 'react-redux';
import {SELECTED_ITEM} from 'store/modules/selectedItem';

export default function useSelectedItem() {
  const dispatch = useDispatch();

  const selectAllItem = (payload) => dispatch({type: SELECTED_ITEM.ADD_ALL, payload});

  const unselectAllItem = (payload) => dispatch({type: SELECTED_ITEM.DELETE_ALL});

  const addSelectedItem = (payload) => dispatch({type: SELECTED_ITEM.ADD, payload});

  const deleteSelectedItem = (payload) => dispatch({type: SELECTED_ITEM.DELETE, payload});

  return {
    selectAllItem,
    unselectAllItem,
    addSelectedItem,
    deleteSelectedItem,
  };
}
