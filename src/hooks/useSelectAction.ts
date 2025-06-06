import { useSelectDispatch } from "../stores/SelectContext";
import { ResponseCartItem } from "../types/types";

function useSelectAction() {
  const selectDispatch = useSelectDispatch();

  const addSelect = ({ id }: { id: number }) => {
    selectDispatch({
      type: "ADD_SELECT",
      payload: { id },
    });
  };

  const removeSelect = ({ id }: { id: number }) => {
    selectDispatch({
      type: "REMOVE_SELECT",
      payload: { id },
    });
  };

  const selectAll = () => {
    selectDispatch({
      type: "SELECT_ALL",
      payload: {},
    });
  };

  const deselectAll = () => {
    selectDispatch({
      type: "DESELECT_ALL",
      payload: {},
    });
  };

  const setSelectInfo = ({ items }: { items: ResponseCartItem[] }) => {
    selectDispatch({
      type: "SET_SELECT",
      payload: { items },
    });
  };

  return {
    addSelect,
    removeSelect,
    selectAll,
    deselectAll,
    setSelectInfo,
  };
}

export default useSelectAction;
