import { FlexRow, WhiteSpace } from '@/style/common.style';
import { useRecoilState, useRecoilValue } from 'recoil';

import CartItem from '@/components/Cart/CartItem';
import CheckBox from '@/components/Button/CheckBoxButton';
// import { ErrorBoundary } from 'react-error-boundary';
// import ErrorFallback from '../ErrorFallback';
import { allSelectedState } from '@/store/selectors/allSelectedSelector';
import { cartListState } from '@/store/atoms';
import styled from '@emotion/styled';
import { useState } from 'react';

const CartList = () => {
  const cartList = useRecoilValue(cartListState);
  const [isAllSelected, setIsAllSelected] = useRecoilState(allSelectedState);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<Error | null>(null);

  const handleAllSelect = () => {
    setIsAllSelected(!isAllSelected);
  };

  return (
    <StyledListWrapper>
      <StyledAllCheckBox>
        <CheckBox isSelected={isAllSelected} onClick={handleAllSelect} />
        <span>전체선택</span>
      </StyledAllCheckBox>
      <StyledList>
        {cartList.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </StyledList>
    </StyledListWrapper>
  );
};
export default CartList;

const StyledListWrapper = styled.div`
  ${WhiteSpace}
`;

const StyledAllCheckBox = styled.div`
  ${FlexRow}
  gap: 5px;
  align-items: center;
`;

const StyledList = styled.ul`
  padding-inline-start: 0;
`;
