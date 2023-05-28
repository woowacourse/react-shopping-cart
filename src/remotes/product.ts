export const fetchProducts = async (url: string) => {
  const response = await fetch(url, {});

  if (!response.ok) {
    throw new Error('상품 목록을 불러올 수 없습니다.');
  }

  const products = await response.json();

  return products;
};
