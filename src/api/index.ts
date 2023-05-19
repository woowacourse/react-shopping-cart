const fetchQuery = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const data = await response.json();

  if (response.status < 200 || 300 < response.status) {
    throw new Error(data.message);
  }
  return data;
};

export default fetchQuery;
