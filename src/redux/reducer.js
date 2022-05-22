import {
  GET_PRODUCT_LIST_START,
  GET_PRODUCT_LIST_SUCCESS,
  GET_PRODUCT_LIST_ERROR,
} from "./types";

import { initialState } from "@/index";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_LIST_START:
      return {
        ...state,
        productList: {
          loading: true,
          data: null,
          error: null,
        },
      };

    case GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: {
          loading: false,
          data: JSON.parse(action.payload),
          error: null,
        },
      };

    case GET_PRODUCT_LIST_ERROR:
      return {
        ...state,
        productList: {
          loading: false,
          data: null,
          error: action.payload.message,
        },
      };

    default: {
      return state;
    }
  }
};

export default reducer;
