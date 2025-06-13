import { useCallback } from "react";
import { useSelectDispatch } from "../stores/SelectContext";
import { SelectState } from "../stores/SelectReducer";

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

  const setSelectInfo = useCallback(
    ({ items }: { items: SelectState[] }) => {
      selectDispatch({
        type: "SET_SELECT",
        payload: { items },
      });
    },
    [selectDispatch]
  );

  return {
    addSelect,
    removeSelect,
    selectAll,
    deselectAll,
    setSelectInfo,
  };
}

export default useSelectAction;
