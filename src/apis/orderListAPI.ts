import axios from "axios";

import PATH from "../constants/path";
import STATUS_CODE from "../constants/statusCode";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/message";
import { APIReturnType, Order } from "../interface";

interface OrderDetailResponseData {
  product_id: number;
  price: number;
  name: string;
  image_url: string;
  quantity: number;
}

interface OrderListResponseData {
  order_id: number;
  order_details: OrderDetailResponseData[];
}

const orderListAPI = {
  get: async (): Promise<APIReturnType<Order[] | null>> => {
    try { 
      const response = await axios.get(PATH.ORDER_LIST);

      if (response.status !== STATUS_CODE.OK) {
        throw new Error(ERROR_MESSAGE.API_CALL);
      }

      const result: Order[] = response.data.map((order:OrderListResponseData) => ({
        id: order.order_id,
        itemList: order.order_details.map((item) => ({
          id: item.product_id,
          name: item.name,
          price: item.price,
          imageSrc: item.image_url,
          quantity: item.quantity,
        }))
      }));

      return {
        isSucceeded: true,
        message: "",
        result,
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

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${PATH.ORDER_LIST}/${id}`);

      if (response.status !== STATUS_CODE.OK) {
        throw new Error(ERROR_MESSAGE.API_CALL);
      }

      const result = {
        id: response.data.order_id,
        itemList: response.data.order_details.map((item: OrderDetailResponseData) => ({
          id: item.product_id,
          name: item.name,
          price: item.price,
          imageSrc: item.image_url,
          quantity: item.quantity,
        }))
      }

      return {
        isSucceeded: true,
        message: "",
        result,
      };
    } catch (error) {
      console.error(error)
    }
  },

  post: async (id: string, quantity: number): Promise<APIReturnType<null>> => {
    try {
      const response = await axios.post(PATH.ORDER_LIST, {
        cart_id: id,
        quantity,
      });

      if (response.status !== STATUS_CODE.CREATED) {
        throw new Error(ERROR_MESSAGE.API_CALL);
      }

      return {
        isSucceeded: true,
        message: SUCCESS_MESSAGE.POST_ORDER,
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
};

export default orderListAPI;