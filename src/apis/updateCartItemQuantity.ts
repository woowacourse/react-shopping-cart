import { ApiError } from "../constants/ApiError";
import { getErrorMessage } from "../util/getErrorMessage";
import { getErrorTypeByStatus } from "../util/getErrorTypeByStatus";

interface updateCartItemsParams {
  params: {
    id: string;
    quantity: string;
  };
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

const updateCartItemQuantity = async ({ params }: updateCartItemsParams) => {
  const { id, quantity } = params;

  const url = new URL(`${BASE_URL}/cart-items/${id}`);

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
    body: JSON.stringify({ quantity: quantity }),
  };

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
};

export default updateCartItemQuantity;
