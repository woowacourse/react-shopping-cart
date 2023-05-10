import { Dispatch, SetStateAction } from 'react';

type SetDataType<T> = Dispatch<SetStateAction<T>>;

export const fetchData = async <T>(url: string, setData: SetDataType<T>) => {
  try {
    const response = await fetch(url);
    const data = await validateResponse(response);

    setData(data);
  } catch (error) {
    console.log(error);
    return [];
  }
};

const validateResponse = async (response: Response) => {
  if (response.ok) {
    const data = await response.json();

    return data;
  } else {
    throw new Error(`[HTTP error] status: ${response.status}`);
  }
};
