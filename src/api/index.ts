export const fetchAPI = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) throw Error(`${response.status}: ${response.text}`);
  const data = await response.json();

  return data;
};
