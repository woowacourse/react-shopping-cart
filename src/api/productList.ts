const fetchProductList = async <T>(): Promise<T> => {
  const response = await fetch('react-shopping-cart/mock/mockData.json'); //로컬
  // const response = await fetch('./mock/mockData.json'); //배포
  const data = await response.json();

  if (!response.ok) throw new Error('nope');

  return data;
};

export default fetchProductList;
