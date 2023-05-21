const fetchQuery = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const data = await response.json();

  if (response.status < 200 || 300 < response.status) {
    throw new Error(data.message);
  }
  return data;
};

export const fetchPostQuery = async <T>(
  url: string,
  id: number
): Promise<T> => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: id }),
  });

  const data = await response.json();

  if (response.status < 200 || 300 < response.status) {
    throw new Error(data.message);
  }
  return data;
};

export default fetchQuery;
