export const productsQuery = async () => {
  const response = await fetch('/products');
  if (!response.ok) throw new Error();
  const data = await response.json();
  return data;
};
