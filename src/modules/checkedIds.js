import createReducer from "./createReducer";

const REMOVE_PRODUCT_IDS = "checked-ids/REMOVE_PRODUCT_IDS";
export const ADD_PRODUCT_IDS = "checked-ids/ADD_PRODUCT_IDS";

export const REMOVE_PRODUCT_ID = "checked-ids/REMOVE_PRODUCT_ID";
const ADD_PRODUCT_ID = "checked-ids/ADD_PRODUCT_ID";

export const removeIds = () => ({
  type: REMOVE_PRODUCT_IDS,
});

export const addIds = (ids) => ({
  type: ADD_PRODUCT_IDS,
  ids,
});

export const removeId = (id) => ({
  type: REMOVE_PRODUCT_ID,
  removeId: id,
});

export const addId = (id) => ({
  type: ADD_PRODUCT_ID,
  newId: id,
});

const removeProductId = (state, action) => {
  const removeIndex = state.findIndex((id) => id === action.removeId);
  const newState = [...state];
  newState.splice(removeIndex, 1);

  return newState;
};

const addProductId = (state, action) => {
  if (state.includes(action.newId)) {
    return [...state];
  }
  return [...state, action.newId];
};

const removeProductIds = () => [];

const addProductIds = (_, action) => action.ids;

const checkedProductIdsReducer = createReducer(
  {},
  {
    [ADD_PRODUCT_ID]: addProductId,
    [REMOVE_PRODUCT_ID]: removeProductId,
    [ADD_PRODUCT_IDS]: addProductIds,
    [REMOVE_PRODUCT_IDS]: removeProductIds,
  }
);

export default checkedProductIdsReducer;
