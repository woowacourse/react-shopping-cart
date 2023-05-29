const fetchProductList = async <T>(): Promise<T> => {
  const response = await fetch('/products');
  const data = await response.json();

  return data;
};

export default fetchProductList;
