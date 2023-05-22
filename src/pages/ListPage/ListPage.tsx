import * as Styled from './ListPage.styles.tsx';
import ProductItem from '../../components/ProductItem/ProductItem.tsx';
import useGetCartList from '../../hooks/requests/useGetCartList.ts';
import useGetProductList from '../../hooks/requests/useGetProductList.ts';

const ListPage = () => {
  const { data: productListData } = useGetProductList();
  const { data: cartListData } = useGetCartList();

  return (
    <Styled.ProductList>
      {productListData &&
        cartListData &&
        productListData.map((product) => {
          const cartItem = cartListData.items.find((cartItem) => cartItem.id === product.id);
          return <ProductItem key={product.id} cartItem={cartItem} {...product} />;
        })}
    </Styled.ProductList>
  );
};

export default ListPage;
