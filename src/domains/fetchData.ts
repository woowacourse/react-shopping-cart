import { getErrorMessageByCode } from "../constants/fetchErrorMessages";

type FetchDataProps<T> = {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  json?: BodyInit;
  typeGuardFunction: (value: unknown) => value is T;
};

const fetchData = async <T>({
  url,
  method,
  json,
  typeGuardFunction,
}: FetchDataProps<T>) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    });

    if (!response.ok) {
      throw new Error(getErrorMessageByCode(response.status));
    }

    const data = await response.json();

    if (!typeGuardFunction(data)) {
      throw Error(getErrorMessageByCode());
    }

    return data;
  } catch (error) {
    alert(error);
    throw error;
  }
};

export { fetchData };
