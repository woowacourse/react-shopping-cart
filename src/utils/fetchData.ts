export const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await extractPayload(response);

    return data;
  } catch (error) {
    console.log(error);
  }
};

const extractPayload = async (response: Response) => {
  if (response.ok) {
    const data = await response.json();

    return data;
  } else {
    throw new Error(`[HTTP error] status: ${response.status}`);
  }
};
