import { ProductItem } from '../components/ProductItem';
import * as Styled from './styles/ProductList.styles';
import { getMockData } from '../utils/getMockData';

export const ProductList = () => {
  return (
    <Styled.Wrapper>
      {getMockData.map(({ id, name, price, imageUrl }) => (
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
