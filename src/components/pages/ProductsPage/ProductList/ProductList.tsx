import { Product } from '@customTypes/Product';

import { StyledProductList } from '@components/pages/ProductsPage/ProductList/ProductList.styled';
import ProductItem from '@components/pages/ProductsPage/ProductList/ProductItem/ProductItem';
import ErrorModal from '@components/pages/ErrorPage/ErrorModal/ErrorModal';
import { FetchedDataList } from '@components/commons/FetchedDataList/FetchedDataList';

const ProductList = () => {
  // TODO : 페이지 벗어남 (새로고침, 뒤로가기, 페이지 이동) 감지시 데이터 패칭
  // const { getData, postData, patchData, deleteData } = useFetch('/cart-items');

  // const addItemOnCart = useCallback(async () => {
  //   try {
  //     await postData({ productId: productId });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [postData, productId]);

  // const deleteItemOnCart = useCallback(async () => {
  //   try {
  //     const cartItems = await getData<Product[]>();
  //     const item = cartItems.find(item => item.id === productId);
  //     await deleteData(`/${item?.id}`);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [getData, deleteData, productId]);

  return (
    <FetchedDataList<Product[]> endpoint={'/products'} initialValue={[]}>
      {({ data, isError }) => {
        return (
          <>
            <ErrorModal isError={isError} />
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
