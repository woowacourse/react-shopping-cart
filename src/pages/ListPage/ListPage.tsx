import * as Styled from './ListPage.styles.tsx';
import ProductItem from '../../components/ProductItem/ProductItem.tsx';
import mockData from '../../data/productList.json';

const ListPage = () => {
  return (
    <Styled.ProductList>
      {mockData.map((product) => {
        return <ProductItem key={product.id} {...product} />;
      })}
    </Styled.ProductList>
  );
};

export default ListPage;
