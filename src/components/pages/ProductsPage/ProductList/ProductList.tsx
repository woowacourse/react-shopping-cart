import { Product } from '@customTypes/Product';

import { StyledProductList } from '@components/pages/ProductsPage/ProductList/ProductList.styled';
import ProductItem from '@components/pages/ProductsPage/ProductList/ProductItem/ProductItem';
import ErrorModal from '@components/pages/ErrorPage/ErrorModal/ErrorModal';
import { FetchedDataList } from '@components/commons/FetchedDataList/FetchedDataList';

const ProductList = () => {
  return (
    <FetchedDataList<Product[]> endpoint={'/products'} initialValue={[]}>
      {({ data, isError }) => {
        return (
          <>
            <ErrorModal isError={isError} />
            <StyledProductList>
              {data.map((item: Product) => (
                <ProductItem
                  key={item.id}
                  initQuantity={0}
                  product={{ ...item }}
                />
              ))}
            </StyledProductList>
          </>
        );
      }}
    </FetchedDataList>
  );
};

export default ProductList;
