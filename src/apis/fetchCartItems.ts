import { ApiError } from "../constants/ApiError";
import { getErrorMessage } from "../util/getErrorMessage";
import { getErrorTypeByStatus } from "../util/getErrorTypeByStatus";

type fetchCartItemsParams = {
  params?: {
    page: string;
    size: string;
  };
};

const BASE_URL = import.meta.env.VITE_BASE_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

const fetchCartItems = async ({
  params = { page: "0", size: "50" },
}: fetchCartItemsParams) => {
  const url = new URL(`${BASE_URL}/cart-items`);
  url.search = new URLSearchParams(params).toString();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
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

  return response.json();
};

export default fetchCartItems;
