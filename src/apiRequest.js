import { REQUEST_METHOD } from "./constants";

export const fetchData = async (method, requestUrl = "", requestData = {}) => {
  const fetchInitOption = { method };
  if (method !== REQUEST_METHOD.GET) {
    fetchInitOption.body = JSON.stringify(requestData);
  }

  const response = await fetch(requestUrl, fetchInitOption);
  if (!response.ok) throw new Error("Fetch error");

  const data = await response.json();
  if (!data) throw new Error("No Data");

  return data;
};
