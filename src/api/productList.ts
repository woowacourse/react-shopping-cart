const fetchProductList = async <T>(): Promise<T> => {
  const response = await fetch('/products'); //로컬
  // const response = await fetch('./mock/mockData.json'); //배포
  console.log(response);
  const data = await response.json();

  return data;
};

export default fetchProductList;
