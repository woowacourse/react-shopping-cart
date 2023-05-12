import ProductCardList from 'components/ProductCardList/ProductCardList';
import useProductsFetch from 'hooks/useProductsFetch';

const ProductListPage = () => {
  const { products, isLoading, error, fetchProducts } = useProductsFetch();

  if (error) {
    return (
      <>
        <p>{error.message}</p>
        <button onClick={() => fetchProducts()}>다시 요청하기</button>
      </>
    );
  }

  return isLoading ? <p>로딩 중입니다..</p> : <ProductCardList products={products} />;
};

export default ProductListPage;
