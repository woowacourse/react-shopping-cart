import styled from 'styled-components';
import AllRemoveButton from './AllRemoveButton';
import ProductCheckBox from './ProductCheckBox';

export default function CartOperatorHead({ products }) {
  return (
    <Styled.CartOperationHeadBox>
      <ProductCheckBox products={products} />
      <AllRemoveButton products={products} />
    </Styled.CartOperationHeadBox>
  );
}

const Styled = {
  CartOperationHeadBox: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 26px;
  `,
};
