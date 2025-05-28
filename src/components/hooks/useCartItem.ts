import React, { useEffect, useReducer } from "react";

type ProductTypes = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export type CartItemTypes = {
  id: number;
  quantity: 1;
  product: ProductTypes;
};

interface ItemType {
  item: CartItemTypes[];
  loading: boolean;
  error: string | null;
}

type BaseAction =
  | {
      type: "update";
    }
  | {
      type: "success";
      payload: CartItemTypes[];
    }
  | {
      type: "error";
      payload: string;
    };

function reducer(state: ItemType, action: BaseAction): ItemType {
  switch (action.type) {
    case "update":
      return {
        item: state.item,
        loading: true,
        error: null,
      };
    case "success":
      return {
        item: action.payload,
        loading: false,
        error: null,
      };
    case "error":
      return {
        item: state.item,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

const init: ItemType = {
  item: [],
  loading: false,
  error: null,
};

function useCartItem() {
  const [cartItem, dispatch] = useReducer<React.Reducer<ItemType, BaseAction>>(
    reducer,
    init
  );

  return { cartItem, dispatch };
}

export default useCartItem;
