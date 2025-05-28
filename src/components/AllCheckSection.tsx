import styled from '@emotion/styled';
import CheckBox from '../components/CheckBox';
import { useCartItemsContext } from '../contexts/CartItemsContext';

const AllCheckSection = () => {
  const { isAllChecked, toggleAllChecked } = useCartItemsContext();

  return (
    <S.Container data-testid="allCheckSection">
      <CheckBox isChecked={isAllChecked} onClick={toggleAllChecked} />
      <p>전체 선택</p>
    </S.Container>
  );
};

export default AllCheckSection;

const S = {
  Container: styled.section`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
};
