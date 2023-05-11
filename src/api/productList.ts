const fetchProductList = async <T>(): Promise<T> => {
  const response = await fetch('react-shopping-cart/mock/mockData.json');
  const data = await response.json();

  if (!response.ok) throw new Error('nope');

  return data;
};

export default fetchProductList;
