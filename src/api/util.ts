import { FETCH_ERROR_MESSAGE } from "../constants/errorMessage";

export const isEmptyResponse = (response: Response) => {
  return (
    response.status === 204 || response.headers.get("content-length") === "0"
  );
};

export const isSuccess = (response: Response) => {
  return response.ok;
};

export const isFetchError = (response: Response) => {
  return response.status in FETCH_ERROR_MESSAGE;
};
