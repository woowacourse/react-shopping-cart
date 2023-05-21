import styled from 'styled-components';

import CheckBox from '../Common/CheckBox';
import Button from '../Common/Button';

import useCartProductCount from '../../hooks/useCartProductCount';
import useCheckedCount from '../../hooks/useCheckedCount';
import useMultipleChecked from '../../hooks/useMultipleChecked';

const TotalCartProduct = () => {
  const cartProductCount = useCartProductCount();
  const checkedCount = useCheckedCount();
  const { isAllChecked, toggleAllProductChecked, deleteCheckedProducts } =
    useMultipleChecked();

  return (
    <Container>
      <CheckBox
        id='total-item-check'
        onChange={toggleAllProductChecked}
        checked={isAllChecked}
      />
      <p>
        전체 선택 ({checkedCount}/{cartProductCount})
      </p>
      <Button
        type='button'
        primary={false}
        size='small'
        border
        onClick={deleteCheckedProducts}
      >
        선택삭제
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 60px 0;

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    margin: 0 0 100px 0;
  }
`;

export default TotalCartProduct;
