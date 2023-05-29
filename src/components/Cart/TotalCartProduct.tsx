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
      <TotalProductCountWrapper>
        <CheckBox
          id='total-item-check'
          onChange={toggleAllProductChecked}
          checked={isAllChecked}
        />
        <p>
          전체 선택 ({checkedCount}/{cartProductCount})
        </p>
      </TotalProductCountWrapper>
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
  justify-content: space-between;
  margin: 27px 0 45px 0;

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    justify-content: start;
    margin: 0 0 100px 0;
  }
`;

const TotalProductCountWrapper = styled.div`
  display: flex;
  align-items: center;

  & > p {
    margin: 0 0 0 12px;
  }

  @media (min-width: ${({ theme }) => theme.breakPoints.medium}) {
    margin: 0 12px 0 0;
  }
`;

export default TotalCartProduct;
