export const fetchApi = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw Error(`[Error] status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
