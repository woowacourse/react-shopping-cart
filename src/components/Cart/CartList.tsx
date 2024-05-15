import { FlexRow, WhiteSpace } from '@/style/common.style';
import { useEffect, useState } from 'react';

import CartItem from '@/components/Cart/CartItem';
import CheckBox from '@/components/Button/CheckBoxButton';
import { allSelectedState } from '@/store/selector';
import { cartListState } from '@/store/atoms';
import { getCartItems } from '@/api/cartItem';
import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';

const CartList = () => {
  const [cartItems, setCartItems] = useRecoilState(cartListState);
  const [isAllSelected, setIsAllSelected] = useRecoilState(allSelectedState);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const cartItemsData = await getCartItems();
        setCartItems(cartItemsData);
      } catch (error) {
        setError(error as Error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

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
        {cartItems.map((item) => (
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
