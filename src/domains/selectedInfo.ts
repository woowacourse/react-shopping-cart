import { SelectState } from "../stores/SelectReducer";
import { setLocalStorage } from "../utils/storage";

export const SELECTED_INFO_KEY = "selectedInfo";

export const setSelectedInfoAllDeSelect = (selectState: SelectState[]) => {
  setLocalStorage(
    SELECTED_INFO_KEY,
    selectState.map((state) => {
      return {
        id: state.id,
        selected: false,
      };
    })
  );
};

export const setSelectedInfoAllSelect = (selectState: SelectState[]) => {
  setLocalStorage(
    SELECTED_INFO_KEY,
    selectState.map((state) => {
      return {
        id: state.id,
        selected: true,
      };
    })
  );
};

export const setSelectedInfo = (
  selectState: SelectState[],
  id: number,
  isSelected: boolean
) => {
  setLocalStorage(
    SELECTED_INFO_KEY,
    selectState.map((state) => {
      if (state.id === id) {
        return {
          id: state.id,
          selected: isSelected,
        };
      }

      return state;
    })
  );
};
