export const fetchProducts = async () => {
  const res = await fetch("http://localhost:3002/products");
  if (!res.ok) {
    throw new Error("로드에 실패했습니다");
  }
  return await res.json();
};
