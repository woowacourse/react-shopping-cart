import axios from "axios";

import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/message";
import PATH from "../constants/path";
import STATUS_CODE from "../constants/statusCode";
import { APIReturnType, CartItem } from "../interface";

interface CartResponseData {
  cart_id: number;
  price: number;
  name: string;
  image_url: string;
}

const cartAPI = {
  get: async (): Promise<APIReturnType<CartItem[] | null>> => {
    try {
      const response = await axios.get(PATH.CART);

      if (response.status !== STATUS_CODE.OK) {
        throw new Error(ERROR_MESSAGE.API_CALL);
      }

      const result: CartItem[] = response.data.map((cartItem: CartResponseData) => ({
        id: cartItem.cart_id,
        name: cartItem.name,
        price: cartItem.price,
        imageSrc: cartItem.image_url,
        quantity: 1,
      }));

      return {
        isSucceeded: true,
        message: "",
        result,
      }
    } catch (error) {
      console.error(error);

      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.BAD_RESPONSE,
        result: null,
      };
    }
  },

  post: async (id: string): Promise<APIReturnType<null>> => {
    try {
      const response = await axios.post(PATH.CART, {
        product_id: id,
      });

      if (response.status !== STATUS_CODE.CREATED) {
        throw new Error(ERROR_MESSAGE.API_CALL);
      }

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.POST_CART,
        result: null
      }
    } catch (error) {
      console.error(error);

      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.BAD_RESPONSE,
        result: null,
      };
    }
  },

  delete: async (id: string) => {
    try {
      const response = await axios.delete(`${PATH.CART}/${id}`);

      if (response.status !== STATUS_CODE.NO_CONTENT) {
        throw new Error(ERROR_MESSAGE.API_CALL);
      }

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.DELETE_CART,
        result: null,
      };
    } catch (error) {
      console.error(error);

      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.BAD_RESPONSE,
        result: null,
      };
    }
  },
};

export default cartAPI;