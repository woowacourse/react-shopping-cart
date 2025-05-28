import { ApiError } from "../constants/ApiError";
import { getErrorMessage } from "../util/getErrorMessage";
import { getErrorTypeByStatus } from "../util/getErrorTypeByStatus";

interface DeleteCartItemParams {
  params: {
    id: string;
  };
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

const deleteCartItem = async ({ params }: DeleteCartItemParams) => {
  const { id } = params;
  const url = new URL(`${BASE_URL}/cart-items/${id}`);

  const options = {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorType = getErrorTypeByStatus(response.status);
      throw new ApiError(
        response.status,
        response.statusText,
        getErrorMessage(response.statusText, response.status),
        errorType
      );
    }
  } catch (error) {
    throw error;
  }
};

export default deleteCartItem;
