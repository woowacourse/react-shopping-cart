import axios from "axios"

import { ERROR_MESSAGE } from "../constants/message";
import { APIReturnType, ProductsObject } from "../interface";

interface ProductsResponseData {
  product_id: number;
  price: number;
  name: string;
  image_url: string;
}

const productsAPI = {
  get: async (): Promise<APIReturnType<ProductsObject | null>> => {
    try {
      const response = await axios.get("/api/products");

      if (response.status !== 200) {
        throw new Error(ERROR_MESSAGE.API_CALL);
      }

      const products: ProductsObject = response.data.reduce(
        (acc: ProductsObject, product: ProductsResponseData) => {
          acc[product.product_id] = {
            name: product.name,
            price: product.price,
            imageSrc: product.image_url,
          }

          return acc;
        }, {});

      return {
        isSucceeded: true,
        message: "",
        result: products,
      }
    } catch (error) {
      console.error(error);

      return {
        isSucceeded: false,
        message: ERROR_MESSAGE.BAD_RESPONSE,
        result: null,
      };
    }
  }
};

export default productsAPI;