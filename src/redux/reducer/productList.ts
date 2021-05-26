import produce from 'immer';
import { ProductDetailObjectType, ProductDetailType } from '../../type';
import { TOGGLE_LIKE_PRODUCT, UPDATE_PRODUCT_LIST } from '../actionType';

interface StateProps {
  products: ProductDetailObjectType;
}

const initState: StateProps = {
  products: {},
};

const productListReducer = (
  state = initState,
  action: {
    type: string;
    payload: ProductDetailType;
  }
) => {
  switch (action.type) {
    case UPDATE_PRODUCT_LIST: {
      const product = action.payload;

      return produce(state, (draft) => {
        draft.products[product.product_id] = product;
      });
    }
    case TOGGLE_LIKE_PRODUCT: {
      const product = action.payload;

      return produce(state, (draft) => {
        draft.products[product.product_id].liked =
          !draft.products[product.product_id].liked;
      });
    }

    default:
      return state;
  }
};

export default productListReducer;
