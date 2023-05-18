import styled from 'styled-components';
import { useMockData } from '../../../hooks/useMockData';
import { useCartIdList } from '../../../hooks/recoil/useCartIdList';
import { ProductSelectItem } from './CartProductItem';

export const ProductSelectList = () => {
  const { cartIdList } = useCartIdList();
  const { mockData } = useMockData();

  return (
    <Style.Container>
      {cartIdList.map((cartId) => {
        const product = mockData.find((product) => product.id === cartId);

        if (product === undefined)
          throw new Error('장바구니에 담긴 id에 해당하는 상품이 없습니다!');

        return <ProductSelectItem key={product.id} {...product} />;
      })}
    </Style.Container>
  );
};

const Style = {
  Container: styled.ul`
    width: 740px;
    height: max-content;

    display: flex;
    flex-direction: column;
  `,
};
