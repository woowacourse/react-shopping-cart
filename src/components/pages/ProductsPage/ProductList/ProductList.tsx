import { StyledProductList } from '@components/pages/ProductsPage/ProductList/ProductList.styled';
import ProductItem from '@components/pages/ProductsPage/ProductList/ProductItem/ProductItem';
import ErrorModal from '@components/pages/ErrorPage/ErrorModal/ErrorModal';
import { FetchedDataList } from '@components/commons/FetchedDataList/FetchedDataList';
import { Product } from '@customTypes/Product';

const ProductList = () => {
  return (
    <FetchedDataList<Product[]> endpoint={'api/productList'} initialValue={[]}>
      {({ data, fetchStatus }) => {
        return (
          <>
            <ErrorModal fetchStatus={fetchStatus} />
            <StyledProductList>
              {data.map((item: Product) => (
                <ProductItem key={item.id} product={{ ...item }} />
              ))}
            </StyledProductList>
          </>
        );
      }}
    </FetchedDataList>
  );
};

export default ProductList;
