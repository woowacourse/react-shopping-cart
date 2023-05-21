import { useRecoilValue } from 'recoil';
import { ProductItem } from '../components/ProductItem';
import * as Styled from './styles/ProductList.styles';
import { productListState } from '../atoms/ProductItemState';

export const ProductList = () => {
  const productList = useRecoilValue(productListState);

  return (
    <Styled.Wrapper>
      {productList.map(({ id, name, price, imageUrl }) => (
        <ProductItem
          key={id}
          id={id}
          name={name}
          price={price}
          imageUrl={imageUrl}
        />
      ))}
    </Styled.Wrapper>
  );
};
