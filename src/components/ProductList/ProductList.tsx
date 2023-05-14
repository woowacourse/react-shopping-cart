import { Product } from '@customTypes/Product';
import useFetch from '@hooks/useFetch';

import { StyledProductList } from '@components/ProductList/ProductList.styled';
import ProductItem from '@components/ProductItem/ProductItem';
import ErrorModal from '@components/ErrorModal/ErrorModal';

const ProductList = () => {
  const [productList, isError] = useFetch<Product[]>(
    process.env.PUBLIC_URL + '/mockData.json',
    []
  );

  return (
    <>
      <ErrorModal isError={isError} />
      <StyledProductList>
        {productList.map(data => (
          <ProductItem key={data.id} product={{ ...data }} />
        ))}
      </StyledProductList>
    </>
  );
};

export default ProductList;
