export const useProductFetch = () => {
  const getProductDetailById = async (id: number) => {
    const response = await fetch(`/products/${id}`);
    const productDetail = await response.json();

    return productDetail;
  };

  return {
    getProductDetailById,
  };
};
